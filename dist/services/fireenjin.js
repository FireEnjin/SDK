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
exports.FireEnjin = void 0;
var localforage = require("localforage");
var graphql_request_1 = require("graphql-request");
var client_1 = require("./client");
var error_1 = require("../events/error");
var success_1 = require("../events/success");
var FireEnjin = /** @class */ (function () {
    function FireEnjin(options) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.host = {
            url: "http://localhost:4000"
        };
        this.options = options || {};
        var headers = __assign({ Authorization: (options === null || options === void 0 ? void 0 : options.token) ? "Bearer ".concat(options.token) : "" }, (options.headers ? options.headers : {}));
        if (!((_a = options === null || options === void 0 ? void 0 : options.connections) === null || _a === void 0 ? void 0 : _a.length) && options.host) {
            this.host = {
                name: "default",
                url: options.host,
                type: typeof (options === null || options === void 0 ? void 0 : options.getSdk) === "function" ? "graphql" : "rest",
                headers: headers
            };
        }
        if (!((_b = this.host) === null || _b === void 0 ? void 0 : _b.url) && ((_c = options === null || options === void 0 ? void 0 : options.connections) === null || _c === void 0 ? void 0 : _c.length)) {
            this.host = options.connections.sort(function (a, b) {
                return ((a === null || a === void 0 ? void 0 : a.priority) || 0) > ((b === null || b === void 0 ? void 0 : b.priority) || 0) ? 1 : -1;
            })[0];
            this.host.headers = headers;
        }
        this.client =
            this.host.type === "graphql"
                ? new graphql_request_1.GraphQLClient(((_d = this.host) === null || _d === void 0 ? void 0 : _d.url) || "http://localhost:4000", {
                    headers: ((_e = this.host) === null || _e === void 0 ? void 0 : _e.headers) || {}
                })
                : new client_1["default"](this.host.url, { headers: ((_f = this.host) === null || _f === void 0 ? void 0 : _f.headers) || {} });
        this.sdk =
            this.host.type === "graphql" && typeof (options === null || options === void 0 ? void 0 : options.getSdk) === "function"
                ? options.getSdk(this.client, (_g = this.options) === null || _g === void 0 ? void 0 : _g.onRequest)
                : null;
        if (window === null || window === void 0 ? void 0 : window.addEventListener) {
            window.addEventListener("fireenjinUpload", this.onUpload.bind(this));
            window.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
            window.addEventListener("fireenjinFetch", this.onFetch.bind(this));
        }
    }
    FireEnjin.prototype.upload = function (input) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data, endpoint, name, event, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = null;
                        endpoint = (input === null || input === void 0 ? void 0 : input.endpoint) || "upload";
                        name = (input === null || input === void 0 ? void 0 : input.name) || "upload";
                        event = (input === null || input === void 0 ? void 0 : input.event) || null;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, this.client.request(this.options.uploadUrl
                                ? this.options.uploadUrl
                                : "".concat(this.host.url, "/").concat(endpoint), input)];
                    case 2:
                        data = _c.sent();
                        return [4 /*yield*/, (0, success_1["default"])({
                                event: event,
                                data: data,
                                name: name,
                                endpoint: endpoint
                            }, {
                                onSuccess: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onSuccess
                            })];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_2 = _c.sent();
                        return [4 /*yield*/, (0, error_1["default"])({
                                event: event,
                                error: error_2,
                                name: name,
                                endpoint: endpoint
                            }, {
                                onError: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onError
                            })];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, data];
                }
            });
        });
    };
    FireEnjin.prototype.onUpload = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_k) {
                switch (_k.label) {
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
                            })];
                    case 1:
                        data = _k.sent();
                        if (event === null || event === void 0 ? void 0 : event.target)
                            event.target.value = (data === null || data === void 0 ? void 0 : data.url) || null;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    FireEnjin.prototype.fetch = function (endpoint, variables, options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var localKey, _d, err_1, data, event, name, error_3;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        localKey = (options === null || options === void 0 ? void 0 : options.cacheKey)
                            ? options.cacheKey
                            : "".concat(endpoint, "_").concat((variables === null || variables === void 0 ? void 0 : variables.id)
                                ? "".concat(variables.id, ":")
                                : (variables === null || variables === void 0 ? void 0 : variables.params)
                                    ? Buffer.from(JSON.stringify(Object.values(variables.params))).toString("base64")
                                    : "").concat(Buffer.from(JSON.stringify(variables)).toString("base64"));
                        if (!!(options === null || options === void 0 ? void 0 : options.disableCache)) return [3 /*break*/, 5];
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 4, , 5]);
                        _d = success_1["default"];
                        _e = {
                            event: options === null || options === void 0 ? void 0 : options.event,
                            dataPropsMap: options === null || options === void 0 ? void 0 : options.dataPropsMap,
                            cached: true
                        };
                        return [4 /*yield*/, localforage.getItem(localKey)];
                    case 2: return [4 /*yield*/, _d.apply(void 0, [(_e.data = _f.sent(),
                                _e.name = options === null || options === void 0 ? void 0 : options.name,
                                _e.endpoint = endpoint,
                                _e), {
                                onSuccess: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onSuccess
                            }])];
                    case 3:
                        _f.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _f.sent();
                        console.log(err_1);
                        return [3 /*break*/, 5];
                    case 5:
                        data = null;
                        event = (options === null || options === void 0 ? void 0 : options.event) || null;
                        name = (options === null || options === void 0 ? void 0 : options.name) || null;
                        _f.label = 6;
                    case 6:
                        _f.trys.push([6, 8, , 10]);
                        return [4 /*yield*/, (0, success_1["default"])({
                                event: event,
                                data: data,
                                name: name,
                                endpoint: endpoint
                            }, {
                                onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess
                            })];
                    case 7:
                        _f.sent();
                        return [2 /*return*/, data];
                    case 8:
                        error_3 = _f.sent();
                        return [4 /*yield*/, (0, error_1["default"])({
                                event: event,
                                error: error_3,
                                name: name,
                                endpoint: endpoint
                            }, {
                                onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError
                            })];
                    case 9:
                        _f.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, data];
                }
            });
        });
    };
    FireEnjin.prototype.onFetch = function (event) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_g) {
                if (!event ||
                    !event.detail ||
                    !event.detail.endpoint ||
                    event.detail.disableFetch)
                    return [2 /*return*/, false];
                return [2 /*return*/, this.fetch(event.detail.endpoint, ((_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.data) || {}, {
                        event: (_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.event,
                        dataPropsMap: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.dataPropsMap,
                        name: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.name,
                        cacheKey: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.cacheKey,
                        disableCache: !!((_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.disableCache)
                    })];
            });
        });
    };
    FireEnjin.prototype.submit = function (endpoint, variables, options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var data, event, name, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = null;
                        event = (options === null || options === void 0 ? void 0 : options.event) || null;
                        name = (options === null || options === void 0 ? void 0 : options.name) || null;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 5]);
                        data =
                            ((_a = this.host) === null || _a === void 0 ? void 0 : _a.type) === "graphql"
                                ? (variables === null || variables === void 0 ? void 0 : variables.query)
                                    ? this.client.request(variables.query, variables.params)
                                    : this.sdk[endpoint]({
                                        id: variables.id,
                                        data: variables.data
                                    })
                                : this.client.request(endpoint, variables, {
                                    method: "POST"
                                });
                        return [4 /*yield*/, (0, success_1["default"])({
                                event: event,
                                data: data,
                                name: name,
                                endpoint: endpoint
                            }, {
                                onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess
                            })];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _d.sent();
                        return [4 /*yield*/, (0, error_1["default"])({
                                event: event,
                                error: error_4,
                                name: name,
                                endpoint: endpoint
                            }, {
                                onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError
                            })];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, data];
                }
            });
        });
    };
    FireEnjin.prototype.onSubmit = function (event) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                if (!event ||
                    !event.detail ||
                    !event.detail.endpoint ||
                    event.detail.disableSubmit)
                    return [2 /*return*/, false];
                return [2 /*return*/, this.submit(event.detail.endpoint, {
                        id: (_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.id,
                        data: (_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.data,
                        params: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.params,
                        query: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.query
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
        var _a, _b, _c, _d;
        this.host = (typeof name === "string"
            ? (((_a = this.options) === null || _a === void 0 ? void 0 : _a.connections) || []).find(function (connection) {
                return (connection === null || connection === void 0 ? void 0 : connection.name) === nameUrlOrIndex ||
                    (connection === null || connection === void 0 ? void 0 : connection.url) === nameUrlOrIndex;
            })
            : (_c = (_b = this.options) === null || _b === void 0 ? void 0 : _b.connections) === null || _c === void 0 ? void 0 : _c[nameUrlOrIndex]);
        this.client.setEndpoint(((_d = this.host) === null || _d === void 0 ? void 0 : _d.url) || "http://localhost:4000");
        return this.host;
    };
    return FireEnjin;
}());
exports.FireEnjin = FireEnjin;
