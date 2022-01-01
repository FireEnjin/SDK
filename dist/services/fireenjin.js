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
var isEqual_1 = require("lodash/fp/isEqual");
var setComponentProps_1 = require("../helpers/setComponentProps");
var client_1 = require("./client");
var FireEnjin = /** @class */ (function () {
    function FireEnjin(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options || {};
        var clientOptions = {
            headers: __assign({ Authorization: options.token ? "Bearer ".concat(options.token) : "" }, (options.headers ? options.headers : {}))
        };
        this.client = (options === null || options === void 0 ? void 0 : options.getSdk)
            ? new options.getSdk(clientOptions)
            : new client_1["default"]({ requestOptions: clientOptions });
        this.sdk = options.getSdk(this.client);
        window.addEventListener("fireenjinUpload", function (event) {
            _this.upload(event);
        });
        window.addEventListener("fireenjinSubmit", function (event) {
            _this.submit(event);
        });
        window.addEventListener("fireenjinFetch", function (event) {
            _this.fetch(event);
        });
    }
    FireEnjin.prototype.upload = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __awaiter(this, void 0, void 0, function () {
            var response, data, _p, _q, _r, _s, err_1;
            var _t, _u;
            return __generator(this, function (_v) {
                switch (_v.label) {
                    case 0:
                        if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onUpload) === "function")
                            this.options.onUpload(event);
                        if (!((_c = (_b = event.detail) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.encodedContent) ||
                            typeof ((_d = this.options) === null || _d === void 0 ? void 0 : _d.onUpload) === "function")
                            return [2 /*return*/, false];
                        _v.label = 1;
                    case 1:
                        _v.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, fetch(this.options.uploadUrl
                                ? this.options.uploadUrl
                                : "".concat(this.options.functionsHost, "/upload"), {
                                method: "POST",
                                mode: "cors",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    id: (_e = event.detail.data) === null || _e === void 0 ? void 0 : _e.id,
                                    path: (_f = event.detail.data) === null || _f === void 0 ? void 0 : _f.path,
                                    fileName: (_g = event.detail.data) === null || _g === void 0 ? void 0 : _g.fileName,
                                    file: (_h = event.detail.data) === null || _h === void 0 ? void 0 : _h.encodedContent,
                                    type: (_j = event.detail.data) === null || _j === void 0 ? void 0 : _j.type
                                })
                            })];
                    case 2:
                        response = _v.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _v.sent();
                        event.target.value = data.url;
                        _q = (_p = document.body).dispatchEvent;
                        _r = CustomEvent.bind;
                        _s = [void 0, "fireenjinSuccess"];
                        _t = {};
                        _u = {
                            event: event.detail.event
                        };
                        return [4 /*yield*/, (0, setComponentProps_1["default"])((_k = event === null || event === void 0 ? void 0 : event.detail) === null || _k === void 0 ? void 0 : _k.dataPropsMap, data)];
                    case 4:
                        _q.apply(_p, [new (_r.apply(CustomEvent, _s.concat([(_t.detail = (_u.data = _v.sent(),
                                    _u.target = event.target,
                                    _u.name = event.detail.name,
                                    _u.endpoint = event.detail.endpoint,
                                    _u),
                                    _t)])))()]);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _v.sent();
                        if (this.options.onError && typeof this.options.onError === "function") {
                            this.options.onError(err_1);
                        }
                        document.body.dispatchEvent(new CustomEvent("fireenjinError", {
                            detail: {
                                event: (_l = event === null || event === void 0 ? void 0 : event.detail) === null || _l === void 0 ? void 0 : _l.event,
                                target: event === null || event === void 0 ? void 0 : event.target,
                                error: err_1,
                                name: (_m = event === null || event === void 0 ? void 0 : event.detail) === null || _m === void 0 ? void 0 : _m.name,
                                endpoint: (_o = event === null || event === void 0 ? void 0 : event.detail) === null || _o === void 0 ? void 0 : _o.endpoint
                            }
                        }));
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FireEnjin.prototype.fetch = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function () {
            var cachedData, localKey, data, err_2, response, data, err_3, err_4;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        if (!event ||
                            !event.detail ||
                            !event.detail.endpoint ||
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
                        _l.label = 1;
                    case 1:
                        _l.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, localforage.getItem(localKey)];
                    case 2:
                        cachedData = _l.sent();
                        if (!cachedData) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, setComponentProps_1["default"])((_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.dataPropsMap, cachedData)];
                    case 3:
                        data = _l.sent();
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
                        if (((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.setLoading) &&
                            typeof ((_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.setLoading) === "function") {
                            event.target.setLoading(false);
                        }
                        _l.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _l.sent();
                        console.log(err_2);
                        return [3 /*break*/, 6];
                    case 6:
                        _l.trys.push([6, 13, , 14]);
                        return [4 /*yield*/, this.client.request(event.detail.query, event.detail.params)];
                    case 7:
                        response = _l.sent();
                        return [4 /*yield*/, (0, setComponentProps_1["default"])((_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.dataPropsMap, response)];
                    case 8:
                        data = _l.sent();
                        if (this.options.onSuccess &&
                            typeof this.options.onSuccess === "function") {
                            this.options.onSuccess(response);
                        }
                        if (!(!this.options.disableCache &&
                            (!cachedData || (cachedData && !(0, isEqual_1["default"])(cachedData, response))))) return [3 /*break*/, 12];
                        document.body.dispatchEvent(new CustomEvent("fireenjinSuccess", {
                            detail: {
                                event: (_e = event.detail) === null || _e === void 0 ? void 0 : _e.event,
                                target: event.target,
                                cached: false,
                                data: data,
                                name: event.detail.name,
                                endpoint: event.detail.endpoint
                            }
                        }));
                        _l.label = 9;
                    case 9:
                        _l.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, localforage.setItem(localKey, response)];
                    case 10:
                        _l.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        err_3 = _l.sent();
                        console.log(err_3);
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_4 = _l.sent();
                        if (this.options.onError && typeof this.options.onError === "function") {
                            this.options.onError(err_4);
                        }
                        document.body.dispatchEvent(new CustomEvent("fireenjinError", {
                            detail: {
                                event: (_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.event,
                                target: event === null || event === void 0 ? void 0 : event.target,
                                error: err_4,
                                name: (_g = event === null || event === void 0 ? void 0 : event.detail) === null || _g === void 0 ? void 0 : _g.name,
                                endpoint: (_h = event === null || event === void 0 ? void 0 : event.detail) === null || _h === void 0 ? void 0 : _h.endpoint
                            }
                        }));
                        return [3 /*break*/, 14];
                    case 14:
                        if (((_j = event === null || event === void 0 ? void 0 : event.target) === null || _j === void 0 ? void 0 : _j.setLoading) &&
                            typeof ((_k = event === null || event === void 0 ? void 0 : event.target) === null || _k === void 0 ? void 0 : _k.setLoading) === "function") {
                            event.target.setLoading(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FireEnjin.prototype.submit = function (event) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var data, _h, _j, _k, _l, err_5;
            var _m, _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        if (!event ||
                            !event.detail ||
                            !event.detail.endpoint ||
                            event.detail.disableSubmit)
                            return [2 /*return*/, false];
                        _p.label = 1;
                    case 1:
                        _p.trys.push([1, 3, , 4]);
                        data = null;
                        if (this.options.onSuccess &&
                            typeof this.options.onSuccess === "function") {
                            this.options.onSuccess(data);
                        }
                        _j = (_h = document.body).dispatchEvent;
                        _k = CustomEvent.bind;
                        _l = [void 0, "fireenjinSuccess"];
                        _m = {};
                        _o = {
                            event: (_a = event.detail) === null || _a === void 0 ? void 0 : _a.event
                        };
                        return [4 /*yield*/, (0, setComponentProps_1["default"])((_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.dataPropsMap, data)];
                    case 2:
                        _j.apply(_h, [new (_k.apply(CustomEvent, _l.concat([(_m.detail = (_o.data = _p.sent(),
                                    _o.target = event.target,
                                    _o.name = event.detail.name,
                                    _o.endpoint = event.detail.endpoint,
                                    _o),
                                    _m)])))()]);
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _p.sent();
                        if (this.options.onError && typeof this.options.onError === "function") {
                            this.options.onError(err_5);
                        }
                        document.body.dispatchEvent(new CustomEvent("fireenjinError", {
                            detail: {
                                event: (_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.event,
                                error: err_5,
                                target: event.target,
                                name: (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.name,
                                endpoint: (_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.endpoint
                            }
                        }));
                        return [3 /*break*/, 4];
                    case 4:
                        if (((_f = event === null || event === void 0 ? void 0 : event.target) === null || _f === void 0 ? void 0 : _f.setLoading) &&
                            typeof ((_g = event === null || event === void 0 ? void 0 : event.target) === null || _g === void 0 ? void 0 : _g.setLoading) === "function") {
                            event.target.setLoading(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FireEnjin.prototype.setHeader = function (key, value) {
        if (!this.client)
            return false;
        this.client.setHeader(key, value);
        return true;
    };
    return FireEnjin;
}());
exports["default"] = FireEnjin;
