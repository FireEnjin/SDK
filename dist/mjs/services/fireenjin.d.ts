import { GraphQLClient } from "graphql-request";
import Client from "./client";
import DatabaseService from "./database";
import FirestoreClient from "./firestore";
declare type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
export declare type FireEnjinEndpoints = {
    [endpoint: string]: (variables: any, requestHeaders: any) => Promise<any>;
};
export declare type FireEnjinHost = {
    url: string;
    db?: DatabaseService;
    name?: string;
    readOnly?: boolean;
    type?: "firebase" | "graphql" | "rest";
    headers?: HeadersInit;
    retries?: number;
    priority?: number;
    auth?: any;
    endpoints?: FireEnjinEndpoints;
};
export declare type FireEnjinOptions = {
    getSdk?: (client?: Client | GraphQLClient, withWrapper?: SdkFunctionWrapper) => FireEnjinEndpoints;
    host?: string;
    connections?: FireEnjinHost[];
    token?: string;
    onRequest?: SdkFunctionWrapper;
    onError?: (error: any) => void;
    onSuccess?: (data: any) => void;
    onUpload?: (data: any) => void;
    headers?: HeadersInit;
    uploadUrl?: string;
    debug?: boolean;
    disableCache?: boolean;
    emulate?: boolean;
};
export declare class FireEnjin {
    client: Client | GraphQLClient | FirestoreClient;
    sdk: any;
    host: FireEnjinHost;
    options: FireEnjinOptions;
    constructor(options: FireEnjinOptions);
    private hash;
    upload(input: {
        id?: string | number;
        path?: string;
        fileName?: string;
        file?: any;
        type?: string;
    }, options?: {
        event?: any;
        name?: string;
        endpoint?: string;
        bubbles?: boolean;
        cancelable?: boolean;
        composed?: boolean;
    }): Promise<any>;
    private onUpload;
    fetch(endpoint: string, variables?: any, options?: {
        cacheKey?: string;
        disableCache?: boolean;
        event?: Event;
        dataPropsMap?: any;
        name?: string;
        headers?: HeadersInit;
        bubbles?: boolean;
        cancelable?: boolean;
        composed?: boolean;
    }): Promise<any>;
    private onFetch;
    submit(endpoint: string, variables?: any, options?: {
        event?: Event;
        name?: string;
        bubbles?: boolean;
        cancelable?: boolean;
        composed?: boolean;
    }): Promise<any>;
    private onSubmit;
    setHeader(key: string, value: string): false | Client | FirestoreClient | GraphQLClient;
    setHeaders(headers: any): false | Client | FirestoreClient | GraphQLClient;
    setConnection(nameUrlOrIndex: string | number): FireEnjinHost;
}
export {};
