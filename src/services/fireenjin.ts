import * as localforage from "localforage";
import { GraphQLClient } from "graphql-request";

import fireenjinSuccess from "../events/success";
import tryOrFail from "../helpers/tryOrFail";
import Client from "./client";

type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

export type FireEnjinEndpoints = {
  [endpoint: string]: (variables: any, requestHeaders) => Promise<any>;
};

export type FireEnjinHost = {
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

export type FireEnjinOptions = {
  getSdk?: (
    client?: Client | GraphQLClient,
    withWrapper?: SdkFunctionWrapper
  ) => FireEnjinEndpoints;
  host?: string;
  connections?: FireEnjinHost[];
  token?: string;
  onRequest?: SdkFunctionWrapper;
  onError?: (error) => void;
  onSuccess?: (data) => void;
  onUpload?: (data) => void;
  headers?: HeadersInit;
  uploadUrl?: string;
  debug?: boolean;
  disableCache?: boolean;
};

export class FireEnjin {
  client: Client | GraphQLClient;
  sdk;
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
    if (!options?.connections?.length && options.host) {
      this.host = {
        name: "default",
        url: options.host,
        type: typeof options?.getSdk === "function" ? "graphql" : "rest",
        headers,
      };
    }
    if (!this.host?.url && options?.connections?.length) {
      this.host = options.connections.sort((a, b) =>
        (a?.priority || 0) > (b?.priority || 0) ? 1 : -1
      )[0];
      this.host.headers = headers;
    }

    this.client =
      this.host.type === "graphql"
        ? new GraphQLClient(this.host?.url || "http://localhost:4000", {
            headers: this.host?.headers || {},
          })
        : new Client(this.host.url, { headers: this.host?.headers || {} });
    this.sdk =
      this.host.type === "graphql" && typeof options?.getSdk === "function"
        ? options.getSdk(this.client, this.options?.onRequest)
        : null;
    if (window?.addEventListener) {
      window.addEventListener("fireenjinUpload", this.onUpload.bind(this));
      window.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
      window.addEventListener("fireenjinFetch", this.onFetch.bind(this));
    }
  }

  async upload(input: {
    id?: string | number;
    path?: string;
    fileName?: string;
    file?: any;
    type?: string;
  }) {
    return tryOrFail(
      async () => {
        const data = await this.client.request(
          this.options.uploadUrl
            ? this.options.uploadUrl
            : `${this.host.url}/upload`,
          input
        );

        return data;
      },
      {
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
  }

  private async onUpload(event) {
    if (typeof this.options?.onUpload === "function")
      this.options.onUpload(event);
    if (
      !event.detail?.data?.encodedContent ||
      typeof this.options?.onUpload === "function"
    )
      return false;

    const data = await this.upload({
      id: event.detail.data?.id,
      path: event.detail.data?.path,
      fileName: event.detail.data?.fileName,
      file: event.detail.data?.encodedContent,
      type: event.detail.data?.type,
    });

    if (event?.target) event.target.value = data.url;

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
    }
  ) {
    const localKey = options?.cacheKey
      ? options.cacheKey
      : `${endpoint}_${
          variables?.id
            ? `${variables.id}:`
            : variables?.params
            ? Buffer.from(
                JSON.stringify(Object.values(variables.params))
              ).toString("base64")
            : ""
        }${Buffer.from(JSON.stringify(variables)).toString("base64")}`;

    if (!options?.disableCache) {
      try {
        await fireenjinSuccess(
          {
            event: options?.event,
            dataPropsMap: options?.dataPropsMap,
            cached: true,
            data: await localforage.getItem(localKey),
            name: options?.name,
            endpoint,
          },
          {
            onSuccess: this.options?.onSuccess,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    return tryOrFail(
      async () => {
        return this.host?.type === "graphql"
          ? variables?.query
            ? this.client.request(variables?.query, variables?.params)
            : this.sdk[endpoint](variables?.params)
          : this.client.request(endpoint, variables);
      },
      {
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
  }

  private async onFetch(event) {
    if (
      !event ||
      !event.detail ||
      !event.detail.endpoint ||
      event.detail.disableFetch
    )
      return false;

    return this.fetch(event.detail.endpoint, event?.detail?.data || {}, {
      event: event?.detail?.event,
      dataPropsMap: event?.detail?.dataPropsMap,
      name: event?.detail?.name,
      cacheKey: event?.detail?.cacheKey,
      disableCache: !!event?.detail?.disableCache,
    });
  }

  async submit(endpoint: string, variables?: any) {
    return tryOrFail(
      async () => {
        return this.host?.type === "graphql"
          ? variables?.query
            ? this.client.request(variables.query, variables.params)
            : this.sdk[endpoint]({
                id: variables.id,
                data: variables.data,
              })
          : this.client.request(endpoint, variables, {
              method: "POST",
            });
      },
      {
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
  }

  private async onSubmit(event) {
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
    this.host.headers[key] = value;

    return this.client.setHeader(key, value);
  }

  setHeaders(headers: any) {
    if (!this.client) return false;

    return this.client.setHeaders(headers);
  }

  setConnection(nameUrlOrIndex: string | number) {
    this.host = (
      typeof name === "string"
        ? (this.options?.connections || []).find(
            (connection) =>
              connection?.name === nameUrlOrIndex ||
              connection?.url === nameUrlOrIndex
          )
        : this.options?.connections?.[nameUrlOrIndex]
    ) as FireEnjinHost;

    this.client.setEndpoint(this.host?.url || "http://localhost:4000");

    return this.host;
  }
}
