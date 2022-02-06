import { FirebaseApp } from "@firebase/app";
import { Firestore, WhereFilterOp, QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore";
import { Functions } from "@firebase/functions";
export default class DatabaseService {
    app: FirebaseApp;
    service: Firestore;
    watchers: any;
    functions: Functions;
    constructor(options?: {
        emulate?: boolean;
        app?: any;
        config?: any;
    });
    call(functionName: string): import("@firebase/functions").HttpsCallable<unknown, unknown>;
    add(collectionName: string, data: any, id?: string): Promise<import("@firebase/firestore").DocumentReference<import("@firebase/firestore").DocumentData> | import("@firebase/firestore").DocumentReference<any>>;
    delete(path: string, id?: string): Promise<{
        id: string;
    }>;
    find(collectionName: string, id: string): Promise<import("@firebase/firestore").DocumentData | null>;
    collection(path: string): import("@firebase/firestore").CollectionReference<import("@firebase/firestore").DocumentData>;
    getCollection(path: any): Promise<QuerySnapshot<import("@firebase/firestore").DocumentData>>;
    document(path: string, id?: string): import("@firebase/firestore").DocumentReference<import("@firebase/firestore").DocumentData>;
    getDocument(path: string, id?: string): Promise<import("@firebase/firestore").DocumentSnapshot<import("@firebase/firestore").DocumentData>>;
    update(collectionName: string, id: string, data: any): Promise<import("@firebase/firestore").DocumentData | undefined>;
    clearWatchers(): Promise<boolean>;
    subscribe(query: {
        collectionName: string;
        where?: {
            key?: string;
            conditional?: WhereFilterOp;
            value?: any;
        }[];
        orderBy?: string;
        limit?: number;
    }, callback: (data: {
        docs: QueryDocumentSnapshot[];
    }) => void, name?: string): any;
    unsubscribe(watcherName: string): boolean;
    watchDocument(collectionName: string, id: string, callback: any): void;
    unwatchDocument(collectionName: string, id: string): boolean;
    rawQuery(collectionName: string, where?: {
        key?: string;
        conditional?: WhereFilterOp;
        value?: any;
    }[], orderBy?: string, limit?: number): import("@firebase/firestore").Query<import("@firebase/firestore").DocumentData>;
    query(collectionName: string, where: {
        key?: string;
        conditional?: WhereFilterOp;
        value?: any;
    }[], orderBy?: string, limit?: number): Promise<QuerySnapshot<import("@firebase/firestore").DocumentData>>;
    getApp(): Promise<FirebaseApp>;
    getService(): Promise<Firestore>;
}
