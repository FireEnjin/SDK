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
function cleanFirestoreData(input) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const data = input;
        for (const key of Object.keys(input)) {
            const value = input[key];
            if (!value)
                continue;
            try {
                if (((_a = value === null || value === void 0 ? void 0 : value.constructor) === null || _a === void 0 ? void 0 : _a.name) === "Object") {
                    data[key] = yield cleanFirestoreData(value);
                }
                else if (((_b = value === null || value === void 0 ? void 0 : value.constructor) === null || _b === void 0 ? void 0 : _b.name) === "DocumentReference") {
                    data[key] = { id: value.id };
                }
                else if (((_c = value === null || value === void 0 ? void 0 : value.constructor) === null || _c === void 0 ? void 0 : _c.name) === "Timestamp") {
                    data[key] = value.toDate();
                }
                else if (((_d = value === null || value === void 0 ? void 0 : value.constructor) === null || _d === void 0 ? void 0 : _d.name) === "Array") {
                    const cleanArray = [];
                    for (const item of data[key]) {
                        cleanArray.push(yield cleanFirestoreData(item));
                    }
                    data[key] = cleanArray;
                }
                else if (typeof value === "object" &&
                    ((_e = value === null || value === void 0 ? void 0 : value.constructor) === null || _e === void 0 ? void 0 : _e.name) !== "Date") {
                    data[key] = yield cleanFirestoreData(JSON.parse(JSON.stringify(value)));
                }
            }
            catch (err) {
                delete data[key];
            }
        }
        return JSON.parse(JSON.stringify(data));
    });
}
exports.default = cleanFirestoreData;
