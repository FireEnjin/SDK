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
function cleanFirestoreData(input) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var data, _i, _f, key, value, _g, _h, cleanArray, _j, _k, item, _l, _m, _o, _p, err_1;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    data = input;
                    _i = 0, _f = Object.keys(input);
                    _q.label = 1;
                case 1:
                    if (!(_i < _f.length)) return [3 /*break*/, 16];
                    key = _f[_i];
                    value = input[key];
                    if (!value)
                        return [3 /*break*/, 15];
                    _q.label = 2;
                case 2:
                    _q.trys.push([2, 14, , 15]);
                    if (!(((_a = value === null || value === void 0 ? void 0 : value.constructor) === null || _a === void 0 ? void 0 : _a.name) === "Object")) return [3 /*break*/, 4];
                    _g = data;
                    _h = key;
                    return [4 /*yield*/, cleanFirestoreData(value)];
                case 3:
                    _g[_h] = _q.sent();
                    return [3 /*break*/, 13];
                case 4:
                    if (!(((_b = value === null || value === void 0 ? void 0 : value.constructor) === null || _b === void 0 ? void 0 : _b.name) === "DocumentReference")) return [3 /*break*/, 5];
                    data[key] = { id: value.id };
                    return [3 /*break*/, 13];
                case 5:
                    if (!(((_c = value === null || value === void 0 ? void 0 : value.constructor) === null || _c === void 0 ? void 0 : _c.name) === "Timestamp")) return [3 /*break*/, 6];
                    data[key] = value.toDate();
                    return [3 /*break*/, 13];
                case 6:
                    if (!(((_d = value === null || value === void 0 ? void 0 : value.constructor) === null || _d === void 0 ? void 0 : _d.name) === "Array")) return [3 /*break*/, 11];
                    cleanArray = [];
                    _j = 0, _k = data[key];
                    _q.label = 7;
                case 7:
                    if (!(_j < _k.length)) return [3 /*break*/, 10];
                    item = _k[_j];
                    _m = (_l = cleanArray).push;
                    return [4 /*yield*/, cleanFirestoreData(item)];
                case 8:
                    _m.apply(_l, [_q.sent()]);
                    _q.label = 9;
                case 9:
                    _j++;
                    return [3 /*break*/, 7];
                case 10:
                    data[key] = cleanArray;
                    return [3 /*break*/, 13];
                case 11:
                    if (!(typeof value === "object" &&
                        ((_e = value === null || value === void 0 ? void 0 : value.constructor) === null || _e === void 0 ? void 0 : _e.name) !== "Date")) return [3 /*break*/, 13];
                    _o = data;
                    _p = key;
                    return [4 /*yield*/, cleanFirestoreData(JSON.parse(JSON.stringify(value)))];
                case 12:
                    _o[_p] = _q.sent();
                    _q.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    err_1 = _q.sent();
                    delete data[key];
                    return [3 /*break*/, 15];
                case 15:
                    _i++;
                    return [3 /*break*/, 1];
                case 16: return [2 /*return*/, JSON.parse(JSON.stringify(data))];
            }
        });
    });
}
exports["default"] = cleanFirestoreData;
