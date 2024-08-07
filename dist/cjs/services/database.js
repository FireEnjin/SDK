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
        (0, firestore_1.initializeFirestore)(this.app, {
            ignoreUndefinedProperties: true,
        });
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
                yield (0, firestore_1.setDoc)(this.document(collectionName, id), data, { merge: true });
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
    getCount(query) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const res = yield (0, firestore_1.getCountFromServer)(this.rawQuery(query === null || query === void 0 ? void 0 : query.collectionName, query === null || query === void 0 ? void 0 : query.where, query === null || query === void 0 ? void 0 : query.orderBy, query === null || query === void 0 ? void 0 : query.limit, query === null || query === void 0 ? void 0 : query.advanced));
            return ((_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.call(res)) === null || _b === void 0 ? void 0 : _b.count) || 0;
        });
    }
    /**
     * Credit: https://stackoverflow.com/users/1701600/boern
     * generates a string, e.g. used as document ID
     * @param {number} len length of random string, default with firebase is 20
     * @return {string} a strich such as tyCiv5FpxRexG9JX4wjP
     */
    getDocumentId(len = 20) {
        const list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
        let res = "";
        for (let i = 0; i < len; i++) {
            const rnd = Math.floor(Math.random() * list.length);
            res = res + list.charAt(rnd);
        }
        return res;
    }
    document(path, id) {
        return id ? (0, firestore_1.doc)(this.service, path, id) : (0, firestore_1.doc)(this.service, path);
    }
    getDocument(path, id) {
        return (0, firestore_1.getDoc)(this.document(path, id));
    }
    setDocument(path_1, data_1, id_1) {
        return __awaiter(this, arguments, void 0, function* (path, data, id, { merge, mergeFields } = {}) {
            const doc = this.document(path, id);
            yield (0, firestore_1.setDoc)(doc, data, {
                merge,
                mergeFields,
            });
            return doc;
        });
    }
    update(collectionName, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                throw new Error("No data passed to update method");
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
        this.watchers[watcherName] = (0, firestore_1.onSnapshot)(this.rawQuery(query === null || query === void 0 ? void 0 : query.collectionName, query === null || query === void 0 ? void 0 : query.where, query === null || query === void 0 ? void 0 : query.orderBy, query === null || query === void 0 ? void 0 : query.limit, query === null || query === void 0 ? void 0 : query.advanced), (snapshot) => __awaiter(this, void 0, void 0, function* () {
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
    rawQuery(collectionName, where, orderBy, limit, { startAfter, startAt, endAt, } = {}) {
        const params = [];
        for (const w of where || []) {
            if (!(w === null || w === void 0 ? void 0 : w.conditional) || !(w === null || w === void 0 ? void 0 : w.key))
                continue;
            params.push((0, firestore_1.where)(w.key, w.conditional, w.value));
        }
        if (orderBy)
            orderBy
                .split(",")
                .map((orderPart) => params.push(orderPart.includes(":")
                ? (0, firestore_1.orderBy)(orderPart.split(":")[0], orderPart.split(":")[1].includes("asc") ? "asc" : "desc")
                : (0, firestore_1.orderBy)(orderPart)));
        if (startAt)
            params.push(Array.isArray(startAt)
                ? (0, firestore_1.startAt)(...startAt)
                : (0, firestore_1.startAt)(startAt));
        if (startAfter)
            params.push(Array.isArray(startAfter)
                ? (0, firestore_1.startAfter)(...startAfter)
                : (0, firestore_1.startAfter)(startAfter));
        if (endAt)
            params.push(Array.isArray(endAt) ? (0, firestore_1.endAt)(...endAt) : (0, firestore_1.endAt)(endAt));
        if (limit)
            params.push((0, firestore_1.limit)(limit));
        return (0, firestore_1.query)(this.collection(collectionName), ...params);
    }
    query(collectionName, where, orderBy, limit, advanced) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, firestore_1.getDocs)(this.rawQuery(collectionName, where, orderBy, limit, advanced));
        });
    }
    list(collectionName, where, orderBy, limit, advanced) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = yield this.query(collectionName, where, orderBy, limit, advanced);
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
