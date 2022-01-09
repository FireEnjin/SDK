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
const localforage_1 = __importDefault(require("localforage"));
class Queue {
    constructor(options) {
        var _a, _b, _c;
        this.queue = [];
        this.history = [];
        this.historyLimit = 0;
        this.localKey = (options === null || options === void 0 ? void 0 : options.localKey) || "fireenjin:queue";
        this.queue = (options === null || options === void 0 ? void 0 : options.queue) || [];
        this.historyLimit = (options === null || options === void 0 ? void 0 : options.historyLimit) || 0;
        this.history = (options === null || options === void 0 ? void 0 : options.history) || [];
        if (!this.history) {
            (_c = (_b = (_a = localforage_1.default === null || localforage_1.default === void 0 ? void 0 : localforage_1.default.getItem) === null || _a === void 0 ? void 0 : _a.call(localforage_1.default, `${this.localKey}:history`)) === null || _b === void 0 ? void 0 : _b.then) === null || _c === void 0 ? void 0 : _c.call(_b, (data) => {
                console.log(data);
            });
        }
    }
    add(item) {
        this.queue.push(item);
        return this;
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const processed = [];
            for (const item of this.queue) {
                processed.push({
                    createdAt: new Date().toISOString(),
                    data: yield item,
                });
            }
            this.history = [...this.history, ...processed];
            yield localforage_1.default.setItem(`${this.localKey}:history`, this.history);
            return processed;
        });
    }
}
exports.default = Queue;
