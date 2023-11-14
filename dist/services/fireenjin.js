"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var localforage = require("localforage");
var graphql_request_1 = require("graphql-request");
var storage_1 = require("@firebase/storage");
var tryOrFail_1 = require("../helpers/tryOrFail");
var client_1 = require("./client");
var database_1 = require("./database");
var firestore_1 = require("./firestore");
var storage_2 = require("firebase/storage");
var firstToLowerCase_1 = require("../helpers/firstToLowerCase");
var getByPath_1 = require("../helpers/getByPath");
var setByPath_1 = require("../helpers/setByPath");
var subscription_1 = require("../events/subscription");
var FireEnjin = /** @class */ (function () {
    function FireEnjin(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        this.sdk = {};
        this.host = {
            url: "http://localhost:4000",
        };
        this.currentConnection = 0;
        this.state = {};
        this.signals = {};
        this.options = options || {};
        var headers = __assign({ Authorization: (options === null || options === void 0 ? void 0 : options.token) ? "Bearer ".concat(options.token) : "" }, (options.headers ? options.headers : {}));
        this.host = ((_a = options === null || options === void 0 ? void 0 : options.connections) === null || _a === void 0 ? void 0 : _a.length)
            ? this.setConnection(0)
            : {
                url: options.host,
                type: "rest",
                headers: headers,
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
            get: function (proxyTarget, stateKey, receiver) {
                var _a, _b;
                var value = Reflect.get(proxyTarget, stateKey, receiver);
                if (_this.currentSignal !== undefined) {
                    _this.signals["state:".concat(stateKey)].add(_this.currentSignal);
                }
                var detail = {
                    receiver: receiver,
                    proxyTarget: proxyTarget,
                    stateKey: stateKey,
                    value: value,
                };
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateRead", {
                        detail: detail,
                    }));
                if ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinStateRead:", detail);
                if (typeof ((_b = _this.options) === null || _b === void 0 ? void 0 : _b.onStateRead) === "function")
                    return _this.options.onStateRead(detail);
                return value;
            },
            set: function (proxyTarget, stateKey, value, receiver) {
                var _a, _b, _c, _d, _e;
                var signalKey = "state:".concat(stateKey);
                var detail = {
                    receiver: receiver,
                    proxyTarget: proxyTarget,
                    state: _this.state,
                    stateKey: stateKey,
                    value: value,
                };
                if ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinStateChange: ", detail);
                if (typeof ((_b = _this.options) === null || _b === void 0 ? void 0 : _b.onStateChange) === "function")
                    return _this.options.onStateChange(detail);
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateChange", {
                        detail: detail,
                    }));
                var reflection = Reflect.set(proxyTarget, stateKey, value, receiver);
                if (_this.signals[signalKey])
                    _this.signals[signalKey].forEach(function (fn) {
                        return fn({ value: value, stateKey: stateKey, state: _this.state, signalKey: signalKey });
                    });
                if (options === null || options === void 0 ? void 0 : options.autoBindAttributes)
                    (_e = (_d = (_c = document === null || document === void 0 ? void 0 : document.querySelectorAll) === null || _c === void 0 ? void 0 : _c.call(document, "[data-state]")) === null || _d === void 0 ? void 0 : _d.forEach) === null || _e === void 0 ? void 0 : _e.call(_d, function (element) { return __awaiter(_this, void 0, void 0, function () {
                        var stateKey;
                        var _this = this;
                        var _a;
                        return __generator(this, function (_b) {
                            stateKey = (_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.state;
                            Object.keys(element.dataset).forEach(function (key) {
                                if (key.includes("bind")) {
                                    var propName = (0, firstToLowerCase_1.default)(key.replace("bind", ""));
                                    if (propName === "innerHtml")
                                        propName = "innerHTML";
                                    if (propName === "outerHtml")
                                        propName = "outerHTML";
                                    element[propName] = (0, getByPath_1.default)(_this.state[stateKey], element.dataset[key]);
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); });
                return reflection;
            },
            deleteProperty: function (proxyTarget, stateKey) {
                var _a, _b, _c, _d, _e;
                var detail = {
                    state: _this.state,
                    proxyTarget: proxyTarget,
                    stateKey: stateKey,
                    value: undefined,
                };
                if ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinStateChange: ", detail);
                if (typeof ((_b = _this.options) === null || _b === void 0 ? void 0 : _b.onStateChange) === "function")
                    return _this.options.onStateChange(detail);
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateChange", {
                        detail: detail,
                    }));
                if (_this.signals["state:".concat(stateKey)])
                    _this.clearSignal("state:".concat(stateKey));
                if (!(stateKey in proxyTarget))
                    return false;
                delete proxyTarget[stateKey];
                if (options === null || options === void 0 ? void 0 : options.autoBindAttributes)
                    (_e = (_d = (_c = document === null || document === void 0 ? void 0 : document.querySelectorAll) === null || _c === void 0 ? void 0 : _c.call(document, "[data-state]")) === null || _d === void 0 ? void 0 : _d.forEach) === null || _e === void 0 ? void 0 : _e.call(_d, function (element) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            Object.keys(element.dataset).forEach(function (key) {
                                if (key.includes("bind")) {
                                    var propName = (0, firstToLowerCase_1.default)(key.replace("bind", ""));
                                    if (propName === "innerHtml")
                                        propName = "innerHTML";
                                    if (propName === "outerHtml")
                                        propName = "outerHTML";
                                    element[propName] = null;
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); });
                return true;
            },
        });
        if ((_p = this.options) === null || _p === void 0 ? void 0 : _p.debug)
            console.log("fireenjinStart:", {
                host: this.host,
                headers: headers,
                storage: this.storage,
                client: this.client,
                sdk: this.sdk,
            });
        if (document) {
            document.addEventListener("fireenjinUpload", this.onUpload.bind(this));
            document.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
            document.addEventListener("fireenjinFetch", this.onFetch.bind(this));
            document.addEventListener("fireenjinSubscribe", this.onSubscribe.bind(this));
            if (options === null || options === void 0 ? void 0 : options.autoBindAttributes)
                document.addEventListener("DOMContentLoaded", function () {
                    _this.watchDataAttributes();
                    var oldHref = document.location.href;
                    var body = document.querySelector("body");
                    var observer = new MutationObserver(function (mutations) {
                        if (oldHref !== document.location.href) {
                            oldHref = document.location.href;
                            _this.watchDataAttributes();
                        }
                    });
                    observer.observe(body, { childList: true, subtree: true });
                }, false);
            if (options === null || options === void 0 ? void 0 : options.debug) {
                document.addEventListener("fireenjinSuccess", function (event) {
                    console.log("fireenjinSuccess: ", event);
                });
                document.addEventListener("fireenjinError", function (event) {
                    console.log("fireenjinError: ", event);
                });
                document.addEventListener("fireenjinTrigger", function (event) {
                    console.log("fireenjinTrigger: ", event);
                });
                document.addEventListener("fireenjinReset", function (event) {
                    console.log("fireenjinReset: ", event);
                });
                document.addEventListener("fireenjinValidation", function (event) {
                    console.log("fireenjinValidation: ", event);
                });
                document.addEventListener("fireenjinProgress", function (event) {
                    console.log("fireenjinProgress: ", event);
                });
            }
        }
    }
    FireEnjin.prototype.onUpload = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                            console.log("fireenjinUpload: ", event);
                        if (typeof ((_b = this.options) === null || _b === void 0 ? void 0 : _b.onUpload) === "function")
                            return [2 /*return*/, this.options.onUpload(event)];
                        return [4 /*yield*/, this.upload({
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
                                event: event,
                                target: ((_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.target) || (event === null || event === void 0 ? void 0 : event.target),
                                name: (_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.name,
                                endpoint: (_m = event === null || event === void 0 ? void 0 : event.detail) === null || _m === void 0 ? void 0 : _m.endpoint,
                                bubbles: (_o = event === null || event === void 0 ? void 0 : event.detail) === null || _o === void 0 ? void 0 : _o.bubbles,
                                cancelable: (_p = event === null || event === void 0 ? void 0 : event.detail) === null || _p === void 0 ? void 0 : _p.cancelable,
                                composed: (_q = event === null || event === void 0 ? void 0 : event.detail) === null || _q === void 0 ? void 0 : _q.composed,
                                method: (_r = event === null || event === void 0 ? void 0 : event.detail) === null || _r === void 0 ? void 0 : _r.method,
                            })];
                    case 1:
                        data = _s.sent();
                        if (event === null || event === void 0 ? void 0 : event.target)
                            event.target.value = (data === null || data === void 0 ? void 0 : data.url) || null;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    FireEnjin.prototype.onSubmit = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function () {
            var target;
            return __generator(this, function (_m) {
                if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinSubmit: ", event);
                if (!event ||
                    !event.detail ||
                    !event.detail.endpoint ||
                    event.detail.disableSubmit)
                    return [2 /*return*/, false];
                target = ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.target) || (event === null || event === void 0 ? void 0 : event.target);
                return [2 /*return*/, this.submit(event.detail.endpoint, {
                        id: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.id,
                        data: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.data,
                        params: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.params,
                        query: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.query,
                    }, {
                        event: event,
                        target: target,
                        name: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.name,
                        bubbles: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.bubbles,
                        cancelable: (_j = event === null || event === void 0 ? void 0 : event.detail) === null || _j === void 0 ? void 0 : _j.cancelable,
                        composed: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.composed,
                        method: ((_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.method) || (target === null || target === void 0 ? void 0 : target.method),
                    })];
            });
        });
    };
    FireEnjin.prototype.onFetch = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function () {
            var target;
            return __generator(this, function (_m) {
                if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinFetch: ", event);
                if (!event ||
                    !event.detail ||
                    !event.detail.endpoint ||
                    event.detail.disableFetch)
                    return [2 /*return*/, false];
                target = ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.target) || (event === null || event === void 0 ? void 0 : event.target);
                return [2 /*return*/, this.fetch(event.detail.endpoint, ((_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.params) || {}, {
                        event: event,
                        target: target,
                        dataPropsMap: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.dataPropsMap,
                        name: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.name,
                        cacheKey: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.cacheKey,
                        disableCache: !!((_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.disableCache),
                        bubbles: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.bubbles,
                        cancelable: (_j = event === null || event === void 0 ? void 0 : event.detail) === null || _j === void 0 ? void 0 : _j.cancelable,
                        composed: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.composed,
                        method: ((_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.method) || (target === null || target === void 0 ? void 0 : target.method),
                    })];
            });
        });
    };
    FireEnjin.prototype.onSubscribe = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __awaiter(this, void 0, void 0, function () {
            var signalKey, subscriptionDetails, collectionName;
            var _this = this;
            return __generator(this, function (_u) {
                if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("fireenjinSubscribe: ", event);
                signalKey = ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.signalKey) || ((_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.endpoint);
                subscriptionDetails = {
                    bubbles: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.bubbles,
                    cancelable: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.cancelable,
                    composed: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.composed,
                    data: null,
                    dataPropsMap: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.dataPropsMap,
                    endpoint: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.endpoint,
                    event: event,
                    name: (_j = event === null || event === void 0 ? void 0 : event.detail) === null || _j === void 0 ? void 0 : _j.name,
                    params: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.params,
                    query: (_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.query,
                    signalKey: signalKey,
                    target: (_m = event === null || event === void 0 ? void 0 : event.detail) === null || _m === void 0 ? void 0 : _m.target,
                };
                if (signalKey) {
                    this.subscribe(signalKey, function () {
                        var _a, _b, _c;
                        subscriptionDetails.data = {
                            state: _this.state,
                            signal: _this.signals[signalKey],
                            timestamp: new Date(),
                        };
                        if (typeof ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.onSubscription) === "function")
                            _this.options.onSubscription(subscriptionDetails);
                        if (typeof ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.callback) === "function")
                            (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.callback(subscriptionDetails);
                        (0, subscription_1.default)(subscriptionDetails);
                    });
                }
                else {
                    collectionName = ((_o = event === null || event === void 0 ? void 0 : event.detail) === null || _o === void 0 ? void 0 : _o.collection) || ((_p = event === null || event === void 0 ? void 0 : event.detail) === null || _p === void 0 ? void 0 : _p.endpoint);
                    (_s = (_r = (_q = this.host) === null || _q === void 0 ? void 0 : _q.db) === null || _r === void 0 ? void 0 : _r.subscribe) === null || _s === void 0 ? void 0 : _s.call(_r, __assign({ collectionName: collectionName }, (_t = event === null || event === void 0 ? void 0 : event.detail) === null || _t === void 0 ? void 0 : _t.query), function (data) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            subscriptionDetails.data = data;
                            if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onSubscription) === "function")
                                this.options.onSubscription(subscriptionDetails);
                            if (typeof ((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.callback) === "function")
                                (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.callback(subscriptionDetails);
                            (0, subscription_1.default)(subscriptionDetails);
                            return [2 /*return*/];
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    FireEnjin.prototype.subscribe = function (signalKey, signal) {
        if (!this.signals[signalKey])
            this.signals[signalKey] = new Set();
        this.signals[signalKey].add(signal);
        return signal;
    };
    FireEnjin.prototype.unsubscribe = function (signalKey, signal) {
        if (this.signals[signalKey])
            this.signals[signalKey].delete(signal);
        return this.signals[signalKey];
    };
    FireEnjin.prototype.sendSignal = function (signalKey, data) {
        if (this.signals[signalKey]) {
            this.signals[signalKey].forEach(function (signal) { return signal(data); });
        }
    };
    FireEnjin.prototype.createSignal = function (initialValue, signalKey, saveToState, stateKey) {
        var _this = this;
        var value = initialValue;
        var state = stateKey || signalKey;
        var key = signalKey ||
            (saveToState && "state:".concat(state)) ||
            "signal:".concat(Math.random());
        if (!this.signals[key])
            this.signals[key] = new Set();
        var read = function () {
            if (_this.currentSignal !== undefined) {
                _this.signals[key].add(_this.currentSignal);
            }
            return value;
        };
        var write = function (newValue) {
            value = newValue;
            if (saveToState && state)
                _this.state[state] = value;
            _this.signals[key].forEach(function (fn) {
                return fn({
                    value: value,
                    signalKey: key,
                    state: _this.state,
                    stateKey: state,
                });
            });
        };
        return [read, write, key];
    };
    FireEnjin.prototype.createEffect = function (callback) {
        this.currentSignal = callback;
        callback();
        this.currentSignal = undefined;
    };
    FireEnjin.prototype.createEffectPromise = function (callback) {
        var _this = this;
        this.currentSignal = callback;
        callback().then(function () { return (_this.currentSignal = undefined); });
    };
    FireEnjin.prototype.clearSignal = function (signalKey) {
        if (signalKey && this.signals[signalKey])
            delete this.signals[signalKey];
        if (!signalKey)
            this.signals = {};
        return this.signals;
    };
    FireEnjin.prototype.hash = function (input) {
        var hash = 0, i, chr;
        if (input.length === 0)
            return hash;
        for (i = 0; i < input.length; i++) {
            chr = input.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    FireEnjin.prototype.upload = function (input, options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, method, target;
            var _this = this;
            return __generator(this, function (_d) {
                endpoint = (options === null || options === void 0 ? void 0 : options.endpoint) || "upload";
                method = (options === null || options === void 0 ? void 0 : options.method) || "post";
                target = (options === null || options === void 0 ? void 0 : options.target) || ((_a = options === null || options === void 0 ? void 0 : options.event) === null || _a === void 0 ? void 0 : _a.target) || document;
                return [2 /*return*/, (0, tryOrFail_1.default)(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c, _d, _e, _f;
                        return __generator(this, function (_g) {
                            return [2 /*return*/, this.storage
                                    ? this.uploadFile((_a = input === null || input === void 0 ? void 0 : input.data) === null || _a === void 0 ? void 0 : _a.file, {
                                        fileName: (_b = input === null || input === void 0 ? void 0 : input.data) === null || _b === void 0 ? void 0 : _b.fileName,
                                        path: (_c = input === null || input === void 0 ? void 0 : input.data) === null || _c === void 0 ? void 0 : _c.path,
                                        target: target,
                                    }, options)
                                    : ((_d = this.host) === null || _d === void 0 ? void 0 : _d.type) === "graphql" && !((_e = this.options) === null || _e === void 0 ? void 0 : _e.uploadUrl)
                                        ? (input === null || input === void 0 ? void 0 : input.query)
                                            ? this.client.request(input.query, input.params, {
                                                method: method,
                                            })
                                            : this.sdk[endpoint]((input === null || input === void 0 ? void 0 : input.params) || {
                                                id: input === null || input === void 0 ? void 0 : input.id,
                                                data: input === null || input === void 0 ? void 0 : input.data,
                                            })
                                        : this.client.request(((_f = this.options) === null || _f === void 0 ? void 0 : _f.uploadUrl) || endpoint, input, {
                                            method: method,
                                        })];
                        });
                    }); }, {
                        event: (options === null || options === void 0 ? void 0 : options.event) || null,
                        target: target,
                        name: (options === null || options === void 0 ? void 0 : options.name) || endpoint,
                        bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                        cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                        composed: options === null || options === void 0 ? void 0 : options.composed,
                        endpoint: endpoint,
                        cached: true,
                        onError: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onError,
                        onSuccess: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onSuccess,
                    })];
            });
        });
    };
    FireEnjin.prototype.fetch = function (endpoint, input, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var data, event, name, method, localKey, localData, _k, fn, _l;
            var _this = this;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        data = null;
                        event = (options === null || options === void 0 ? void 0 : options.event) || null;
                        name = (options === null || options === void 0 ? void 0 : options.name) || null;
                        method = (options === null || options === void 0 ? void 0 : options.method) || "get";
                        localKey = (input === null || input === void 0 ? void 0 : input.collection) ||
                            ((options === null || options === void 0 ? void 0 : options.cacheKey)
                                ? options.cacheKey
                                : "".concat(((_a = this.options) === null || _a === void 0 ? void 0 : _a.cachePrefix) ? this.options.cachePrefix : "").concat(endpoint, "_").concat((input === null || input === void 0 ? void 0 : input.id)
                                    ? "".concat(input.id, ":")
                                    : (input === null || input === void 0 ? void 0 : input.params)
                                        ? this.hash(JSON.stringify(Object.values(input.params)))
                                        : "").concat(this.hash(JSON.stringify(input || {}))));
                        localData = null;
                        _m.label = 1;
                    case 1:
                        _m.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ((_b = localforage === null || localforage === void 0 ? void 0 : localforage.getItem) === null || _b === void 0 ? void 0 : _b.call(localforage, localKey))];
                    case 2:
                        localData = (_m.sent()) || null;
                        if (localData && (input === null || input === void 0 ? void 0 : input.id) && (input === null || input === void 0 ? void 0 : input.collection))
                            localData = localData === null || localData === void 0 ? void 0 : localData[input.id];
                        return [3 /*break*/, 4];
                    case 3:
                        _k = _m.sent();
                        console.log("No Local data found");
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(localData && !(options === null || options === void 0 ? void 0 : options.disableCache))) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, tryOrFail_1.default)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, localData];
                            }); }); }, {
                                endpoint: endpoint,
                                event: event,
                                target: (options === null || options === void 0 ? void 0 : options.target) || (event === null || event === void 0 ? void 0 : event.target),
                                name: name,
                                cached: true,
                                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                                composed: options === null || options === void 0 ? void 0 : options.composed,
                                onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError,
                                onSuccess: (_d = this.options) === null || _d === void 0 ? void 0 : _d.onSuccess,
                            })];
                    case 5:
                        data = _m.sent();
                        _m.label = 6;
                    case 6:
                        fn = typeof ((_e = this.options) === null || _e === void 0 ? void 0 : _e.onFetch) === "function"
                            ? this.options.onFetch(endpoint, input, options)
                            : ((_f = this.host) === null || _f === void 0 ? void 0 : _f.type) === "graphql"
                                ? (input === null || input === void 0 ? void 0 : input.query)
                                    ? this.client.request(input === null || input === void 0 ? void 0 : input.query, input === null || input === void 0 ? void 0 : input.params, {
                                        method: method,
                                    })
                                    : this.sdk[endpoint](input, options === null || options === void 0 ? void 0 : options.headers)
                                : this.client.request(endpoint, input, {
                                    method: method,
                                });
                        return [4 /*yield*/, (0, tryOrFail_1.default)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, fn];
                            }); }); }, {
                                endpoint: endpoint,
                                event: event,
                                target: (options === null || options === void 0 ? void 0 : options.target) || ((_g = options === null || options === void 0 ? void 0 : options.event) === null || _g === void 0 ? void 0 : _g.target),
                                name: name,
                                cached: false,
                                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                                composed: options === null || options === void 0 ? void 0 : options.composed,
                                onError: (_h = this.options) === null || _h === void 0 ? void 0 : _h.onError,
                                onSuccess: (_j = this.options) === null || _j === void 0 ? void 0 : _j.onSuccess,
                            })];
                    case 7:
                        data = _m.sent();
                        if (!!(options === null || options === void 0 ? void 0 : options.disableCache)) return [3 /*break*/, 11];
                        _m.label = 8;
                    case 8:
                        _m.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, localforage.setItem(localKey, data)];
                    case 9:
                        _m.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        _l = _m.sent();
                        console.log("No Local data found");
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/, data];
                }
            });
        });
    };
    FireEnjin.prototype.submit = function (endpoint, input, options) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var event, name, method, fn;
            var _this = this;
            return __generator(this, function (_e) {
                event = (options === null || options === void 0 ? void 0 : options.event) || null;
                name = (options === null || options === void 0 ? void 0 : options.name) || null;
                method = (options === null || options === void 0 ? void 0 : options.method) || "post";
                fn = typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onSubmit) === "function"
                    ? this.options.onSubmit(endpoint, input, options)
                    : ((_b = this.host) === null || _b === void 0 ? void 0 : _b.type) === "graphql"
                        ? (input === null || input === void 0 ? void 0 : input.query)
                            ? this.client.request(input.query, input.params, {
                                method: method,
                            })
                            : this.sdk[endpoint]((input === null || input === void 0 ? void 0 : input.params) || {
                                id: input === null || input === void 0 ? void 0 : input.id,
                                data: input === null || input === void 0 ? void 0 : input.data,
                            })
                        : this.client.request(endpoint, input, {
                            method: (input === null || input === void 0 ? void 0 : input.id) ? "put" : "post",
                        });
                return [2 /*return*/, (0, tryOrFail_1.default)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, fn];
                    }); }); }, {
                        endpoint: endpoint,
                        event: event,
                        target: (options === null || options === void 0 ? void 0 : options.target) || (event === null || event === void 0 ? void 0 : event.target),
                        name: name,
                        cached: false,
                        bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                        cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                        composed: options === null || options === void 0 ? void 0 : options.composed,
                        onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError,
                        onSuccess: (_d = this.options) === null || _d === void 0 ? void 0 : _d.onSuccess,
                    })];
            });
        });
    };
    FireEnjin.prototype.setHeader = function (key, value) {
        var _a;
        if (!this.client)
            return false;
        if (!((_a = this.host) === null || _a === void 0 ? void 0 : _a.headers))
            this.host.headers = {};
        this.host.headers[key] = value;
        return this.client.setHeader(key, value);
    };
    FireEnjin.prototype.setHeaders = function (headers) {
        if (!this.client)
            return false;
        return this.client.setHeaders(headers);
    };
    FireEnjin.prototype.setConnection = function (nameUrlOrIndex) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        this.host = (typeof nameUrlOrIndex === "string"
            ? (((_a = this.options) === null || _a === void 0 ? void 0 : _a.connections) || []).find(function (connection, index) {
                if ((connection === null || connection === void 0 ? void 0 : connection.name) === nameUrlOrIndex ||
                    (connection === null || connection === void 0 ? void 0 : connection.url) === nameUrlOrIndex) {
                    _this.currentConnection = index;
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
        this.host.headers = __assign(__assign({}, (((_k = this.host) === null || _k === void 0 ? void 0 : _k.headers) || {})), (((_l = this.options) === null || _l === void 0 ? void 0 : _l.headers) || {}));
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
    };
    FireEnjin.prototype.uploadFile = function (
    /**
     * The file or Data URI to upload
     */
    file, input, options) {
        return __awaiter(this, void 0, void 0, function () {
            var path, fileName, storageRef;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.storage)
                    return [2 /*return*/];
                path = (input === null || input === void 0 ? void 0 : input.path) || "/";
                fileName = (input === null || input === void 0 ? void 0 : input.fileName) || (typeof file !== "string" && (file === null || file === void 0 ? void 0 : file.name));
                storageRef = (0, storage_1.ref)(this.storage, path + fileName);
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, ref_1, metadata, _b, uploadTask_1, onProgress_1, target_1, e_1;
                        var _c;
                        var _this = this;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 5, , 6]);
                                    if (!(typeof file === "string" && (file === null || file === void 0 ? void 0 : file.includes("data:")))) return [3 /*break*/, 3];
                                    return [4 /*yield*/, (0, storage_1.uploadString)(storageRef, file, "data_url")];
                                case 1:
                                    _a = _d.sent(), ref_1 = _a.ref, metadata = _a.metadata;
                                    _b = resolve;
                                    _c = { ref: ref_1, metadata: metadata };
                                    return [4 /*yield*/, (0, storage_2.getDownloadURL)(ref_1)];
                                case 2:
                                    _b.apply(void 0, [(_c.url = _d.sent(), _c)]);
                                    return [3 /*break*/, 4];
                                case 3:
                                    if (typeof file !== "string") {
                                        uploadTask_1 = (0, storage_1.uploadBytesResumable)(storageRef, file);
                                        onProgress_1 = (input === null || input === void 0 ? void 0 : input.onProgress) || this.options.onProgress;
                                        target_1 = (options === null || options === void 0 ? void 0 : options.target) || (input === null || input === void 0 ? void 0 : input.target) || document;
                                        uploadTask_1.on("state_changed", function (snapshot) {
                                            var eventData = {
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
                                                    fileName: fileName,
                                                    path: path,
                                                    progress: ((snapshot === null || snapshot === void 0 ? void 0 : snapshot.bytesTransferred) || 0) /
                                                        ((snapshot === null || snapshot === void 0 ? void 0 : snapshot.totalBytes) || 0),
                                                    target: target_1,
                                                    snapshot: snapshot,
                                                },
                                            };
                                            if (typeof onProgress_1 === "function")
                                                onProgress_1(eventData);
                                            target_1.dispatchEvent(new CustomEvent("fireenjinProgress", eventData));
                                        }, null, function () { return __awaiter(_this, void 0, void 0, function () {
                                            var ref, metadata, _a;
                                            var _b;
                                            var _c, _d;
                                            return __generator(this, function (_e) {
                                                switch (_e.label) {
                                                    case 0:
                                                        ref = (_c = uploadTask_1 === null || uploadTask_1 === void 0 ? void 0 : uploadTask_1.snapshot) === null || _c === void 0 ? void 0 : _c.ref;
                                                        metadata = (_d = uploadTask_1 === null || uploadTask_1 === void 0 ? void 0 : uploadTask_1.snapshot) === null || _d === void 0 ? void 0 : _d.metadata;
                                                        _a = resolve;
                                                        _b = { ref: ref, metadata: metadata };
                                                        return [4 /*yield*/, (0, storage_2.getDownloadURL)(ref)];
                                                    case 1:
                                                        _a.apply(void 0, [(_b.url = _e.sent(), _b)]);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                    _d.label = 4;
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    e_1 = _d.sent();
                                    console.log("Error uploading file: ", e_1);
                                    reject(e_1);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FireEnjin.prototype.watchDataAttributes = function () {
        var _this = this;
        document
            .querySelectorAll("[data-trigger]")
            .forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
            var name, eventName, payload;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                name = (_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.trigger;
                eventName = ((_b = element === null || element === void 0 ? void 0 : element.dataset) === null || _b === void 0 ? void 0 : _b.triggerOn) || "click";
                payload = ((_c = element === null || element === void 0 ? void 0 : element.dataset) === null || _c === void 0 ? void 0 : _c.triggerPayload)
                    ? JSON.parse((_d = element === null || element === void 0 ? void 0 : element.dataset) === null || _d === void 0 ? void 0 : _d.triggerPayload)
                    : {};
                element.addEventListener(eventName, function (event) {
                    element.dispatchEvent(new CustomEvent("fireenjinTrigger", {
                        detail: {
                            event: event,
                            name: name,
                            payload: payload,
                        },
                    }));
                });
                return [2 /*return*/];
            });
        }); });
        document.querySelectorAll("[data-fetch]").forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
            var url, fetchParams, fetchOptions, res, stateKey, signalKey, eventName, subscribeBind;
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                url = (_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.fetch;
                fetchParams = ((_c = (_b = element === null || element === void 0 ? void 0 : element.dataset) === null || _b === void 0 ? void 0 : _b.fetchParams) === null || _c === void 0 ? void 0 : _c.includes("{")) &&
                    JSON.parse((_d = element === null || element === void 0 ? void 0 : element.dataset) === null || _d === void 0 ? void 0 : _d.fetchParams);
                fetchOptions = ((_f = (_e = element === null || element === void 0 ? void 0 : element.dataset) === null || _e === void 0 ? void 0 : _e.fetchOptions) === null || _f === void 0 ? void 0 : _f.includes("{")) &&
                    JSON.parse((_g = element === null || element === void 0 ? void 0 : element.dataset) === null || _g === void 0 ? void 0 : _g.fetchOptions);
                stateKey = (_h = element === null || element === void 0 ? void 0 : element.dataset) === null || _h === void 0 ? void 0 : _h.state;
                signalKey = ((_j = element === null || element === void 0 ? void 0 : element.dataset) === null || _j === void 0 ? void 0 : _j.signal) || "state:".concat(stateKey);
                eventName = (_k = element === null || element === void 0 ? void 0 : element.dataset) === null || _k === void 0 ? void 0 : _k.triggerOn;
                subscribeBind = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.fetch(url, fetchParams, fetchOptions)];
                            case 1:
                                res = _a.sent();
                                this.subscribe(signalKey, function () {
                                    Object.keys(element.dataset).forEach(function (key) {
                                        if (key.includes("bind")) {
                                            var propName = (0, firstToLowerCase_1.default)(key.replace("bind", ""));
                                            if (propName === "innerHtml")
                                                propName = "innerHTML";
                                            if (propName === "outerHtml")
                                                propName = "outerHTML";
                                            var value = (0, getByPath_1.default)(_this.state[stateKey], element.dataset[key]);
                                            element[propName] = value;
                                        }
                                        return;
                                    });
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                eventName
                    ? document.addEventListener(eventName, function () { return subscribeBind(); })
                    : subscribeBind();
                if (typeof stateKey === "string")
                    (0, setByPath_1.default)(this.state, stateKey, res);
                return [2 /*return*/];
            });
        }); });
        document
            .querySelectorAll("[data-signal],[data-state]")
            .forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
            var stateKey, signalKey;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                stateKey = (_a = element === null || element === void 0 ? void 0 : element.dataset) === null || _a === void 0 ? void 0 : _a.state;
                signalKey = ((_b = element === null || element === void 0 ? void 0 : element.dataset) === null || _b === void 0 ? void 0 : _b.signal) || "state:".concat(stateKey);
                this.subscribe(signalKey, function () {
                    var _a;
                    Object.keys(element.dataset).forEach(function (key) {
                        var _a;
                        if (key.includes("bind")) {
                            var propName = (0, firstToLowerCase_1.default)(key.replace("bind", ""));
                            if (propName === "innerHtml")
                                propName = "innerHTML";
                            if (propName === "outerHtml")
                                propName = "outerHTML";
                            if ((_a = _this.state) === null || _a === void 0 ? void 0 : _a[stateKey])
                                element[propName] = (0, getByPath_1.default)(_this.state[stateKey], element.dataset[key]);
                        }
                        return;
                    });
                    var subscriptionDetails = {
                        bubbles: true,
                        cancelable: true,
                        composed: false,
                        data: {
                            state: _this.state,
                            signal: _this.signals[signalKey],
                            timestamp: new Date(),
                        },
                        signalKey: signalKey,
                    };
                    if (typeof ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.onSubscription) === "function")
                        _this.options.onSubscription(subscriptionDetails);
                    (0, subscription_1.default)(subscriptionDetails);
                });
                return [2 /*return*/];
            });
        }); });
    };
    return FireEnjin;
}());
exports.default = FireEnjin;
