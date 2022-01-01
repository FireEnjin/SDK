"use strict";
exports.__esModule = true;
require("isomorphic-unfetch");
var Client = /** @class */ (function () {
    function Client(options) {
        this.options = options || {};
    }
    Client.prototype.get = function (url, requestOptions) {
        return fetch(url, requestOptions);
    };
    return Client;
}());
exports["default"] = Client;
