import { onDisconnect, set, remove, } from "@firebase/database";
export default class SessionService {
    ref;
    metadata;
    onError;
    setMetadataPromise;
    constructor(ref, metadata, onError) {
        this.ref = ref;
        this.metadata = metadata;
        this.onError = onError;
        onDisconnect(this.ref)
            .remove()
            .then(() => {
            // onDisconnect registered!
            this.setMetadataPromise = set(this.ref, metadata);
            this.setMetadataPromise.catch(onError);
        }, onError);
    }
    updateMetadata(newMetadata) {
        this.metadata = newMetadata;
        if (this.setMetadataPromise) {
            this.setMetadataPromise = this.setMetadataPromise.then(() => {
                var promise = set(this.ref, this.metadata);
                promise.catch(this.onError);
                return promise;
            });
        }
    }
    end() {
        if (this.setMetadataPromise) {
            return this.setMetadataPromise.then(() => {
                return remove(this.ref).then(() => {
                    this.setMetadataPromise = null;
                    return this.end();
                }, this.onError);
            }, function () { });
        }
        else {
            return onDisconnect(this.ref).cancel().catch(this.onError);
        }
    }
}
