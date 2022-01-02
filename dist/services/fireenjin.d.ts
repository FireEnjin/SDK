import { GraphQLClient } from "graphql-request";
import Client from "./client";
declare type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
declare type FireEnjinHost = {
    name?: string;
    url?: string;
    type?: "firebase" | "graphql" | "rest";
    headers?: HeadersInit;
    retries?: number;
    priority?: number;
};
declare type FireEnjinOptions = {
    getSdk?: any;
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
    setHeader(key: string, value: string): boolean | GraphQLClient;
    setHeaders(headers: any): boolean | GraphQLClient;
    setConnection(name: string): FireEnjinHost;
}
export {};
