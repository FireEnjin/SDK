"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cleanFirestoreData;
function cleanFirestoreData(input, keepDocumentReferenceId, removeDates) {
    var _a, _b;
    if (keepDocumentReferenceId === void 0) { keepDocumentReferenceId = false; }
    if (removeDates === void 0) { removeDates = false; }
    var data = typeof input === "object" ? __assign({}, input) : input;
    for (var _i = 0, _c = Object.keys(input); _i < _c.length; _i++) {
        var key = _c[_i];
        var value = input[key];
        if (!value)
            continue;
        try {
            if (typeof (value === null || value === void 0 ? void 0 : value.firestore) === "object") {
                keepDocumentReferenceId
                    ? (data[key] = { id: value.id })
                    : delete data[key];
            }
            else if (removeDates && typeof (value === null || value === void 0 ? void 0 : value.toISOString) === "function") {
                data[key] = new Date().toISOString();
            }
            else if (typeof (value === null || value === void 0 ? void 0 : value.toDate) === "function") {
                data[key] = value.toDate();
                if (removeDates)
                    data[key] = data[key].toISOString();
            }
            else if (((_a = value === null || value === void 0 ? void 0 : value.constructor) === null || _a === void 0 ? void 0 : _a.name) === "Array") {
                var cleanArray = [];
                for (var _d = 0, _e = data[key]; _d < _e.length; _d++) {
                    var item = _e[_d];
                    cleanArray.push(cleanFirestoreData(item));
                }
                data[key] = cleanArray;
            }
            else if (((_b = value === null || value === void 0 ? void 0 : value.constructor) === null || _b === void 0 ? void 0 : _b.name) === "Object") {
                data[key] = cleanFirestoreData(value);
            }
        }
        catch (err) {
            delete data[key];
        }
    }
    return JSON.parse(JSON.stringify(data));
}
