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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@firebase/app");
const firestore_1 = require("@firebase/firestore");
const functions_1 = require("@firebase/functions");
class DatabaseService {
    constructor(options) {
        this.watchers = {};
        this.app = (options === null || options === void 0 ? void 0 : options.app) || null;
        if (!this.app && window) {
            try {
                this.app = (0, app_1.initializeApp)(options === null || options === void 0 ? void 0 : options.config);
                console.log("Initializing Firebase App...");
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
    call(functionName) {
        return (0, functions_1.httpsCallable)(this.functions, functionName);
    }
    add(collectionName, data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.collection(collectionName);
            if (id) {
                yield (0, firestore_1.setDoc)(this.document(collectionName, id), data);
            }
            return id ? this.document(collectionName, id) : (0, firestore_1.addDoc)(collection, data);
        });
    }
    delete(path, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = this.document(path, id);
            yield (0, firestore_1.deleteDoc)(doc);
            return { id: doc.id };
        });
    }
    find(collectionName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.getDocument(collectionName, id);
            return doc.data();
        });
    }
    collection(path) {
        return (0, firestore_1.collection)(this.service, path);
    }
    getCollection(path) {
        return (0, firestore_1.getDocs)(this.collection(path));
    }
    document(path, id) {
        return id ? (0, firestore_1.doc)(this.service, path, id) : (0, firestore_1.doc)(this.service, path);
    }
    getDocument(path, id) {
        return (0, firestore_1.getDoc)(this.document(path, id));
    }
    update(collectionName, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = this.document(collectionName, id);
            yield (0, firestore_1.updateDoc)(document, data, { merge: true });
            const newDocument = yield this.getDocument(collectionName, id);
            return newDocument.data();
        });
    }
    clearWatchers() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const watcherKey of Object.keys(this.watchers)) {
                this.watchers[watcherKey]();
            }
            return true;
        });
    }
    subscribe(query, callback, name) {
        const watcherName = name ? name : new Date().toISOString();
        this.watchers[watcherName] = (0, firestore_1.onSnapshot)(this.rawQuery(query === null || query === void 0 ? void 0 : query.collectionName, query === null || query === void 0 ? void 0 : query.where, query === null || query === void 0 ? void 0 : query.orderBy, query === null || query === void 0 ? void 0 : query.limit), (snapshot) => __awaiter(this, void 0, void 0, function* () {
            if (callback && typeof callback === "function") {
                callback({ docs: (snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) || [] });
            }
        }));
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
        this.watchers[watcherName] = (0, firestore_1.onSnapshot)(this.document(collectionName, id), (doc) => __awaiter(this, void 0, void 0, function* () {
            if (callback && typeof callback === "function") {
                callback({ data: doc.data() });
            }
        }));
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
            if (!(w === null || w === void 0 ? void 0 : w.conditional) || !(w === null || w === void 0 ? void 0 : w.key))
                continue;
            params.push((0, firestore_1.where)(w.key, w.conditional, w.value));
        }
        if (orderBy)
            params.push((0, firestore_1.orderBy)(orderBy));
        if (limit)
            params.push((0, firestore_1.limit)(limit));
        return (0, firestore_1.query)(this.collection(collectionName), ...params);
    }
    query(collectionName, where, orderBy, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, firestore_1.getDocs)(this.rawQuery(collectionName, where, orderBy, limit));
        });
    }
    list(collectionName, where, orderBy, limit) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.query(collectionName, where, orderBy, limit);
            return (((_a = query === null || query === void 0 ? void 0 : query.docs) === null || _a === void 0 ? void 0 : _a.map((queryDoc) => (Object.assign({ id: queryDoc.id }, ((queryDoc === null || queryDoc === void 0 ? void 0 : queryDoc.exists()) ? queryDoc.data() : {}))))) || null);
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
exports.default = DatabaseService;
