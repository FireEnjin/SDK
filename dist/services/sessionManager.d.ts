export default class SessionManager {
    metadata: boolean;
    session: any;
    user: any;
    forceOffline: boolean;
    auth: any;
    ref: any;
    databaseConnected: any;
    constructor(rdb: any, auth: any);
    randomId(): string;
    setMetadata(newMetadata: any): void;
    goOffline(): any;
    goOnline(): Promise<void>;
    createSessionIfNeeded(): void;
    onSessionError(err: any): void;
}
