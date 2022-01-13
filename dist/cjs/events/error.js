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
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
        const detail = {
            event: input === null || input === void 0 ? void 0 : input.event,
            target: (input === null || input === void 0 ? void 0 : input.target) || ((_a = input === null || input === void 0 ? void 0 : input.event) === null || _a === void 0 ? void 0 : _a.target),
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
        const el = ((_b = input === null || input === void 0 ? void 0 : input.event) === null || _b === void 0 ? void 0 : _b.target) ||
            ((_d = (_c = input === null || input === void 0 ? void 0 : input.event) === null || _c === void 0 ? void 0 : _c.detail) === null || _d === void 0 ? void 0 : _d.target) ||
            ((_g = (_f = (_e = input === null || input === void 0 ? void 0 : input.event) === null || _e === void 0 ? void 0 : _e.detail) === null || _f === void 0 ? void 0 : _f.event) === null || _g === void 0 ? void 0 : _g.target) ||
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
