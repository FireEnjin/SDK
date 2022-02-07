"use strict";
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
const objectToUrlParams_1 = __importDefault(require("../helpers/objectToUrlParams"));
class Client {
    constructor(url, options) {
        this.url = url || "http://localhost:4000";
        this.options = options || {};
    }
    rawRequest(query, variables, requestOptions) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const method = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.method) || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.method) || "GET";
            const headers = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.headers) || {};
            const endpoint = `${this.url}/${query}${method === "get" ? (0, objectToUrlParams_1.default)(variables) : ""}`;
            const response = yield fetch(`${this.url}/${endpoint}`, Object.assign(Object.assign(Object.assign({ method }, (this.options || {})), (requestOptions || {})), { headers, body: method === "get" ? null : JSON.stringify(variables || {}) }));
            return {
                data: (yield ((_c = response === null || response === void 0 ? void 0 : response.json) === null || _c === void 0 ? void 0 : _c.call(response))) || null,
                headers: response.headers,
                status: response.status,
                extensions: {},
            };
        });
    }
    request(endpoint, variables, requestOptions) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const method = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.method) || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.method) || "GET";
            const headers = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.headers) || {};
            const response = yield fetch(`${this.url}/${endpoint}`, Object.assign(Object.assign(Object.assign({ method }, (this.options || {})), (requestOptions || {})), { headers, body: (!["get", "post"].includes(method.toLowerCase()) &&
                    JSON.stringify(variables || {})) ||
                    null }));
            return response.json();
        });
    }
    batchRequests(documents, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {};
            for (const { document, variables } of documents) {
                try {
                    response[document] = yield this.request(document, variables, requestOptions);
                }
                catch (_a) {
                    response[document] = null;
                }
            }
            return response;
        });
    }
    setEndpoint(value) {
        this.url = value;
        return true;
    }
    setHeader(key, value) {
        var _a;
        if (!this.options)
            this.options = {};
        if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.headers))
            this.options.headers = {};
        this.options.headers[key] = value;
        return this;
    }
    setHeaders(headers) {
        for (const [key, value] of Object.entries(headers)) {
            this.setHeader(key, value);
        }
        return this;
    }
}
exports.default = Client;
