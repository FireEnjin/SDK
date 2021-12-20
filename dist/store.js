"use strict";
exports.__esModule = true;
exports.onChange = exports.state = void 0;
var store_1 = require("@stencil/store");
var env_1 = require("./helpers/env");
var _a = (0, store_1.createStore)({
    config: (0, env_1["default"])(),
    isOnline: false
}), state = _a.state, onChange = _a.onChange;
exports.state = state;
exports.onChange = onChange;
