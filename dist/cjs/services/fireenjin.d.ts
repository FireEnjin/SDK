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
    upload(input: FireEnjinUploadInput, options?: FireEnjinMethodOptions): Promise<any>;
    fetch(endpoint: string, input?: FireEnjinFetchInput, options?: FireEnjinFetchOptions): Promise<any>;
    submit(endpoint: string, input?: FireEnjinSubmitInput, options?: FireEnjinSubmitOptions): Promise<any>;
    setHeader(key: string, value: string): false | Client | FirestoreClient | GraphQLClient;
    setHeaders(headers: any): false | Client | FirestoreClient | GraphQLClient;
    setConnection(nameUrlOrIndex: string | number): FireEnjinHost;
}
