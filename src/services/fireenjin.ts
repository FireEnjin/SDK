import * as localforage from "localforage";
import isEqual from "lodash/fp/isEqual";

import setComponentProps from "../helpers/setComponentProps";
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
    this.client = new Client({
      headers: {
        Authorization: options.token ? `Bearer ${options.token}` : "",
        ...(options.headers ? options.headers : {}),
      },
    });
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
      event.target.value = data.url;

      document.body.dispatchEvent(
        new CustomEvent("fireenjinSuccess", {
          detail: {
            event: event.detail.event,
            data: await setComponentProps(event?.detail?.dataPropsMap, data),
            target: event.target,
            name: event.detail.name,
            endpoint: event.detail.endpoint,
          },
        })
      );
    } catch (err) {
      if (this.options.onError && typeof this.options.onError === "function") {
        this.options.onError(err);
      }
      document.body.dispatchEvent(
        new CustomEvent("fireenjinError", {
          detail: {
            event: event?.detail?.event,
            target: event?.target,
            error: err,
            name: event?.detail?.name,
            endpoint: event?.detail?.endpoint,
          },
        })
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
          const data = await setComponentProps(
            event?.detail?.dataPropsMap,
            cachedData
          );
          document.body.dispatchEvent(
            new CustomEvent("fireenjinSuccess", {
              detail: {
                event: event.detail.event,
                target: event.target,
                cached: true,
                data,
                name: event.detail.name,
                endpoint: event.detail.endpoint,
              },
            })
          );
          if (
            event?.target?.setLoading &&
            typeof event?.target?.setLoading === "function"
          ) {
            event.target.setLoading(false);
          }
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

      const data = await setComponentProps(
        event?.detail?.dataPropsMap,
        response
      );

      if (
        this.options.onSuccess &&
        typeof this.options.onSuccess === "function"
      ) {
        this.options.onSuccess(response);
      }
      if (
        !this.options.disableCache &&
        (!cachedData || (cachedData && !isEqual(cachedData, response)))
      ) {
        document.body.dispatchEvent(
          new CustomEvent("fireenjinSuccess", {
            detail: {
              event: event.detail?.event,
              target: event.target,
              cached: false,
              data,
              name: event.detail.name,
              endpoint: event.detail.endpoint,
            },
          })
        );
        try {
          await localforage.setItem(localKey, response);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      if (this.options.onError && typeof this.options.onError === "function") {
        this.options.onError(err);
      }
      document.body.dispatchEvent(
        new CustomEvent("fireenjinError", {
          detail: {
            event: event?.detail?.event,
            target: event?.target,
            error: err,
            name: event?.detail?.name,
            endpoint: event?.detail?.endpoint,
          },
        })
      );
    }

    if (
      event?.target?.setLoading &&
      typeof event?.target?.setLoading === "function"
    ) {
      event.target.setLoading(false);
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

      if (
        this.options.onSuccess &&
        typeof this.options.onSuccess === "function"
      ) {
        this.options.onSuccess(data);
      }
      document.body.dispatchEvent(
        new CustomEvent("fireenjinSuccess", {
          detail: {
            event: event.detail?.event,
            data: await setComponentProps(event?.detail?.dataPropsMap, data),
            target: event.target,
            name: event.detail.name,
            endpoint: event.detail.endpoint,
          },
        })
      );
    } catch (err) {
      if (this.options.onError && typeof this.options.onError === "function") {
        this.options.onError(err);
      }
      document.body.dispatchEvent(
        new CustomEvent("fireenjinError", {
          detail: {
            event: event?.detail?.event,
            error: err,
            target: event.target,
            name: event?.detail?.name,
            endpoint: event?.detail?.endpoint,
          },
        })
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
