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
    create(data_1, _a) {
        return __awaiter(this, arguments, void 0, function* (data, { id, params, query, endpoint, }) {
            var _b;
            return this.fireenjin.submit(endpoint || ((_b = this.endpoints) === null || _b === void 0 ? void 0 : _b.create) || this.endpoint || "", { data, id, params, query });
        });
    }
    find(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { params, query, endpoint, }) {
            var _b;
            return this.fireenjin.fetch(endpoint || ((_b = this.endpoints) === null || _b === void 0 ? void 0 : _b.find) || this.endpoint || "", { id, params, query });
        });
    }
    update(id_1, data_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, data, { params, query, endpoint, }) {
            var _b;
            return this.fireenjin.submit(endpoint || ((_b = this.endpoints) === null || _b === void 0 ? void 0 : _b.update) || this.endpoint || "", { data, id, params, query });
        });
    }
    delete(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { params, query, endpoint, }) {
            var _b;
            return yield this.fireenjin.submit(id, {
                endpoint: endpoint || ((_b = this.endpoints) === null || _b === void 0 ? void 0 : _b.delete) || this.endpoint || "",
                params,
                query,
            });
        });
    }
    list(_a) {
        return __awaiter(this, arguments, void 0, function* ({ params, query, endpoint, }) {
            var _b;
            return this.fireenjin.fetch(endpoint || ((_b = this.endpoints) === null || _b === void 0 ? void 0 : _b.list) || this.endpoint || "", { params, query });
        });
    }
}
exports.default = Model;
