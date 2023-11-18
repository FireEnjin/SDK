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
const error_1 = __importDefault(require("../events/error"));
const success_1 = __importDefault(require("../events/success"));
function tryOrFail(fn, options) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const baseData = {
            cached: !!(options === null || options === void 0 ? void 0 : options.cached),
            event: options === null || options === void 0 ? void 0 : options.event,
            name: options === null || options === void 0 ? void 0 : options.name,
            endpoint: options === null || options === void 0 ? void 0 : options.endpoint,
            bubbles: (_a = options === null || options === void 0 ? void 0 : options.bubbles) !== null && _a !== void 0 ? _a : true,
            cancelable: (_b = options === null || options === void 0 ? void 0 : options.cancelable) !== null && _b !== void 0 ? _b : true,
            composed: !!(options === null || options === void 0 ? void 0 : options.composed),
            target: (options === null || options === void 0 ? void 0 : options.target) || ((_c = options === null || options === void 0 ? void 0 : options.event) === null || _c === void 0 ? void 0 : _c.target),
        };
        try {
            const data = yield fn();
            if (typeof (options === null || options === void 0 ? void 0 : options.callback) === "function")
                yield options.callback(data);
            yield (0, success_1.default)(Object.assign(Object.assign({}, baseData), { data }), {
                onSuccess: options === null || options === void 0 ? void 0 : options.onSuccess,
                onError: options === null || options === void 0 ? void 0 : options.onError,
            });
            return data;
        }
        catch (error) {
            if (typeof (options === null || options === void 0 ? void 0 : options.callback) === "function")
                yield options.callback(undefined, error);
            yield (0, error_1.default)(Object.assign(Object.assign({}, baseData), { error }), {
                onError: options === null || options === void 0 ? void 0 : options.onError,
            });
            return;
        }
    });
}
exports.default = tryOrFail;
