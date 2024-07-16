"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mergeSets;
function mergeSets(...args) {
    return new Set(args.reduce((acc, current) => {
        return [...acc, ...current];
    }, []));
}
