/* TODO Add typings to fetch and submit
 * @example (keyof ReturnType<typeof getSdk>)
 */
import * as localforage from "localforage";
import { GraphQLClient } from "graphql-request";
import tryOrFail from "../helpers/tryOrFail";
import Client from "./client";
import DatabaseService from "./database";
import FirestoreClient from "./firestore";
export default class FireEnjin {
    client;
    sdk = {};
    host = {
        url: "http://localhost:4000",
    };
    currentConnection = 0;
    options;
    constructor(options) {
        this.options = options || {};
        const headers = {
            Authorization: options?.token ? `Bearer ${options.token}` : "",
            ...(options.headers ? options.headers : {}),
        };
        this.host = options?.connections?.length
            ? this.setConnection(0)
            : {
                url: options.host,
                type: "rest",
                headers,
            };
        this.client =
            this.host.type === "graphql"
                ? new GraphQLClient(this.host?.url || "http://localhost:4000", {
                    headers: this.host?.headers || {},
                })
                : this.host?.type === "firebase"
                    ? new FirestoreClient(this.host.url, {
                        db: this.host?.db
                            ? this.host.db
                            : new DatabaseService({
                                emulate: !!options?.emulate,
                                config: this.host?.auth,
                            }),
                    })
                    : new Client(this.host.url, { headers: this.host?.headers || {} });
        this.sdk =
            typeof options?.getSdk === "function"
                ? options.getSdk(this.client, this.options?.onRequest)
                : null;
        if (document) {
            document.addEventListener("fireenjinUpload", this.onUpload.bind(this));
            document.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
            document.addEventListener("fireenjinFetch", this.onFetch.bind(this));
            if (options?.debug) {
                document.addEventListener("fireenjinSuccess", (event) => {
                    console.log("fireenjinSuccess: ", event);
                });
                document.addEventListener("fireenjinError", (event) => {
                    console.log("fireenjinError: ", event);
                });
                document.addEventListener("fireenjinTrigger", (event) => {
                    console.log("fireenjinTrigger: ", event);
                });
                document.addEventListener("fireenjinReset", (event) => {
                    console.log("fireenjinReset: ", event);
                });
                document.addEventListener("fireenjinValidation", (event) => {
                    console.log("fireenjinValidation: ", event);
                });
            }
        }
    }
    async onUpload(event) {
        if (this.options?.debug)
            console.log("fireenjinUpload: ", event);
        if (typeof this.options?.onUpload === "function")
            this.options.onUpload(event);
        if (!event.detail?.data?.encodedContent ||
            typeof this.options?.onUpload === "function")
            return false;
        const data = await this.upload({
            data: {
                id: event.detail.data?.id,
                path: event.detail.data?.path,
                fileName: event.detail.data?.fileName,
                file: event.detail.data?.encodedContent,
                type: event.detail.data?.type,
            },
        }, {
            event,
            target: event?.detail?.target || event?.target,
            name: event?.detail?.name,
            endpoint: event?.detail?.endpoint,
            bubbles: event?.detail?.bubbles,
            cancelable: event?.detail?.cancelable,
            composed: event?.detail?.composed,
            method: event?.detail?.method,
        });
        if (event?.target)
            event.target.value = data?.url || null;
        return data;
    }
    async onSubmit(event) {
        if (this.options?.debug)
            console.log("fireenjinSubmit: ", event);
        if (!event ||
            !event.detail ||
            !event.detail.endpoint ||
            event.detail.disableSubmit)
            return false;
        const target = event?.detail?.target || event?.target;
        return (typeof this.options?.onSubmit === "function" ? this.options.onSubmit : this.submit)(event.detail.endpoint, {
            id: event?.detail?.id,
            data: event?.detail?.data,
            params: event?.detail?.params,
            query: event?.detail?.query,
        }, {
            event,
            target,
            name: event?.detail?.name,
            bubbles: event?.detail?.bubbles,
            cancelable: event?.detail?.cancelable,
            composed: event?.detail?.composed,
            method: event?.detail?.method || target?.method,
            fn: this.submit.bind(this)
        });
    }
    async onFetch(event) {
        if (this.options?.debug)
            console.log("fireenjinFetch: ", event);
        if (!event ||
            !event.detail ||
            !event.detail.endpoint ||
            event.detail.disableFetch)
            return false;
        const target = event?.detail?.target || event?.target;
        return (typeof this.options?.onFetch === "function" ? this.options.onFetch : this.fetch)(event.detail.endpoint, event?.detail?.params || {}, {
            event,
            target,
            dataPropsMap: event?.detail?.dataPropsMap,
            name: event?.detail?.name,
            cacheKey: event?.detail?.cacheKey,
            disableCache: !!event?.detail?.disableCache,
            bubbles: event?.detail?.bubbles,
            cancelable: event?.detail?.cancelable,
            composed: event?.detail?.composed,
            method: event?.detail?.method || target?.method,
            fn: this.fetch.bind(this)
        });
    }
    hash(input) {
        var hash = 0, i, chr;
        if (input.length === 0)
            return hash;
        for (i = 0; i < input.length; i++) {
            chr = input.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    async upload(input, options) {
        const endpoint = options?.endpoint || "upload";
        const method = options?.method || "post";
        return tryOrFail(async () => this.host?.type === "graphql" && !this.options?.uploadUrl
            ? input?.query
                ? this.client.request(input.query, input.params, {
                    method,
                })
                : this.sdk[endpoint](input?.params || {
                    id: input?.id,
                    data: input?.data,
                })
            : this.client.request(this.options?.uploadUrl || endpoint, input, {
                method,
            }), {
            event: options?.event || null,
            target: options?.target || options?.event?.target,
            name: options?.name || endpoint,
            bubbles: options?.bubbles,
            cancelable: options?.cancelable,
            composed: options?.composed,
            endpoint,
            cached: true,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
    }
    async fetch(endpoint, input, options) {
        let data = null;
        const event = options?.event || null;
        const name = options?.name || null;
        const method = options?.method || "get";
        const localKey = options?.cacheKey
            ? options.cacheKey
            : `${endpoint}_${input?.id
                ? `${input.id}:`
                : input?.params
                    ? this.hash(JSON.stringify(Object.values(input.params)))
                    : ""}${this.hash(JSON.stringify(input || {}))}`;
        let localData = null;
        try {
            data = await localforage.getItem(localKey);
        }
        catch {
            console.log("No Local data found");
        }
        if (localData && !options?.disableCache) {
            data = await tryOrFail(async () => localData, {
                endpoint,
                event,
                target: options?.target || event?.target,
                name,
                cached: true,
                bubbles: options?.bubbles,
                cancelable: options?.cancelable,
                composed: options?.composed,
                onError: this.options?.onError,
                onSuccess: this.options?.onSuccess,
            });
        }
        data = await tryOrFail(async () => this.host?.type === "graphql"
            ? input?.query
                ? this.client.request(input?.query, input?.params, {
                    method,
                })
                : this.sdk[endpoint](input, options?.headers)
            : this.client.request(endpoint, input, {
                method,
            }), {
            endpoint,
            event,
            target: options?.target || options?.event?.target,
            name,
            cached: false,
            bubbles: options?.bubbles,
            cancelable: options?.cancelable,
            composed: options?.composed,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
        return data;
    }
    async submit(endpoint, input, options) {
        const event = options?.event || null;
        const name = options?.name || null;
        const method = options?.method || "post";
        return tryOrFail(async () => this.host?.type === "graphql"
            ? input?.query
                ? this.client.request(input.query, input.params, {
                    method,
                })
                : this.sdk[endpoint](input?.params || {
                    id: input?.id,
                    data: input?.data,
                })
            : this.client.request(endpoint, input, {
                method: input?.id ? "put" : "post",
            }), {
            endpoint,
            event,
            target: options?.target || event?.target,
            name,
            cached: false,
            bubbles: options?.bubbles,
            cancelable: options?.cancelable,
            composed: options?.composed,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
    }
    setHeader(key, value) {
        if (!this.client)
            return false;
        if (!this.host?.headers)
            this.host.headers = {};
        this.host.headers[key] = value;
        return this.client.setHeader(key, value);
    }
    setHeaders(headers) {
        if (!this.client)
            return false;
        return this.client.setHeaders(headers);
    }
    setConnection(nameUrlOrIndex) {
        this.host = (typeof nameUrlOrIndex === "string"
            ? (this.options?.connections || []).find((connection, index) => {
                if (connection?.name === nameUrlOrIndex ||
                    connection?.url === nameUrlOrIndex) {
                    this.currentConnection = index;
                    return connection;
                }
            })
            : this.options?.connections?.[nameUrlOrIndex]);
        if (!this.host?.name)
            this.host.name = "default";
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
                        db: this.host.db,
                    })
                    : new Client(this.host.url, { headers: this.host?.headers || {} });
        this.client.setEndpoint(this.host?.url || "http://localhost:4000");
        return this.host;
    }
}
