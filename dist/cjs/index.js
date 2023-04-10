"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireEnjinModel = exports.FireEnjin = exports.SessionService = exports.DatabaseService = exports.AuthService = void 0;
const auth_1 = __importDefault(require("./services/auth"));
exports.AuthService = auth_1.default;
const database_1 = __importDefault(require("./services/database"));
exports.DatabaseService = database_1.default;
const fireenjin_1 = __importDefault(require("./services/fireenjin"));
exports.FireEnjin = fireenjin_1.default;
const session_1 = __importDefault(require("./services/session"));
exports.SessionService = session_1.default;
const model_1 = __importDefault(require("./services/model"));
exports.FireEnjinModel = model_1.default;
try {
    if (window && !window.FireEnjin) {
        window.FireEnjin = fireenjin_1.default;
    }
}
catch (error) {
    console.log(error);
}
