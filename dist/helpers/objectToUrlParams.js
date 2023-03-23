"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (params, encode) {
    return typeof params === "object"
        ? Object.keys(params)
            .map(function (key) {
            return (encode ? encodeURIComponent(key) : key) + "=" + encode
                ? encodeURIComponent(params[key])
                : params[key];
        })
            .join("&")
        : "";
});
