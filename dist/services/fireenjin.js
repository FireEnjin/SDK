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
        while (_) try {
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
exports.__esModule = true;
var localforage = require("localforage");
var graphql_request_1 = require("graphql-request");
var tryOrFail_1 = require("../helpers/tryOrFail");
var client_1 = require("./client");
var database_1 = require("./database");
var firestore_1 = require("./firestore");
var FireEnjin = /** @class */ (function () {
    function FireEnjin(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.sdk = {};
        this.host = {
            url: "http://localhost:4000"
        };
        this.currentConnection = 0;
        this.options = options || {};
        var headers = __assign({ Authorization: (options === null || options === void 0 ? void 0 : options.token) ? "Bearer ".concat(options.token) : "" }, (options.headers ? options.headers : {}));
        this.host = ((_a = options === null || options === void 0 ? void 0 : options.connections) === null || _a === void 0 ? void 0 : _a.length)
            ? this.setConnection(0)
            : {
                url: options.host,
                type: "rest",
                headers: headers
            };
        this.client =
            this.host.type === "graphql"
                ? new graphql_request_1.GraphQLClient(((_b = this.host) === null || _b === void 0 ? void 0 : _b.url) || "http://localhost:4000", {
                    headers: ((_c = this.host) === null || _c === void 0 ? void 0 : _c.headers) || {}
                })
                : ((_d = this.host) === null || _d === void 0 ? void 0 : _d.type) === "firebase"
                    ? new firestore_1["default"](this.host.url, {
                        db: ((_e = this.host) === null || _e === void 0 ? void 0 : _e.db)
                            ? this.host.db
                            : new database_1["default"]({
                                emulate: !!(options === null || options === void 0 ? void 0 : options.emulate),
                                config: (_f = this.host) === null || _f === void 0 ? void 0 : _f.auth
                            })
                    })
                    : new client_1["default"](this.host.url, { headers: ((_g = this.host) === null || _g === void 0 ? void 0 : _g.headers) || {} });
        this.sdk =
            this.host.type === "graphql" && typeof (options === null || options === void 0 ? void 0 : options.getSdk) === "function"
                ? options.getSdk(this.client, (_h = this.options) === null || _h === void 0 ? void 0 : _h.onRequest)
                : null;
        if (document) {
            document.addEventListener("fireenjinUpload", function (event) {
                _this.onUpload(event);
            });
            document.addEventListener("fireenjinSubmit", function (event) {
                _this.onSubmit(event);
            });
            document.addEventListener("fireenjinFetch", function (event) {
                _this.onFetch(event);
            });
        }
    }
    FireEnjin.prototype.onUpload = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onUpload) === "function")
                            this.options.onUpload(event);
                        if (!((_c = (_b = event.detail) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.encodedContent) ||
                            typeof ((_d = this.options) === null || _d === void 0 ? void 0 : _d.onUpload) === "function")
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.upload({
                                id: (_e = event.detail.data) === null || _e === void 0 ? void 0 : _e.id,
                                path: (_f = event.detail.data) === null || _f === void 0 ? void 0 : _f.path,
                                fileName: (_g = event.detail.data) === null || _g === void 0 ? void 0 : _g.fileName,
                                file: (_h = event.detail.data) === null || _h === void 0 ? void 0 : _h.encodedContent,
                                type: (_j = event.detail.data) === null || _j === void 0 ? void 0 : _j.type
                            }, {
                                event: event,
                                name: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.name,
                                endpoint: (_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.endpoint,
                                bubbles: (_m = event === null || event === void 0 ? void 0 : event.detail) === null || _m === void 0 ? void 0 : _m.bubbles,
                                cancelable: (_o = event === null || event === void 0 ? void 0 : event.detail) === null || _o === void 0 ? void 0 : _o.cancelable,
                                composed: (_p = event === null || event === void 0 ? void 0 : event.detail) === null || _p === void 0 ? void 0 : _p.composed
                            })];
                    case 1:
                        data = _q.sent();
                        if (event === null || event === void 0 ? void 0 : event.target)
                            event.target.value = (data === null || data === void 0 ? void 0 : data.url) || null;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    FireEnjin.prototype.onSubmit = function (event) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_h) {
                if (!event ||
                    !event.detail ||
                    !event.detail.endpoint ||
                    event.detail.disableSubmit)
                    return [2 /*return*/, false];
                return [2 /*return*/, this.submit(event.detail.endpoint, {
                        event: event,
                        id: (_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.id,
                        data: (_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.data,
                        params: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.params,
                        query: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.query,
                        bubbles: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.bubbles,
                        cancelable: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.cancelable,
                        composed: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.composed
                    })];
            });
        });
    };
    FireEnjin.prototype.onFetch = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_j) {
                if (!event ||
                    !event.detail ||
                    !event.detail.endpoint ||
                    event.detail.disableFetch)
                    return [2 /*return*/, false];
                return [2 /*return*/, this.fetch(event.detail.endpoint, ((_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.params) || {}, {
                        event: event,
                        dataPropsMap: (_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.dataPropsMap,
                        name: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.name,
                        cacheKey: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.cacheKey,
                        disableCache: !!((_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.disableCache),
                        bubbles: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.bubbles,
                        cancelable: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.cancelable,
                        composed: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.composed
                    })];
            });
        });
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            var _this = this;
            return __generator(this, function (_c) {
                endpoint = (options === null || options === void 0 ? void 0 : options.endpoint) || "upload";
                return [2 /*return*/, (0, tryOrFail_1["default"])(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, this.client.request(this.options.uploadUrl
                                    ? this.options.uploadUrl
                                    : "".concat(this.host.url, "/").concat(endpoint), input)];
                        });
                    }); }, {
                        event: (options === null || options === void 0 ? void 0 : options.event) || null,
                        name: (options === null || options === void 0 ? void 0 : options.name) || endpoint,
                        bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                        cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                        composed: options === null || options === void 0 ? void 0 : options.composed,
                        endpoint: endpoint,
                        cached: true,
                        onError: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onError,
                        onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess
                    })];
            });
        });
    };
    FireEnjin.prototype.fetch = function (endpoint, input, options) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var data, event, name, localKey;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        data = null;
                        event = (options === null || options === void 0 ? void 0 : options.event) || null;
                        name = (options === null || options === void 0 ? void 0 : options.name) || null;
                        localKey = (options === null || options === void 0 ? void 0 : options.cacheKey)
                            ? options.cacheKey
                            : "".concat(endpoint, "_").concat((input === null || input === void 0 ? void 0 : input.id)
                                ? "".concat(input.id, ":")
                                : (input === null || input === void 0 ? void 0 : input.params)
                                    ? this.hash(JSON.stringify(Object.values(input.params)))
                                    : "").concat(this.hash(JSON.stringify(input || {})));
                        if (!!(options === null || options === void 0 ? void 0 : options.disableCache)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, tryOrFail_1["default"])(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, localforage.getItem(localKey)];
                            }); }); }, {
                                endpoint: endpoint,
                                event: event,
                                name: name,
                                cached: true,
                                bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                                cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                                composed: options === null || options === void 0 ? void 0 : options.composed,
                                onError: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onError,
                                onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess
                            })];
                    case 1:
                        data = _e.sent();
                        _e.label = 2;
                    case 2: return [4 /*yield*/, (0, tryOrFail_1["default"])(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                return [2 /*return*/, ((_a = this.host) === null || _a === void 0 ? void 0 : _a.type) === "graphql"
                                        ? (input === null || input === void 0 ? void 0 : input.query)
                                            ? this.client.request(input === null || input === void 0 ? void 0 : input.query, input === null || input === void 0 ? void 0 : input.params)
                                            : this.sdk[endpoint](input, options === null || options === void 0 ? void 0 : options.headers)
                                        : this.client.request(endpoint, input)];
                            });
                        }); }, {
                            endpoint: endpoint,
                            event: event,
                            name: name,
                            cached: false,
                            bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                            cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                            composed: options === null || options === void 0 ? void 0 : options.composed,
                            onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError,
                            onSuccess: (_d = this.options) === null || _d === void 0 ? void 0 : _d.onSuccess
                        })];
                    case 3:
                        data = _e.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    FireEnjin.prototype.submit = function (endpoint, input, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var event, name;
            var _this = this;
            return __generator(this, function (_c) {
                event = (options === null || options === void 0 ? void 0 : options.event) || null;
                name = (options === null || options === void 0 ? void 0 : options.name) || null;
                return [2 /*return*/, (0, tryOrFail_1["default"])(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            return [2 /*return*/, ((_a = this.host) === null || _a === void 0 ? void 0 : _a.type) === "graphql"
                                    ? (input === null || input === void 0 ? void 0 : input.query)
                                        ? this.client.request(input.query, input.params)
                                        : this.sdk[endpoint]({
                                            id: input === null || input === void 0 ? void 0 : input.id,
                                            data: input === null || input === void 0 ? void 0 : input.data
                                        })
                                    : this.client.request(endpoint, input, {
                                        method: "POST"
                                    })];
                        });
                    }); }, {
                        endpoint: endpoint,
                        event: event,
                        name: name,
                        cached: false,
                        bubbles: options === null || options === void 0 ? void 0 : options.bubbles,
                        cancelable: options === null || options === void 0 ? void 0 : options.cancelable,
                        composed: options === null || options === void 0 ? void 0 : options.composed,
                        onError: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onError,
                        onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess
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
                    headers: ((_o = this.host) === null || _o === void 0 ? void 0 : _o.headers) || {}
                })
                : ((_p = this.host) === null || _p === void 0 ? void 0 : _p.type) === "firebase"
                    ? new firestore_1["default"](this.host.url, {
                        db: this.host.db
                    })
                    : new client_1["default"](this.host.url, { headers: ((_q = this.host) === null || _q === void 0 ? void 0 : _q.headers) || {} });
        this.client.setEndpoint(((_r = this.host) === null || _r === void 0 ? void 0 : _r.url) || "http://localhost:4000");
        return this.host;
    };
    return FireEnjin;
}());
exports["default"] = FireEnjin;
