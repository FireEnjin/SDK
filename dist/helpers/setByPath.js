"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setByPath;
var isNumeric_1 = require("./isNumeric");
function setByPath(obj, path, value) {
    var pList = path.split(".");
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
        var nextElemIsArray = (0, isNumeric_1.default)(pList[i + 1]);
        var elem = pList[i];
        if (!obj[elem])
            obj[elem] = nextElemIsArray ? [] : {};
        obj = obj[elem];
    }
    obj[pList[len - 1]] = value;
    return obj;
}
