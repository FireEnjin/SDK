'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var facebook = require('@ionic-native/facebook');
var googlePlus = require('@ionic-native/google-plus');
var twitterConnect = require('@ionic-native/twitter-connect');
var app = require('@firebase/app');
var auth = require('@firebase/auth');
var database = require('@firebase/database');
var firestore = require('@firebase/firestore');
var functions = require('@firebase/functions');
var localforage = require('localforage');
var graphqlRequest = require('graphql-request');
require('isomorphic-unfetch');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var localforage__namespace = /*#__PURE__*/_interopNamespace(localforage);

class SessionService {
    ref;
    metadata;
    onError;
    setMetadataPromise;
    constructor(ref, metadata, onError) {
        this.ref = ref;
        this.metadata = metadata;
        this.onError = onError;
        database.onDisconnect(this.ref)
            .remove()
            .then(() => {
            // onDisconnect registered!
            this.setMetadataPromise = database.set(this.ref, metadata);
            this.setMetadataPromise.catch(onError);
        }, onError);
    }
    updateMetadata(newMetadata) {
        this.metadata = newMetadata;
        if (this.setMetadataPromise) {
            this.setMetadataPromise = this.setMetadataPromise.then(() => {
                var promise = database.set(this.ref, this.metadata);
                promise.catch(this.onError);
                return promise;
            });
        }
    }
    end() {
        if (this.setMetadataPromise) {
            return this.setMetadataPromise.then(() => {
                return database.remove(this.ref).then(() => {
                    this.setMetadataPromise = null;
                    return this.end();
                }, this.onError);
            }, function () { });
        }
        else {
            return database.onDisconnect(this.ref).cancel().catch(this.onError);
        }
    }
}

class SessionManager {
    metadata = true;
    session = null;
    user = null;
    forceOffline = true;
    auth = null;
    ref;
    databaseConnected = null;
    constructor(rdb, auth) {
        this.auth = auth;
        this.user = auth?.currentUser;
        this.ref = database.ref(rdb, "_firebase_extensions/presence");
        database.onValue(database.ref(rdb, ".info/connected"), (snapshot) => {
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
            var sessionRef = database.child(this.ref, `${this.user.uid}/sessions/${sessionId}`);
            this.session = new SessionService(sessionRef, this.metadata, this.onSessionError);
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

class AuthService {
    app;
    sessionManager;
    config = {
        authLocalStorageKey: "enjin:session",
        tokenLocalStorageKey: "enjin:token",
        facebook: {
            permissions: ["email", "public_profile", "user_friends"],
        },
    };
    facebook = facebook.Facebook;
    googlePlus = googlePlus.GooglePlus;
    twitter = twitterConnect.TwitterConnect;
    isOnline = false;
    service;
    constructor(options) {
        this.config = { ...this.config, ...(options?.config || {}) };
        this.app = options?.app || null;
        const isWindow = typeof window !== "undefined" && window;
        if (!this.app && isWindow) {
            try {
                this.app = app.initializeApp(options?.config?.firebase);
                console.log("Initializing Firebase App...", this.app);
            }
            catch (e) {
                console.log(e);
            }
        }
        this.service = isWindow ? auth.getAuth(this.app) : null;
        if (!this.config.googlePlus ||
            !this.config.googlePlus.options ||
            !this.config.googlePlus.options.webClientId) {
            console.log("googlePlus.options.webClientId is required for Google Native Auth See Here: https://github.com/EddyVerbruggen/cordova-plugin-googleplus#6-usage");
        }
        if (this.config?.emulate && isWindow) {
            auth.connectAuthEmulator(this.service, "http://localhost:9099");
        }
        if (isWindow)
            this.onEmailLink(window.location.href);
    }
    // async initializePushNotifications(
    //   onMessageCallback?: (payload: any) => void,
    //   options?: { vapidKey?: string }
    // ) {
    //   try {
    //     const messaging = getMessaging(this.app);
    //     if (onMessageCallback && typeof onMessageCallback === "function") {
    //       onMessage(messaging, onMessageCallback);
    //     }
    //     const vapidKey = options?.vapidKey;
    //     let messagingToken = await getToken(messaging, {
    //       vapidKey,
    //       serviceWorkerRegistration:
    //         await navigator.serviceWorker.getRegistration(),
    //     });
    //     if (!messagingToken) {
    //       const permission = await Notification.requestPermission();
    //       if (permission === "granted") {
    //         console.log("Notification permission granted.");
    //         messagingToken = await getToken(messaging, {
    //           vapidKey,
    //           serviceWorkerRegistration:
    //             await navigator.serviceWorker.getRegistration(),
    //         });
    //       } else {
    //         console.log("Unable to get permission to notify.");
    //       }
    //     }
    //     return messagingToken;
    //   } catch (error) {
    //     console.log(
    //       "Service worker not enabled, push notifications will not work!",
    //       error
    //     );
    //   }
    // }
    async getClaims() {
        try {
            const { claims } = await auth.getIdTokenResult(this.service?.currentUser);
            return claims;
        }
        catch (error) {
            return {};
        }
    }
    async getToken() {
        const currentToken = this.service?.currentUser
            ? await auth.getIdToken(this.service.currentUser)
            : localStorage.getItem(this.config?.tokenLocalStorageKey || "");
        await this.setToken(currentToken);
        return currentToken;
    }
    async setToken(token) {
        localStorage.setItem(this.config.tokenLocalStorageKey || "", token);
        return token;
    }
    async onEmailLink(link) {
        if (auth.isSignInWithEmailLink(this.service, link)) {
            let email = window.localStorage.getItem("emailForSignIn");
            if (!email) {
                email = window.prompt("Please provide your email for confirmation");
            }
            const authUser = await auth.signInWithEmailLink(this.service, email || "", link);
            window.localStorage.removeItem("emailForSignIn");
            this.emitLoggedInEvent(authUser);
            return authUser;
        }
    }
    // createCaptcha(buttonEl: HTMLButtonElement) {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       (window as any).RecaptchaVerifier = new RecaptchaVerifier(
    //         buttonEl,
    //         {
    //           size: "invisible",
    //           callback(response) {
    //             resolve(response);
    //           },
    //         }
    //       );
    //     } catch (error) {
    //       reject(error);
    //     }
    //   });
    // }
    // createRecapchaWidget(id: string) {
    //   (window as any).recaptchaVerifier = new RecaptchaVerifier(id);
    // }
    withGoogleCredential(token) {
        return auth.GoogleAuthProvider.credential(token);
    }
    withCredential(credential) {
        return auth.signInWithCredential(this.service, credential);
    }
    withToken(token) {
        return auth.signInWithCustomToken(this.service, token);
    }
    withPhoneNumber(phoneNumber, capId) {
        phoneNumber = "+" + phoneNumber;
        window.localStorage.setItem("phoneForSignIn", phoneNumber);
        return auth.signInWithPhoneNumber(this.service, phoneNumber, capId);
    }
    withEmailLink(email, actionCodeSettings) {
        window.localStorage.setItem("emailForSignIn", email);
        return auth.sendSignInLinkToEmail(this.service, email, actionCodeSettings);
    }
    anonymously() {
        return auth.signInAnonymously(this.service);
    }
    onAuthChanged(callback) {
        auth.onAuthStateChanged(this.service, async (session) => {
            if (!session ||
                (!session.emailVerified &&
                    session.providerData &&
                    session.providerData[0].providerId === "password")) {
                return false;
            }
            if (session) {
                localStorage.setItem(this.config?.authLocalStorageKey || "", JSON.stringify(session));
                localStorage.setItem(this.config?.tokenLocalStorageKey || "", await auth.getIdToken(this.service?.currentUser, true));
            }
            if (callback && typeof callback === "function") {
                callback(session);
            }
        });
        if (!localStorage.getItem(this.config?.authLocalStorageKey || "")) {
            callback(null);
        }
    }
    getFromStorage() {
        return localStorage.getItem(this.config?.authLocalStorageKey || "")
            ? JSON.parse(localStorage.getItem(this.config?.authLocalStorageKey || ""))
            : null;
    }
    isLoggedIn() {
        const session = this.service;
        return session ? session : this.getFromStorage();
    }
    emitLoggedInEvent(data) {
        document.body.dispatchEvent(new CustomEvent("authLoggedIn", { detail: { data } }));
    }
    emitLoggedOutEvent() {
        document.body.dispatchEvent(new CustomEvent("authLoggedOut", { detail: {} }));
    }
    createUser(email, password) {
        return auth.createUserWithEmailAndPassword(this.service, email, password);
    }
    sendEmailVerification(options) {
        return auth.sendEmailVerification(this.service.currentUser, options ? options : null);
    }
    sendPasswordReset(emailAddress, options) {
        return auth.sendPasswordResetEmail(this.service, emailAddress, options ? options : null);
    }
    withEmail(email, password) {
        return new Promise((resolve, reject) => {
            try {
                auth.signInWithEmailAndPassword(this.service, email, password)
                    .then((user) => {
                    this.emitLoggedInEvent({ user });
                    resolve({ data: { user } });
                })
                    .catch((error) => {
                    reject(error);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    updateEmail(newEmail, actionOptions) {
        return new Promise((resolve, reject) => {
            try {
                auth.updateEmail(this.service?.currentUser, newEmail)
                    .then((user) => {
                    resolve({ data: { user } });
                    this.sendEmailVerification(actionOptions);
                })
                    .catch((error) => {
                    reject(error);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async facebookNative() {
        const result = await this.facebook.login(this.config?.facebook?.permissions);
        return this.withCredential(auth.FacebookAuthProvider.credential(result.authResponse.accessToken));
    }
    async googleNative() {
        let result;
        try {
            result = await this.googlePlus.login(this.config?.googlePlus?.options);
        }
        catch (error) {
            console.log("Error with Google Native Login...");
            console.log(error);
        }
        return this.withCredential(auth.GoogleAuthProvider.credential(result.idToken));
    }
    async twitterNative() {
        const result = await this.twitter.login();
        return this.withCredential(auth.TwitterAuthProvider.credential(result.token, result.secret));
    }
    async withSocial(network, redirect = false) {
        let provider;
        let shouldRedirect = redirect;
        if (window.matchMedia("(display-mode: standalone)").matches) {
            console.log("Running in PWA mode...");
            shouldRedirect = true;
        }
        return new Promise(async (resolve, reject) => {
            if (window.cordova) {
                if (network === "google") {
                    this.googleNative()
                        .then((result) => {
                        this.emitLoggedInEvent(result);
                        resolve(result);
                    })
                        .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                }
                else if (network === "facebook") {
                    this.facebookNative()
                        .then((result) => {
                        this.emitLoggedInEvent(result);
                        resolve(result);
                    })
                        .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                }
                else if (network === "twitter") {
                    this.twitterNative()
                        .then((result) => {
                        this.emitLoggedInEvent(result);
                        resolve(result);
                    })
                        .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                }
            }
            else {
                if (network === "facebook") {
                    provider = new auth.FacebookAuthProvider();
                }
                else if (network === "google") {
                    provider = new auth.GoogleAuthProvider();
                }
                else if (network === "twitter") {
                    provider = new auth.TwitterAuthProvider();
                }
                else {
                    reject({
                        message: "A social network is required or the one provided is not yet supported.",
                    });
                }
                try {
                    if (shouldRedirect) {
                        await auth.signInWithRedirect(this.service, provider);
                    }
                    else {
                        await auth.signInWithPopup(this.service, provider);
                    }
                    this.emitLoggedInEvent({ currentUser: this.service.currentUser });
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
    logout() {
        this.emitLoggedOutEvent();
        return auth.signOut(this.service);
    }
    async updatePassword(newPassword, credential) {
        if (credential) {
            await auth.reauthenticateWithCredential(this.service?.currentUser, credential);
        }
        return auth.updatePassword(this.service.currentUser, newPassword);
    }
    async storeRoles(roles) {
        localStorage.setItem("roles", JSON.stringify(roles));
        return roles;
    }
    async checkRolePermission(roleId, permission, ignoreAdmin) {
        let roles = [];
        const claims = await this.getClaims();
        if (!ignoreAdmin && claims?.admin) {
            return true;
        }
        try {
            roles = JSON.parse(localStorage.getItem("roles"));
        }
        catch (e) {
            console.log("Error getting roles from local storage");
        }
        for (const role of roles) {
            if (role.id === roleId &&
                role.permissions &&
                role.permissions.includes(permission)) {
                return true;
            }
        }
        return false;
    }
    async goOnline() {
        if (!this.sessionManager) {
            const rdb = database.getDatabase(this.app);
            this.sessionManager = new SessionManager(rdb, this.service);
        }
        this.isOnline = true;
        document.body.dispatchEvent(new CustomEvent("fireenjin:online", {
            detail: { sessionManager: this.sessionManager },
        }));
        return this.sessionManager.goOnline();
    }
    async goOffline() {
        if (!this.sessionManager)
            return null;
        this.isOnline = false;
        document.body.dispatchEvent(new CustomEvent("fireenjin:offline", {
            detail: { sessionManager: this.sessionManager },
        }));
        return this.sessionManager.goOffline();
    }
    async getSessionManager() {
        return this.sessionManager;
    }
    async getApp() {
        return this.app;
    }
    async getService() {
        return this.service;
    }
}

class DatabaseService {
    app;
    service;
    watchers = {};
    functions;
    constructor(options) {
        this.app = options?.app || null;
        if (!this.app && window) {
            try {
                this.app = app.initializeApp(options?.config);
                console.log("Initializing Firebase App...");
            }
            catch (e) {
                console.log(e);
            }
        }
        this.service = firestore.getFirestore(this.app);
        this.functions = functions.getFunctions(this.app);
        if (options?.emulate) {
            firestore.connectFirestoreEmulator(this.service, "localhost", 8080);
            functions.connectFunctionsEmulator(this.functions, "localhost", 5001);
        }
        try {
            firestore.enableIndexedDbPersistence(this.service);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    call(functionName) {
        return functions.httpsCallable(this.functions, functionName);
    }
    async add(collectionName, data, id) {
        const collection = await this.collection(collectionName);
        if (id) {
            await firestore.setDoc(this.document(collectionName, id), data);
        }
        return id ? this.document(collectionName, id) : firestore.addDoc(collection, data);
    }
    async delete(path, id) {
        const doc = this.document(path, id);
        await firestore.deleteDoc(doc);
        return { id: doc.id };
    }
    collection(path) {
        return firestore.collection(this.service, path);
    }
    getCollection(path) {
        return firestore.getDocs(this.collection(path));
    }
    document(path, id) {
        return id ? firestore.doc(this.collection(path), id) : firestore.doc(this.service, path);
    }
    getDocument(path, id) {
        return firestore.getDoc(this.document(path, id));
    }
    async update(collectionName, id, data) {
        const document = this.document(collectionName, id);
        await firestore.updateDoc(document, data, { merge: true });
        const newDocument = await this.getDocument(collectionName, id);
        return newDocument.data();
    }
    async clearWatchers() {
        for (const watcherKey of Object.keys(this.watchers)) {
            this.watchers[watcherKey]();
        }
        return true;
    }
    subscribe(query, callback, name) {
        const watcherName = name ? name : new Date().toISOString();
        this.watchers[watcherName] = firestore.onSnapshot(this.rawQuery(query?.collectionName, query?.where, query?.orderBy, query?.limit), async (snapshot) => {
            if (callback && typeof callback === "function") {
                callback({ docs: snapshot?.docs || [] });
            }
        });
        return this.watchers[watcherName];
    }
    unsubscribe(watcherName) {
        if (this.watchers[watcherName] &&
            typeof this.watchers[watcherName] === "function") {
            this.watchers[watcherName]();
            return true;
        }
        else {
            console.log(`There is no watcher running on ${watcherName} query.`);
            return false;
        }
    }
    watchDocument(collectionName, id, callback) {
        const watcherName = `${collectionName}:${id}`;
        this.watchers[watcherName] = firestore.onSnapshot(this.document(collectionName, id), async (doc) => {
            if (callback && typeof callback === "function") {
                callback({ data: doc.data() });
            }
        });
    }
    unwatchDocument(collectionName, id) {
        const watcherName = `${collectionName}:${id}`;
        if (this.watchers[watcherName] &&
            typeof this.watchers[watcherName] === "function") {
            this.watchers[watcherName]();
            return true;
        }
        else {
            console.log(`There is no watcher running on ${watcherName} document.`);
            return false;
        }
    }
    rawQuery(collectionName, where, orderBy, limit) {
        const params = [];
        for (const w of where || []) {
            if (!w?.conditional || !w?.key)
                continue;
            params.push(firestore.where(w.key, w.conditional, w.value));
        }
        if (orderBy)
            params.push(firestore.orderBy(orderBy));
        if (limit)
            params.push(firestore.limit(limit));
        return firestore.query(this.collection(collectionName), ...params);
    }
    async query(collectionName, where, orderBy, limit) {
        return firestore.getDocs(this.rawQuery(collectionName, where, orderBy, limit));
    }
    async getApp() {
        return this.app;
    }
    async getService() {
        return this.service;
    }
}

async function fireenjinError(input, options) {
    const detail = {
        event: input?.event,
        target: input?.target || input?.event?.target,
        error: input?.error,
        name: input?.name,
        endpoint: input?.endpoint,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
        cached: !!input?.cached,
    };
    if (typeof options?.onError === "function")
        options.onError(detail);
    const el = detail?.target || document;
    el.dispatchEvent(new CustomEvent("fireenjinError", {
        detail,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
    }));
}

async function setComponentProps(dataPropsMap, data) {
    let newData = data ? data : {};
    if (dataPropsMap) {
        const dataKeys = Object.keys(dataPropsMap);
        for (const key of dataKeys) {
            try {
                newData[dataPropsMap[key]] = key
                    .split(".")
                    .reduce((o, i) => o[i], data);
            }
            catch (e) {
                continue;
            }
        }
    }
    return newData;
}

async function fireenjinSuccess(input, options) {
    const detail = {
        event: input?.event,
        target: input?.target || input?.event?.target,
        data: input?.data || null,
        name: input?.name,
        endpoint: input?.endpoint,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
        cached: !!input?.cached,
    };
    if (input?.dataPropsMap) {
        try {
            detail.data = await setComponentProps(input?.dataPropsMap, input?.data);
        }
        catch {
            console.log("Error setting data props");
            if (typeof options?.onError === "function")
                options.onError(detail);
        }
    }
    if (typeof options?.onSuccess === "function")
        options.onSuccess(detail);
    const el = detail?.target || document;
    el.dispatchEvent(new CustomEvent("fireenjinSuccess", {
        detail,
        bubbles: !!input?.bubbles,
        cancelable: !!input?.cancelable,
        composed: !!input?.composed,
    }));
}

async function tryOrFail(fn, options) {
    const baseData = {
        cached: !!options?.cached,
        event: options?.event,
        name: options?.name,
        endpoint: options?.endpoint,
        bubbles: options?.bubbles ?? true,
        cancelable: options?.cancelable ?? true,
        composed: !!options?.composed,
        target: options?.target || options?.event?.target,
    };
    try {
        const data = await fn();
        await fireenjinSuccess({ ...baseData, data }, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
        return data;
    }
    catch (error) {
        await fireenjinError({
            ...baseData,
            error,
        }, {
            onError: options?.onError,
        });
        return;
    }
}

var objectToUrlParams = (params, encode) => typeof params === "object"
    ? Object.keys(params)
        .map((key) => (encode ? encodeURIComponent(key) : key) + "=" + encode
        ? encodeURIComponent(params[key])
        : params[key])
        .join("&")
    : "";

class Client {
    url;
    options;
    constructor(url, options) {
        this.url = url || "http://localhost:4000";
        this.options = options || {};
    }
    async rawRequest(query, variables, requestOptions) {
        const method = requestOptions?.method || this.options?.method || "GET";
        const headers = requestOptions?.headers || this.options?.headers || {};
        const endpoint = `${this.url}/${query}${method === "get" ? objectToUrlParams(variables) : ""}`;
        const response = await fetch(`${this.url}/${endpoint}`, {
            method,
            ...(this.options || {}),
            ...(requestOptions || {}),
            headers,
            body: method === "get" ? null : JSON.stringify(variables || {}),
        });
        return {
            data: (await response?.json?.()) || null,
            headers: response.headers,
            status: response.status,
            extensions: {},
        };
    }
    async request(endpoint, variables, requestOptions) {
        const method = requestOptions?.method || this.options?.method || "GET";
        const headers = requestOptions?.headers || this.options?.headers || {};
        const response = await fetch(`${this.url}/${endpoint}`, {
            method,
            ...(this.options || {}),
            ...(requestOptions || {}),
            headers,
            body: (!["get", "post"].includes(method.toLowerCase()) &&
                JSON.stringify(variables || {})) ||
                null,
        });
        return response.json();
    }
    async batchRequests(documents, requestOptions) {
        const response = {};
        for (const { document, variables } of documents) {
            try {
                response[document] = await this.request(document, variables, requestOptions);
            }
            catch {
                response[document] = null;
            }
        }
        return response;
    }
    setEndpoint(value) {
        this.url = value;
        return true;
    }
    setHeader(key, value) {
        if (!this.options)
            this.options = {};
        if (!this.options?.headers)
            this.options.headers = {};
        this.options.headers[key] = value;
        return this;
    }
    setHeaders(headers) {
        for (const [key, value] of Object.entries(headers)) {
            this.setHeader(key, value);
        }
        return this;
    }
}

class FirestoreClient {
    url;
    db;
    options;
    constructor(url, options) {
        this.url = url || "http://localhost:4000";
        this.options = {
            ...options,
            headers: options?.headers || {},
        };
        this.db = options?.db;
    }
    async rawRequest(query, variables, requestOptions) {
        const method = requestOptions?.method || this.options?.method || "GET";
        const headers = requestOptions?.headers || this.options?.headers || {};
        const endpoint = query;
        const response = await (method.toLowerCase() === "post"
            ? this.db.update(endpoint, variables?.data || {}, variables?.id)
            : this.db.query(endpoint, variables?.where || [], variables?.orderBy || null, variables?.limit || null));
        return {
            data: method.toLowerCase() === "post" ? response : response?.docs,
            headers,
            extensions: {
                query: response?.query,
                metadata: response?.metadata,
                size: response?.size,
            },
            status: 200,
        };
    }
    async request(endpoint, variables, requestOptions) {
        console.log("firestore request", endpoint);
        const response = await this.rawRequest(endpoint, variables, requestOptions);
        return {
            data: response.data,
        };
    }
    async batchRequests(documents, requestOptions) {
        const response = {};
        for (const { document, variables } of documents) {
            try {
                response[document] = await this.request(document, variables, requestOptions);
            }
            catch {
                response[document] = null;
            }
        }
        return response;
    }
    setEndpoint(value) {
        this.url = value;
        return true;
    }
    setHeader(key, value) {
        const headers = this.options?.headers || {};
        headers[key] = value;
        //@ts-ignore
        this.options.headers = headers;
        return this;
    }
    setHeaders(headers) {
        for (const [key, value] of Object.entries(headers)) {
            this.setHeader(key, value);
        }
        return this;
    }
}

class FireEnjin {
    client;
    sdk = {};
    host = {
        url: "http://localhost:4000",
    };
    currentConnection = 0;
    options;
    constructor(options) {
        this.options = options || {};
        const headers = {
            Authorization: options?.token ? `Bearer ${options.token}` : "",
            ...(options.headers ? options.headers : {}),
        };
        this.host = options?.connections?.length
            ? this.setConnection(0)
            : {
                url: options.host,
                type: "rest",
                headers,
            };
        this.client =
            this.host.type === "graphql"
                ? new graphqlRequest.GraphQLClient(this.host?.url || "http://localhost:4000", {
                    headers: this.host?.headers || {},
                })
                : this.host?.type === "firebase"
                    ? new FirestoreClient(this.host.url, {
                        db: this.host?.db
                            ? this.host.db
                            : new DatabaseService({
                                emulate: !!options?.emulate,
                                config: this.host?.auth,
                            }),
                    })
                    : new Client(this.host.url, { headers: this.host?.headers || {} });
        this.sdk =
            this.host.type === "graphql" && typeof options?.getSdk === "function"
                ? options.getSdk(this.client, this.options?.onRequest)
                : null;
        if (document) {
            document.addEventListener("fireenjinUpload", this.onUpload.bind(this));
            document.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
            document.addEventListener("fireenjinFetch", this.onFetch.bind(this));
            if (options?.debug) {
                document.addEventListener("fireenjinSuccess", (event) => {
                    console.log("fireenjinSuccess: ", event);
                });
                document.addEventListener("fireenjinError", (event) => {
                    console.log("fireenjinError: ", event);
                });
                document.addEventListener("fireenjinTrigger", (event) => {
                    console.log("fireenjinTrigger: ", event);
                });
            }
        }
    }
    async onUpload(event) {
        if (this.options?.debug)
            console.log("fireenjinUpload: ", event);
        if (typeof this.options?.onUpload === "function")
            this.options.onUpload(event);
        if (!event.detail?.data?.encodedContent ||
            typeof this.options?.onUpload === "function")
            return false;
        const data = await this.upload({
            data: {
                id: event.detail.data?.id,
                path: event.detail.data?.path,
                fileName: event.detail.data?.fileName,
                file: event.detail.data?.encodedContent,
                type: event.detail.data?.type,
            },
        }, {
            event,
            target: event?.detail?.target || event?.target,
            name: event?.detail?.name,
            endpoint: event?.detail?.endpoint,
            bubbles: event?.detail?.bubbles,
            cancelable: event?.detail?.cancelable,
            composed: event?.detail?.composed,
        });
        if (event?.target)
            event.target.value = data?.url || null;
        return data;
    }
    async onSubmit(event) {
        if (this.options?.debug)
            console.log("fireenjinSubmit: ", event);
        if (!event ||
            !event.detail ||
            !event.detail.endpoint ||
            event.detail.disableSubmit)
            return false;
        return this.submit(event.detail.endpoint, {
            event,
            target: event?.detail?.target || event?.target,
            id: event?.detail?.id,
            data: event?.detail?.data,
            params: event?.detail?.params,
            query: event?.detail?.query,
            bubbles: event?.detail?.bubbles,
            cancelable: event?.detail?.cancelable,
            composed: event?.detail?.composed,
        });
    }
    async onFetch(event) {
        if (this.options?.debug)
            console.log("fireenjinFetch: ", event);
        if (!event ||
            !event.detail ||
            !event.detail.endpoint ||
            event.detail.disableFetch)
            return false;
        return this.fetch(event.detail.endpoint, event?.detail?.params || {}, {
            event,
            target: event?.detail?.target || event?.target,
            dataPropsMap: event?.detail?.dataPropsMap,
            name: event?.detail?.name,
            cacheKey: event?.detail?.cacheKey,
            disableCache: !!event?.detail?.disableCache,
            bubbles: event?.detail?.bubbles,
            cancelable: event?.detail?.cancelable,
            composed: event?.detail?.composed,
        });
    }
    hash(input) {
        var hash = 0, i, chr;
        if (input.length === 0)
            return hash;
        for (i = 0; i < input.length; i++) {
            chr = input.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    async upload(input, options) {
        const endpoint = options?.endpoint || "upload";
        return tryOrFail(async () => this.host?.type === "graphql" && !this.options?.uploadUrl
            ? input?.query
                ? this.client.request(input.query, input.params)
                : this.sdk[endpoint](input?.params || {
                    id: input?.id,
                    data: input?.data,
                })
            : this.client.request(this.options?.uploadUrl || endpoint, input, {
                method: "POST",
            }), {
            event: options?.event || null,
            target: options?.target || options?.event?.target,
            name: options?.name || endpoint,
            bubbles: options?.bubbles,
            cancelable: options?.cancelable,
            composed: options?.composed,
            endpoint,
            cached: true,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
    }
    async fetch(endpoint, input, options) {
        let data = null;
        const event = options?.event || null;
        const name = options?.name || null;
        const localKey = options?.cacheKey
            ? options.cacheKey
            : `${endpoint}_${input?.id
                ? `${input.id}:`
                : input?.params
                    ? this.hash(JSON.stringify(Object.values(input.params)))
                    : ""}${this.hash(JSON.stringify(input || {}))}`;
        console.log(endpoint, input, options);
        if (!options?.disableCache) {
            data = await tryOrFail(async () => localforage__namespace.getItem(localKey), {
                endpoint,
                event,
                target: options?.target || event?.target,
                name,
                cached: true,
                bubbles: options?.bubbles,
                cancelable: options?.cancelable,
                composed: options?.composed,
                onError: this.options?.onError,
                onSuccess: this.options?.onSuccess,
            });
        }
        data = await tryOrFail(async () => this.host?.type === "graphql"
            ? input?.query
                ? this.client.request(input?.query, input?.params)
                : this.sdk[endpoint](input, options?.headers)
            : this.client.request(endpoint, input), {
            endpoint,
            event,
            target: options?.target || options?.event?.target,
            name,
            cached: false,
            bubbles: options?.bubbles,
            cancelable: options?.cancelable,
            composed: options?.composed,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
        return data;
    }
    async submit(endpoint, input, options) {
        const event = options?.event || null;
        const name = options?.name || null;
        return tryOrFail(async () => this.host?.type === "graphql"
            ? input?.query
                ? this.client.request(input.query, input.params)
                : this.sdk[endpoint](input?.params || {
                    id: input?.id,
                    data: input?.data,
                })
            : this.client.request(endpoint, input, {
                method: "POST",
            }), {
            endpoint,
            event,
            target: options?.target || event?.target,
            name,
            cached: false,
            bubbles: options?.bubbles,
            cancelable: options?.cancelable,
            composed: options?.composed,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
    }
    setHeader(key, value) {
        if (!this.client)
            return false;
        if (!this.host?.headers)
            this.host.headers = {};
        this.host.headers[key] = value;
        return this.client.setHeader(key, value);
    }
    setHeaders(headers) {
        if (!this.client)
            return false;
        return this.client.setHeaders(headers);
    }
    setConnection(nameUrlOrIndex) {
        this.host = (typeof nameUrlOrIndex === "string"
            ? (this.options?.connections || []).find((connection, index) => {
                if (connection?.name === nameUrlOrIndex ||
                    connection?.url === nameUrlOrIndex) {
                    this.currentConnection = index;
                    return connection;
                }
            })
            : this.options?.connections?.[nameUrlOrIndex]);
        if (!this.host?.name)
            this.host.name = "default";
        if (!this.host?.type)
            this.host.type =
                typeof this.options?.getSdk === "function"
                    ? "graphql"
                    : this.host?.db || this.host?.auth?.databaseURL
                        ? "firebase"
                        : "rest";
        this.host.headers = {
            ...(this.host?.headers || {}),
            ...(this.options?.headers || {}),
        };
        this.client =
            this.host.type === "graphql"
                ? new graphqlRequest.GraphQLClient(this.host?.url || "http://localhost:4000", {
                    headers: this.host?.headers || {},
                })
                : this.host?.type === "firebase"
                    ? new FirestoreClient(this.host.url, {
                        db: this.host.db,
                    })
                    : new Client(this.host.url, { headers: this.host?.headers || {} });
        this.client.setEndpoint(this.host?.url || "http://localhost:4000");
        return this.host;
    }
}

if (window && !window.FireEnjin) {
    window.FireEnjin = FireEnjin;
}

exports.AuthService = AuthService;
exports.DatabaseService = DatabaseService;
exports.FireEnjin = FireEnjin;
exports.SessionService = SessionService;
