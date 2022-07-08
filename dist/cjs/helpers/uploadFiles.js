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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("firebase/storage");
const getExtension_1 = __importDefault(require("./getExtension"));
function uploadFiles(app, files, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        const storage = (0, storage_1.getStorage)(app);
        for (const file of files) {
            try {
                const storageRef = (0, storage_1.ref)(storage, `/${(options === null || options === void 0 ? void 0 : options.path) || ""}${new Date().toISOString()}.${yield (0, getExtension_1.default)(file === null || file === void 0 ? void 0 : file.name)}`);
                const upload = yield (0, storage_1.uploadBytes)(storageRef, file);
                const url = yield (0, storage_1.getDownloadURL)(upload.ref);
                results.push({
                    success: true,
                    name: file === null || file === void 0 ? void 0 : file.name,
                    url,
                });
            }
            catch (error) {
                results.push({ success: false, error });
            }
        }
        return results;
    });
}
exports.default = uploadFiles;
