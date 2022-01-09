export default class SessionManager {
    metadata: boolean;
    session: any;
    user: any;
    forceOffline: any;
    auth: any;
    ref: any;
    databaseConnected: null;
    constructor(rdb: any, auth: any);
    randomId(): string;
    setMetadata(newMetadata: any): void;
    goOffline(): any;
    goOnline(): Promise<void>;
    createSessionIfNeeded(): void;
    onSessionError(err: any): void;
}
