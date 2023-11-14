"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mergeSets(...args) {
    return new Set(args.reduce((acc, current) => {
        return [...acc, ...current];
    }, []));
}
exports.default = mergeSets;
