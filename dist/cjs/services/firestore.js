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
const cleanFirestoreData_1 = __importDefault(require("../helpers/cleanFirestoreData"));
class FirestoreClient {
    constructor(url, options) {
        this.url = url || "http://localhost:4000";
        this.options = Object.assign(Object.assign({}, options), { headers: (options === null || options === void 0 ? void 0 : options.headers) || {} });
        this.db = options === null || options === void 0 ? void 0 : options.db;
    }
    rawRequest(query, variables, requestOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const method = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.method) || "GET";
            const headers = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers) || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.headers) || {};
            const endpoint = query;
            const response = yield (method.toLowerCase() === "post"
                ? this.db.add(endpoint, (0, cleanFirestoreData_1.default)((variables === null || variables === void 0 ? void 0 : variables.data) || {}), variables === null || variables === void 0 ? void 0 : variables.id)
                : method.toLowerCase() === "put"
                    ? this.db.update(endpoint, variables === null || variables === void 0 ? void 0 : variables.id, (0, cleanFirestoreData_1.default)((variables === null || variables === void 0 ? void 0 : variables.data) || {}))
                    : method.toLowerCase() === "delete"
                        ? this.db.delete(endpoint, variables === null || variables === void 0 ? void 0 : variables.id)
                        : (variables === null || variables === void 0 ? void 0 : variables.id)
                            ? this.db.find(endpoint, variables.id)
                            : this.db.list(endpoint, (variables === null || variables === void 0 ? void 0 : variables.where) || [], (variables === null || variables === void 0 ? void 0 : variables.orderBy) || null, (variables === null || variables === void 0 ? void 0 : variables.limit) || null));
            return {
                data: response,
                headers,
                extensions: {
                    query: response === null || response === void 0 ? void 0 : response.query,
                    metadata: response === null || response === void 0 ? void 0 : response.metadata,
                    size: response === null || response === void 0 ? void 0 : response.size,
                },
                status: 200,
            };
        });
    }
    request(endpoint, variables, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.rawRequest(endpoint, variables, requestOptions);
            return (response === null || response === void 0 ? void 0 : response.data) || null;
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
        const headers = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.headers) || {};
        headers[key] = value;
        //@ts-ignore
        this.options.headers = headers;
        return this;
    }
    setHeaders(headers) {
        for (const [key, value] of Object.entries(headers)) {
            this.setHeader(key, value);
        }
        return this;
    }
}
exports.default = FirestoreClient;
