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
var success_1 = require("../events/success");
var tryOrFail_1 = require("../helpers/tryOrFail");
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
            ? new options.getSdk(clientOptions, options === null || options === void 0 ? void 0 : options.onRequest)
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
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_g) {
                if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onUpload) === "function")
                    this.options.onUpload(event);
                if (!((_c = (_b = event.detail) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.encodedContent) ||
                    typeof ((_d = this.options) === null || _d === void 0 ? void 0 : _d.onUpload) === "function")
                    return [2 /*return*/, false];
                return [2 /*return*/, (0, tryOrFail_1["default"])(function () { return __awaiter(_this, void 0, void 0, function () {
                        var data;
                        var _a, _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0: return [4 /*yield*/, this.client.request(this.options.uploadUrl
                                        ? this.options.uploadUrl
                                        : "".concat(this.options.functionsHost, "/upload"), {
                                        method: "POST",
                                        mode: "cors",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            id: (_a = event.detail.data) === null || _a === void 0 ? void 0 : _a.id,
                                            path: (_b = event.detail.data) === null || _b === void 0 ? void 0 : _b.path,
                                            fileName: (_c = event.detail.data) === null || _c === void 0 ? void 0 : _c.fileName,
                                            file: (_d = event.detail.data) === null || _d === void 0 ? void 0 : _d.encodedContent,
                                            type: (_e = event.detail.data) === null || _e === void 0 ? void 0 : _e.type
                                        })
                                    })];
                                case 1:
                                    data = _f.sent();
                                    if (event === null || event === void 0 ? void 0 : event.target)
                                        event.target.value = data.url;
                                    return [2 /*return*/, data];
                            }
                        });
                    }); }, {
                        onError: (_e = this.options) === null || _e === void 0 ? void 0 : _e.onError,
                        onSuccess: (_f = this.options) === null || _f === void 0 ? void 0 : _f.onSuccess
                    })];
            });
        });
    };
    FireEnjin.prototype.fetch = function (event) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var cachedData, localKey, err_1;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
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
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, localforage.getItem(localKey)];
                    case 2:
                        cachedData = _e.sent();
                        if (!cachedData) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, success_1["default"])({
                                event: event.detail.event,
                                dataPropsMap: (_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.dataPropsMap,
                                cached: true,
                                data: cachedData,
                                name: event.detail.name,
                                endpoint: event.detail.endpoint
                            }, {
                                onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess
                            })];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _e.sent();
                        console.log(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, (0, tryOrFail_1["default"])(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, this.client.get(event.detail.endpoint)];
                            });
                        }); }, {
                            onError: (_c = this.options) === null || _c === void 0 ? void 0 : _c.onError,
                            onSuccess: (_d = this.options) === null || _d === void 0 ? void 0 : _d.onSuccess
                        })];
                }
            });
        });
    };
    FireEnjin.prototype.submit = function (event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_c) {
                if (!event ||
                    !event.detail ||
                    !event.detail.endpoint ||
                    event.detail.disableSubmit)
                    return [2 /*return*/, false];
                return [2 /*return*/, (0, tryOrFail_1["default"])(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            return [2 /*return*/, this.client.request(event.detail.endpoint, (_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.data)];
                        });
                    }); }, {
                        onError: (_a = this.options) === null || _a === void 0 ? void 0 : _a.onError,
                        onSuccess: (_b = this.options) === null || _b === void 0 ? void 0 : _b.onSuccess
                    })];
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
