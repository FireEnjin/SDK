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
var objectToUrlParams_1 = require("../helpers/objectToUrlParams");
var Client = /** @class */ (function () {
    function Client(url, options) {
        this.url = url || "http://localhost:4000";
        this.options = options || {};
    }
    Client.prototype.rawRequest = function (query, variables, requestOptions) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var method, headers, endpoint, response;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        method = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.method) || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.method) || "GET";
                        headers = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.headers) || {};
                        endpoint = "".concat(this.url, "/").concat(query).concat(method === "get" ? (0, objectToUrlParams_1.default)(variables) : "");
                        return [4 /*yield*/, fetch("".concat(this.url, "/").concat(endpoint), __assign(__assign(__assign({ method: method }, (this.options || {})), (requestOptions || {})), { headers: headers, body: method === "get" ? null : JSON.stringify(variables || {}) }))];
                    case 1:
                        response = _e.sent();
                        _d = {};
                        return [4 /*yield*/, ((_c = response === null || response === void 0 ? void 0 : response.json) === null || _c === void 0 ? void 0 : _c.call(response))];
                    case 2: return [2 /*return*/, (_d.data = (_e.sent()) || null,
                            _d.headers = response.headers,
                            _d.status = response.status,
                            _d.extensions = {},
                            _d)];
                }
            });
        });
    };
    Client.prototype.request = function (endpoint, variables, requestOptions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var method, headers, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        method = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.method) || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.method) || "GET";
                        headers = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.headers) || {};
                        return [4 /*yield*/, fetch("".concat(this.url, "/").concat(endpoint), __assign(__assign(__assign({ method: method }, (this.options || {})), (requestOptions || {})), { headers: headers, body: (!["get", "post"].includes(method.toLowerCase()) &&
                                    JSON.stringify(variables || {})) ||
                                    null }))];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    Client.prototype.batchRequests = function (documents, requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _i, documents_1, _a, document_1, variables, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        response = {};
                        _i = 0, documents_1 = documents;
                        _e.label = 1;
                    case 1:
                        if (!(_i < documents_1.length)) return [3 /*break*/, 6];
                        _a = documents_1[_i], document_1 = _a.document, variables = _a.variables;
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 4, , 5]);
                        _b = response;
                        _c = document_1;
                        return [4 /*yield*/, this.request(document_1, variables, requestOptions)];
                    case 3:
                        _b[_c] = _e.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _d = _e.sent();
                        response[document_1] = null;
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, response];
                }
            });
        });
    };
    Client.prototype.setEndpoint = function (value) {
        this.url = value;
        return true;
    };
    Client.prototype.setHeader = function (key, value) {
        var _a;
        if (!this.options)
            this.options = {};
        if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.headers))
            this.options.headers = {};
        this.options.headers[key] = value;
        return this;
    };
    Client.prototype.setHeaders = function (headers) {
        for (var _i = 0, _a = Object.entries(headers); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this.setHeader(key, value);
        }
        return this;
    };
    return Client;
}());
exports.default = Client;
