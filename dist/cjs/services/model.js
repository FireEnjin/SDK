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
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor({ fireenjin, endpoint, endpoints, }) {
        this.fireenjin = fireenjin;
        this.endpoint = endpoint;
        this.endpoints = endpoints;
    }
    create(data, { id, params, query, endpoint, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return this.fireenjin.submit(endpoint || ((_a = this.endpoints) === null || _a === void 0 ? void 0 : _a.create) || this.endpoint || "", { data, id, params, query });
        });
    }
    find(id, { params, query, endpoint, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return this.fireenjin.fetch(endpoint || ((_a = this.endpoints) === null || _a === void 0 ? void 0 : _a.find) || this.endpoint || "", { id, params, query });
        });
    }
    update(id, data, { params, query, endpoint, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return this.fireenjin.submit(endpoint || ((_a = this.endpoints) === null || _a === void 0 ? void 0 : _a.update) || this.endpoint || "", { data, id, params, query });
        });
    }
    delete(id, { params, query, endpoint, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fireenjin.submit(id, {
                endpoint: endpoint || ((_a = this.endpoints) === null || _a === void 0 ? void 0 : _a.delete) || this.endpoint || "",
                params,
                query,
            });
        });
    }
    list({ params, query, endpoint, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return this.fireenjin.fetch(endpoint || ((_a = this.endpoints) === null || _a === void 0 ? void 0 : _a.list) || this.endpoint || "", { params, query });
        });
    }
}
exports.default = Model;
