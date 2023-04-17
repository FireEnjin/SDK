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
const setComponentProps_1 = __importDefault(require("../helpers/setComponentProps"));
function fireenjinSuccess(input, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const detail = {
            event: input === null || input === void 0 ? void 0 : input.event,
            target: (input === null || input === void 0 ? void 0 : input.target) || ((_a = input === null || input === void 0 ? void 0 : input.event) === null || _a === void 0 ? void 0 : _a.target),
            data: (input === null || input === void 0 ? void 0 : input.data) || null,
            name: input === null || input === void 0 ? void 0 : input.name,
            endpoint: input === null || input === void 0 ? void 0 : input.endpoint,
            bubbles: !!(input === null || input === void 0 ? void 0 : input.bubbles),
            cancelable: !!(input === null || input === void 0 ? void 0 : input.cancelable),
            composed: !!(input === null || input === void 0 ? void 0 : input.composed),
            cached: !!(input === null || input === void 0 ? void 0 : input.cached),
        };
        console.log("try or fail - before: ", detail, input);
        if (input === null || input === void 0 ? void 0 : input.dataPropsMap) {
            try {
                detail.data = yield (0, setComponentProps_1.default)(input === null || input === void 0 ? void 0 : input.dataPropsMap, input === null || input === void 0 ? void 0 : input.data);
            }
            catch (_b) {
                console.log("Error setting data props");
                if (typeof (options === null || options === void 0 ? void 0 : options.onError) === "function")
                    options.onError(detail);
            }
        }
        console.log("try or fail - middle: ", detail, input);
        if (typeof (options === null || options === void 0 ? void 0 : options.onSuccess) === "function")
            options.onSuccess(detail);
        const el = (detail === null || detail === void 0 ? void 0 : detail.target) || document;
        el.dispatchEvent(new CustomEvent("fireenjinSuccess", {
            detail,
            bubbles: !!(input === null || input === void 0 ? void 0 : input.bubbles),
            cancelable: !!(input === null || input === void 0 ? void 0 : input.cancelable),
            composed: !!(input === null || input === void 0 ? void 0 : input.composed),
        }));
        console.log("try or fail - after: ", el, detail, input);
    });
}
exports.default = fireenjinSuccess;
