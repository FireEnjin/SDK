import { GraphQLClient } from "graphql-request";
import Client from "./client";
declare type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
declare type FireEnjinHost = {
    name?: string;
    url: string;
    type?: "firebase" | "graphql" | "rest";
    headers?: HeadersInit;
    retries?: number;
    priority?: number;
};
declare type FireEnjinOptions = {
    getSdk?: (client?: Client | GraphQLClient, withWrapper?: SdkFunctionWrapper) => {
        [endpoint: string]: (variables: any, requestHeaders: any) => Promise<any>;
    };
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
export default class FireEnjin {
    client: Client | GraphQLClient;
    sdk: any;
    host: FireEnjinHost;
    options: FireEnjinOptions;
    constructor(options: FireEnjinOptions);
    upload(event: any): Promise<any>;
    fetch(event: any): Promise<any>;
    submit(event: any): Promise<any>;
    setHeader(key: string, value: string): false | GraphQLClient | Client;
    setHeaders(headers: any): false | GraphQLClient | Client;
    setConnection(name: string): FireEnjinHost;
}
export {};
