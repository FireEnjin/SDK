import { ref, onValue, child } from "@firebase/database";

import Session from "./session";

export default class SessionManager {
  metadata = true;
  session: any = null;
  user: any = null;
  forceOffline: any = true;
  auth: any = null;
  ref: any;
  databaseConnected = null;

  constructor(rdb: any, auth: any) {
    this.auth = auth;
    this.user = auth?.currentUser;
    this.ref = ref(rdb, "_firebase_extensions/presence");
    onValue(ref(rdb, ".info/connected"), (snapshot: any) => {
      this.databaseConnected = snapshot.val();
      if (this.session && !this.databaseConnected) {
        this.session.end();
        this.session = null;
      }
      this.createSessionIfNeeded();
    });
    this.auth.onAuthStateChanged((newUser: any) => {
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
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var id = "";
    for (var i = 0; i < 20; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  setMetadata(newMetadata: any) {
    if (newMetadata != null) {
      this.metadata = newMetadata;
    } else {
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
    } else {
      return Promise.resolve();
    }
  }

  goOnline() {
    this.forceOffline = false;
    this.createSessionIfNeeded();

    return Promise.resolve();
  }

  createSessionIfNeeded() {
    if (
      !this.session &&
      !this.forceOffline &&
      this.databaseConnected &&
      this.user
    ) {
      var sessionId = this.randomId();
      var sessionRef = child(
        this.ref,
        `${this.user.uid}/sessions/${sessionId}`
      );
      this.session = new Session(
        sessionRef,
        this.metadata,
        this.onSessionError
      );
    }
  }

  onSessionError(err: any) {
    console.warn("Error updating presence", err);
    this.session.end();
    this.session = null;
    if (err.code !== "PERMISSION_DENIED") {
      setTimeout(this.createSessionIfNeeded, 1000);
    }
  }
}
