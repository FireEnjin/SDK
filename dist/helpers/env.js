"use strict";
exports.__esModule = true;
var config_1 = require("../config");
function env(key, fallback) {
    var value = !key
        ? config_1["default"]
        : key && key.indexOf(".") >= 0
            ? key.split(".").reduce(function (p, c) { return (p && p[c]) || null; }, config_1["default"])
            : key && typeof config_1["default"][key] !== "undefined"
                ? config_1["default"][key]
                : null;
    return fallback &&
        ((!value && value !== false && value !== 0) ||
            typeof value === "undefined" ||
            value === null)
        ? fallback
        : value;
}
exports["default"] = env;
