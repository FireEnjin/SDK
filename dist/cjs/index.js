"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireEnjin = exports.SessionService = exports.DatabaseService = exports.AuthService = void 0;
const auth_1 = __importDefault(require("./services/auth"));
exports.AuthService = auth_1.default;
const database_1 = __importDefault(require("./services/database"));
exports.DatabaseService = database_1.default;
const fireenjin_1 = require("./services/fireenjin");
Object.defineProperty(exports, "FireEnjin", { enumerable: true, get: function () { return fireenjin_1.FireEnjin; } });
const session_1 = __importDefault(require("./services/session"));
exports.SessionService = session_1.default;
if (window && !window.FireEnjin) {
    window.FireEnjin = fireenjin_1.FireEnjin;
}
