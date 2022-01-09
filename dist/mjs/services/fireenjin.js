import * as localforage from "localforage";
import { GraphQLClient } from "graphql-request";
import Client from "./client";
import tryOrFail from "../helpers/tryOrFail";
import DatabaseService from "./database";
import FirestoreClient from "./firestore";
export class FireEnjin {
    client;
    sdk;
    host = {
        url: "http://localhost:4000",
    };
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
            this.host.type === "graphql" && typeof options?.getSdk === "function"
                ? options.getSdk(this.client, this.options?.onRequest)
                : null;
        if (window) {
            window.addEventListener("fireenjinUpload", this.onUpload.bind(this));
            window.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
            window.addEventListener("fireenjinFetch", this.onFetch.bind(this));
        }
    }
    async upload(input, options) {
        const endpoint = options?.endpoint || "upload";
        return tryOrFail(async () => this.client.request(this.options.uploadUrl
            ? this.options.uploadUrl
            : `${this.host.url}/${endpoint}`, input), {
            event: options?.event || null,
            name: options?.name || endpoint,
            endpoint,
            cached: true,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
    }
    async onUpload(event) {
        if (typeof this.options?.onUpload === "function")
            this.options.onUpload(event);
        if (!event.detail?.data?.encodedContent ||
            typeof this.options?.onUpload === "function")
            return false;
        const data = await this.upload({
            id: event.detail.data?.id,
            path: event.detail.data?.path,
            fileName: event.detail.data?.fileName,
            file: event.detail.data?.encodedContent,
            type: event.detail.data?.type,
        }, {
            event: event.detail?.event,
            name: event.detail?.name,
            endpoint: event.detail?.endpoint,
        });
        if (event?.target)
            event.target.value = data?.url || null;
        return data;
    }
    async fetch(endpoint, variables, options) {
        let data = null;
        const event = options?.event || null;
        const name = options?.name || null;
        const localKey = options?.cacheKey
            ? options.cacheKey
            : `${endpoint}_${variables?.id
                ? `${variables.id}:`
                : variables?.params
                    ? Buffer.from(JSON.stringify(Object.values(variables.params))).toString("base64")
                    : ""}${Buffer.from(JSON.stringify(variables || {})).toString("base64")}`;
        if (!options?.disableCache) {
            data = await tryOrFail(async () => localforage.getItem(localKey), {
                endpoint,
                event,
                name,
                cached: true,
                onError: this.options?.onError,
                onSuccess: this.options?.onSuccess,
            });
        }
        data = await tryOrFail(async () => this.host?.type === "graphql"
            ? variables?.query
                ? this.client.request(variables?.query, variables?.params)
                : this.sdk[endpoint](variables?.params)
            : this.client.request(endpoint, variables), {
            endpoint,
            event,
            name,
            cached: false,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
        return data;
    }
    async onFetch(event) {
        if (!event ||
            !event.detail ||
            !event.detail.endpoint ||
            event.detail.disableFetch)
            return false;
        return this.fetch(event.detail.endpoint, event?.detail?.data || {}, {
            event: event?.detail?.event,
            dataPropsMap: event?.detail?.dataPropsMap,
            name: event?.detail?.name,
            cacheKey: event?.detail?.cacheKey,
            disableCache: !!event?.detail?.disableCache,
        });
    }
    async submit(endpoint, variables, options) {
        const event = options?.event || null;
        const name = options?.name || null;
        return tryOrFail(async () => this.host?.type === "graphql"
            ? variables?.query
                ? this.client.request(variables.query, variables.params)
                : this.sdk[endpoint]({
                    id: variables.id,
                    data: variables.data,
                })
            : this.client.request(endpoint, variables, {
                method: "POST",
            }), {
            endpoint,
            event,
            name,
            cached: false,
            onError: this.options?.onError,
            onSuccess: this.options?.onSuccess,
        });
    }
    async onSubmit(event) {
        if (!event ||
            !event.detail ||
            !event.detail.endpoint ||
            event.detail.disableSubmit)
            return false;
        return this.submit(event.detail.endpoint, {
            id: event?.detail?.id,
            data: event?.detail?.data,
            params: event?.detail?.params,
            query: event?.detail?.query,
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
            ? (this.options?.connections || []).find((connection) => connection?.name === nameUrlOrIndex ||
                connection?.url === nameUrlOrIndex)
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