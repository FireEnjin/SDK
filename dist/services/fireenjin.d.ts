import { GraphQLClient } from "graphql-request";
import { FirebaseStorage } from "@firebase/storage";
import type { FireEnjinFetchInput, FireEnjinFetchOptions, FireEnjinHost, FireEnjinMethodOptions, FireEnjinOptions, FireEnjinSubmitInput, FireEnjinSubmitOptions, FireEnjinUploadInput } from "../interfaces";
import Client from "./client";
import FirestoreClient from "./firestore";
export default class FireEnjin<I = any> {
    client: Client | GraphQLClient | FirestoreClient | any;
    sdk: any;
    host: FireEnjinHost;
    currentConnection: number;
    options: FireEnjinOptions;
    storage?: FirebaseStorage;
    state: I | any;
    signals: {
        [signalKey: string]: Set<(data?: any) => void>;
    };
    currentSignal: ((data?: any) => any) | undefined;
    constructor(options: FireEnjinOptions);
    private onState;
    private onUpload;
    private onSubmit;
    private onFetch;
    private onSubscribe;
    subscribe(signalKey: string, signal: () => void): () => void;
    unsubscribe(signalKey: string, signal: () => void): Set<(data?: any) => void>;
    sendSignal(signalKey: string, data?: any): void;
    createSignal(initialValue: any, signalKey?: string, saveToState?: boolean, stateKey?: string): [() => any, any, string];
    createEffect(callback: () => void): void;
    createEffectPromise(callback: () => Promise<void>): void;
    clearSignal(signalKey?: string): {
        [signalKey: string]: Set<(data?: any) => void>;
    };
    private hash;
    upload<I = any, T = any>(input: FireEnjinUploadInput<I>, options?: FireEnjinMethodOptions): Promise<T>;
    fetch<I = any, T = any>(endpoint: string, input?: FireEnjinFetchInput<I>, options?: FireEnjinFetchOptions): Promise<T>;
    submit<I = any, T = any>(endpoint: string, input?: FireEnjinSubmitInput<I, T>, options?: FireEnjinSubmitOptions): Promise<T>;
    setHeader(key: string, value: string): any;
    setHeaders(headers: any): any;
    setConnection(nameUrlOrIndex: string | number): FireEnjinHost;
    uploadFile(
    /**
     * The file or Data URI to upload
     */
    file: File | string, input?: {
        event?: any;
        target?: any;
        path?: string;
        fileName?: string;
        onProgress?: (snapshot: any) => void;
    }, options?: FireEnjinMethodOptions): Promise<unknown>;
    watchDataAttributes(): void;
}
