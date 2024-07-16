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
exports.default = setComponentProps;
function setComponentProps(dataPropsMap, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let newData = data ? data : {};
        if (dataPropsMap) {
            const dataKeys = Object.keys(dataPropsMap);
            for (const key of dataKeys) {
                try {
                    newData[dataPropsMap[key]] = key
                        .split(".")
                        .reduce((o, i) => o[i], data);
                }
                catch (e) {
                    continue;
                }
            }
        }
        return newData;
    });
}
