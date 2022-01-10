"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.FireEnjin = void 0;
const localforage = __importStar(require("localforage"));
const graphql_request_1 = require("graphql-request");
const client_1 = __importDefault(require("./client"));
const tryOrFail_1 = __importDefault(require("../helpers/tryOrFail"));
const database_1 = __importDefault(require("./database"));
const firestore_1 = __importDefault(require("./firestore"));
class FireEnjin {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.sdk = {};
        this.host = {
            url: "http://localhost:4000",
        };
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
            this.host.type === "graphql" && typeof (options === null || options === void 0 ? void 0 : options.getSdk) === "function"
                ? options.getSdk(this.client, (_h = this.options) === null || _h === void 0 ? void 0 : _h.onRequest)
                : null;
        if (document) {
            document.addEventListener("fireenjinUpload", (event) => {
                this.onUpload(event);
            });
            document.addEventListener("fireenjinSubmit", (event) => {
                this.onSubmit(event);
            });
            document.addEventListener("fireenjinFetch", (event) => {
                this.onFetch(event);
            });
        }
    }
    onUpload(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onUpload) === "function")
                this.options.onUpload(event);
            if (!((_c = (_b = event.detail) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.encodedContent) ||
                typeof ((_d = this.options) === null || _d === void 0 ? void 0 : _d.onUpload) === "function")
                return false;
            const data = yield this.upload({
                id: (_e = event.detail.data) === null || _e === void 0 ? void 0 : _e.id,
                path: (_f = event.detail.data) === null || _f === void 0 ? void 0 : _f.path,
                fileName: (_g = event.detail.data) === null || _g === void 0 ? void 0 : _g.fileName,
                file: (_h = event.detail.data) === null || _h === void 0 ? void 0 : _h.encodedContent,
                type: (_j = event.detail.data) === null || _j === void 0 ? void 0 : _j.type,
            }, {
                event,
                name: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.name,
                endpoint: (_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.endpoint,
                bubbles: (_m = event === null || event === void 0 ? void 0 : event.detail) === null || _m === void 0 ? void 0 : _m.bubbles,
                cancelable: (_o = event === null || event === void 0 ? void 0 : event.detail) === null || _o === void 0 ? void 0 : _o.cancelable,
                composed: (_p = event === null || event === void 0 ? void 0 : event.detail) === null || _p === void 0 ? void 0 : _p.composed,
            });
            if (event === null || event === void 0 ? void 0 : event.target)
                event.target.value = (data === null || data === void 0 ? void 0 : data.url) || null;
            return data;
        });
    }
    onSubmit(event) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            if (!event ||
                !event.detail ||
                !event.detail.endpoint ||
                event.detail.disableSubmit)
                return false;
            return this.submit(event.detail.endpoint, {
                event,
                id: (_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.id,
                data: (_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.data,
                params: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.params,
                query: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.query,
                bubbles: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.bubbles,
                cancelable: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.cancelable,
                composed: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.composed,
            });
        });
    }
    onFetch(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            if (!event ||
                !event.detail ||
                !event.detail.endpoint ||
                event.detail.disableFetch)
                return false;
            return this.fetch(event.detail.endpoint, ((_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.params) || {}, {
                event,
                dataPropsMap: (_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.dataPropsMap,
                name: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.name,
                cacheKey: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.cacheKey,
                disableCache: !!((_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.disableCache),
                bubbles: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.bubbles,
                cancelable: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.cancelable,
                composed: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.composed,
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = (options === null || options === void 0 ? void 0 : options.endpoint) || "upload";
            return (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                return this.client.request(this.options.uploadUrl
                    ? this.options.uploadUrl
                    : `${this.host.url}/${endpoint}`, input);
            }), {
                event: (options === null || options === void 0 ? void 0 : options.event) || null,
                name: (options === null || options === void 0 ? void 0 : options.name) || endpoint,
                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                composed: options === null || options === void 0 ? void 0 : options.composed,
                endpoint,
                cached: true,
                onError: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onError,
                onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess,
            });
        });
    }
    fetch(endpoint, variables, options) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let data = null;
            const event = (options === null || options === void 0 ? void 0 : options.event) || null;
            const name = (options === null || options === void 0 ? void 0 : options.name) || null;
            const localKey = (options === null || options === void 0 ? void 0 : options.cacheKey)
                ? options.cacheKey
                : `${endpoint}_${(variables === null || variables === void 0 ? void 0 : variables.id)
                    ? `${variables.id}:`
                    : (variables === null || variables === void 0 ? void 0 : variables.params)
                        ? this.hash(JSON.stringify(Object.values(variables.params)))
                        : ""}${this.hash(JSON.stringify(variables || {}))}`;
            if (!(options === null || options === void 0 ? void 0 : options.disableCache)) {
                data = yield (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () { return localforage.getItem(localKey); }), {
                    endpoint,
                    event,
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
                var _e;
                return ((_e = this.host) === null || _e === void 0 ? void 0 : _e.type) === "graphql"
                    ? (variables === null || variables === void 0 ? void 0 : variables.query)
                        ? this.client.request(variables === null || variables === void 0 ? void 0 : variables.query, variables === null || variables === void 0 ? void 0 : variables.params)
                        : this.sdk[endpoint](variables, options === null || options === void 0 ? void 0 : options.headers)
                    : this.client.request(endpoint, variables);
            }), {
                endpoint,
                event,
                name,
                cached: false,
                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                composed: options === null || options === void 0 ? void 0 : options.composed,
                onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError,
                onSuccess: (_d = this.options) === null || _d === void 0 ? void 0 : _d.onSuccess,
            });
            return data;
        });
    }
    submit(endpoint, variables, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const event = (options === null || options === void 0 ? void 0 : options.event) || null;
            const name = (options === null || options === void 0 ? void 0 : options.name) || null;
            return (0, tryOrFail_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                var _c;
                return ((_c = this.host) === null || _c === void 0 ? void 0 : _c.type) === "graphql"
                    ? (variables === null || variables === void 0 ? void 0 : variables.query)
                        ? this.client.request(variables.query, variables.params)
                        : this.sdk[endpoint]({
                            id: variables.id,
                            data: variables.data,
                        })
                    : this.client.request(endpoint, variables, {
                        method: "POST",
                    });
            }), {
                endpoint,
                event,
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
            ? (((_a = this.options) === null || _a === void 0 ? void 0 : _a.connections) || []).find((connection) => (connection === null || connection === void 0 ? void 0 : connection.name) === nameUrlOrIndex ||
                (connection === null || connection === void 0 ? void 0 : connection.url) === nameUrlOrIndex)
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
exports.FireEnjin = FireEnjin;
