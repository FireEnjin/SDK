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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var app_1 = require("@firebase/app");
var firestore_1 = require("@firebase/firestore");
var functions_1 = require("@firebase/functions");
var DatabaseService = /** @class */ (function () {
    function DatabaseService(options) {
        this.watchers = {};
        this.app = (options === null || options === void 0 ? void 0 : options.app) || null;
        if (!this.app && window) {
            try {
                this.app = (0, app_1.initializeApp)(options === null || options === void 0 ? void 0 : options.config);
                console.log("Initializing Firebase App...", this.app);
            }
            catch (e) {
                console.log(e);
            }
        }
        this.service = (0, firestore_1.getFirestore)(this.app);
        this.functions = (0, functions_1.getFunctions)(this.app);
        if (options === null || options === void 0 ? void 0 : options.emulate) {
            (0, firestore_1.connectFirestoreEmulator)(this.service, "localhost", 8080);
            (0, functions_1.connectFunctionsEmulator)(this.functions, "localhost", 5001);
        }
        try {
            (0, firestore_1.enableIndexedDbPersistence)(this.service);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    DatabaseService.prototype.call = function (functionName) {
        return (0, functions_1.httpsCallable)(this.functions, functionName);
    };
    DatabaseService.prototype.add = function (collectionName, data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection(collectionName)];
                    case 1:
                        collection = _a.sent();
                        if (!id) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, firestore_1.setDoc)(this.document(collectionName, id), data)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, id ? this.document(collectionName, id) : (0, firestore_1.addDoc)(collection, data)];
                }
            });
        });
    };
    DatabaseService.prototype.collection = function (path) {
        return (0, firestore_1.collection)(this.service, path);
    };
    DatabaseService.prototype.getCollection = function (path) {
        return (0, firestore_1.getDocs)(this.collection(path));
    };
    DatabaseService.prototype.document = function (path, id) {
        return id ? (0, firestore_1.doc)(this.collection(path), id) : (0, firestore_1.doc)(this.service, path);
    };
    DatabaseService.prototype.getDocument = function (path, id) {
        return (0, firestore_1.getDoc)(this.document(path, id));
    };
    DatabaseService.prototype.update = function (collectionName, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var document, newDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = this.document(collectionName, id);
                        return [4 /*yield*/, (0, firestore_1.updateDoc)(document, data, { merge: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getDocument(collectionName, id)];
                    case 2:
                        newDocument = _a.sent();
                        return [2 /*return*/, newDocument.data()];
                }
            });
        });
    };
    DatabaseService.prototype.clearWatchers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, watcherKey;
            return __generator(this, function (_b) {
                for (_i = 0, _a = Object.keys(this.watchers); _i < _a.length; _i++) {
                    watcherKey = _a[_i];
                    this.watchers[watcherKey]();
                }
                return [2 /*return*/, true];
            });
        });
    };
    DatabaseService.prototype.subscribe = function (query, callback, name) {
        var _this = this;
        var watcherName = name ? name : new Date().toISOString();
        this.watchers[watcherName] = (0, firestore_1.onSnapshot)(this.rawQuery(query === null || query === void 0 ? void 0 : query.collectionName, query === null || query === void 0 ? void 0 : query.where, query === null || query === void 0 ? void 0 : query.orderBy, query === null || query === void 0 ? void 0 : query.limit), function (snapshot) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (callback && typeof callback === "function") {
                    callback({ docs: (snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) || [] });
                }
                return [2 /*return*/];
            });
        }); });
        return this.watchers[watcherName];
    };
    DatabaseService.prototype.unsubscribe = function (watcherName) {
        if (this.watchers[watcherName] &&
            typeof this.watchers[watcherName] === "function") {
            this.watchers[watcherName]();
            return true;
        }
        else {
            console.log("There is no watcher running on ".concat(watcherName, " query."));
            return false;
        }
    };
    DatabaseService.prototype.watchDocument = function (collectionName, id, callback) {
        var _this = this;
        var watcherName = "".concat(collectionName, ":").concat(id);
        this.watchers[watcherName] = (0, firestore_1.onSnapshot)(this.document(collectionName, id), function (doc) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (callback && typeof callback === "function") {
                    callback({ data: doc.data() });
                }
                return [2 /*return*/];
            });
        }); });
    };
    DatabaseService.prototype.unwatchDocument = function (collectionName, id) {
        var watcherName = "".concat(collectionName, ":").concat(id);
        if (this.watchers[watcherName] &&
            typeof this.watchers[watcherName] === "function") {
            this.watchers[watcherName]();
            return true;
        }
        else {
            console.log("There is no watcher running on ".concat(watcherName, " document."));
            return false;
        }
    };
    DatabaseService.prototype.rawQuery = function (collectionName, where, orderBy, limit) {
        var params = [];
        for (var _i = 0, _a = where || []; _i < _a.length; _i++) {
            var w = _a[_i];
            if (!(w === null || w === void 0 ? void 0 : w.conditional) || !(w === null || w === void 0 ? void 0 : w.key))
                continue;
            params.push((0, firestore_1.where)(w.key, w.conditional, w.value));
        }
        if (orderBy)
            params.push((0, firestore_1.orderBy)(orderBy));
        if (limit)
            params.push((0, firestore_1.limit)(limit));
        return firestore_1.query.apply(void 0, __spreadArray([this.collection(collectionName)], params, false));
    };
    DatabaseService.prototype.query = function (collectionName, where, orderBy, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, firestore_1.getDocs)(this.rawQuery(collectionName, where, orderBy, limit))];
            });
        });
    };
    DatabaseService.prototype.getApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.app];
            });
        });
    };
    DatabaseService.prototype.getService = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.service];
            });
        });
    };
    return DatabaseService;
}());
exports["default"] = DatabaseService;
