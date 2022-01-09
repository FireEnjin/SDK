import { DatabaseReference } from "firebase/database";
export default class SessionService {
    ref: DatabaseReference;
    metadata: any;
    onError: any;
    setMetadataPromise: any;
    constructor(ref: DatabaseReference, metadata: any, onError: any);
    updateMetadata(newMetadata: any): void;
    end(): any;
}
