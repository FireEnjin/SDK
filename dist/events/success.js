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
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var detail, el;
        var _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _g = {
                        event: input === null || input === void 0 ? void 0 : input.event
                    };
                    return [4 /*yield*/, (0, setComponentProps_1["default"])(input === null || input === void 0 ? void 0 : input.dataPropsMap, input === null || input === void 0 ? void 0 : input.data)];
                case 1:
                    detail = (_g.data = _h.sent(),
                        _g.name = input === null || input === void 0 ? void 0 : input.name,
                        _g.endpoint = input === null || input === void 0 ? void 0 : input.endpoint,
                        _g.bubbles = !!(input === null || input === void 0 ? void 0 : input.bubbles),
                        _g.cancelable = !!(input === null || input === void 0 ? void 0 : input.cancelable),
                        _g.composed = !!(input === null || input === void 0 ? void 0 : input.composed),
                        _g.cached = !!(input === null || input === void 0 ? void 0 : input.cached),
                        _g);
                    if (typeof (options === null || options === void 0 ? void 0 : options.onSuccess) === "function")
                        options.onSuccess(detail);
                    el = ((_a = input === null || input === void 0 ? void 0 : input.event) === null || _a === void 0 ? void 0 : _a.target) ||
                        ((_c = (_b = input === null || input === void 0 ? void 0 : input.event) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.target) ||
                        ((_f = (_e = (_d = input === null || input === void 0 ? void 0 : input.event) === null || _d === void 0 ? void 0 : _d.detail) === null || _e === void 0 ? void 0 : _e.event) === null || _f === void 0 ? void 0 : _f.target) ||
                        document;
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
