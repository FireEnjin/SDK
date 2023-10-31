import { GraphQLClient } from "graphql-request";
import DatabaseService from "./services/database";
import Client from "./services/client";
import { FirebaseStorage } from "firebase/storage";
type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
export type FireEnjinEndpoints = {
    [endpoint: string]: (variables: any, requestHeaders: any) => Promise<any>;
};
export type FireEnjinHost = {
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
export type FireEnjinErrorCallback = (data: FireEnjinErrorEvent) => void;
export type FireEnjinSuccessCallback = (data: FireEnjinSuccessEvent) => void;
export type FireEnjinUploadCallback = (data: FireEnjinUploadEvent) => void;
export type FireEnjinProgressCallback = (data: FireEnjinProgressEvent) => void;
export type FireEnjinFetchCallback<I = any, T = any> = (endpoint: string, input?: FireEnjinFetchInput<I>, options?: FireEnjinFetchOptions) => Promise<T>;
export type FireEnjinSubmitCallback<I = any, T = any> = (endpoint: string, input?: FireEnjinSubmitInput<I, T>, options?: FireEnjinSubmitOptions) => Promise<T>;
export type FireEnjinOptions = {
    getSdk?: (client?: Client | GraphQLClient, withWrapper?: SdkFunctionWrapper) => FireEnjinEndpoints;
    host?: string;
    storage?: FirebaseStorage;
    connections?: FireEnjinHost[];
    token?: string;
    onRequest?: SdkFunctionWrapper;
    onError?: FireEnjinErrorCallback;
    onSuccess?: FireEnjinSuccessCallback;
    onUpload?: FireEnjinUploadCallback;
    onFetch?: FireEnjinFetchCallback;
    onSubmit?: FireEnjinSubmitCallback;
    onProgress?: FireEnjinProgressCallback;
    uploadFileEncoding?: boolean;
    headers?: HeadersInit;
    uploadUrl?: string;
    debug?: boolean;
    disableCache?: boolean;
    emulate?: boolean;
    cachePrefix?: string;
};
export interface FireEnjinUploadData {
    id?: string | number;
    path?: string;
    fileName?: string;
    file?: any;
    type?: string;
    encodedContent?: any;
}
export interface FireEnjinUploadInput<I = any> {
    params?: I;
    id?: string | number;
    data?: FireEnjinUploadData;
    query?: string;
}
export interface FireEnjinFetchInput<I = any> {
    id?: string | number;
    collection?: string;
    params?: I;
    query?: any;
    [key: string]: any;
}
export interface FireEnjinSubmitInput<I = any, T = any> {
    id?: string | number;
    collection?: string;
    params?: I;
    query?: any;
    data?: T;
    [key: string]: any;
}
export interface FireEnjinTriggerInput<I = any> {
    name?: string;
    payload?: I;
    [key: string]: any;
}
export interface FireEnjinEvent {
    endpoint?: string;
    name?: string;
    event?: CustomEvent | Event;
    target?: any;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    method?: "get" | "post" | "put" | "delete";
}
export interface FireEnjinMethodOptions extends FireEnjinEvent {
}
export interface FireEnjinUploadOptions extends FireEnjinMethodOptions {
    [key: string]: any;
}
export interface FireEnjinFetchOptions extends FireEnjinMethodOptions {
    cacheKey?: string;
    disableCache?: boolean;
    dataPropsMap?: any;
    headers?: HeadersInit;
    fn?: (endpoint: string, input?: FireEnjinFetchInput<any>, options?: FireEnjinFetchOptions) => Promise<any>;
}
export interface FireEnjinSubmitOptions extends FireEnjinMethodOptions {
    fn?: (endpoint: string, input?: FireEnjinFetchInput<any>, options?: FireEnjinFetchOptions) => Promise<any>;
}
export interface FireEnjinSuccessEvent extends FireEnjinEvent {
    data?: any;
    cached?: boolean;
}
export interface FireEnjinErrorEvent extends FireEnjinEvent {
    error?: any;
    cached?: boolean;
}
export interface FireEnjinFetchEvent extends FireEnjinEvent {
    id?: string | number;
    disableFetch?: boolean;
    dataPropsMap?: any;
    cacheKey?: string;
    disableCache?: boolean;
    params?: any;
}
export interface FireEnjinSubmitEvent extends FireEnjinEvent {
    id?: string | number;
    disableSubmit?: boolean;
    data?: any;
    params?: any;
    query?: any;
}
export interface FireEnjinUploadEvent extends FireEnjinEvent {
    data?: FireEnjinUploadData;
}
export interface FireEnjinProgressEvent extends FireEnjinEvent {
    path?: string;
    fileName?: string;
    progress?: number;
    snapshot?: any;
    target?: any;
}
export {};
