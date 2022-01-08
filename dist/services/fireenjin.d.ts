import { GraphQLClient } from "graphql-request";
import Client from "./client";
declare type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
export declare type FireEnjinEndpoints = {
    [endpoint: string]: (variables: any, requestHeaders: any) => Promise<any>;
};
export declare type FireEnjinHost = {
    name?: string;
    url: string;
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
};
export declare class FireEnjin {
    client: Client | GraphQLClient;
    sdk: any;
    host: FireEnjinHost;
    options: FireEnjinOptions;
    constructor(options: FireEnjinOptions);
    upload(input: {
        event?: any;
        name?: string;
        endpoint?: string;
        id?: string | number;
        path?: string;
        fileName?: string;
        file?: any;
        type?: string;
    }): Promise<any>;
    private onUpload;
    fetch(endpoint: string, variables?: any, options?: {
        cacheKey?: string;
        disableCache?: boolean;
        event?: Event;
        dataPropsMap?: any;
        name?: string;
    }): Promise<any>;
    private onFetch;
    submit(endpoint: string, variables?: any, options?: {
        event?: Event;
        name?: string;
    }): Promise<any>;
    private onSubmit;
    setHeader(key: string, value: string): false | GraphQLClient | Client;
    setHeaders(headers: any): false | GraphQLClient | Client;
    setConnection(nameUrlOrIndex: string | number): FireEnjinHost;
}
export {};
