import * as localforage from "localforage";
import fireenjinSuccess from "../events/success";
import tryOrFail from "../helpers/tryOrFail";

import Client from "./client";

type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

export default class FireEnjin {
  client: any;
  sdk;
  options: {
    host?: string;
    token?: string;
    onRequest?: SdkFunctionWrapper;
    onError?: (error) => void;
    onSuccess?: (data) => void;
    onUpload?: (data) => void;
    headers?: any;
    functionsHost?: string;
    uploadUrl?: string;
    debug?: boolean;
    disableCache?: boolean;
  };
  constructor(
    options: {
      host?: string;
      token?: string;
      getSdk?: any;
      onRequest?: SdkFunctionWrapper;
      onError?: (error) => void;
      onSuccess?: (data) => void;
      onUpload?: (data) => void;
      headers?: any;
      functionsHost?: string;
      uploadUrl?: string;
      debug?: boolean;
      disableCache?: boolean;
    } = {}
  ) {
    this.options = options || {};
    const clientOptions = {
      headers: {
        Authorization: options.token ? `Bearer ${options.token}` : "",
        ...(options.headers ? options.headers : {}),
      },
    };
    this.client = options?.getSdk
      ? new options.getSdk(clientOptions, options?.onRequest)
      : new Client({ requestOptions: clientOptions });
    this.sdk = options.getSdk(this.client);
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
            : `${this.options.functionsHost}/upload`,
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
        return this.client.get(event.detail.endpoint);
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
        return this.client.request(event.detail.endpoint, event?.detail?.data);
      },
      {
        onError: this.options?.onError,
        onSuccess: this.options?.onSuccess,
      }
    );
  }

  setHeader(key: string, value: string) {
    if (!this.client) return false;
    this.client.setHeader(key, value);

    return true;
  }
}
