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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("@firebase/app");
var auth_1 = require("@firebase/auth");
// import { getMessaging, getToken, onMessage } from "@firebase/messaging";
var database_1 = require("@firebase/database");
var sessionManager_1 = require("./sessionManager");
var AuthService = /** @class */ (function () {
    function AuthService(options) {
        var _a, _b;
        this.config = {
            authLocalStorageKey: "enjin:session",
            tokenLocalStorageKey: "enjin:token",
            facebook: {
                permissions: ["email", "public_profile", "user_friends"],
            },
        };
        this.isOnline = false;
        this.config = __assign(__assign({}, this.config), ((options === null || options === void 0 ? void 0 : options.config) || {}));
        this.app = (options === null || options === void 0 ? void 0 : options.app) || null;
        var isWindow = typeof window !== "undefined" && window;
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
        this.service.useDeviceLanguage();
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
    AuthService.prototype.getApplicationVerifier = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.recaptchaVerifier];
            });
        });
    };
    AuthService.prototype.getUser = function (skipReload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!skipReload) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, auth_1.reload)(this.service.currentUser)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.service.currentUser];
                }
            });
        });
    };
    AuthService.prototype.getClaims = function () {
        return __awaiter(this, void 0, void 0, function () {
            var claims, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, auth_1.reload)(this.service.currentUser)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, (0, auth_1.getIdTokenResult)((_a = this.service) === null || _a === void 0 ? void 0 : _a.currentUser)];
                    case 2:
                        claims = (_b.sent()).claims;
                        return [2 /*return*/, claims];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, {}];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentToken, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!((_b = this.service) === null || _b === void 0 ? void 0 : _b.currentUser)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, auth_1.getIdToken)(this.service.currentUser)];
                    case 1:
                        _a = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = localStorage.getItem(((_c = this.config) === null || _c === void 0 ? void 0 : _c.tokenLocalStorageKey) || "");
                        _d.label = 3;
                    case 3:
                        currentToken = _a;
                        return [4 /*yield*/, this.setToken(currentToken)];
                    case 4:
                        _d.sent();
                        return [2 /*return*/, currentToken];
                }
            });
        });
    };
    AuthService.prototype.setToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.setItem(this.config.tokenLocalStorageKey || "", token);
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
                        return [4 /*yield*/, (0, auth_1.signInWithEmailLink)(this.service, email || "", link)];
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
    AuthService.prototype.verify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var _a, _b, _c;
                        try {
                            (_c = (_b = (_a = _this.recaptchaVerifier) === null || _a === void 0 ? void 0 : _a.verify()) === null || _b === void 0 ? void 0 : _b.then) === null || _c === void 0 ? void 0 : _c.call(_b, function (response) {
                                resolve(response);
                            });
                            reject("No recaptchaVerifier found");
                        }
                        catch (error) {
                            reject(error);
                        }
                    })];
            });
        });
    };
    AuthService.prototype.createCaptcha = function (el, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, error_2;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        this.recaptchaVerifier = new auth_1.RecaptchaVerifier(this.service, el, __assign({ size: "invisible", callback: function (response) {
                                resolve(response);
                            }, "expired-callback": function () {
                                reject("expired");
                            } }, options));
                        window.recaptchaVerifier = this.recaptchaVerifier;
                        _a = this;
                        return [4 /*yield*/, ((_c = (_b = this.recaptchaVerifier) === null || _b === void 0 ? void 0 : _b.render) === null || _c === void 0 ? void 0 : _c.call(_b))];
                    case 1:
                        _a.widgetId = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _d.sent();
                        reject(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthService.prototype.resetCaptcha = function (widgetId) {
        var captcha = this.recaptchaVerifier || window.recaptchaVerifier;
        captcha.reset(this.widgetId || widgetId);
        return captcha;
    };
    AuthService.prototype.withGoogleCredential = function (token) {
        return auth_1.GoogleAuthProvider.credential(token);
    };
    AuthService.prototype.withCredential = function (credential) {
        return (0, auth_1.signInWithCredential)(this.service, credential);
    };
    AuthService.prototype.withToken = function (token) {
        return (0, auth_1.signInWithCustomToken)(this.service, token);
    };
    AuthService.prototype.withPhoneNumber = function (phoneNumber) {
        var _this = this;
        phoneNumber = "+" + phoneNumber;
        window.localStorage.setItem("phoneForSignIn", phoneNumber);
        var signInRef = (0, auth_1.signInWithPhoneNumber)(this.service, phoneNumber, (this.recaptchaVerifier ||
            window.recaptchaVerifier));
        signInRef.then(function (confirmationResult) {
            _this.confirmationResult = confirmationResult;
        });
        return signInRef;
    };
    AuthService.prototype.confirmPhoneNumber = function (code) {
        var _a, _b;
        return (_b = (_a = this.confirmationResult) === null || _a === void 0 ? void 0 : _a.confirm) === null || _b === void 0 ? void 0 : _b.call(_a, code);
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
        var _a;
        (0, auth_1.onAuthStateChanged)(this.service, function (session) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            var _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!session ||
                            (!session.emailVerified &&
                                session.providerData &&
                                session.providerData[0].providerId === "password")) {
                            return [2 /*return*/, false];
                        }
                        if (!session) return [3 /*break*/, 2];
                        localStorage.setItem(((_d = this.config) === null || _d === void 0 ? void 0 : _d.authLocalStorageKey) || "", JSON.stringify(session));
                        _b = (_a = localStorage).setItem;
                        _c = [((_e = this.config) === null || _e === void 0 ? void 0 : _e.tokenLocalStorageKey) || ""];
                        return [4 /*yield*/, (0, auth_1.getIdToken)((_f = this.service) === null || _f === void 0 ? void 0 : _f.currentUser, true)];
                    case 1:
                        _b.apply(_a, _c.concat([_g.sent()]));
                        _g.label = 2;
                    case 2:
                        if (callback && typeof callback === "function") {
                            callback(session);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        if (!localStorage.getItem(((_a = this.config) === null || _a === void 0 ? void 0 : _a.authLocalStorageKey) || "")) {
            callback(null);
        }
    };
    AuthService.prototype.getFromStorage = function () {
        var _a, _b;
        return localStorage.getItem(((_a = this.config) === null || _a === void 0 ? void 0 : _a.authLocalStorageKey) || "")
            ? JSON.parse(localStorage.getItem(((_b = this.config) === null || _b === void 0 ? void 0 : _b.authLocalStorageKey) || ""))
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
                })
                    .catch(function (error) {
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
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    AuthService.prototype.withSocial = function (network_1) {
        return __awaiter(this, arguments, void 0, function (network, _a) {
            var provider;
            var _this = this;
            var _b = _a === void 0 ? {} : _a, redirect = _b.redirect, scopes = _b.scopes;
            return __generator(this, function (_c) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _i, _a, scope, error_3;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
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
                                        for (_i = 0, _a = scopes || []; _i < _a.length; _i++) {
                                            scope = _a[_i];
                                            provider.addScope(scope);
                                        }
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 6, , 7]);
                                    if (!redirect) return [3 /*break*/, 3];
                                    return [4 /*yield*/, (0, auth_1.signInWithRedirect)(this.service, provider)];
                                case 2:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, (0, auth_1.signInWithPopup)(this.service, provider)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5:
                                    this.emitLoggedInEvent({ currentUser: this.service.currentUser });
                                    return [3 /*break*/, 7];
                                case 6:
                                    error_3 = _b.sent();
                                    console.log(error_3);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
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
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!credential) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, auth_1.reauthenticateWithCredential)((_a = this.service) === null || _a === void 0 ? void 0 : _a.currentUser, credential)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
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
                    this.sessionManager = new sessionManager_1.default(rdb, this.service);
                }
                this.isOnline = true;
                document.body.dispatchEvent(new CustomEvent("fireenjin:online", {
                    detail: { sessionManager: this.sessionManager },
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
                    detail: { sessionManager: this.sessionManager },
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
    AuthService.prototype.getApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.app];
            });
        });
    };
    AuthService.prototype.getService = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.service];
            });
        });
    };
    return AuthService;
}());
exports.default = AuthService;
