import * as localforage from "localforage";
import { GraphQLClient } from "graphql-request";

import fireenjinSuccess from "../events/success";
import tryOrFail from "../helpers/tryOrFail";
import Client from "./client";

type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

type FireEnjinHost = {
  name?: string;
  url?: string;
  type?: "firebase" | "graphql" | "rest";
  headers?: HeadersInit;
  retries?: number;
  priority?: number;
};

type FireEnjinOptions = {
  getSdk?: (
    client?: Client | GraphQLClient,
    withWrapper?: SdkFunctionWrapper
  ) => {
    [endpoint: string]: (variables: any, requestHeaders) => Promise<any>;
  };
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

export default class FireEnjin {
  client: Client | GraphQLClient;
  sdk;
  host: FireEnjinHost = {};
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
      this.host.type === "graphql" ? options.getSdk(this.client) : null;
    window.addEventListener("fireenjinUpload", (event) => {
      this.upload(event);
    });
    window.addEventListener("fireenjinSubmit", (event) => {
      this.submit(event);
    });
    window.addEventListener("fireenjinFetch", (event) => {
      this.fetch(event);
    });
  }

  async upload(event) {
    if (typeof this.options?.onUpload === "function")
      this.options.onUpload(event);
    if (
      !event.detail?.data?.encodedContent ||
      typeof this.options?.onUpload === "function"
    )
      return false;

    return tryOrFail(
      async () => {
        const data = await this.client.request(
          this.options.uploadUrl
            ? this.options.uploadUrl
            : `${this.host.url}/upload`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: event.detail.data?.id,
              path: event.detail.data?.path,
              fileName: event.detail.data?.fileName,
              file: event.detail.data?.encodedContent,
              type: event.detail.data?.type,
            }),
          }
        );
        if (event?.target) event.target.value = data.url;

        return data;
      },
      {
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
  }

  async fetch(event) {
    if (
      !event ||
      !event.detail ||
      !event.detail.endpoint ||
      event.detail.disableFetch
    )
      return false;

    let cachedData;
    const localKey = event.detail.cacheKey
      ? event.detail.cacheKey
      : `${event.detail.endpoint}_${
          event.detail.id
            ? `${event.detail.id}:`
            : event.detail.params
            ? btoa(JSON.stringify(Object.values(event.detail.params)))
            : ""
        }${btoa(JSON.stringify(event.detail.data))}`;

    if (!event.detail.disableCache) {
      try {
        cachedData = await localforage.getItem(localKey);
        if (cachedData) {
          await fireenjinSuccess(
            {
              event: event.detail.event,
              dataPropsMap: event?.detail?.dataPropsMap,
              cached: true,
              data: cachedData,
              name: event.detail.name,
              endpoint: event.detail.endpoint,
            },
            {
              onSuccess: this.options?.onSuccess,
            }
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

    return tryOrFail(
      async () => {
        return this.host?.type === "graphql"
          ? event?.detail?.query
            ? this.client.request(event.detail?.query, event.detail?.params)
            : this.sdk[event.detail?.endpoint](event.detail?.params)
          : this.client.request(event.detail.endpoint, {
              body: JSON.stringify(event.detail?.data || {}),
            });
      },
      {
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
  }

  async submit(event) {
    if (
      !event ||
      !event.detail ||
      !event.detail.endpoint ||
      event.detail.disableSubmit
    )
      return false;

    return tryOrFail(
      async () => {
        return this.host?.type === "graphql"
          ? event?.detail?.query
            ? this.client.request(event.detail.query, event.detail.params)
            : this.sdk[event.detail.endpoint]({
                id: event.detail.id,
                data: event.detail.data,
              })
          : this.client.request(event.detail.endpoint, {
              body: JSON.stringify(event?.detail?.data || {}),
            });
      },
      {
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
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

  setConnection(name: string) {
    this.host = (this.options?.connections || []).find(
      (connection) => connection?.name === name
    ) as FireEnjinHost;
    this.client.setEndpoint(this.host?.url || "http://localhost:4000");

    return this.host;
  }
}
