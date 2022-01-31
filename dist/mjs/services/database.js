import { initializeApp } from "@firebase/app";
import { getFirestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query as firestoreQuery, orderBy as firestoreOrderBy, limit as firestoreLimit, where as firestoreWhere, setDoc, updateDoc, onSnapshot, enableIndexedDbPersistence, connectFirestoreEmulator, } from "@firebase/firestore";
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
                console.log("Initializing Firebase App...", this.app);
            }
            catch (e) {
                console.log(e);
            }
        }
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
            await setDoc(this.document(collectionName, id), data);
        }
        return id ? this.document(collectionName, id) : addDoc(collection, data);
    }
    async delete(path, id) {
        const doc = this.document(path, id);
        await deleteDoc(doc);
        return { id: doc.id };
    }
    collection(path) {
        return collection(this.service, path);
    }
    getCollection(path) {
        return getDocs(this.collection(path));
    }
    document(path, id) {
        return id ? doc(this.collection(path), id) : doc(this.service, path);
    }
    getDocument(path, id) {
        return getDoc(this.document(path, id));
    }
    async update(collectionName, id, data) {
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
        this.watchers[watcherName] = onSnapshot(this.rawQuery(query?.collectionName, query?.where, query?.orderBy, query?.limit), async (snapshot) => {
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
    rawQuery(collectionName, where, orderBy, limit) {
        const params = [];
        for (const w of where || []) {
            if (!w?.conditional || !w?.key)
                continue;
            params.push(firestoreWhere(w.key, w.conditional, w.value));
        }
        if (orderBy)
            params.push(firestoreOrderBy(orderBy));
        if (limit)
            params.push(firestoreLimit(limit));
        return firestoreQuery(this.collection(collectionName), ...params);
    }
    async query(collectionName, where, orderBy, limit) {
        return getDocs(this.rawQuery(collectionName, where, orderBy, limit));
    }
    async getApp() {
        return this.app;
    }
    async getService() {
        return this.service;
    }
}
