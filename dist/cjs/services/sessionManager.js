"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@firebase/database");
const session_1 = __importDefault(require("./session"));
class SessionManager {
    constructor(rdb, auth) {
        this.metadata = true;
        this.session = null;
        this.user = null;
        this.forceOffline = true;
        this.auth = null;
        this.databaseConnected = null;
        this.auth = auth;
        this.user = auth === null || auth === void 0 ? void 0 : auth.currentUser;
        this.ref = (0, database_1.ref)(rdb, "_firebase_extensions/presence");
        (0, database_1.onValue)((0, database_1.ref)(rdb, ".info/connected"), (snapshot) => {
            this.databaseConnected = snapshot.val();
            if (this.session && !this.databaseConnected) {
                this.session.end();
                this.session = null;
            }
            this.createSessionIfNeeded();
        });
        this.auth.onAuthStateChanged((newUser) => {
            if (this.session && (!newUser || newUser.uid !== this.user.uid)) {
                // Don't bother ending the session here since the client is no longer
                // authenticated to RTDB as the original user. Writes would be denied.
                this.session = null;
            }
            this.user = newUser;
            this.createSessionIfNeeded();
        });
    }
    randomId() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var id = "";
        for (var i = 0; i < 20; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    setMetadata(newMetadata) {
        if (newMetadata != null) {
            this.metadata = newMetadata;
        }
        else {
            // RTDB does not allow null/undefined as a value, so:
            this.metadata = true;
        }
        if (this.session) {
            this.session.updateMetadata(this.metadata);
        }
    }
    goOffline() {
        this.forceOffline = true;
        if (this.session) {
            var promise = this.session.end();
            this.session = null;
            return promise;
        }
        else {
            return Promise.resolve();
        }
    }
    goOnline() {
        this.forceOffline = false;
        this.createSessionIfNeeded();
        return Promise.resolve();
    }
    createSessionIfNeeded() {
        if (!this.session &&
            !this.forceOffline &&
            this.databaseConnected &&
            this.user) {
            var sessionId = this.randomId();
            var sessionRef = (0, database_1.child)(this.ref, `${this.user.uid}/sessions/${sessionId}`);
            this.session = new session_1.default(sessionRef, this.metadata, this.onSessionError);
        }
    }
    onSessionError(err) {
        console.warn("Error updating presence", err);
        this.session.end();
        this.session = null;
        if (err.code !== "PERMISSION_DENIED") {
            setTimeout(this.createSessionIfNeeded, 1000);
        }
    }
}
exports.default = SessionManager;
