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
exports.__esModule = true;
function cleanFirestoreData(input) {
    var toPlainFirestoreObject = function (o) {
        if (o &&
            typeof o === "object" &&
            !Array.isArray(o) &&
            !isFirestoreTimestamp(o)) {
            return __assign({}, Object.keys(o).reduce(function (a, c) { return ((a[c] = toPlainFirestoreObject(o[c])), a); }, {}));
        }
        return o;
    };
    function isFirestoreTimestamp(o) {
        if (o &&
            Object.getPrototypeOf(o).toMillis &&
            Object.getPrototypeOf(o).constructor.name === "Timestamp") {
            return true;
        }
        return false;
    }
    return toPlainFirestoreObject(input);
}
exports["default"] = cleanFirestoreData;
