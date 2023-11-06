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
var FireEnjin = /** @class */ (function () {
    function FireEnjin(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        this.sdk = {};
        this.host = {
            url: "http://localhost:4000",
        };
        this.currentConnection = 0;
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
            var path, fileName, storageRef, uploadResult, onProgress_1, target_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storage)
                            return [2 /*return*/];
                        path = (input === null || input === void 0 ? void 0 : input.path) || "/";
                        fileName = (input === null || input === void 0 ? void 0 : input.fileName) || (typeof file !== "string" && (file === null || file === void 0 ? void 0 : file.name));
                        storageRef = (0, storage_1.ref)(this.storage, path + fileName);
                        uploadResult = null;
                        if (!(typeof file === "string" && (file === null || file === void 0 ? void 0 : file.includes("data:")))) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, storage_1.uploadString)(storageRef, file, "data_url")];
                    case 1:
                        uploadResult = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (typeof file !== "string") {
                            uploadResult = (0, storage_1.uploadBytesResumable)(storageRef, file);
                            onProgress_1 = (input === null || input === void 0 ? void 0 : input.onProgress) || this.options.onProgress;
                            target_1 = (options === null || options === void 0 ? void 0 : options.target) || (input === null || input === void 0 ? void 0 : input.target) || document;
                            uploadResult.on("state_changed", function (snapshot) {
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
                                        progress: ((snapshot === null || snapshot === void 0 ? void 0 : snapshot.bytesTransferred) || 0) / ((snapshot === null || snapshot === void 0 ? void 0 : snapshot.totalBytes) || 0),
                                        target: target_1,
                                        snapshot: snapshot,
                                    },
                                };
                                if (typeof onProgress_1 === "function")
                                    onProgress_1(eventData);
                                target_1.dispatchEvent(new CustomEvent("fireenjinProgress", eventData));
                            });
                            return [2 /*return*/, uploadResult];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FireEnjin;
}());
exports.default = FireEnjin;
