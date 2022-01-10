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
function fireenjinError(input, options) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        const detail = {
            event: input === null || input === void 0 ? void 0 : input.event,
            error: input === null || input === void 0 ? void 0 : input.error,
            name: input === null || input === void 0 ? void 0 : input.name,
            endpoint: input === null || input === void 0 ? void 0 : input.endpoint,
            bubbles: !!(input === null || input === void 0 ? void 0 : input.bubbles),
            cancelable: !!(input === null || input === void 0 ? void 0 : input.cancelable),
            composed: !!(input === null || input === void 0 ? void 0 : input.composed),
            cached: !!(input === null || input === void 0 ? void 0 : input.cached),
        };
        if (typeof (options === null || options === void 0 ? void 0 : options.onError) === "function")
            options.onError(detail);
        const el = ((_a = input === null || input === void 0 ? void 0 : input.event) === null || _a === void 0 ? void 0 : _a.target) ||
            ((_c = (_b = input === null || input === void 0 ? void 0 : input.event) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.target) ||
            ((_f = (_e = (_d = input === null || input === void 0 ? void 0 : input.event) === null || _d === void 0 ? void 0 : _d.detail) === null || _e === void 0 ? void 0 : _e.event) === null || _f === void 0 ? void 0 : _f.target) ||
            document;
        el.dispatchEvent(new CustomEvent("fireenjinError", {
            detail,
            bubbles: !!(input === null || input === void 0 ? void 0 : input.bubbles),
            cancelable: !!(input === null || input === void 0 ? void 0 : input.cancelable),
            composed: !!(input === null || input === void 0 ? void 0 : input.composed),
        }));
    });
}
exports.default = fireenjinError;
