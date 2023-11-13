"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireEnjinModel = exports.FireEnjin = exports.SessionService = exports.DatabaseService = exports.AuthService = void 0;
var auth_1 = require("./services/auth");
exports.AuthService = auth_1.default;
var database_1 = require("./services/database");
exports.DatabaseService = database_1.default;
var fireenjin_1 = require("./services/fireenjin");
exports.FireEnjin = fireenjin_1.default;
var session_1 = require("./services/session");
exports.SessionService = session_1.default;
var model_1 = require("./services/model");
exports.FireEnjinModel = model_1.default;
try {
    if (window && !window.FireEnjin) {
        window.FireEnjin = fireenjin_1.default;
    }
}
catch (error) {
    console.log(error);
}
