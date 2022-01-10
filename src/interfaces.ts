import { GraphQLClient } from "graphql-request";
import DatabaseService from "./services/database";
import Client from "./services/client";

type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

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

export type FireEnjinOptions = {
  getSdk?: (
    client?: Client | GraphQLClient,
    withWrapper?: SdkFunctionWrapper
  ) => FireEnjinEndpoints;
  host?: string;
  connections?: FireEnjinHost[];
  token?: string;
  onRequest?: SdkFunctionWrapper;
  onError?: FireEnjinErrorCallback;
  onSuccess?: FireEnjinSuccessCallback;
  onUpload?: FireEnjinUploadCallback;
  headers?: HeadersInit;
  uploadUrl?: string;
  debug?: boolean;
  disableCache?: boolean;
  emulate?: boolean;
};

export interface FireEnjinUploadInput {
  id?: string | number;
  path?: string;
  fileName?: string;
  file?: any;
  type?: string;
  encodedContent?: any;
}

export interface FireEnjinFetchInput {
  id?: string | number;
  params?: any;
  query?: any;
  [key: string]: any;
}

export interface FireEnjinSubmitInput {
  id?: string | number;
  params?: any;
  query?: any;
  data?: any;
  [key: string]: any;
}

export interface FireEnjinEvent {
  endpoint?: string;
  name?: string;
  event?: CustomEvent | Event;
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

export interface FireEnjinMethodOptions extends FireEnjinEvent {}

export interface FireEnjinUploadOptions extends FireEnjinMethodOptions {
  [key: string]: any;
}

export interface FireEnjinFetchOptions extends FireEnjinMethodOptions {
  cacheKey?: string;
  disableCache?: boolean;
  dataPropsMap?: any;
  headers?: HeadersInit;
}

export interface FireEnjinSubmitOptions extends FireEnjinMethodOptions {}

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
  data?: FireEnjinUploadInput;
}
