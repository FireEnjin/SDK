import {
  Firestore,
  getFirestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query as firestoreQuery,
  orderBy as firestoreOrderBy,
  limit as firestoreLimit,
  where as firestoreWhere,
  WhereFilterOp,
  setDoc,
  updateDoc,
  onSnapshot,
  enableIndexedDbPersistence,
  connectFirestoreEmulator,
} from "firebase/firestore";
import {
  connectFunctionsEmulator,
  Functions,
  getFunctions,
  httpsCallable,
} from "firebase/functions";

export default class DatabaseService {
  service: Firestore;
  watchers: any = {};
  functions: Functions;

  constructor(options?: { emulate: boolean }) {
    this.service = getFirestore();
    this.functions = getFunctions();
    if (options?.emulate) {
      connectFirestoreEmulator(this.service, "localhost", 8080);
      connectFunctionsEmulator(this.functions, "localhost", 5001);
    }
    try {
      enableIndexedDbPersistence(this.service);
    } catch (error) {
      console.log(error.message);
    }
  }

  call(functionName: string) {
    return httpsCallable(this.functions, functionName);
  }

  async add(collectionName: string, data: any, id?: string) {
    const collection = await this.collection(collectionName);

    if (id) {
      await setDoc(this.document(collectionName, id), data);
    }
    return id ? this.document(collectionName, id) : addDoc(collection, data);
  }

  collection(path: string) {
    return collection(this.service, path);
  }

  getCollection(path) {
    return getDocs(this.collection(path));
  }

  document(path: string, id?: string) {
    return id ? doc(this.collection(path), id) : doc(this.service, path);
  }

  getDocument(path: string, id?: string) {
    return getDoc(this.document(path, id));
  }

  async update(collectionName: string, id: string, data: any) {
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

  watchDocument(collectionName: string, id: string, callback) {
    const watcherName = `${collectionName}:${id}`;
    this.watchers[watcherName] = onSnapshot(
      this.document(collectionName, id),
      async (doc) => {
        if (callback && typeof callback === "function") {
          callback({ data: doc.data() });
        }
      }
    );
  }

  unwatchDocument(collectionName: string, id: string) {
    const watcherName = `${collectionName}:${id}`;
    if (
      this.watchers[watcherName] &&
      typeof this.watchers[watcherName] === "function"
    ) {
      this.watchers[watcherName]();

      return true;
    } else {
      console.log(`There is no watcher running on ${watcherName} document.`);

      return false;
    }
  }

  async query(
    collectionName: string,
    where: { key?: string; conditional?: WhereFilterOp; value?: any }[],
    orderBy?: string,
    limit?: number
  ) {
    const params = [];
    for (const w of where || []) {
      if (!w?.conditional || !w?.key) continue;
      params.push(firestoreWhere(w.key, w.conditional, w.value));
    }
    if (orderBy) params.push(firestoreOrderBy(orderBy));
    if (limit) params.push(firestoreLimit(limit));

    return getDocs(firestoreQuery(this.collection(collectionName), ...params));
  }
}
