import { initializeApp } from "@firebase/app";
import { getFirestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, initializeFirestore, query as firestoreQuery, orderBy as firestoreOrderBy, limit as firestoreLimit, where as firestoreWhere, startAfter as firestoreStartAfter, startAt as firestoreStartAt, endAt as firestoreEndAt, setDoc, updateDoc, onSnapshot, enableIndexedDbPersistence, connectFirestoreEmulator, } from "@firebase/firestore";
import { connectFunctionsEmulator, getFunctions, httpsCallable, } from "@firebase/functions";
export default class DatabaseService {
    app;
    service;
    watchers = {};
    functions;
    constructor(options) {
        this.app = options?.app || null;
        if (!this.app && window) {
            try {
                this.app = initializeApp(options?.config);
                console.log("Initializing Firebase App...");
            }
            catch (e) {
                console.log(e);
            }
        }
        initializeFirestore(this.app, {
            ignoreUndefinedProperties: true,
        });
        this.service = getFirestore(this.app);
        this.functions = getFunctions(this.app);
        if (options?.emulate) {
            connectFirestoreEmulator(this.service, "localhost", 8080);
            connectFunctionsEmulator(this.functions, "localhost", 5001);
        }
        try {
            enableIndexedDbPersistence(this.service);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    call(functionName) {
        return httpsCallable(this.functions, functionName);
    }
    async add(collectionName, data, id) {
        const collection = await this.collection(collectionName);
        if (id) {
            await setDoc(this.document(collectionName, id), data, { merge: true });
        }
        return id ? this.document(collectionName, id) : addDoc(collection, data);
    }
    async delete(path, id) {
        const doc = this.document(path, id);
        await deleteDoc(doc);
        return { id: doc.id };
    }
    async find(collectionName, id) {
        const doc = await this.getDocument(collectionName, id);
        return doc.data();
    }
    collection(path) {
        return collection(this.service, path);
    }
    getCollection(path) {
        return getDocs(this.collection(path));
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
        return id ? doc(this.service, path, id) : doc(this.service, path);
    }
    getDocument(path, id) {
        return getDoc(this.document(path, id));
    }
    async setDocument(path, data, id, { merge, mergeFields } = {}) {
        const doc = this.document(path, id);
        await setDoc(doc, data, {
            merge,
            mergeFields,
        });
        return doc;
    }
    async update(collectionName, id, data) {
        if (!data)
            throw new Error("No data passed to update method");
        const document = this.document(collectionName, id);
        await updateDoc(document, data, { merge: true });
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
        this.watchers[watcherName] = onSnapshot(this.rawQuery(query?.collectionName, query?.where, query?.orderBy, query?.limit, query?.advanced), async (snapshot) => {
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
        this.watchers[watcherName] = onSnapshot(this.document(collectionName, id), async (doc) => {
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
    rawQuery(collectionName, where, orderBy, limit, { startAfter, startAt, endAt, } = {}) {
        const params = [];
        for (const w of where || []) {
            if (!w?.conditional || !w?.key)
                continue;
            params.push(firestoreWhere(w.key, w.conditional, w.value));
        }
        if (orderBy)
            orderBy
                .split(",")
                .map((orderPart) => params.push(orderPart.includes(":")
                ? firestoreOrderBy(orderPart.split(":")[0], orderPart.split(":")[1].includes("asc") ? "asc" : "desc")
                : firestoreOrderBy(orderPart)));
        if (startAt)
            params.push(Array.isArray(startAt)
                ? firestoreStartAt(...startAt)
                : firestoreStartAt(startAt));
        if (startAfter)
            params.push(Array.isArray(startAfter)
                ? firestoreStartAfter(...startAfter)
                : firestoreStartAfter(startAfter));
        if (endAt)
            params.push(Array.isArray(endAt) ? firestoreEndAt(...endAt) : firestoreEndAt(endAt));
        if (limit)
            params.push(firestoreLimit(limit));
        return firestoreQuery(this.collection(collectionName), ...params);
    }
    async query(collectionName, where, orderBy, limit, advanced) {
        return getDocs(this.rawQuery(collectionName, where, orderBy, limit, advanced));
    }
    async list(collectionName, where, orderBy, limit, advanced) {
        const query = await this.query(collectionName, where, orderBy, limit, advanced);
        return (query?.docs?.map((queryDoc) => ({
            id: queryDoc.id,
            ...(queryDoc?.exists() ? queryDoc.data() : {}),
        })) || null);
    }
    async getApp() {
        return this.app;
    }
    async getService() {
        return this.service;
    }
}
