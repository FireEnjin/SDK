"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (params, encode) => typeof params === "object"
    ? Object.keys(params)
        .map((key) => (encode ? encodeURIComponent(key) : key) + "=" + encode
        ? encodeURIComponent(params[key])
        : params[key])
        .join("&")
    : "";
