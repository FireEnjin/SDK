"use strict";
exports.__esModule = true;
var database_1 = require("firebase/database");
var SessionService = /** @class */ (function () {
    function SessionService(ref, metadata, onError) {
        var _this = this;
        this.ref = null;
        this.metadata = null;
        this.onError = null;
        this.setMetadataPromise = null;
        this.ref = ref;
        this.metadata = metadata;
        this.onError = onError;
        (0, database_1.onDisconnect)(this.ref)
            .remove()
            .then(function () {
            // onDisconnect registered!
            _this.setMetadataPromise = (0, database_1.set)(_this.ref, metadata);
            _this.setMetadataPromise["catch"](onError);
        }, onError);
    }
    SessionService.prototype.updateMetadata = function (newMetadata) {
        var _this = this;
        this.metadata = newMetadata;
        if (this.setMetadataPromise) {
            this.setMetadataPromise = this.setMetadataPromise.then(function () {
                var promise = (0, database_1.set)(_this.ref, _this.metadata);
                promise["catch"](_this.onError);
                return promise;
            });
        }
    };
    SessionService.prototype.end = function () {
        var _this = this;
        if (this.setMetadataPromise) {
            return this.setMetadataPromise.then(function () {
                return (0, database_1.remove)(_this.ref).then(function () {
                    _this.setMetadataPromise = null;
                    return _this.end();
                }, _this.onError);
            }, function () { });
        }
        else {
            return (0, database_1.onDisconnect)(this.ref).cancel()["catch"](this.onError);
        }
    };
    return SessionService;
}());
exports["default"] = SessionService;
