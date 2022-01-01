import * as localforage from "localforage";
import isEqual from "lodash/fp/isEqual";
import fireenjinError from "../events/error";
import fireenjinSuccess from "../events/success";

import Client from "./client";

export default class FireEnjin {
  client: any;
  sdk;
  options: {
    host?: string;
    token?: string;
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
      onRequest?: (action: any, endpoint?: string) => any;
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
    try {
      const response = await fetch(
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
      const data = await response.json();
      if (event?.target) event.target.value = data.url;
      await fireenjinSuccess(
        {
          event,
          data,
          name: event?.detail?.name,
          endpoint: event?.detail?.endpoint,
        },
        {
          onSuccess: this.options?.onSuccess,
        }
      );
    } catch (err) {
      await fireenjinError(
        {
          event: event?.detail?.event,
          error: err,
          name: event?.detail?.name,
          endpoint: event?.detail?.endpoint,
        },
        {
          onError: this.options?.onError,
        }
      );
    }
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

    try {
      const response = await this.client.request(
        event.detail.query,
        event.detail.params
      );

      if (
        !this.options.disableCache &&
        (!cachedData || (cachedData && !isEqual(cachedData, response)))
      ) {
        await fireenjinSuccess(
          {
            event: event.detail?.event,
            cached: false,
            data: response,
            name: event.detail.name,
            endpoint: event.detail.endpoint,
          },
          {
            onSuccess: this.options?.onSuccess,
          }
        );
        try {
          await localforage.setItem(localKey, response);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      await fireenjinError(
        {
          event: event?.detail?.event,
          error: err,
          name: event?.detail?.name,
          endpoint: event?.detail?.endpoint,
        },
        {
          onError: this.options?.onError,
        }
      );
    }
  }

  async submit(event) {
    if (
      !event ||
      !event.detail ||
      !event.detail.endpoint ||
      event.detail.disableSubmit
    )
      return false;

    try {
      // const data = await sdk[event.detail.endpoint]({
      //   id: event.detail.id,
      //   data: event.detail.data,
      // });
      const data = null;
      await fireenjinSuccess(
        {
          event: event.detail?.event,
          data,
          name: event.detail.name,
          endpoint: event.detail.endpoint,
        },
        {
          onSuccess: this.options?.onSuccess,
        }
      );
    } catch (err) {
      await fireenjinError(
        {
          event: event?.detail?.event,
          error: err,
          name: event?.detail?.name,
          endpoint: event?.detail?.endpoint,
        },
        {
          onError: this.options?.onError,
        }
      );
    }

    if (
      event?.target?.setLoading &&
      typeof event?.target?.setLoading === "function"
    ) {
      event.target.setLoading(false);
    }
  }

  setHeader(key: string, value: string) {
    if (!this.client) return false;
    this.client.setHeader(key, value);

    return true;
  }
}
