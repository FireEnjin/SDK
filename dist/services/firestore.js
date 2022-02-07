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
var FirestoreClient = /** @class */ (function () {
    function FirestoreClient(url, options) {
        this.url = url || "http://localhost:4000";
        this.options = __assign(__assign({}, options), { headers: (options === null || options === void 0 ? void 0 : options.headers) || {} });
        this.db = options === null || options === void 0 ? void 0 : options.db;
    }
    FirestoreClient.prototype.rawRequest = function (query, variables, requestOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var method, headers, endpoint, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        method = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.method) || "GET";
                        headers = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers) || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.headers) || {};
                        endpoint = query;
                        return [4 /*yield*/, (method.toLowerCase() === "post"
                                ? this.db.add(endpoint, (variables === null || variables === void 0 ? void 0 : variables.data) || {}, variables === null || variables === void 0 ? void 0 : variables.id)
                                : method.toLowerCase() === "put"
                                    ? this.db.update(endpoint, (variables === null || variables === void 0 ? void 0 : variables.data) || {}, variables === null || variables === void 0 ? void 0 : variables.id)
                                    : method.toLowerCase() === "delete"
                                        ? this.db["delete"](endpoint, variables === null || variables === void 0 ? void 0 : variables.id)
                                        : (variables === null || variables === void 0 ? void 0 : variables.id)
                                            ? this.db.find(endpoint, variables.id)
                                            : this.db.list(endpoint, (variables === null || variables === void 0 ? void 0 : variables.where) || [], (variables === null || variables === void 0 ? void 0 : variables.orderBy) || null, (variables === null || variables === void 0 ? void 0 : variables.limit) || null))];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, {
                                data: response,
                                headers: headers,
                                extensions: {
                                    query: response === null || response === void 0 ? void 0 : response.query,
                                    metadata: response === null || response === void 0 ? void 0 : response.metadata,
                                    size: response === null || response === void 0 ? void 0 : response.size
                                },
                                status: 200
                            }];
                }
            });
        });
    };
    FirestoreClient.prototype.request = function (endpoint, variables, requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rawRequest(endpoint, variables, requestOptions)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, (response === null || response === void 0 ? void 0 : response.data) || null];
                }
            });
        });
    };
    FirestoreClient.prototype.batchRequests = function (documents, requestOptions) {
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
    FirestoreClient.prototype.setEndpoint = function (value) {
        this.url = value;
        return true;
    };
    FirestoreClient.prototype.setHeader = function (key, value) {
        var _a;
        var headers = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.headers) || {};
        headers[key] = value;
        //@ts-ignore
        this.options.headers = headers;
        return this;
    };
    FirestoreClient.prototype.setHeaders = function (headers) {
        for (var _i = 0, _a = Object.entries(headers); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this.setHeader(key, value);
        }
        return this;
    };
    return FirestoreClient;
}());
exports["default"] = FirestoreClient;
