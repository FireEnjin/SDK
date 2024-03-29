import type { GraphQLClient } from "graphql-request";
import DatabaseService from "./services/database";
import Client from "./services/client";
import type { FirebaseStorage } from "firebase/storage";
import type { WhereFilterOp } from "@firebase/firestore";
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
export type FireEnjinQuery = {
    collectionName?: string;
    where?: {
        key?: string;
        conditional?: WhereFilterOp;
        value?: any;
    }[];
    orderBy?: string;
    limit?: number;
    advanced?: {
        startAfter?: any;
        startAt?: any;
        endAt?: any;
    };
};
export type FireEnjinErrorCallback = (data: FireEnjinErrorEvent) => void;
export type FireEnjinSuccessCallback = (data: FireEnjinSuccessEvent) => void;
export type FireEnjinUploadCallback = (data: CustomEvent<FireEnjinUploadEvent>) => Promise<any>;
export type FireEnjinProgressCallback = (data: FireEnjinProgressEvent) => void;
export type FireEnjinStateChangeCallback = (data: FireEnjinStateChangeEvent) => boolean;
export type FireEnjinStateReadCallback = (data: FireEnjinStateReadEvent) => boolean;
export type FireEnjinSubscriptionCallback<I = any> = (data: FireEnjinSubscriptionEvent<I>) => Promise<void> | void;
export type FireEnjinFetchCallback<I = any, T = any> = (endpoint: string, input?: FireEnjinFetchInput<I>, options?: FireEnjinFetchOptions) => Promise<T>;
export type FireEnjinSubmitCallback<I = any, T = any> = (endpoint: string, input?: FireEnjinSubmitInput<I, T>, options?: FireEnjinSubmitOptions) => Promise<T>;
export type FireEnjinOptions<I = any> = {
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
    onStateChange?: FireEnjinStateChangeCallback;
    onStateRead?: FireEnjinStateReadCallback;
    onSubscription?: FireEnjinSubscriptionCallback;
    uploadFileEncoding?: boolean;
    headers?: HeadersInit;
    uploadUrl?: string;
    debug?: boolean;
    disableCache?: boolean;
    emulate?: boolean;
    cachePrefix?: string;
    state?: I;
    autoBindAttributes?: boolean;
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
export interface FireEnjinFetchOptions<I = any> extends FireEnjinMethodOptions {
    cacheKey?: string;
    disableCache?: boolean;
    dataPropsMap?: any;
    headers?: HeadersInit;
    callback?: (data?: I, error?: any) => Promise<void>;
    fn?: (endpoint: string, input?: FireEnjinFetchInput<any>, options?: FireEnjinFetchOptions<I>) => Promise<any>;
}
export interface FireEnjinSubmitOptions<I = any> extends FireEnjinMethodOptions {
    callback?: (data?: I, error?: any) => Promise<void>;
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
    collection?: string;
    disableFetch?: boolean;
    dataPropsMap?: any;
    cacheKey?: string;
    disableCache?: boolean;
    params?: any;
}
export interface FireEnjinSubmitEvent extends FireEnjinEvent {
    id?: string | number;
    collection?: string;
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
export interface FireEnjinStateEvent<I = any> extends FireEnjinEvent {
    state?: I;
    stateKey?: string;
    value?: any;
}
export interface FireEnjinStateReadEvent<I = any> extends FireEnjinEvent {
    proxyTarget?: any;
    receiver?: any;
    state?: I;
    value?: any;
    stateKey?: string;
}
export interface FireEnjinStateChangeEvent<I = any> extends FireEnjinEvent {
    proxyTarget?: any;
    receiver?: any;
    state?: I;
    value?: any;
    prevState?: I;
    stateKey?: string;
}
export interface FireEnjinSubscribeEvent extends FireEnjinEvent {
    id?: string | number;
    collection?: string;
    query?: FireEnjinQuery;
    disableFetch?: boolean;
    dataPropsMap?: any;
    cacheKey?: string;
    disableCache?: boolean;
    params?: any;
    signalKey?: string;
    callback?: FireEnjinSubscriptionCallback;
}
export interface FireEnjinSubscriptionEvent<I = any> extends FireEnjinEvent {
    id?: string | number;
    collection?: string;
    query?: FireEnjinQuery;
    disableFetch?: boolean;
    dataPropsMap?: any;
    cacheKey?: string;
    disableCache?: boolean;
    params?: any;
    signalKey?: string;
    data?: I;
}
export {};
