"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isNumeric;
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
