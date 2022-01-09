"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("firebase/database");
class SessionService {
    constructor(ref, metadata, onError) {
        this.ref = ref;
        this.metadata = metadata;
        this.onError = onError;
        (0, database_1.onDisconnect)(this.ref)
            .remove()
            .then(() => {
            // onDisconnect registered!
            this.setMetadataPromise = (0, database_1.set)(this.ref, metadata);
            this.setMetadataPromise.catch(onError);
        }, onError);
    }
    updateMetadata(newMetadata) {
        this.metadata = newMetadata;
        if (this.setMetadataPromise) {
            this.setMetadataPromise = this.setMetadataPromise.then(() => {
                var promise = (0, database_1.set)(this.ref, this.metadata);
                promise.catch(this.onError);
                return promise;
            });
        }
    }
    end() {
        if (this.setMetadataPromise) {
            return this.setMetadataPromise.then(() => {
                return (0, database_1.remove)(this.ref).then(() => {
                    this.setMetadataPromise = null;
                    return this.end();
                }, this.onError);
            }, function () { });
        }
        else {
            return (0, database_1.onDisconnect)(this.ref).cancel().catch(this.onError);
        }
    }
}
exports.default = SessionService;
