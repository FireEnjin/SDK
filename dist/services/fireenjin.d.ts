import { GraphQLClient } from "graphql-request";
import { FireEnjinFetchInput, FireEnjinFetchOptions, FireEnjinHost, FireEnjinMethodOptions, FireEnjinOptions, FireEnjinSubmitInput, FireEnjinSubmitOptions, FireEnjinUploadInput } from "../interfaces";
import Client from "./client";
import FirestoreClient from "./firestore";
export default class FireEnjin {
    client: Client | GraphQLClient | FirestoreClient;
    sdk: any;
    host: FireEnjinHost;
    currentConnection: number;
    options: FireEnjinOptions;
    constructor(options: FireEnjinOptions);
    private onUpload;
    private onSubmit;
    private onFetch;
    private hash;
    upload<I = any, T = any>(input: FireEnjinUploadInput<I>, options?: FireEnjinMethodOptions): Promise<T>;
    fetch<I = any, T = any>(endpoint: string, input?: FireEnjinFetchInput<I>, options?: FireEnjinFetchOptions): Promise<T>;
    submit<I = any, T = any>(endpoint: string, input?: FireEnjinSubmitInput<I, T>, options?: FireEnjinSubmitOptions): Promise<T>;
    setHeader(key: string, value: string): false | Client | GraphQLClient | FirestoreClient;
    setHeaders(headers: any): false | Client | GraphQLClient | FirestoreClient;
    setConnection(nameUrlOrIndex: string | number): FireEnjinHost;
}
