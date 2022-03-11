"use strict";
/* TODO Add typings to fetch and submit
 * @example (keyof ReturnType<typeof getSdk>)
 */
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
const tryOrFail_1 = __importDefault(require("../helpers/tryOrFail"));
const client_1 = __importDefault(require("./client"));
const database_1 = __importDefault(require("./database"));
const firestore_1 = __importDefault(require("./firestore"));
class FireEnjin {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.sdk = {};
        this.host = {
            url: "http://localhost:4000",
        };
        this.currentConnection = 0;
        this.options = options || {};
        const headers = Object.assign({ Authorization: (options === null || options === void 0 ? void 0 : options.token) ? `Bearer ${options.token}` : "" }, (options.headers ? options.headers : {}));
        this.host = ((_a = options === null || options === void 0 ? void 0 : options.connections) === null || _a === void 0 ? void 0 : _a.length)
            ? this.setConnection(0)
            : {
                url: options.host,
                type: "rest",
                headers,
            };
        this.client =
            this.host.type === "graphql"
                ? new graphql_request_1.GraphQLClient(((_b = this.host) === null || _b === void 0 ? void 0 : _b.url) || "http://localhost:4000", {
                    headers: ((_c = this.host) === null || _c === void 0 ? void 0 : _c.headers) || {},
                })
                : ((_d = this.host) === null || _d === void 0 ? void 0 : _d.type) === "firebase"
                    ? new firestore_1.default(this.host.url, {
                        db: ((_e = this.host) === null || _e === void 0 ? void 0 : _e.db)
                            ? this.host.db
                            : new database_1.default({
                                emulate: !!(options === null || options === void 0 ? void 0 : options.emulate),
                                config: (_f = this.host) === null || _f === void 0 ? void 0 : _f.auth,
                            }),
                    })
                    : new client_1.default(this.host.url, { headers: ((_g = this.host) === null || _g === void 0 ? void 0 : _g.headers) || {} });
        this.sdk =
            typeof (options === null || options === void 0 ? void 0 : options.getSdk) === "function"
                ? options.getSdk(this.client, (_h = this.options) === null || _h === void 0 ? void 0 : _h.onRequest)
                : null;
        if (document) {
            document.addEventListener("fireenjinUpload", this.onUpload.bind(this));
            document.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
            document.addEventListener("fireenjinFetch", this.onFetch.bind(this));
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
            }
        }
    }
    onUpload(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.debug)
                console.log("fireenjinUpload: ", event);
            if (typeof ((_b = this.options) === null || _b === void 0 ? void 0 : _b.onUpload) === "function")
                this.options.onUpload(event);
            if (!((_d = (_c = event.detail) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.encodedContent) ||
                typeof ((_e = this.options) === null || _e === void 0 ? void 0 : _e.onUpload) === "function")
                return false;
            const data = yield this.upload({
                data: {
                    id: (_f = event.detail.data) === null || _f === void 0 ? void 0 : _f.id,
                    path: (_g = event.detail.data) === null || _g === void 0 ? void 0 : _g.path,
                    fileName: (_h = event.detail.data) === null || _h === void 0 ? void 0 : _h.fileName,
                    file: (_j = event.detail.data) === null || _j === void 0 ? void 0 : _j.encodedContent,
                    type: (_k = event.detail.data) === null || _k === void 0 ? void 0 : _k.type,
                },
            }, {
                event,
                target: ((_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.target) || (event === null || event === void 0 ? void 0 : event.target),
                name: (_m = event === null || event === void 0 ? void 0 : event.detail) === null || _m === void 0 ? void 0 : _m.name,
                endpoint: (_o = event === null || event === void 0 ? void 0 : event.detail) === null || _o === void 0 ? void 0 : _o.endpoint,
                bubbles: (_p = event === null || event === void 0 ? void 0 : event.detail) === null || _p === void 0 ? void 0 : _p.bubbles,
                cancelable: (_q = event === null || event === void 0 ? void 0 : event.detail) === null || _q === void 0 ? void 0 : _q.cancelable,
                composed: (_r = event === null || event === void 0 ? void 0 : event.detail) === null || _r === void 0 ? void 0 : _r.composed,
                method: (_s = event === null || event === void 0 ? void 0 : event.detail) === null || _s === void 0 ? void 0 : _s.method,
            });
            if (event === null || event === void 0 ? void 0 : event.target)
                event.target.value = (data === null || data === void 0 ? void 0 : data.url) || null;
            return data;
        });
    }
    onSubmit(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function* () {
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function* () {
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = (options === null || options === void 0 ? void 0 : options.endpoint) || "upload";
            const method = (options === null || options === void 0 ? void 0 : options.method) || "post";
            return (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                var _d, _e, _f;
                return ((_d = this.host) === null || _d === void 0 ? void 0 : _d.type) === "graphql" && !((_e = this.options) === null || _e === void 0 ? void 0 : _e.uploadUrl)
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
                target: (options === null || options === void 0 ? void 0 : options.target) || ((_a = options === null || options === void 0 ? void 0 : options.event) === null || _a === void 0 ? void 0 : _a.target),
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
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let data = null;
            const event = (options === null || options === void 0 ? void 0 : options.event) || null;
            const name = (options === null || options === void 0 ? void 0 : options.name) || null;
            const method = (options === null || options === void 0 ? void 0 : options.method) || "get";
            const localKey = (options === null || options === void 0 ? void 0 : options.cacheKey)
                ? options.cacheKey
                : `${endpoint}_${(input === null || input === void 0 ? void 0 : input.id)
                    ? `${input.id}:`
                    : (input === null || input === void 0 ? void 0 : input.params)
                        ? this.hash(JSON.stringify(Object.values(input.params)))
                        : ""}${this.hash(JSON.stringify(input || {}))}`;
            if (!(options === null || options === void 0 ? void 0 : options.disableCache)) {
                data = yield (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () { return localforage.getItem(localKey); }), {
                    endpoint,
                    event,
                    target: (options === null || options === void 0 ? void 0 : options.target) || (event === null || event === void 0 ? void 0 : event.target),
                    name,
                    cached: true,
                    bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                    cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                    composed: options === null || options === void 0 ? void 0 : options.composed,
                    onError: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onError,
                    onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess,
                });
            }
            data = yield (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                var _f;
                return ((_f = this.host) === null || _f === void 0 ? void 0 : _f.type) === "graphql"
                    ? (input === null || input === void 0 ? void 0 : input.query)
                        ? this.client.request(input === null || input === void 0 ? void 0 : input.query, input === null || input === void 0 ? void 0 : input.params, {
                            method,
                        })
                        : this.sdk[endpoint](input, options === null || options === void 0 ? void 0 : options.headers)
                    : this.client.request(endpoint, input, {
                        method,
                    });
            }), {
                endpoint,
                event,
                target: (options === null || options === void 0 ? void 0 : options.target) || ((_c = options === null || options === void 0 ? void 0 : options.event) === null || _c === void 0 ? void 0 : _c.target),
                name,
                cached: false,
                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                composed: options === null || options === void 0 ? void 0 : options.composed,
                onError: (_d = this.options) === null || _d === void 0 ? void 0 : _d.onError,
                onSuccess: (_e = this.options) === null || _e === void 0 ? void 0 : _e.onSuccess,
            });
            return data;
        });
    }
    submit(endpoint, input, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const event = (options === null || options === void 0 ? void 0 : options.event) || null;
            const name = (options === null || options === void 0 ? void 0 : options.name) || null;
            const method = (options === null || options === void 0 ? void 0 : options.method) || "post";
            return (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                var _c;
                return ((_c = this.host) === null || _c === void 0 ? void 0 : _c.type) === "graphql"
                    ? (input === null || input === void 0 ? void 0 : input.query)
                        ? this.client.request(input.query, input.params, {
                            method,
                        })
                        : this.sdk[endpoint]((input === null || input === void 0 ? void 0 : input.params) || {
                            id: input === null || input === void 0 ? void 0 : input.id,
                            data: input === null || input === void 0 ? void 0 : input.data,
                        })
                    : this.client.request(endpoint, input, {
                        method,
                    });
            }), {
                endpoint,
                event,
                target: (options === null || options === void 0 ? void 0 : options.target) || (event === null || event === void 0 ? void 0 : event.target),
                name,
                cached: false,
                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                composed: options === null || options === void 0 ? void 0 : options.composed,
                onError: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onError,
                onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess,
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
}
exports.default = FireEnjin;
