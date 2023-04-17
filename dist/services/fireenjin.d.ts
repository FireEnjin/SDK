import { GraphQLClient } from "graphql-request";
import { FirebaseStorage } from "@firebase/storage";
import { FireEnjinFetchInput, FireEnjinFetchOptions, FireEnjinHost, FireEnjinMethodOptions, FireEnjinOptions, FireEnjinSubmitInput, FireEnjinSubmitOptions, FireEnjinUploadInput } from "../interfaces";
import Client from "./client";
import FirestoreClient from "./firestore";
export default class FireEnjin {
    client: Client | GraphQLClient | FirestoreClient;
    sdk: any;
    host: FireEnjinHost;
    currentConnection: number;
    options: FireEnjinOptions;
    storage?: FirebaseStorage;
    constructor(options: FireEnjinOptions);
    private onUpload;
    private onSubmit;
    private onFetch;
    private hash;
    upload<I = any, T = any>(input: FireEnjinUploadInput<I>, options?: FireEnjinMethodOptions): Promise<T>;
    fetch<I = any, T = any>(endpoint: string, input?: FireEnjinFetchInput<I>, options?: FireEnjinFetchOptions): Promise<T>;
    submit<I = any, T = any>(endpoint: string, input?: FireEnjinSubmitInput<I, T>, options?: FireEnjinSubmitOptions): Promise<T>;
    setHeader(key: string, value: string): false | GraphQLClient | Client | FirestoreClient;
    setHeaders(headers: any): false | GraphQLClient | Client | FirestoreClient;
    setConnection(nameUrlOrIndex: string | number): FireEnjinHost;
    uploadFile(file: File, input?: {
        event?: any;
        target?: any;
        path?: string;
        fileName?: string;
        onProgress?: (snapshot: any) => void;
    }, options?: FireEnjinMethodOptions): Promise<import("@firebase/storage").UploadTaskSnapshot>;
}
