import { ref, onValue, child } from "firebase/database";
import Session from "./session";
var SessionManager = /** @class */ (function () {
    function SessionManager(rdb, auth) {
        var _this = this;
        this.metadata = true;
        this.session = null;
        this.user = null;
        this.forceOffline = true;
        this.auth = null;
        this.ref = null;
        this.databaseConnected = null;
        this.auth = auth;
        this.user = auth === null || auth === void 0 ? void 0 : auth.currentUser;
        this.ref = ref(rdb, "_firebase_extensions/presence");
        onValue(ref(rdb, ".info/connected"), function (snapshot) {
            _this.databaseConnected = snapshot.val();
            if (_this.session && !_this.databaseConnected) {
                _this.session.end();
                _this.session = null;
            }
            _this.createSessionIfNeeded();
        });
        this.auth.onAuthStateChanged(function (newUser) {
            if (_this.session && (!newUser || newUser.uid !== _this.user.uid)) {
                // Don't bother ending the session here since the client is no longer
                // authenticated to RTDB as the original user. Writes would be denied.
                _this.session = null;
            }
            _this.user = newUser;
            _this.createSessionIfNeeded();
        });
    }
    SessionManager.prototype.randomId = function () {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var id = "";
        for (var i = 0; i < 20; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };
    SessionManager.prototype.setMetadata = function (newMetadata) {
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
    };
    SessionManager.prototype.goOffline = function () {
        this.forceOffline = true;
        if (this.session) {
            var promise = this.session.end();
            this.session = null;
            return promise;
        }
        else {
            return Promise.resolve();
        }
    };
    SessionManager.prototype.goOnline = function () {
        this.forceOffline = false;
        this.createSessionIfNeeded();
        return Promise.resolve();
    };
    SessionManager.prototype.createSessionIfNeeded = function () {
        if (!this.session &&
            !this.forceOffline &&
            this.databaseConnected &&
            this.user) {
            var sessionId = this.randomId();
            var sessionRef = child(this.ref, "".concat(this.user.uid, "/sessions/").concat(sessionId));
            this.session = new Session(sessionRef, this.metadata, this.onSessionError);
        }
    };
    SessionManager.prototype.onSessionError = function (err) {
        console.warn("Error updating presence", err);
        this.session.end();
        this.session = null;
        if (err.code !== "PERMISSION_DENIED") {
            setTimeout(this.createSessionIfNeeded, 1000);
        }
    };
    return SessionManager;
}());
export default SessionManager;
