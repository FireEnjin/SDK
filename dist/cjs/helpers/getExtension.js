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
exports.default = getExtension;
function getExtension(path) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        var basename = path.split(/[\\/]/).pop(), // extract file name from full path ...
        // (supports `\\` and `/` separators)
        pos = ((_a = basename === null || basename === void 0 ? void 0 : basename.lastIndexOf) === null || _a === void 0 ? void 0 : _a.call(basename, ".")) || 0; // get last position of `.`
        if (basename === "" || pos < 1)
            // if file name is empty or ...
            return ""; //  `.` not found (-1) or comes first (0)
        return (_b = basename === null || basename === void 0 ? void 0 : basename.slice) === null || _b === void 0 ? void 0 : _b.call(basename, pos + 1); // extract extension ignoring `.`
    });
}
