"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const facebook_1 = require("@ionic-native/facebook");
const google_plus_1 = require("@ionic-native/google-plus");
const twitter_connect_1 = require("@ionic-native/twitter-connect");
const app_1 = require("@firebase/app");
const auth_1 = require("@firebase/auth");
// import { getMessaging, getToken, onMessage } from "@firebase/messaging";
const database_1 = require("@firebase/database");
const sessionManager_1 = __importDefault(require("./sessionManager"));
class AuthService {
    constructor(options) {
        var _a, _b;
        this.config = {
            authLocalStorageKey: "enjin:session",
            tokenLocalStorageKey: "enjin:token",
            facebook: {
                permissions: ["email", "public_profile", "user_friends"],
            },
        };
        this.facebook = facebook_1.Facebook;
        this.googlePlus = google_plus_1.GooglePlus;
        this.twitter = twitter_connect_1.TwitterConnect;
        this.isOnline = false;
        this.config = Object.assign(Object.assign({}, this.config), ((options === null || options === void 0 ? void 0 : options.config) || {}));
        this.app = (options === null || options === void 0 ? void 0 : options.app) || null;
        const isWindow = typeof window !== "undefined" && window;
        if (!this.app && isWindow) {
            try {
                this.app = (0, app_1.initializeApp)((_a = options === null || options === void 0 ? void 0 : options.config) === null || _a === void 0 ? void 0 : _a.firebase);
                console.log("Initializing Firebase App...", this.app);
            }
            catch (e) {
                console.log(e);
            }
        }
        this.service = isWindow ? (0, auth_1.getAuth)(this.app) : null;
        if (!this.config.googlePlus ||
            !this.config.googlePlus.options ||
            !this.config.googlePlus.options.webClientId) {
            console.log("googlePlus.options.webClientId is required for Google Native Auth See Here: https://github.com/EddyVerbruggen/cordova-plugin-googleplus#6-usage");
        }
        if (((_b = this.config) === null || _b === void 0 ? void 0 : _b.emulate) && isWindow) {
            (0, auth_1.connectAuthEmulator)(this.service, "http://localhost:9099");
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
    getClaims() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.service = (0, auth_1.getAuth)(this.app);
                const { claims } = yield (0, auth_1.getIdTokenResult)((_a = this.service) === null || _a === void 0 ? void 0 : _a.currentUser);
                return claims;
            }
            catch (error) {
                return {};
            }
        });
    }
    getToken() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentToken = ((_a = this.service) === null || _a === void 0 ? void 0 : _a.currentUser)
                ? yield (0, auth_1.getIdToken)(this.service.currentUser)
                : localStorage.getItem(((_b = this.config) === null || _b === void 0 ? void 0 : _b.tokenLocalStorageKey) || "");
            yield this.setToken(currentToken);
            return currentToken;
        });
    }
    setToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.setItem(this.config.tokenLocalStorageKey || "", token);
            return token;
        });
    }
    onEmailLink(link) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, auth_1.isSignInWithEmailLink)(this.service, link)) {
                let email = window.localStorage.getItem("emailForSignIn");
                if (!email) {
                    email = window.prompt("Please provide your email for confirmation");
                }
                const authUser = yield (0, auth_1.signInWithEmailLink)(this.service, email || "", link);
                window.localStorage.removeItem("emailForSignIn");
                this.emitLoggedInEvent(authUser);
                return authUser;
            }
        });
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
        return auth_1.GoogleAuthProvider.credential(token);
    }
    withCredential(credential) {
        return (0, auth_1.signInWithCredential)(this.service, credential);
    }
    withToken(token) {
        return (0, auth_1.signInWithCustomToken)(this.service, token);
    }
    withPhoneNumber(phoneNumber, capId) {
        phoneNumber = "+" + phoneNumber;
        window.localStorage.setItem("phoneForSignIn", phoneNumber);
        return (0, auth_1.signInWithPhoneNumber)(this.service, phoneNumber, capId);
    }
    withEmailLink(email, actionCodeSettings) {
        window.localStorage.setItem("emailForSignIn", email);
        return (0, auth_1.sendSignInLinkToEmail)(this.service, email, actionCodeSettings);
    }
    anonymously() {
        return (0, auth_1.signInAnonymously)(this.service);
    }
    onAuthChanged(callback) {
        var _a;
        (0, auth_1.onAuthStateChanged)(this.service, (session) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c, _d;
            if (!session ||
                (!session.emailVerified &&
                    session.providerData &&
                    session.providerData[0].providerId === "password")) {
                return false;
            }
            if (session) {
                localStorage.setItem(((_b = this.config) === null || _b === void 0 ? void 0 : _b.authLocalStorageKey) || "", JSON.stringify(session));
                localStorage.setItem(((_c = this.config) === null || _c === void 0 ? void 0 : _c.tokenLocalStorageKey) || "", yield (0, auth_1.getIdToken)((_d = this.service) === null || _d === void 0 ? void 0 : _d.currentUser, true));
            }
            if (callback && typeof callback === "function") {
                callback(session);
            }
        }));
        if (!localStorage.getItem(((_a = this.config) === null || _a === void 0 ? void 0 : _a.authLocalStorageKey) || "")) {
            callback(null);
        }
    }
    getFromStorage() {
        var _a, _b;
        return localStorage.getItem(((_a = this.config) === null || _a === void 0 ? void 0 : _a.authLocalStorageKey) || "")
            ? JSON.parse(localStorage.getItem(((_b = this.config) === null || _b === void 0 ? void 0 : _b.authLocalStorageKey) || ""))
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
        return (0, auth_1.createUserWithEmailAndPassword)(this.service, email, password);
    }
    sendEmailVerification(options) {
        return (0, auth_1.sendEmailVerification)(this.service.currentUser, options ? options : null);
    }
    sendPasswordReset(emailAddress, options) {
        return (0, auth_1.sendPasswordResetEmail)(this.service, emailAddress, options ? options : null);
    }
    withEmail(email, password) {
        return new Promise((resolve, reject) => {
            try {
                (0, auth_1.signInWithEmailAndPassword)(this.service, email, password)
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
            var _a;
            try {
                (0, auth_1.updateEmail)((_a = this.service) === null || _a === void 0 ? void 0 : _a.currentUser, newEmail)
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
    facebookNative() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.facebook.login((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.facebook) === null || _b === void 0 ? void 0 : _b.permissions);
            return this.withCredential(auth_1.FacebookAuthProvider.credential(result.authResponse.accessToken));
        });
    }
    googleNative() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.googlePlus.login((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.googlePlus) === null || _b === void 0 ? void 0 : _b.options);
            }
            catch (error) {
                console.log("Error with Google Native Login...");
                console.log(error);
            }
            return this.withCredential(auth_1.GoogleAuthProvider.credential(result.idToken));
        });
    }
    twitterNative() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.twitter.login();
            return this.withCredential(auth_1.TwitterAuthProvider.credential(result.token, result.secret));
        });
    }
    withSocial(network, redirect = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let provider;
            let shouldRedirect = redirect;
            if (window.matchMedia("(display-mode: standalone)").matches) {
                console.log("Running in PWA mode...");
                shouldRedirect = true;
            }
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                        provider = new auth_1.FacebookAuthProvider();
                    }
                    else if (network === "google") {
                        provider = new auth_1.GoogleAuthProvider();
                    }
                    else if (network === "twitter") {
                        provider = new auth_1.TwitterAuthProvider();
                    }
                    else {
                        reject({
                            message: "A social network is required or the one provided is not yet supported.",
                        });
                    }
                    try {
                        if (shouldRedirect) {
                            yield (0, auth_1.signInWithRedirect)(this.service, provider);
                        }
                        else {
                            yield (0, auth_1.signInWithPopup)(this.service, provider);
                        }
                        this.emitLoggedInEvent({ currentUser: this.service.currentUser });
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }));
        });
    }
    logout() {
        this.emitLoggedOutEvent();
        return (0, auth_1.signOut)(this.service);
    }
    updatePassword(newPassword, credential) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (credential) {
                yield (0, auth_1.reauthenticateWithCredential)((_a = this.service) === null || _a === void 0 ? void 0 : _a.currentUser, credential);
            }
            return (0, auth_1.updatePassword)(this.service.currentUser, newPassword);
        });
    }
    storeRoles(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.setItem("roles", JSON.stringify(roles));
            return roles;
        });
    }
    checkRolePermission(roleId, permission, ignoreAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            let roles = [];
            const claims = yield this.getClaims();
            if (!ignoreAdmin && (claims === null || claims === void 0 ? void 0 : claims.admin)) {
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
        });
    }
    goOnline() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sessionManager) {
                const rdb = (0, database_1.getDatabase)(this.app);
                this.sessionManager = new sessionManager_1.default(rdb, this.service);
            }
            this.isOnline = true;
            document.body.dispatchEvent(new CustomEvent("fireenjin:online", {
                detail: { sessionManager: this.sessionManager },
            }));
            return this.sessionManager.goOnline();
        });
    }
    goOffline() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sessionManager)
                return null;
            this.isOnline = false;
            document.body.dispatchEvent(new CustomEvent("fireenjin:offline", {
                detail: { sessionManager: this.sessionManager },
            }));
            return this.sessionManager.goOffline();
        });
    }
    getSessionManager() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sessionManager;
        });
    }
    getApp() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.app;
        });
    }
    getService() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service;
        });
    }
}
exports.default = AuthService;
