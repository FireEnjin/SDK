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
exports.SessionService = exports.DatabaseService = exports.AuthService = void 0;
var graphql_request_1 = require("graphql-request");
var localforage = require("localforage");
var isEqual_1 = require("lodash/fp/isEqual");
var auth_1 = require("./services/auth");
exports.AuthService = auth_1["default"];
var database_1 = require("./services/database");
exports.DatabaseService = database_1["default"];
var session_1 = require("./services/session");
exports.SessionService = session_1["default"];
function setComponentProps(dataPropsMap, data) {
    return __awaiter(this, void 0, void 0, function () {
        var newData, dataKeys, _i, dataKeys_1, key;
        return __generator(this, function (_a) {
            newData = data ? data : {};
            if (dataPropsMap) {
                dataKeys = Object.keys(dataPropsMap);
                for (_i = 0, dataKeys_1 = dataKeys; _i < dataKeys_1.length; _i++) {
                    key = dataKeys_1[_i];
                    try {
                        newData[dataPropsMap[key]] = key
                            .split(".")
                            .reduce(function (o, i) { return o[i]; }, data);
                    }
                    catch (e) {
                        continue;
                    }
                }
            }
            return [2 /*return*/, newData];
        });
    });
}
if (window && !window.FireEnjin) {
    var client_1, getSdk_1, sdk_1;
    window.FireEnjin = {
        init: function (getSdkFn, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    client_1 = new graphql_request_1.GraphQLClient(options.host, {
                        headers: __assign({ Authorization: options.token ? "Bearer ".concat(options.token) : "" }, (options.headers ? options.headers : {}))
                    });
                    getSdk_1 = getSdkFn;
                    sdk_1 = getSdk_1(client_1);
                    window.addEventListener("fireenjinUpload", function (event) { return __awaiter(void 0, void 0, void 0, function () {
                        var response, data, _a, _b, _c, _d, err_1;
                        var _e, _f;
                        var _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
                        return __generator(this, function (_t) {
                            switch (_t.label) {
                                case 0:
                                    if (typeof (options === null || options === void 0 ? void 0 : options.onUpload) === "function")
                                        options.onUpload(event);
                                    if (!((_h = (_g = event.detail) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.encodedContent) ||
                                        typeof (options === null || options === void 0 ? void 0 : options.onUpload) === "function")
                                        return [2 /*return*/, false];
                                    _t.label = 1;
                                case 1:
                                    _t.trys.push([1, 5, , 6]);
                                    return [4 /*yield*/, fetch(options.uploadUrl
                                            ? options.uploadUrl
                                            : "".concat(options.functionsHost, "/upload"), {
                                            method: "POST",
                                            mode: "cors",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                id: (_j = event.detail.data) === null || _j === void 0 ? void 0 : _j.id,
                                                path: (_k = event.detail.data) === null || _k === void 0 ? void 0 : _k.path,
                                                fileName: (_l = event.detail.data) === null || _l === void 0 ? void 0 : _l.fileName,
                                                file: (_m = event.detail.data) === null || _m === void 0 ? void 0 : _m.encodedContent,
                                                type: (_o = event.detail.data) === null || _o === void 0 ? void 0 : _o.type
                                            })
                                        })];
                                case 2:
                                    response = _t.sent();
                                    return [4 /*yield*/, response.json()];
                                case 3:
                                    data = _t.sent();
                                    event.target.value = data.url;
                                    _b = (_a = document.body).dispatchEvent;
                                    _c = CustomEvent.bind;
                                    _d = [void 0, "fireenjinSuccess"];
                                    _e = {};
                                    _f = {
                                        event: event.detail.event
                                    };
                                    return [4 /*yield*/, setComponentProps((_p = event === null || event === void 0 ? void 0 : event.detail) === null || _p === void 0 ? void 0 : _p.dataPropsMap, data)];
                                case 4:
                                    _b.apply(_a, [new (_c.apply(CustomEvent, _d.concat([(_e.detail = (_f.data = _t.sent(),
                                                _f.target = event.target,
                                                _f.name = event.detail.name,
                                                _f.endpoint = event.detail.endpoint,
                                                _f),
                                                _e)])))()]);
                                    return [3 /*break*/, 6];
                                case 5:
                                    err_1 = _t.sent();
                                    if (options.onError && typeof options.onError === "function") {
                                        options.onError(err_1);
                                    }
                                    document.body.dispatchEvent(new CustomEvent("fireenjinError", {
                                        detail: {
                                            event: (_q = event === null || event === void 0 ? void 0 : event.detail) === null || _q === void 0 ? void 0 : _q.event,
                                            target: event === null || event === void 0 ? void 0 : event.target,
                                            error: err_1,
                                            name: (_r = event === null || event === void 0 ? void 0 : event.detail) === null || _r === void 0 ? void 0 : _r.name,
                                            endpoint: (_s = event === null || event === void 0 ? void 0 : event.detail) === null || _s === void 0 ? void 0 : _s.endpoint
                                        }
                                    }));
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                    window.addEventListener("fireenjinSubmit", function (event) { return __awaiter(void 0, void 0, void 0, function () {
                        var data, _a, _b, _c, _d, err_2;
                        var _e, _f;
                        var _g, _h, _j, _k, _l, _m, _o;
                        return __generator(this, function (_p) {
                            switch (_p.label) {
                                case 0:
                                    if (!event ||
                                        !event.detail ||
                                        !event.detail.endpoint ||
                                        (!sdk_1[event.detail.endpoint] && !options.debug) ||
                                        event.detail.disableSubmit)
                                        return [2 /*return*/, false];
                                    _p.label = 1;
                                case 1:
                                    _p.trys.push([1, 4, , 5]);
                                    return [4 /*yield*/, sdk_1[event.detail.endpoint]({
                                            id: event.detail.id,
                                            data: event.detail.data
                                        })];
                                case 2:
                                    data = _p.sent();
                                    if (options.onSuccess && typeof options.onSuccess === "function") {
                                        options.onSuccess(data);
                                    }
                                    _b = (_a = document.body).dispatchEvent;
                                    _c = CustomEvent.bind;
                                    _d = [void 0, "fireenjinSuccess"];
                                    _e = {};
                                    _f = {
                                        event: (_g = event.detail) === null || _g === void 0 ? void 0 : _g.event
                                    };
                                    return [4 /*yield*/, setComponentProps((_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.dataPropsMap, data)];
                                case 3:
                                    _b.apply(_a, [new (_c.apply(CustomEvent, _d.concat([(_e.detail = (_f.data = _p.sent(),
                                                _f.target = event.target,
                                                _f.name = event.detail.name,
                                                _f.endpoint = event.detail.endpoint,
                                                _f),
                                                _e)])))()]);
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_2 = _p.sent();
                                    if (options.onError && typeof options.onError === "function") {
                                        options.onError(err_2);
                                    }
                                    document.body.dispatchEvent(new CustomEvent("fireenjinError", {
                                        detail: {
                                            event: (_j = event === null || event === void 0 ? void 0 : event.detail) === null || _j === void 0 ? void 0 : _j.event,
                                            error: err_2,
                                            target: event.target,
                                            name: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.name,
                                            endpoint: (_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.endpoint
                                        }
                                    }));
                                    return [3 /*break*/, 5];
                                case 5:
                                    if (((_m = event === null || event === void 0 ? void 0 : event.target) === null || _m === void 0 ? void 0 : _m.setLoading) &&
                                        typeof ((_o = event === null || event === void 0 ? void 0 : event.target) === null || _o === void 0 ? void 0 : _o.setLoading) === "function") {
                                        event.target.setLoading(false);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    window.addEventListener("fireenjinFetch", function (event) { return __awaiter(void 0, void 0, void 0, function () {
                        var cachedData, localKey, data, err_3, response, _a, data, err_4, err_5;
                        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                        return __generator(this, function (_o) {
                            switch (_o.label) {
                                case 0:
                                    if (!event ||
                                        !event.detail ||
                                        !event.detail.endpoint ||
                                        (!sdk_1[event.detail.endpoint] && !options.debug) ||
                                        event.detail.disableFetch)
                                        return [2 /*return*/, false];
                                    localKey = event.detail.cacheKey
                                        ? event.detail.cacheKey
                                        : "".concat(event.detail.endpoint, "_").concat(event.detail.id
                                            ? "".concat(event.detail.id, ":")
                                            : event.detail.params
                                                ? btoa(JSON.stringify(Object.values(event.detail.params)))
                                                : "").concat(btoa(JSON.stringify(event.detail.data)));
                                    if (!!event.detail.disableCache) return [3 /*break*/, 6];
                                    _o.label = 1;
                                case 1:
                                    _o.trys.push([1, 5, , 6]);
                                    return [4 /*yield*/, localforage.getItem(localKey)];
                                case 2:
                                    cachedData = _o.sent();
                                    if (!cachedData) return [3 /*break*/, 4];
                                    return [4 /*yield*/, setComponentProps((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.dataPropsMap, cachedData)];
                                case 3:
                                    data = _o.sent();
                                    document.body.dispatchEvent(new CustomEvent("fireenjinSuccess", {
                                        detail: {
                                            event: event.detail.event,
                                            target: event.target,
                                            cached: true,
                                            data: data,
                                            name: event.detail.name,
                                            endpoint: event.detail.endpoint
                                        }
                                    }));
                                    if (((_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.setLoading) &&
                                        typeof ((_d = event === null || event === void 0 ? void 0 : event.target) === null || _d === void 0 ? void 0 : _d.setLoading) === "function") {
                                        event.target.setLoading(false);
                                    }
                                    _o.label = 4;
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    err_3 = _o.sent();
                                    console.log(err_3);
                                    return [3 /*break*/, 6];
                                case 6:
                                    _o.trys.push([6, 16, , 17]);
                                    if (!((_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.query)) return [3 /*break*/, 8];
                                    return [4 /*yield*/, client_1.request(event.detail.query, event.detail.params)];
                                case 7:
                                    _a = _o.sent();
                                    return [3 /*break*/, 10];
                                case 8: return [4 /*yield*/, sdk_1[event.detail.endpoint](event.detail.params)];
                                case 9:
                                    _a = _o.sent();
                                    _o.label = 10;
                                case 10:
                                    response = _a;
                                    return [4 /*yield*/, setComponentProps((_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.dataPropsMap, response)];
                                case 11:
                                    data = _o.sent();
                                    if (options.onSuccess && typeof options.onSuccess === "function") {
                                        options.onSuccess(response);
                                    }
                                    if (!(!options.disableCache &&
                                        (!cachedData || (cachedData && !(0, isEqual_1["default"])(cachedData, response))))) return [3 /*break*/, 15];
                                    document.body.dispatchEvent(new CustomEvent("fireenjinSuccess", {
                                        detail: {
                                            event: (_g = event.detail) === null || _g === void 0 ? void 0 : _g.event,
                                            target: event.target,
                                            cached: false,
                                            data: data,
                                            name: event.detail.name,
                                            endpoint: event.detail.endpoint
                                        }
                                    }));
                                    _o.label = 12;
                                case 12:
                                    _o.trys.push([12, 14, , 15]);
                                    return [4 /*yield*/, localforage.setItem(localKey, response)];
                                case 13:
                                    _o.sent();
                                    return [3 /*break*/, 15];
                                case 14:
                                    err_4 = _o.sent();
                                    console.log(err_4);
                                    return [3 /*break*/, 15];
                                case 15: return [3 /*break*/, 17];
                                case 16:
                                    err_5 = _o.sent();
                                    if (options.onError && typeof options.onError === "function") {
                                        options.onError(err_5);
                                    }
                                    document.body.dispatchEvent(new CustomEvent("fireenjinError", {
                                        detail: {
                                            event: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.event,
                                            target: event === null || event === void 0 ? void 0 : event.target,
                                            error: err_5,
                                            name: (_j = event === null || event === void 0 ? void 0 : event.detail) === null || _j === void 0 ? void 0 : _j.name,
                                            endpoint: (_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.endpoint
                                        }
                                    }));
                                    return [3 /*break*/, 17];
                                case 17:
                                    if (((_l = event === null || event === void 0 ? void 0 : event.target) === null || _l === void 0 ? void 0 : _l.setLoading) &&
                                        typeof ((_m = event === null || event === void 0 ? void 0 : event.target) === null || _m === void 0 ? void 0 : _m.setLoading) === "function") {
                                        event.target.setLoading(false);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, {
                            client: client_1,
                            sdk: sdk_1
                        }];
                });
            });
        },
        setHeader: function (key, value) {
            if (client_1) {
                client_1.setHeader(key, value);
                sdk_1 = getSdk_1(client_1);
            }
            return true;
        }
    };
}
