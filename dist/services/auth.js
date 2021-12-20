"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var facebook_1 = require("@ionic-native/facebook");
var google_plus_1 = require("@ionic-native/google-plus");
var twitter_connect_1 = require("@ionic-native/twitter-connect");
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var messaging_1 = require("firebase/messaging");
var database_1 = require("firebase/database");
var sessionManager_1 = require("./sessionManager");
var AuthService = /** @class */ (function () {
    function AuthService(config) {
        var _a;
        this.config = {
            authLocalStorageKey: "enjin:session",
            tokenLocalStorageKey: "enjin:token",
            facebook: {
                permissions: ["email", "public_profile", "user_friends"]
            }
        };
        this.facebook = facebook_1.Facebook;
        this.googlePlus = google_plus_1.GooglePlus;
        this.twitter = twitter_connect_1.TwitterConnect;
        this.isOnline = false;
        this.config = __assign(__assign({}, this.config), config);
        if (!this.app) {
            try {
                this.app = (0, app_1.initializeApp)(config.firebase);
                console.log("Initializing Firebase App...", this.app);
            }
            catch (e) {
                console.log(e);
            }
        }
        this.service = (0, auth_1.getAuth)(this.app);
        if (!this.config.googlePlus ||
            !this.config.googlePlus.options ||
            !this.config.googlePlus.options.webClientId) {
            console.log("googlePlus.options.webClientId is required for Google Native Auth See Here: https://github.com/EddyVerbruggen/cordova-plugin-googleplus#6-usage");
        }
        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.emulate) {
            (0, auth_1.connectAuthEmulator)(this.service, "http://localhost:9099");
        }
        this.onEmailLink(window.location.href);
    }
    AuthService.prototype.initializePushNotifications = function (onMessageCallback, options) {
        return __awaiter(this, void 0, void 0, function () {
            var messaging, vapidKey, messagingToken, _a, _b, permission, _c, _d, error_1;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 8, , 9]);
                        messaging = (0, messaging_1.getMessaging)(this.app);
                        if (onMessageCallback && typeof onMessageCallback === "function") {
                            (0, messaging_1.onMessage)(messaging, onMessageCallback);
                        }
                        vapidKey = (options === null || options === void 0 ? void 0 : options.vapidKey) || null;
                        _a = messaging_1.getToken;
                        _b = [messaging];
                        _e = {
                            vapidKey: vapidKey
                        };
                        return [4 /*yield*/, navigator.serviceWorker.getRegistration()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_e.serviceWorkerRegistration = _g.sent(),
                                _e)]))];
                    case 2:
                        messagingToken = _g.sent();
                        if (!!messagingToken) return [3 /*break*/, 7];
                        return [4 /*yield*/, Notification.requestPermission()];
                    case 3:
                        permission = _g.sent();
                        if (!(permission === "granted")) return [3 /*break*/, 6];
                        console.log("Notification permission granted.");
                        _c = messaging_1.getToken;
                        _d = [messaging];
                        _f = {
                            vapidKey: vapidKey
                        };
                        return [4 /*yield*/, navigator.serviceWorker.getRegistration()];
                    case 4: return [4 /*yield*/, _c.apply(void 0, _d.concat([(_f.serviceWorkerRegistration = _g.sent(),
                                _f)]))];
                    case 5:
                        messagingToken = _g.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        console.log("Unable to get permission to notify.");
                        _g.label = 7;
                    case 7: return [2 /*return*/, messagingToken];
                    case 8:
                        error_1 = _g.sent();
                        console.log("Service worker not enabled, push notifications will not work!", error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getClaims = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var claims, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, auth_1.getIdTokenResult)((_a = this.service) === null || _a === void 0 ? void 0 : _a.currentUser)];
                    case 1:
                        claims = (_b.sent()).claims;
                        return [2 /*return*/, claims];
                    case 2:
                        error_2 = _b.sent();
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getToken = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentToken, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_a = this.service) === null || _a === void 0 ? void 0 : _a.currentUser)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, auth_1.getIdToken)(this.service.currentUser)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = localStorage.getItem(this.config.tokenLocalStorageKey);
                        _c.label = 3;
                    case 3:
                        currentToken = _b;
                        return [4 /*yield*/, this.setToken(currentToken)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, currentToken];
                }
            });
        });
    };
    AuthService.prototype.setToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.setItem(this.config.tokenLocalStorageKey, token);
                return [2 /*return*/, token];
            });
        });
    };
    AuthService.prototype.onEmailLink = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            var email, authUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, auth_1.isSignInWithEmailLink)(this.service, link)) return [3 /*break*/, 2];
                        email = window.localStorage.getItem("emailForSignIn");
                        if (!email) {
                            email = window.prompt("Please provide your email for confirmation");
                        }
                        return [4 /*yield*/, (0, auth_1.signInWithEmailLink)(this.service, email, link)];
                    case 1:
                        authUser = _a.sent();
                        window.localStorage.removeItem("emailForSignIn");
                        this.emitLoggedInEvent(authUser);
                        return [2 /*return*/, authUser];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
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
    AuthService.prototype.withGoogleCredential = function (token) {
        return auth_1.GoogleAuthProvider.credential(token);
    };
    AuthService.prototype.withCredential = function (credential) {
        return (0, auth_1.signInWithCredential)(this.service, credential);
    };
    AuthService.prototype.withToken = function (token) {
        return (0, auth_1.signInWithCustomToken)(this.service, token);
    };
    AuthService.prototype.withPhoneNumber = function (phoneNumber, capId) {
        phoneNumber = "+" + phoneNumber;
        window.localStorage.setItem("phoneForSignIn", phoneNumber);
        return (0, auth_1.signInWithPhoneNumber)(this.service, phoneNumber, capId);
    };
    AuthService.prototype.withEmailLink = function (email, actionCodeSettings) {
        window.localStorage.setItem("emailForSignIn", email);
        return (0, auth_1.sendSignInLinkToEmail)(this.service, email, actionCodeSettings);
    };
    AuthService.prototype.anonymously = function () {
        return (0, auth_1.signInAnonymously)(this.service);
    };
    AuthService.prototype.onAuthChanged = function (callback) {
        var _this = this;
        (0, auth_1.onAuthStateChanged)(this.service, function (session) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!session ||
                            (!session.emailVerified &&
                                session.providerData &&
                                session.providerData[0].providerId === "password")) {
                            return [2 /*return*/, false];
                        }
                        if (!session) return [3 /*break*/, 2];
                        localStorage.setItem(this.config.authLocalStorageKey, JSON.stringify(session));
                        _b = (_a = localStorage).setItem;
                        _c = [this.config.tokenLocalStorageKey];
                        return [4 /*yield*/, (0, auth_1.getIdToken)((_d = this.service) === null || _d === void 0 ? void 0 : _d.currentUser, true)];
                    case 1:
                        _b.apply(_a, _c.concat([_e.sent()]));
                        _e.label = 2;
                    case 2:
                        if (callback && typeof callback === "function") {
                            callback(session);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        if (!localStorage.getItem(this.config.authLocalStorageKey)) {
            callback(null);
        }
    };
    AuthService.prototype.getFromStorage = function () {
        return localStorage.getItem(this.config.authLocalStorageKey)
            ? JSON.parse(localStorage.getItem(this.config.authLocalStorageKey))
            : null;
    };
    AuthService.prototype.isLoggedIn = function () {
        var session = this.service;
        return session ? session : this.getFromStorage();
    };
    AuthService.prototype.emitLoggedInEvent = function (data) {
        document.body.dispatchEvent(new CustomEvent("authLoggedIn", { detail: { data: data } }));
    };
    AuthService.prototype.emitLoggedOutEvent = function () {
        document.body.dispatchEvent(new CustomEvent("authLoggedOut", { detail: {} }));
    };
    AuthService.prototype.createUser = function (email, password) {
        return (0, auth_1.createUserWithEmailAndPassword)(this.service, email, password);
    };
    AuthService.prototype.sendEmailVerification = function (options) {
        return (0, auth_1.sendEmailVerification)(this.service.currentUser, options ? options : null);
    };
    AuthService.prototype.sendPasswordReset = function (emailAddress, options) {
        return (0, auth_1.sendPasswordResetEmail)(this.service, emailAddress, options ? options : null);
    };
    AuthService.prototype.withEmail = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                (0, auth_1.signInWithEmailAndPassword)(_this.service, email, password)
                    .then(function (user) {
                    _this.emitLoggedInEvent({ user: user });
                    resolve({ data: { user: user } });
                })["catch"](function (error) {
                    reject(error);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    AuthService.prototype.updateEmail = function (newEmail, actionOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            try {
                (0, auth_1.updateEmail)((_a = _this.service) === null || _a === void 0 ? void 0 : _a.currentUser, newEmail)
                    .then(function (user) {
                    resolve({ data: { user: user } });
                    _this.sendEmailVerification(actionOptions);
                })["catch"](function (error) {
                    reject(error);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    AuthService.prototype.facebookNative = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.facebook.login(this.config.facebook.permissions)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.withCredential(auth_1.FacebookAuthProvider.credential(result.authResponse.accessToken))];
                }
            });
        });
    };
    AuthService.prototype.googleNative = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.googlePlus.login(this.config.googlePlus.options)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log("Error with Google Native Login...");
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, this.withCredential(auth_1.GoogleAuthProvider.credential(result.idToken))];
                }
            });
        });
    };
    AuthService.prototype.twitterNative = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.twitter.login()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.withCredential(auth_1.TwitterAuthProvider.credential(result.token, result.secret))];
                }
            });
        });
    };
    AuthService.prototype.withSocial = function (network, redirect) {
        if (redirect === void 0) { redirect = false; }
        return __awaiter(this, void 0, void 0, function () {
            var provider, shouldRedirect;
            var _this = this;
            return __generator(this, function (_a) {
                shouldRedirect = redirect;
                if (window.matchMedia("(display-mode: standalone)").matches) {
                    console.log("Running in PWA mode...");
                    shouldRedirect = true;
                }
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var error_4;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!window.cordova) return [3 /*break*/, 1];
                                    if (network === "google") {
                                        this.googleNative()
                                            .then(function (result) {
                                            _this.emitLoggedInEvent(result);
                                            resolve(result);
                                        })["catch"](function (error) {
                                            console.log(error);
                                            reject(error);
                                        });
                                    }
                                    else if (network === "facebook") {
                                        this.facebookNative()
                                            .then(function (result) {
                                            _this.emitLoggedInEvent(result);
                                            resolve(result);
                                        })["catch"](function (error) {
                                            console.log(error);
                                            reject(error);
                                        });
                                    }
                                    else if (network === "twitter") {
                                        this.twitterNative()
                                            .then(function (result) {
                                            _this.emitLoggedInEvent(result);
                                            resolve(result);
                                        })["catch"](function (error) {
                                            console.log(error);
                                            reject(error);
                                        });
                                    }
                                    return [3 /*break*/, 8];
                                case 1:
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
                                            message: "A social network is required or the one provided is not yet supported."
                                        });
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 7, , 8]);
                                    if (!shouldRedirect) return [3 /*break*/, 4];
                                    return [4 /*yield*/, (0, auth_1.signInWithRedirect)(this.service, provider)];
                                case 3:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 4: return [4 /*yield*/, (0, auth_1.signInWithPopup)(this.service, provider)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6:
                                    this.emitLoggedInEvent({ currentUser: this.service.currentUser });
                                    return [3 /*break*/, 8];
                                case 7:
                                    error_4 = _a.sent();
                                    console.log(error_4);
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    AuthService.prototype.logout = function () {
        this.emitLoggedOutEvent();
        return (0, auth_1.signOut)(this.service);
    };
    AuthService.prototype.updatePassword = function (newPassword, credential) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!credential) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, auth_1.reauthenticateWithCredential)(this.service.currentUser, credential)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, (0, auth_1.updatePassword)(this.service.currentUser, newPassword)];
                }
            });
        });
    };
    AuthService.prototype.storeRoles = function (roles) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.setItem("roles", JSON.stringify(roles));
                return [2 /*return*/, roles];
            });
        });
    };
    AuthService.prototype.checkRolePermission = function (roleId, permission, ignoreAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            var roles, claims, _i, roles_1, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        roles = [];
                        return [4 /*yield*/, this.getClaims()];
                    case 1:
                        claims = _a.sent();
                        if (!ignoreAdmin && (claims === null || claims === void 0 ? void 0 : claims.admin)) {
                            return [2 /*return*/, true];
                        }
                        try {
                            roles = JSON.parse(localStorage.getItem("roles"));
                        }
                        catch (e) {
                            console.log("Error getting roles from local storage");
                        }
                        for (_i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                            role = roles_1[_i];
                            if (role.id === roleId &&
                                role.permissions &&
                                role.permissions.includes(permission)) {
                                return [2 /*return*/, true];
                            }
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    AuthService.prototype.goOnline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rdb;
            return __generator(this, function (_a) {
                if (!this.sessionManager) {
                    rdb = (0, database_1.getDatabase)(this.app);
                    this.sessionManager = new sessionManager_1["default"](rdb, this.service);
                }
                this.isOnline = true;
                document.body.dispatchEvent(new CustomEvent("fireenjin:online", {
                    detail: { sessionManager: this.sessionManager }
                }));
                return [2 /*return*/, this.sessionManager.goOnline()];
            });
        });
    };
    AuthService.prototype.goOffline = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.sessionManager)
                    return [2 /*return*/, null];
                this.isOnline = false;
                document.body.dispatchEvent(new CustomEvent("fireenjin:offline", {
                    detail: { sessionManager: this.sessionManager }
                }));
                return [2 /*return*/, this.sessionManager.goOffline()];
            });
        });
    };
    AuthService.prototype.getSessionManager = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sessionManager];
            });
        });
    };
    return AuthService;
}());
exports["default"] = AuthService;
