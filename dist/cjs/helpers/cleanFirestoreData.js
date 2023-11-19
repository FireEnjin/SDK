"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanFirestoreData(input, keepDocumentReferenceId = false, removeDates = false) {
    var _a, _b;
    const data = typeof input === "object" ? Object.assign({}, input) : input;
    for (const key of Object.keys(input)) {
        const value = input[key];
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
                const cleanArray = [];
                for (const item of data[key]) {
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
exports.default = cleanFirestoreData;
