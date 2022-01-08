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
var error_1 = require("../events/error");
var success_1 = require("../events/success");
function tryOrFail(fn, context, options) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 3, , 5]);
                    return [4 /*yield*/, fn.apply(context)];
                case 1:
                    data = _h.sent();
                    return [4 /*yield*/, (0, success_1["default"])({
                            cached: !!(options === null || options === void 0 ? void 0 : options.cached),
                            event: (_a = options === null || options === void 0 ? void 0 : options.event.detail) === null || _a === void 0 ? void 0 : _a.event,
                            data: data,
                            name: options === null || options === void 0 ? void 0 : options.event.detail.name,
                            endpoint: options === null || options === void 0 ? void 0 : options.event.detail.endpoint
                        }, {
                            onSuccess: options === null || options === void 0 ? void 0 : options.onSuccess
                        })];
                case 2:
                    _h.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_2 = _h.sent();
                    return [4 /*yield*/, (0, error_1["default"])({
                            cached: !!(options === null || options === void 0 ? void 0 : options.cached),
                            event: (_c = (_b = options === null || options === void 0 ? void 0 : options.event) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.event,
                            error: error_2,
                            name: (_e = (_d = options === null || options === void 0 ? void 0 : options.event) === null || _d === void 0 ? void 0 : _d.detail) === null || _e === void 0 ? void 0 : _e.name,
                            endpoint: (_g = (_f = options === null || options === void 0 ? void 0 : options.event) === null || _f === void 0 ? void 0 : _f.detail) === null || _g === void 0 ? void 0 : _g.endpoint
                        }, {
                            onError: options === null || options === void 0 ? void 0 : options.onError
                        })];
                case 4:
                    _h.sent();
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = tryOrFail;
