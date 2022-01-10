import * as localforage from "localforage";
import { GraphQLClient } from "graphql-request";

import Client from "./client";
import tryOrFail from "../helpers/tryOrFail";
import DatabaseService from "./database";
import FirestoreClient from "./firestore";

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

export type FireEnjinOptions = {
  getSdk?: (
    client?: Client | GraphQLClient,
    withWrapper?: SdkFunctionWrapper
  ) => FireEnjinEndpoints;
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

export class FireEnjin {
  client: Client | GraphQLClient | FirestoreClient;
  sdk: any = {};
  host: FireEnjinHost = {
    url: "http://localhost:4000",
  };
  options: FireEnjinOptions;

  constructor(options: FireEnjinOptions) {
    this.options = options || {};
    const headers = {
      Authorization: options?.token ? `Bearer ${options.token}` : "",
      ...(options.headers ? options.headers : {}),
    };

    this.host = options?.connections?.length
      ? this.setConnection(0)
      : ({
          url: options.host,
          type: "rest",
          headers,
        } as FireEnjinHost);

    this.client =
      this.host.type === "graphql"
        ? new GraphQLClient(this.host?.url || "http://localhost:4000", {
            headers: this.host?.headers || {},
          })
        : this.host?.type === "firebase"
        ? new FirestoreClient(this.host.url, {
            db: this.host?.db
              ? this.host.db
              : (new DatabaseService({
                  emulate: !!options?.emulate,
                  config: this.host?.auth,
                }) as any),
          })
        : new Client(this.host.url, { headers: this.host?.headers || {} });
    this.sdk =
      this.host.type === "graphql" && typeof options?.getSdk === "function"
        ? options.getSdk(this.client, this.options?.onRequest)
        : null;
    if (document) {
      document.addEventListener("fireenjinUpload", (event) => {
        this.onUpload(event);
      });
      document.addEventListener("fireenjinSubmit", (event) => {
        this.onSubmit(event);
      });
      document.addEventListener("fireenjinFetch", (event) => {
        this.onFetch(event);
      });
    }
  }

  private hash(input: string) {
    var hash = 0,
      i,
      chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr = input.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  }

  async upload(
    input: {
      id?: string | number;
      path?: string;
      fileName?: string;
      file?: any;
      type?: string;
    },
    options?: {
      event?: any;
      name?: string;
      endpoint?: string;
      bubbles?: boolean;
      cancelable?: boolean;
      composed?: boolean;
    }
  ) {
    const endpoint = options?.endpoint || "upload";
    return tryOrFail(
      async () =>
        this.client.request(
          this.options.uploadUrl
            ? this.options.uploadUrl
            : `${this.host.url}/${endpoint}`,
          input
        ),
      {
        event: options?.event || null,
        name: options?.name || endpoint,
        bubbles: !!options?.bubbles,
        cancelable: !!options?.cancelable,
        composed: !!options?.composed,
        endpoint,
        cached: true,
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
  }

  private async onUpload(event: any) {
    if (typeof this.options?.onUpload === "function")
      this.options.onUpload(event);
    if (
      !event.detail?.data?.encodedContent ||
      typeof this.options?.onUpload === "function"
    )
      return false;

    const data = await this.upload(
      {
        id: event.detail.data?.id,
        path: event.detail.data?.path,
        fileName: event.detail.data?.fileName,
        file: event.detail.data?.encodedContent,
        type: event.detail.data?.type,
      },
      {
        event: event.detail?.event,
        name: event.detail?.name,
        endpoint: event.detail?.endpoint,
      }
    );

    if (event?.target) event.target.value = data?.url || null;

    return data;
  }

  async fetch(
    endpoint: string,
    variables?: any,
    options?: {
      cacheKey?: string;
      disableCache?: boolean;
      event?: Event;
      dataPropsMap?: any;
      name?: string;
      headers?: HeadersInit;
      bubbles?: boolean;
      cancelable?: boolean;
      composed?: boolean;
    }
  ) {
    let data: any = null;
    const event: any = options?.event || null;
    const name: string = options?.name || (null as any);
    const localKey = options?.cacheKey
      ? options.cacheKey
      : `${endpoint}_${
          variables?.id
            ? `${variables.id}:`
            : variables?.params
            ? this.hash(JSON.stringify(Object.values(variables.params)))
            : ""
        }${this.hash(JSON.stringify(variables || {}))}`;

    if (!options?.disableCache) {
      data = await tryOrFail(async () => localforage.getItem(localKey), {
        endpoint,
        event,
        name,
        cached: true,
        bubbles: !!options?.bubbles,
        cancelable: !!options?.cancelable,
        composed: !!options?.composed,
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      });
    }

    data = await tryOrFail(
      async () =>
        this.host?.type === "graphql"
          ? variables?.query
            ? this.client.request(variables?.query, variables?.params)
            : this.sdk[endpoint](variables, options?.headers)
          : this.client.request(endpoint, variables),
      {
        endpoint,
        event,
        name,
        cached: false,
        bubbles: !!options?.bubbles,
        cancelable: !!options?.cancelable,
        composed: !!options?.composed,
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );

    return data;
  }

  private async onFetch(event: any) {
    if (
      !event ||
      !event.detail ||
      !event.detail.endpoint ||
      event.detail.disableFetch
    )
      return false;

    return this.fetch(event.detail.endpoint, event?.detail?.params || {}, {
      event: event?.detail?.event,
      dataPropsMap: event?.detail?.dataPropsMap,
      name: event?.detail?.name,
      cacheKey: event?.detail?.cacheKey,
      disableCache: !!event?.detail?.disableCache,
    });
  }

  async submit(
    endpoint: string,
    variables?: any,
    options?: {
      event?: Event;
      name?: string;
      bubbles?: boolean;
      cancelable?: boolean;
      composed?: boolean;
    }
  ) {
    const event: any = options?.event || null;
    const name: string = options?.name || (null as any);

    return tryOrFail(
      async () =>
        this.host?.type === "graphql"
          ? variables?.query
            ? this.client.request(variables.query, variables.params)
            : this.sdk[endpoint]({
                id: variables.id,
                data: variables.data,
              })
          : this.client.request(endpoint, variables, {
              method: "POST",
            }),
      {
        endpoint,
        event,
        name,
        cached: false,
        bubbles: !!options?.bubbles,
        cancelable: !!options?.cancelable,
        composed: !!options?.composed,
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
  }

  private async onSubmit(event: any) {
    if (
      !event ||
      !event.detail ||
      !event.detail.endpoint ||
      event.detail.disableSubmit
    )
      return false;

    return this.submit(event.detail.endpoint, {
      id: event?.detail?.id,
      data: event?.detail?.data,
      params: event?.detail?.params,
      query: event?.detail?.query,
    });
  }

  setHeader(key: string, value: string) {
    if (!this.client) return false;
    if (!this.host?.headers) this.host.headers = {};
    (this.host as any).headers[key] = value;

    return this.client.setHeader(key, value);
  }

  setHeaders(headers: any) {
    if (!this.client) return false;

    return this.client.setHeaders(headers);
  }

  setConnection(nameUrlOrIndex: string | number) {
    this.host = (
      typeof nameUrlOrIndex === "string"
        ? (this.options?.connections || []).find(
            (connection) =>
              connection?.name === nameUrlOrIndex ||
              connection?.url === nameUrlOrIndex
          )
        : this.options?.connections?.[nameUrlOrIndex]
    ) as FireEnjinHost;

    if (!this.host?.name) this.host.name = "default";
    if (!this.host?.type)
      this.host.type =
        typeof this.options?.getSdk === "function"
          ? "graphql"
          : this.host?.db || this.host?.auth?.databaseURL
          ? "firebase"
          : "rest";
    this.host.headers = {
      ...(this.host?.headers || {}),
      ...(this.options?.headers || {}),
    };

    this.client =
      this.host.type === "graphql"
        ? new GraphQLClient(this.host?.url || "http://localhost:4000", {
            headers: this.host?.headers || {},
          })
        : this.host?.type === "firebase"
        ? new FirestoreClient(this.host.url, {
            db: this.host.db as any,
          })
        : new Client(this.host.url, { headers: this.host?.headers || {} });

    this.client.setEndpoint(this.host?.url || "http://localhost:4000");

    return this.host;
  }
}
