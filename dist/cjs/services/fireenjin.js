"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localforage = __importStar(require("localforage"));
const graphql_request_1 = require("graphql-request");
const storage_1 = require("@firebase/storage");
const tryOrFail_1 = __importDefault(require("../helpers/tryOrFail"));
const client_1 = __importDefault(require("./client"));
const database_1 = __importDefault(require("./database"));
const firestore_1 = __importDefault(require("./firestore"));
const storage_2 = require("firebase/storage");
const firstToLowerCase_1 = __importDefault(require("../helpers/firstToLowerCase"));
const getByPath_1 = __importDefault(require("../helpers/getByPath"));
const setByPath_1 = __importDefault(require("../helpers/setByPath"));
const subscription_1 = __importDefault(require("../events/subscription"));
const mergeSets_1 = __importDefault(require("../helpers/mergeSets"));
const cleanFirestoreData_1 = __importDefault(require("../helpers/cleanFirestoreData"));
class FireEnjin {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        this.sdk = {};
        this.host = {
            url: "http://localhost:4000",
        };
        this.currentConnection = 0;
        this.state = {};
        this.signals = {};
        this.options = options || {};
        const headers = Object.assign({ Authorization: (options === null || options === void 0 ? void 0 : options.token) ? `Bearer ${options.token}` : "" }, (options.headers ? options.headers : {}));
        this.host = ((_a = options === null || options === void 0 ? void 0 : options.connections) === null || _a === void 0 ? void 0 : _a.length)
            ? this.setConnection(0)
            : {
                url: options.host,
                type: "rest",
                headers,
            };
        this.storage =
            ((_b = this.options) === null || _b === void 0 ? void 0 : _b.storage) ||
                (((_d = (_c = this.host) === null || _c === void 0 ? void 0 : _c.db) === null || _d === void 0 ? void 0 : _d.app) && (0, storage_1.getStorage)((_f = (_e = this.host) === null || _e === void 0 ? void 0 : _e.db) === null || _f === void 0 ? void 0 : _f.app));
        this.client =
            this.host.type === "graphql"
                ? new graphql_request_1.GraphQLClient(((_g = this.host) === null || _g === void 0 ? void 0 : _g.url) || "http://localhost:4000", {
                    headers: ((_h = this.host) === null || _h === void 0 ? void 0 : _h.headers) || {},
                })
                : ((_j = this.host) === null || _j === void 0 ? void 0 : _j.type) === "firebase"
                    ? new firestore_1.default(this.host.url, {
                        db: ((_k = this.host) === null || _k === void 0 ? void 0 : _k.db)
                            ? this.host.db
                            : new database_1.default({
                                emulate: !!(options === null || options === void 0 ? void 0 : options.emulate),
                                config: (_l = this.host) === null || _l === void 0 ? void 0 : _l.auth,
                            }),
                    })
                    : new client_1.default(this.host.url, { headers: ((_m = this.host) === null || _m === void 0 ? void 0 : _m.headers) || {} });
        this.sdk =
            typeof (options === null || options === void 0 ? void 0 : options.getSdk) === "function"
                ? options.getSdk(this.client, (_o = this.options) === null || _o === void 0 ? void 0 : _o.onRequest)
                : null;
        this.state = new Proxy((options === null || options === void 0 ? void 0 : options.state) || {}, {
            get: (proxyTarget, stateKey, receiver) => {
                var _a, _b;
                const value = Reflect.get(proxyTarget, stateKey, receiver);
                if (this.currentSignal !== undefined) {
                    this.signals[`state:${stateKey}`].add(this.currentSignal);
                }
                const detail = {
                    receiver,
                    proxyTarget,
                    stateKey,
                    value,
                };
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateRead", {
                        detail,
                    }));
                if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinStateRead:", detail);
                if (typeof ((_b = this.options) === null || _b === void 0 ? void 0 : _b.onStateRead) === "function")
                    return this.options.onStateRead(detail);
                return value;
            },
            set: (proxyTarget, stateKey, value, receiver) => {
                var _a, _b, _c, _d, _e;
                const signalKey = `state:${stateKey}`;
                const detail = {
                    receiver,
                    proxyTarget,
                    state: this.state,
                    stateKey,
                    value,
                };
                if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinStateChange: ", detail);
                if (typeof ((_b = this.options) === null || _b === void 0 ? void 0 : _b.onStateChange) === "function")
                    return this.options.onStateChange(detail);
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateChange", {
                        detail,
                    }));
                const reflection = Reflect.set(proxyTarget, stateKey, value, receiver);
                if (this.signals[signalKey])
                    this.signals[signalKey].forEach((fn) => fn({ value, stateKey, state: this.state, signalKey }));
                if (options === null || options === void 0 ? void 0 : options.autoBindAttributes)
                    (_e = (_d = (_c = document === null || document === void 0 ? void 0 : document.querySelectorAll) === null || _c === void 0 ? void 0 : _c.call(document, "[data-state]")) === null || _d === void 0 ? void 0 : _d.forEach) === null || _e === void 0 ? void 0 : _e.call(_d, (element) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const stateKey = (_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.state;
                        Object.keys(element.dataset).forEach((key) => {
                            if (key.includes("bind")) {
                                let propName = (0, firstToLowerCase_1.default)(key.replace("bind", ""));
                                if (propName === "innerHtml")
                                    propName = "innerHTML";
                                if (propName === "outerHtml")
                                    propName = "outerHTML";
                                element[propName] = (0, getByPath_1.default)(this.state[stateKey], element.dataset[key]);
                            }
                        });
                    }));
                return reflection;
            },
            deleteProperty: (proxyTarget, stateKey) => {
                var _a, _b, _c, _d, _e;
                const detail = {
                    state: this.state,
                    proxyTarget,
                    stateKey,
                    value: undefined,
                };
                if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinStateChange: ", detail);
                if (typeof ((_b = this.options) === null || _b === void 0 ? void 0 : _b.onStateChange) === "function")
                    return this.options.onStateChange(detail);
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateChange", {
                        detail,
                    }));
                if (this.signals[`state:${stateKey}`])
                    this.clearSignal(`state:${stateKey}`);
                if (!(stateKey in proxyTarget))
                    return false;
                delete proxyTarget[stateKey];
                if (options === null || options === void 0 ? void 0 : options.autoBindAttributes)
                    (_e = (_d = (_c = document === null || document === void 0 ? void 0 : document.querySelectorAll) === null || _c === void 0 ? void 0 : _c.call(document, "[data-state]")) === null || _d === void 0 ? void 0 : _d.forEach) === null || _e === void 0 ? void 0 : _e.call(_d, (element) => __awaiter(this, void 0, void 0, function* () {
                        Object.keys(element.dataset).forEach((key) => {
                            if (key.includes("bind")) {
                                let propName = (0, firstToLowerCase_1.default)(key.replace("bind", ""));
                                if (propName === "innerHtml")
                                    propName = "innerHTML";
                                if (propName === "outerHtml")
                                    propName = "outerHTML";
                                element[propName] = null;
                            }
                        });
                    }));
                return true;
            },
        });
        if ((_p = this.options) === null || _p === void 0 ? void 0 : _p.debug)
            console.log("fireenjinStart:", {
                host: this.host,
                headers,
                storage: this.storage,
                client: this.client,
                sdk: this.sdk,
            });
        if (document) {
            document.addEventListener("fireenjinUpload", this.onUpload.bind(this));
            document.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
            document.addEventListener("fireenjinFetch", this.onFetch.bind(this));
            document.addEventListener("fireenjinSubscribe", this.onSubscribe.bind(this));
            document.addEventListener("fireenjinState", this.onState.bind(this));
            if (options === null || options === void 0 ? void 0 : options.autoBindAttributes)
                document.addEventListener("DOMContentLoaded", () => {
                    this.watchDataAttributes();
                    let oldHref = document.location.href;
                    const body = document.querySelector("body");
                    const observer = new MutationObserver((mutations) => {
                        if (oldHref !== document.location.href) {
                            oldHref = document.location.href;
                            this.watchDataAttributes();
                        }
                    });
                    observer.observe(body, { childList: true, subtree: true });
                }, false);
            if (options === null || options === void 0 ? void 0 : options.debug) {
                document.addEventListener("fireenjinSuccess", (event) => {
                    console.log("fireenjinSuccess: ", event);
                });
                document.addEventListener("fireenjinError", (event) => {
                    console.log("fireenjinError: ", event);
                });
                document.addEventListener("fireenjinTrigger", (event) => {
                    console.log("fireenjinTrigger: ", event);
                });
                document.addEventListener("fireenjinReset", (event) => {
                    console.log("fireenjinReset: ", event);
                });
                document.addEventListener("fireenjinValidation", (event) => {
                    console.log("fireenjinValidation: ", event);
                });
                document.addEventListener("fireenjinProgress", (event) => {
                    console.log("fireenjinProgress: ", event);
                });
            }
        }
    }
    onState(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                console.log("fireenjinState: ", event);
            if ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.state) {
                this.state = (0, mergeSets_1.default)(this.state, ((_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.state) || {});
            }
            else if ((_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.stateKey) {
                this.state.set((_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.stateKey, (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.value);
            }
            return this.state;
        });
    }
    onUpload(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                console.log("fireenjinUpload: ", event);
            if (typeof ((_b = this.options) === null || _b === void 0 ? void 0 : _b.onUpload) === "function")
                return this.options.onUpload(event);
            const data = yield this.upload({
                data: {
                    id: (_c = event.detail.data) === null || _c === void 0 ? void 0 : _c.id,
                    path: (_d = event.detail.data) === null || _d === void 0 ? void 0 : _d.path,
                    fileName: (_e = event.detail.data) === null || _e === void 0 ? void 0 : _e.fileName,
                    file: ((_f = this.options) === null || _f === void 0 ? void 0 : _f.uploadFileEncoding)
                        ? (_g = event.detail.data) === null || _g === void 0 ? void 0 : _g.encodedContent
                        : (_h = event.detail.data) === null || _h === void 0 ? void 0 : _h.file,
                    type: (_j = event.detail.data) === null || _j === void 0 ? void 0 : _j.type,
                },
            }, {
                event,
                target: ((_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.target) || (event === null || event === void 0 ? void 0 : event.target),
                name: (_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.name,
                endpoint: (_m = event === null || event === void 0 ? void 0 : event.detail) === null || _m === void 0 ? void 0 : _m.endpoint,
                bubbles: (_o = event === null || event === void 0 ? void 0 : event.detail) === null || _o === void 0 ? void 0 : _o.bubbles,
                cancelable: (_p = event === null || event === void 0 ? void 0 : event.detail) === null || _p === void 0 ? void 0 : _p.cancelable,
                composed: (_q = event === null || event === void 0 ? void 0 : event.detail) === null || _q === void 0 ? void 0 : _q.composed,
                method: (_r = event === null || event === void 0 ? void 0 : event.detail) === null || _r === void 0 ? void 0 : _r.method,
            });
            if (event === null || event === void 0 ? void 0 : event.target)
                event.target.value = (data === null || data === void 0 ? void 0 : data.url) || null;
            return data;
        });
    }
    onSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                console.log("fireenjinSubmit: ", event);
            if (!event ||
                !event.detail ||
                !event.detail.endpoint ||
                event.detail.disableSubmit)
                return false;
            const target = ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.target) || (event === null || event === void 0 ? void 0 : event.target);
            return this.submit(event.detail.endpoint, {
                id: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.id,
                data: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.data,
                params: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.params,
                query: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.query,
            }, {
                event,
                target,
                name: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.name,
                bubbles: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.bubbles,
                cancelable: (_j = event === null || event === void 0 ? void 0 : event.detail) === null || _j === void 0 ? void 0 : _j.cancelable,
                composed: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.composed,
                method: ((_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.method) || (target === null || target === void 0 ? void 0 : target.method),
            });
        });
    }
    onFetch(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                console.log("fireenjinFetch: ", event);
            if (!event ||
                !event.detail ||
                !event.detail.endpoint ||
                event.detail.disableFetch)
                return false;
            const target = ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.target) || (event === null || event === void 0 ? void 0 : event.target);
            return this.fetch(event.detail.endpoint, ((_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.params) || {}, {
                event,
                target,
                dataPropsMap: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.dataPropsMap,
                name: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.name,
                cacheKey: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.cacheKey,
                disableCache: !!((_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.disableCache),
                bubbles: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.bubbles,
                cancelable: (_j = event === null || event === void 0 ? void 0 : event.detail) === null || _j === void 0 ? void 0 : _j.cancelable,
                composed: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.composed,
                method: ((_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.method) || (target === null || target === void 0 ? void 0 : target.method),
            });
        });
    }
    onSubscribe(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                console.log("fireenjinSubscribe: ", event);
            const signalKey = ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.signalKey) || ((_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.endpoint);
            const subscriptionDetails = {
                bubbles: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.bubbles,
                cancelable: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.cancelable,
                composed: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.composed,
                data: null,
                dataPropsMap: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.dataPropsMap,
                endpoint: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.endpoint,
                event,
                name: (_j = event === null || event === void 0 ? void 0 : event.detail) === null || _j === void 0 ? void 0 : _j.name,
                params: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.params,
                query: (_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.query,
                signalKey,
                target: (_m = event === null || event === void 0 ? void 0 : event.detail) === null || _m === void 0 ? void 0 : _m.target,
            };
            if (signalKey) {
                this.subscribe(signalKey, () => {
                    var _a, _b, _c;
                    subscriptionDetails.data = {
                        state: this.state,
                        signal: this.signals[signalKey],
                        timestamp: new Date(),
                    };
                    if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onSubscription) === "function")
                        this.options.onSubscription(subscriptionDetails);
                    if (typeof ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.callback) === "function")
                        (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.callback(subscriptionDetails);
                    (0, subscription_1.default)(subscriptionDetails);
                });
            }
            else {
                const collectionName = ((_o = event === null || event === void 0 ? void 0 : event.detail) === null || _o === void 0 ? void 0 : _o.collection) || ((_p = event === null || event === void 0 ? void 0 : event.detail) === null || _p === void 0 ? void 0 : _p.endpoint);
                (_s = (_r = (_q = this.host) === null || _q === void 0 ? void 0 : _q.db) === null || _r === void 0 ? void 0 : _r.subscribe) === null || _s === void 0 ? void 0 : _s.call(_r, Object.assign({ collectionName }, (_t = event === null || event === void 0 ? void 0 : event.detail) === null || _t === void 0 ? void 0 : _t.query), (data) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c;
                    subscriptionDetails.data = data;
                    if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onSubscription) === "function")
                        this.options.onSubscription(subscriptionDetails);
                    if (typeof ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.callback) === "function")
                        (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.callback(subscriptionDetails);
                    (0, subscription_1.default)(subscriptionDetails);
                }));
            }
        });
    }
    subscribe(signalKey, signal, runImmediately) {
        if (!this.signals[signalKey])
            this.signals[signalKey] = new Set();
        this.signals[signalKey].add(signal);
        if (runImmediately)
            signal();
        return signal;
    }
    unsubscribe(signalKey, signal) {
        if (this.signals[signalKey])
            this.signals[signalKey].delete(signal);
        return this.signals[signalKey];
    }
    sendSignal(signalKey, data) {
        if (this.signals[signalKey]) {
            this.signals[signalKey].forEach((signal) => signal(data));
        }
    }
    createSignal(initialValue, signalKey, saveToState, stateKey) {
        let value = initialValue;
        const state = stateKey || signalKey;
        const key = signalKey ||
            (saveToState && `state:${state}`) ||
            `signal:${Math.random()}`;
        if (!this.signals[key])
            this.signals[key] = new Set();
        const read = () => {
            if (this.currentSignal !== undefined) {
                this.signals[key].add(this.currentSignal);
            }
            return value;
        };
        const write = (newValue) => {
            value = newValue;
            if (saveToState && state)
                this.state[state] = value;
            this.signals[key].forEach((fn) => fn({
                value,
                signalKey: key,
                state: this.state,
                stateKey: state,
            }));
        };
        return [read, write, key];
    }
    createEffect(callback) {
        this.currentSignal = callback;
        callback();
        this.currentSignal = undefined;
    }
    createEffectPromise(callback) {
        this.currentSignal = callback;
        callback().then(() => (this.currentSignal = undefined));
    }
    clearSignal(signalKey) {
        if (signalKey && this.signals[signalKey])
            delete this.signals[signalKey];
        if (!signalKey)
            this.signals = {};
        return this.signals;
    }
    hash(input) {
        var hash = 0, i, chr;
        if (input.length === 0)
            return hash;
        for (i = 0; i < input.length; i++) {
            chr = input.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    upload(input, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const endpoint = (options === null || options === void 0 ? void 0 : options.endpoint) || "upload";
            const method = (options === null || options === void 0 ? void 0 : options.method) || "post";
            const target = (options === null || options === void 0 ? void 0 : options.target) || ((_a = options === null || options === void 0 ? void 0 : options.event) === null || _a === void 0 ? void 0 : _a.target) || document;
            return (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f;
                return this.storage
                    ? this.uploadFile((_a = input === null || input === void 0 ? void 0 : input.data) === null || _a === void 0 ? void 0 : _a.file, {
                        fileName: (_b = input === null || input === void 0 ? void 0 : input.data) === null || _b === void 0 ? void 0 : _b.fileName,
                        path: (_c = input === null || input === void 0 ? void 0 : input.data) === null || _c === void 0 ? void 0 : _c.path,
                        target,
                    }, options)
                    : ((_d = this.host) === null || _d === void 0 ? void 0 : _d.type) === "graphql" && !((_e = this.options) === null || _e === void 0 ? void 0 : _e.uploadUrl)
                        ? (input === null || input === void 0 ? void 0 : input.query)
                            ? this.client.request(input.query, input.params, {
                                method,
                            })
                            : this.sdk[endpoint]((input === null || input === void 0 ? void 0 : input.params) || {
                                id: input === null || input === void 0 ? void 0 : input.id,
                                data: input === null || input === void 0 ? void 0 : input.data,
                            })
                        : this.client.request(((_f = this.options) === null || _f === void 0 ? void 0 : _f.uploadUrl) || endpoint, input, {
                            method,
                        });
            }), {
                event: (options === null || options === void 0 ? void 0 : options.event) || null,
                target,
                name: (options === null || options === void 0 ? void 0 : options.name) || endpoint,
                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                composed: options === null || options === void 0 ? void 0 : options.composed,
                endpoint,
                cached: true,
                onError: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onError,
                onSuccess: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onSuccess,
            });
        });
    }
    fetch(endpoint, input, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            let data = null;
            const event = (options === null || options === void 0 ? void 0 : options.event) || null;
            const name = (options === null || options === void 0 ? void 0 : options.name) || null;
            const method = (options === null || options === void 0 ? void 0 : options.method) || "get";
            const localKey = (input === null || input === void 0 ? void 0 : input.collection) ||
                ((options === null || options === void 0 ? void 0 : options.cacheKey)
                    ? options.cacheKey
                    : `${((_a = this.options) === null || _a === void 0 ? void 0 : _a.cachePrefix) ? this.options.cachePrefix : ""}${endpoint}_${(input === null || input === void 0 ? void 0 : input.id)
                        ? `${input.id}:`
                        : (input === null || input === void 0 ? void 0 : input.params)
                            ? this.hash(JSON.stringify(Object.values(input.params)))
                            : ""}${this.hash(JSON.stringify(input || {}))}`);
            let localData = null;
            try {
                localData = (yield ((_b = localforage === null || localforage === void 0 ? void 0 : localforage.getItem) === null || _b === void 0 ? void 0 : _b.call(localforage, localKey))) || null;
                if (localData && (input === null || input === void 0 ? void 0 : input.id) && (input === null || input === void 0 ? void 0 : input.collection))
                    localData = localData === null || localData === void 0 ? void 0 : localData[input.id];
            }
            catch (_k) {
                console.log("No Local data found");
            }
            if (localData && !(options === null || options === void 0 ? void 0 : options.disableCache)) {
                data = yield (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () { return localData; }), {
                    endpoint,
                    event,
                    target: (options === null || options === void 0 ? void 0 : options.target) || (event === null || event === void 0 ? void 0 : event.target),
                    name,
                    cached: true,
                    bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                    cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                    composed: options === null || options === void 0 ? void 0 : options.composed,
                    callback: options === null || options === void 0 ? void 0 : options.callback,
                    onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError,
                    onSuccess: (_d = this.options) === null || _d === void 0 ? void 0 : _d.onSuccess,
                });
            }
            const fn = typeof ((_e = this.options) === null || _e === void 0 ? void 0 : _e.onFetch) === "function"
                ? this.options.onFetch(endpoint, input, options)
                : ((_f = this.host) === null || _f === void 0 ? void 0 : _f.type) === "graphql"
                    ? (input === null || input === void 0 ? void 0 : input.query)
                        ? this.client.request(input === null || input === void 0 ? void 0 : input.query, input === null || input === void 0 ? void 0 : input.params, {
                            method,
                        })
                        : this.sdk[endpoint](input, options === null || options === void 0 ? void 0 : options.headers)
                    : this.client.request(endpoint, input, {
                        method,
                    });
            data = yield (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () { return fn; }), {
                endpoint,
                event,
                target: (options === null || options === void 0 ? void 0 : options.target) || ((_g = options === null || options === void 0 ? void 0 : options.event) === null || _g === void 0 ? void 0 : _g.target),
                name,
                cached: false,
                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                composed: options === null || options === void 0 ? void 0 : options.composed,
                callback: options === null || options === void 0 ? void 0 : options.callback,
                onError: (_h = this.options) === null || _h === void 0 ? void 0 : _h.onError,
                onSuccess: (_j = this.options) === null || _j === void 0 ? void 0 : _j.onSuccess,
            });
            if (!(options === null || options === void 0 ? void 0 : options.disableCache) && !this.options.disableCache) {
                console.log(`Caching ${localKey} with data: `, data);
                try {
                    yield localforage.setItem(localKey, (0, cleanFirestoreData_1.default)(data, true));
                }
                catch (e) {
                    console.log("Error setting cache: ", e);
                }
            }
            return data;
        });
    }
    submit(endpoint, input, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const event = (options === null || options === void 0 ? void 0 : options.event) || null;
            const name = (options === null || options === void 0 ? void 0 : options.name) || null;
            const method = (options === null || options === void 0 ? void 0 : options.method) || "post";
            const fn = typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onSubmit) === "function"
                ? this.options.onSubmit(endpoint, input, options)
                : ((_b = this.host) === null || _b === void 0 ? void 0 : _b.type) === "graphql"
                    ? (input === null || input === void 0 ? void 0 : input.query)
                        ? this.client.request(input.query, input.params, {
                            method,
                        })
                        : this.sdk[endpoint]((input === null || input === void 0 ? void 0 : input.params) || {
                            id: input === null || input === void 0 ? void 0 : input.id,
                            data: input === null || input === void 0 ? void 0 : input.data,
                        })
                    : this.client.request(endpoint, input, {
                        method: (input === null || input === void 0 ? void 0 : input.id) ? "put" : "post",
                    });
            return (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () { return fn; }), {
                endpoint,
                event,
                target: (options === null || options === void 0 ? void 0 : options.target) || (event === null || event === void 0 ? void 0 : event.target),
                name,
                cached: false,
                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                composed: options === null || options === void 0 ? void 0 : options.composed,
                callback: options === null || options === void 0 ? void 0 : options.callback,
                onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError,
                onSuccess: (_d = this.options) === null || _d === void 0 ? void 0 : _d.onSuccess,
            });
        });
    }
    setHeader(key, value) {
        var _a;
        if (!this.client)
            return false;
        if (!((_a = this.host) === null || _a === void 0 ? void 0 : _a.headers))
            this.host.headers = {};
        this.host.headers[key] = value;
        return this.client.setHeader(key, value);
    }
    setHeaders(headers) {
        if (!this.client)
            return false;
        return this.client.setHeaders(headers);
    }
    setConnection(nameUrlOrIndex) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        this.host = (typeof nameUrlOrIndex === "string"
            ? (((_a = this.options) === null || _a === void 0 ? void 0 : _a.connections) || []).find((connection, index) => {
                if ((connection === null || connection === void 0 ? void 0 : connection.name) === nameUrlOrIndex ||
                    (connection === null || connection === void 0 ? void 0 : connection.url) === nameUrlOrIndex) {
                    this.currentConnection = index;
                    return connection;
                }
            })
            : (_c = (_b = this.options) === null || _b === void 0 ? void 0 : _b.connections) === null || _c === void 0 ? void 0 : _c[nameUrlOrIndex]);
        if (!((_d = this.host) === null || _d === void 0 ? void 0 : _d.name))
            this.host.name = "default";
        if (!((_e = this.host) === null || _e === void 0 ? void 0 : _e.type))
            this.host.type =
                typeof ((_f = this.options) === null || _f === void 0 ? void 0 : _f.getSdk) === "function"
                    ? "graphql"
                    : ((_g = this.host) === null || _g === void 0 ? void 0 : _g.db) || ((_j = (_h = this.host) === null || _h === void 0 ? void 0 : _h.auth) === null || _j === void 0 ? void 0 : _j.databaseURL)
                        ? "firebase"
                        : "rest";
        this.host.headers = Object.assign(Object.assign({}, (((_k = this.host) === null || _k === void 0 ? void 0 : _k.headers) || {})), (((_l = this.options) === null || _l === void 0 ? void 0 : _l.headers) || {}));
        this.client =
            this.host.type === "graphql"
                ? new graphql_request_1.GraphQLClient(((_m = this.host) === null || _m === void 0 ? void 0 : _m.url) || "http://localhost:4000", {
                    headers: ((_o = this.host) === null || _o === void 0 ? void 0 : _o.headers) || {},
                })
                : ((_p = this.host) === null || _p === void 0 ? void 0 : _p.type) === "firebase"
                    ? new firestore_1.default(this.host.url, {
                        db: this.host.db,
                    })
                    : new client_1.default(this.host.url, { headers: ((_q = this.host) === null || _q === void 0 ? void 0 : _q.headers) || {} });
        this.client.setEndpoint(((_r = this.host) === null || _r === void 0 ? void 0 : _r.url) || "http://localhost:4000");
        return this.host;
    }
    uploadFile(
    /**
     * The file or Data URI to upload
     */
    file, input, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.storage)
                return;
            const path = (input === null || input === void 0 ? void 0 : input.path) || "/";
            const fileName = (input === null || input === void 0 ? void 0 : input.fileName) || (typeof file !== "string" && (file === null || file === void 0 ? void 0 : file.name));
            const storageRef = (0, storage_1.ref)(this.storage, path + fileName);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (typeof file === "string" && (file === null || file === void 0 ? void 0 : file.includes("data:"))) {
                        const { ref, metadata } = yield (0, storage_1.uploadString)(storageRef, file, "data_url");
                        resolve({ ref, metadata, url: yield (0, storage_2.getDownloadURL)(ref) });
                    }
                    else if (typeof file !== "string") {
                        const uploadTask = (0, storage_1.uploadBytesResumable)(storageRef, file);
                        const onProgress = (input === null || input === void 0 ? void 0 : input.onProgress) || this.options.onProgress;
                        const target = (options === null || options === void 0 ? void 0 : options.target) || (input === null || input === void 0 ? void 0 : input.target) || document;
                        uploadTask.on("state_changed", (snapshot) => {
                            const eventData = {
                                bubbles: true,
                                cancelable: true,
                                detail: {
                                    bubbles: true,
                                    cancelable: true,
                                    composed: false,
                                    endpoint: (options === null || options === void 0 ? void 0 : options.endpoint) || "upload",
                                    event: (input === null || input === void 0 ? void 0 : input.event) || (options === null || options === void 0 ? void 0 : options.event),
                                    method: (options === null || options === void 0 ? void 0 : options.method) || "post",
                                    name: (options === null || options === void 0 ? void 0 : options.name) || "upload",
                                    fileName,
                                    path,
                                    progress: ((snapshot === null || snapshot === void 0 ? void 0 : snapshot.bytesTransferred) || 0) /
                                        ((snapshot === null || snapshot === void 0 ? void 0 : snapshot.totalBytes) || 0),
                                    target,
                                    snapshot,
                                },
                            };
                            if (typeof onProgress === "function")
                                onProgress(eventData);
                            target.dispatchEvent(new CustomEvent("fireenjinProgress", eventData));
                        }, null, () => __awaiter(this, void 0, void 0, function* () {
                            var _a, _b;
                            const ref = (_a = uploadTask === null || uploadTask === void 0 ? void 0 : uploadTask.snapshot) === null || _a === void 0 ? void 0 : _a.ref;
                            const metadata = (_b = uploadTask === null || uploadTask === void 0 ? void 0 : uploadTask.snapshot) === null || _b === void 0 ? void 0 : _b.metadata;
                            resolve({ ref, metadata, url: yield (0, storage_2.getDownloadURL)(ref) });
                        }));
                    }
                }
                catch (e) {
                    console.log("Error uploading file: ", e);
                    reject(e);
                }
            }));
        });
    }
    watchDataAttributes() {
        document
            .querySelectorAll("[data-trigger]")
            .forEach((element) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const name = (_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.trigger;
            const eventName = ((_b = element === null || element === void 0 ? void 0 : element.dataset) === null || _b === void 0 ? void 0 : _b.triggerOn) || "click";
            const payload = ((_c = element === null || element === void 0 ? void 0 : element.dataset) === null || _c === void 0 ? void 0 : _c.triggerPayload)
                ? JSON.parse((_d = element === null || element === void 0 ? void 0 : element.dataset) === null || _d === void 0 ? void 0 : _d.triggerPayload)
                : {};
            const bubbles = (_g = (((_e = element === null || element === void 0 ? void 0 : element.dataset) === null || _e === void 0 ? void 0 : _e.bubbles) &&
                ((_f = element === null || element === void 0 ? void 0 : element.dataset) === null || _f === void 0 ? void 0 : _f.bubbles) !== "false")) !== null && _g !== void 0 ? _g : true;
            const cancelable = (_k = (((_h = element === null || element === void 0 ? void 0 : element.dataset) === null || _h === void 0 ? void 0 : _h.cancelable) &&
                ((_j = element === null || element === void 0 ? void 0 : element.dataset) === null || _j === void 0 ? void 0 : _j.cancelable) !== "false")) !== null && _k !== void 0 ? _k : true;
            element.addEventListener(eventName, (event) => {
                element.dispatchEvent(new CustomEvent("fireenjinTrigger", {
                    bubbles,
                    cancelable,
                    detail: {
                        event,
                        name,
                        payload,
                    },
                }));
            });
        }));
        document.querySelectorAll("[data-fetch]").forEach((element) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const url = (_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.fetch;
            const fetchParams = ((_c = (_b = element === null || element === void 0 ? void 0 : element.dataset) === null || _b === void 0 ? void 0 : _b.fetchParams) === null || _c === void 0 ? void 0 : _c.includes("{")) &&
                JSON.parse((_d = element === null || element === void 0 ? void 0 : element.dataset) === null || _d === void 0 ? void 0 : _d.fetchParams);
            const fetchOptions = ((_f = (_e = element === null || element === void 0 ? void 0 : element.dataset) === null || _e === void 0 ? void 0 : _e.fetchOptions) === null || _f === void 0 ? void 0 : _f.includes("{")) &&
                JSON.parse((_g = element === null || element === void 0 ? void 0 : element.dataset) === null || _g === void 0 ? void 0 : _g.fetchOptions);
            let res;
            const stateKey = (_h = element === null || element === void 0 ? void 0 : element.dataset) === null || _h === void 0 ? void 0 : _h.state;
            const signalKey = ((_j = element === null || element === void 0 ? void 0 : element.dataset) === null || _j === void 0 ? void 0 : _j.signal) || `state:${stateKey}`;
            const eventName = (_k = element === null || element === void 0 ? void 0 : element.dataset) === null || _k === void 0 ? void 0 : _k.triggerOn;
            const subscribeBind = () => __awaiter(this, void 0, void 0, function* () {
                res = yield this.fetch(url, fetchParams, fetchOptions);
                this.subscribe(signalKey, () => {
                    Object.keys(element.dataset).forEach((key) => {
                        if (key.includes("bind")) {
                            let propName = (0, firstToLowerCase_1.default)(key.replace("bind", ""));
                            if (propName === "innerHtml")
                                propName = "innerHTML";
                            if (propName === "outerHtml")
                                propName = "outerHTML";
                            const value = (0, getByPath_1.default)(this.state[stateKey], element.dataset[key]);
                            element[propName] = value;
                        }
                        return;
                    });
                });
            });
            eventName
                ? document.addEventListener(eventName, () => subscribeBind())
                : subscribeBind();
            if (typeof stateKey === "string")
                (0, setByPath_1.default)(this.state, stateKey, res);
        }));
        document
            .querySelectorAll("[data-signal],[data-state]")
            .forEach((element) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const stateKey = (_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.state;
            const signalKey = ((_b = element === null || element === void 0 ? void 0 : element.dataset) === null || _b === void 0 ? void 0 : _b.signal) || `state:${stateKey}`;
            this.subscribe(signalKey, () => {
                var _a;
                Object.keys(element.dataset).forEach((key) => {
                    var _a;
                    if (key.includes("bind")) {
                        let propName = (0, firstToLowerCase_1.default)(key.replace("bind", ""));
                        if (propName === "innerHtml")
                            propName = "innerHTML";
                        if (propName === "outerHtml")
                            propName = "outerHTML";
                        if ((_a = this.state) === null || _a === void 0 ? void 0 : _a[stateKey])
                            element[propName] = (0, getByPath_1.default)(this.state[stateKey], element.dataset[key]);
                    }
                    return;
                });
                const subscriptionDetails = {
                    bubbles: true,
                    cancelable: true,
                    composed: false,
                    data: {
                        state: this.state,
                        signal: this.signals[signalKey],
                        timestamp: new Date(),
                    },
                    signalKey,
                };
                if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onSubscription) === "function")
                    this.options.onSubscription(subscriptionDetails);
                (0, subscription_1.default)(subscriptionDetails);
            }, true);
        }));
    }
}
exports.default = FireEnjin;
