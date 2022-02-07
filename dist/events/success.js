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
var setComponentProps_1 = require("../helpers/setComponentProps");
function fireenjinSuccess(input, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var detail, _b, _c, el;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    detail = {
                        event: input === null || input === void 0 ? void 0 : input.event,
                        target: (input === null || input === void 0 ? void 0 : input.target) || ((_a = input === null || input === void 0 ? void 0 : input.event) === null || _a === void 0 ? void 0 : _a.target),
                        data: (input === null || input === void 0 ? void 0 : input.data) || null,
                        name: input === null || input === void 0 ? void 0 : input.name,
                        endpoint: input === null || input === void 0 ? void 0 : input.endpoint,
                        bubbles: !!(input === null || input === void 0 ? void 0 : input.bubbles),
                        cancelable: !!(input === null || input === void 0 ? void 0 : input.cancelable),
                        composed: !!(input === null || input === void 0 ? void 0 : input.composed),
                        cached: !!(input === null || input === void 0 ? void 0 : input.cached)
                    };
                    if (!(input === null || input === void 0 ? void 0 : input.dataPropsMap)) return [3 /*break*/, 4];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    _b = detail;
                    return [4 /*yield*/, (0, setComponentProps_1["default"])(input === null || input === void 0 ? void 0 : input.dataPropsMap, input === null || input === void 0 ? void 0 : input.data)];
                case 2:
                    _b.data = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _c = _d.sent();
                    console.log("Error setting data props");
                    if (typeof (options === null || options === void 0 ? void 0 : options.onError) === "function")
                        options.onError(detail);
                    return [3 /*break*/, 4];
                case 4:
                    if (typeof (options === null || options === void 0 ? void 0 : options.onSuccess) === "function")
                        options.onSuccess(detail);
                    el = (detail === null || detail === void 0 ? void 0 : detail.target) || document;
                    el.dispatchEvent(new CustomEvent("fireenjinSuccess", {
                        detail: detail,
                        bubbles: !!(input === null || input === void 0 ? void 0 : input.bubbles),
                        cancelable: !!(input === null || input === void 0 ? void 0 : input.cancelable),
                        composed: !!(input === null || input === void 0 ? void 0 : input.composed)
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = fireenjinSuccess;