import { FirebaseApp } from "@firebase/app";
import { Firestore, WhereFilterOp, QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore";
import { Functions } from "@firebase/functions";
import type { FireEnjinQuery } from "../interfaces";
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
    add(collectionName: string, data: any, id?: string): Promise<import("@firebase/firestore").DocumentReference<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData> | import("@firebase/firestore").DocumentReference<any, import("@firebase/firestore").DocumentData>>;
    delete(path: string, id?: string): Promise<{
        id: string;
    }>;
    find(collectionName: string, id?: string): Promise<import("@firebase/firestore").DocumentData>;
    collection(path: string): import("@firebase/firestore").CollectionReference<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>;
    getCollection(path: any): Promise<QuerySnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
    getCount(query: FireEnjinQuery): Promise<number>;
    /**
     * Credit: https://stackoverflow.com/users/1701600/boern
     * generates a string, e.g. used as document ID
     * @param {number} len length of random string, default with firebase is 20
     * @return {string} a strich such as tyCiv5FpxRexG9JX4wjP
     */
    getDocumentId(len?: number): string;
    document(path: string, id?: string): import("@firebase/firestore").DocumentReference<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>;
    getDocument(path: string, id?: string): Promise<import("@firebase/firestore").DocumentSnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
    setDocument(path: string, data: any, id?: string, { merge, mergeFields }?: {
        merge?: boolean;
        mergeFields?: any;
    }): Promise<import("@firebase/firestore").DocumentReference<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
    update(collectionName: string, id: string, data: any): Promise<import("@firebase/firestore").DocumentData>;
    clearWatchers(): Promise<boolean>;
    subscribe(query: FireEnjinQuery, callback: (data: {
        docs: QueryDocumentSnapshot[];
    }) => void, name?: string): any;
    unsubscribe(watcherName: string): boolean;
    watchDocument(collectionName: string, id: string, callback: any): void;
    unwatchDocument(collectionName: string, id: string): boolean;
    rawQuery(collectionName: string, where?: {
        key?: string;
        conditional?: WhereFilterOp;
        value?: any;
    }[], orderBy?: string, limit?: number, { startAfter, startAt, endAt, }?: {
        startAfter?: any;
        startAt?: any;
        endAt?: any;
    }): import("@firebase/firestore").Query<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>;
    query(collectionName: string, where: {
        key?: string;
        conditional?: WhereFilterOp;
        value?: any;
    }[], orderBy?: string, limit?: number, advanced?: {
        startAfter?: any;
        startAt?: any;
        endAt?: any;
    }): Promise<QuerySnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
    list(collectionName: string, where: {
        key?: string;
        conditional?: WhereFilterOp;
        value?: any;
    }[], orderBy?: string, limit?: number, advanced?: {
        startAfter?: any;
        startAt?: any;
        endAt?: any;
    }): Promise<{
        id: string;
    }[]>;
    getApp(): Promise<FirebaseApp>;
    getService(): Promise<Firestore>;
}
