import * as localforage from "localforage";
import { GraphQLClient } from "graphql-request";
import { ref, getStorage, uploadBytesResumable, uploadString, } from "@firebase/storage";
import tryOrFail from "../helpers/tryOrFail";
import Client from "./client";
import DatabaseService from "./database";
import FirestoreClient from "./firestore";
import { getDownloadURL } from "firebase/storage";
import firstToLowerCase from "../helpers/firstToLowerCase";
import getByPath from "../helpers/getByPath";
import setByPath from "../helpers/setByPath";
import fireenjinSubscription from "../events/subscription";
import mergeSets from "../helpers/mergeSets";
export default class FireEnjin {
    client;
    sdk = {};
    host = {
        url: "http://localhost:4000",
    };
    currentConnection = 0;
    options;
    storage;
    state = {};
    signals = {};
    currentSignal;
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
        this.storage =
            this.options?.storage ||
                (this.host?.db?.app && getStorage(this.host?.db?.app));
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
        this.state = new Proxy(options?.state || {}, {
            get: (proxyTarget, stateKey, receiver) => {
                const value = Reflect.get(proxyTarget, stateKey, receiver);
                if (this.currentSignal !== undefined) {
                    this.signals[`state:${stateKey}`].add(this.currentSignal);
                }
                const detail = {
                    receiver,
                    proxyTarget,
                    stateKey,
                    value,
                };
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateRead", {
                        detail,
                    }));
                if (this.options?.debug)
                    console.log("fireenjinStateRead:", detail);
                if (typeof this.options?.onStateRead === "function")
                    return this.options.onStateRead(detail);
                return value;
            },
            set: (proxyTarget, stateKey, value, receiver) => {
                const signalKey = `state:${stateKey}`;
                const detail = {
                    receiver,
                    proxyTarget,
                    state: this.state,
                    stateKey,
                    value,
                };
                if (this.options?.debug)
                    console.log("fireenjinStateChange: ", detail);
                if (typeof this.options?.onStateChange === "function")
                    return this.options.onStateChange(detail);
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateChange", {
                        detail,
                    }));
                const reflection = Reflect.set(proxyTarget, stateKey, value, receiver);
                if (this.signals[signalKey])
                    this.signals[signalKey].forEach((fn) => fn({ value, stateKey, state: this.state, signalKey }));
                if (options?.autoBindAttributes)
                    document
                        ?.querySelectorAll?.("[data-state]")
                        ?.forEach?.(async (element) => {
                        const stateKey = element?.dataset?.state;
                        Object.keys(element.dataset).forEach((key) => {
                            if (key.includes("bind")) {
                                let propName = firstToLowerCase(key.replace("bind", ""));
                                if (propName === "innerHtml")
                                    propName = "innerHTML";
                                if (propName === "outerHtml")
                                    propName = "outerHTML";
                                element[propName] = getByPath(this.state[stateKey], element.dataset[key]);
                            }
                        });
                    });
                return reflection;
            },
            deleteProperty: (proxyTarget, stateKey) => {
                const detail = {
                    state: this.state,
                    proxyTarget,
                    stateKey,
                    value: undefined,
                };
                if (this.options?.debug)
                    console.log("fireenjinStateChange: ", detail);
                if (typeof this.options?.onStateChange === "function")
                    return this.options.onStateChange(detail);
                if (document)
                    document.dispatchEvent(new CustomEvent("fireenjinStateChange", {
                        detail,
                    }));
                if (this.signals[`state:${stateKey}`])
                    this.clearSignal(`state:${stateKey}`);
                if (!(stateKey in proxyTarget))
                    return false;
                delete proxyTarget[stateKey];
                if (options?.autoBindAttributes)
                    document
                        ?.querySelectorAll?.("[data-state]")
                        ?.forEach?.(async (element) => {
                        Object.keys(element.dataset).forEach((key) => {
                            if (key.includes("bind")) {
                                let propName = firstToLowerCase(key.replace("bind", ""));
                                if (propName === "innerHtml")
                                    propName = "innerHTML";
                                if (propName === "outerHtml")
                                    propName = "outerHTML";
                                element[propName] = null;
                            }
                        });
                    });
                return true;
            },
        });
        if (this.options?.debug)
            console.log("fireenjinStart:", {
                host: this.host,
                headers,
                storage: this.storage,
                client: this.client,
                sdk: this.sdk,
            });
        if (document) {
            document.addEventListener("fireenjinUpload", this.onUpload.bind(this));
            document.addEventListener("fireenjinSubmit", this.onSubmit.bind(this));
            document.addEventListener("fireenjinFetch", this.onFetch.bind(this));
            document.addEventListener("fireenjinSubscribe", this.onSubscribe.bind(this));
            document.addEventListener("fireenjinState", this.onState.bind(this));
            if (options?.autoBindAttributes)
                document.addEventListener("DOMContentLoaded", () => {
                    this.watchDataAttributes();
                    let oldHref = document.location.href;
                    const body = document.querySelector("body");
                    const observer = new MutationObserver((mutations) => {
                        if (oldHref !== document.location.href) {
                            oldHref = document.location.href;
                            this.watchDataAttributes();
                        }
                    });
                    observer.observe(body, { childList: true, subtree: true });
                }, false);
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
                document.addEventListener("fireenjinProgress", (event) => {
                    console.log("fireenjinProgress: ", event);
                });
            }
        }
    }
    async onState(event) {
        if (this.options?.debug)
            console.log("fireenjinState: ", event);
        if (event?.detail?.state) {
            this.state = mergeSets(this.state, event?.detail?.state || {});
        }
        else if (event?.detail?.stateKey) {
            this.state.set(event?.detail?.stateKey, event?.detail?.value);
        }
        const detail = {
            event,
            state: this.state,
            stateKey: event?.detail?.stateKey,
            value: event?.detail?.value,
        };
        if (typeof this.options?.onStateChange === "function")
            return this.options.onStateChange(detail);
        if (document)
            document.dispatchEvent(new CustomEvent("fireenjinStateChange", {
                detail,
            }));
        return this.state;
    }
    async onUpload(event) {
        if (this.options?.debug)
            console.log("fireenjinUpload: ", event);
        if (typeof this.options?.onUpload === "function")
            return this.options.onUpload(event);
        const data = await this.upload({
            data: {
                id: event.detail.data?.id,
                path: event.detail.data?.path,
                fileName: event.detail.data?.fileName,
                file: this.options?.uploadFileEncoding
                    ? event.detail.data?.encodedContent
                    : event.detail.data?.file,
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
        return this.submit(event.detail.endpoint, {
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
        return this.fetch(event.detail.endpoint, event?.detail?.params || {}, {
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
        });
    }
    async onSubscribe(event) {
        if (this.options?.debug)
            console.log("fireenjinSubscribe: ", event);
        const signalKey = event?.detail?.signalKey || event?.detail?.endpoint;
        const subscriptionDetails = {
            bubbles: event?.detail?.bubbles,
            cancelable: event?.detail?.cancelable,
            composed: event?.detail?.composed,
            data: null,
            dataPropsMap: event?.detail?.dataPropsMap,
            endpoint: event?.detail?.endpoint,
            event,
            name: event?.detail?.name,
            params: event?.detail?.params,
            query: event?.detail?.query,
            signalKey,
            target: event?.detail?.target,
        };
        if (signalKey) {
            this.subscribe(signalKey, () => {
                subscriptionDetails.data = {
                    state: this.state,
                    signal: this.signals[signalKey],
                    timestamp: new Date(),
                };
                if (typeof this.options?.onSubscription === "function")
                    this.options.onSubscription(subscriptionDetails);
                if (typeof event?.detail?.callback === "function")
                    event?.detail?.callback(subscriptionDetails);
                fireenjinSubscription(subscriptionDetails);
            });
        }
        else {
            const collectionName = event?.detail?.collection || event?.detail?.endpoint;
            this.host?.db?.subscribe?.({ collectionName, ...event?.detail?.query }, async (data) => {
                subscriptionDetails.data = data;
                if (typeof this.options?.onSubscription === "function")
                    this.options.onSubscription(subscriptionDetails);
                if (typeof event?.detail?.callback === "function")
                    event?.detail?.callback(subscriptionDetails);
                fireenjinSubscription(subscriptionDetails);
            });
        }
    }
    subscribe(signalKey, signal) {
        if (!this.signals[signalKey])
            this.signals[signalKey] = new Set();
        this.signals[signalKey].add(signal);
        return signal;
    }
    unsubscribe(signalKey, signal) {
        if (this.signals[signalKey])
            this.signals[signalKey].delete(signal);
        return this.signals[signalKey];
    }
    sendSignal(signalKey, data) {
        if (this.signals[signalKey]) {
            this.signals[signalKey].forEach((signal) => signal(data));
        }
    }
    createSignal(initialValue, signalKey, saveToState, stateKey) {
        let value = initialValue;
        const state = stateKey || signalKey;
        const key = signalKey ||
            (saveToState && `state:${state}`) ||
            `signal:${Math.random()}`;
        if (!this.signals[key])
            this.signals[key] = new Set();
        const read = () => {
            if (this.currentSignal !== undefined) {
                this.signals[key].add(this.currentSignal);
            }
            return value;
        };
        const write = (newValue) => {
            value = newValue;
            if (saveToState && state)
                this.state[state] = value;
            this.signals[key].forEach((fn) => fn({
                value,
                signalKey: key,
                state: this.state,
                stateKey: state,
            }));
        };
        return [read, write, key];
    }
    createEffect(callback) {
        this.currentSignal = callback;
        callback();
        this.currentSignal = undefined;
    }
    createEffectPromise(callback) {
        this.currentSignal = callback;
        callback().then(() => (this.currentSignal = undefined));
    }
    clearSignal(signalKey) {
        if (signalKey && this.signals[signalKey])
            delete this.signals[signalKey];
        if (!signalKey)
            this.signals = {};
        return this.signals;
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
        const target = options?.target || options?.event?.target || document;
        return tryOrFail(async () => this.storage
            ? this.uploadFile(input?.data?.file, {
                fileName: input?.data?.fileName,
                path: input?.data?.path,
                target,
            }, options)
            : this.host?.type === "graphql" && !this.options?.uploadUrl
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
            target,
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
        const localKey = input?.collection ||
            (options?.cacheKey
                ? options.cacheKey
                : `${this.options?.cachePrefix ? this.options.cachePrefix : ""}${endpoint}_${input?.id
                    ? `${input.id}:`
                    : input?.params
                        ? this.hash(JSON.stringify(Object.values(input.params)))
                        : ""}${this.hash(JSON.stringify(input || {}))}`);
        let localData = null;
        try {
            localData = (await localforage?.getItem?.(localKey)) || null;
            if (localData && input?.id && input?.collection)
                localData = localData?.[input.id];
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
        const fn = typeof this.options?.onFetch === "function"
            ? this.options.onFetch(endpoint, input, options)
            : this.host?.type === "graphql"
                ? input?.query
                    ? this.client.request(input?.query, input?.params, {
                        method,
                    })
                    : this.sdk[endpoint](input, options?.headers)
                : this.client.request(endpoint, input, {
                    method,
                });
        data = await tryOrFail(async () => fn, {
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
        if (!options?.disableCache) {
            try {
                await localforage.setItem(localKey, data);
            }
            catch {
                console.log("No Local data found");
            }
        }
        return data;
    }
    async submit(endpoint, input, options) {
        const event = options?.event || null;
        const name = options?.name || null;
        const method = options?.method || "post";
        const fn = typeof this.options?.onSubmit === "function"
            ? this.options.onSubmit(endpoint, input, options)
            : this.host?.type === "graphql"
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
                });
        return tryOrFail(async () => fn, {
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
    async uploadFile(
    /**
     * The file or Data URI to upload
     */
    file, input, options) {
        if (!this.storage)
            return;
        const path = input?.path || "/";
        const fileName = input?.fileName || (typeof file !== "string" && file?.name);
        const storageRef = ref(this.storage, path + fileName);
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof file === "string" && file?.includes("data:")) {
                    const { ref, metadata } = await uploadString(storageRef, file, "data_url");
                    resolve({ ref, metadata, url: await getDownloadURL(ref) });
                }
                else if (typeof file !== "string") {
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    const onProgress = input?.onProgress || this.options.onProgress;
                    const target = options?.target || input?.target || document;
                    uploadTask.on("state_changed", (snapshot) => {
                        const eventData = {
                            bubbles: true,
                            cancelable: true,
                            detail: {
                                bubbles: true,
                                cancelable: true,
                                composed: false,
                                endpoint: options?.endpoint || "upload",
                                event: input?.event || options?.event,
                                method: options?.method || "post",
                                name: options?.name || "upload",
                                fileName,
                                path,
                                progress: (snapshot?.bytesTransferred || 0) /
                                    (snapshot?.totalBytes || 0),
                                target,
                                snapshot,
                            },
                        };
                        if (typeof onProgress === "function")
                            onProgress(eventData);
                        target.dispatchEvent(new CustomEvent("fireenjinProgress", eventData));
                    }, null, async () => {
                        const ref = uploadTask?.snapshot?.ref;
                        const metadata = uploadTask?.snapshot?.metadata;
                        resolve({ ref, metadata, url: await getDownloadURL(ref) });
                    });
                }
            }
            catch (e) {
                console.log("Error uploading file: ", e);
                reject(e);
            }
        });
    }
    watchDataAttributes() {
        document
            .querySelectorAll("[data-trigger]")
            .forEach(async (element) => {
            const name = element?.dataset?.trigger;
            const eventName = element?.dataset?.triggerOn || "click";
            const payload = element?.dataset?.triggerPayload
                ? JSON.parse(element?.dataset?.triggerPayload)
                : {};
            element.addEventListener(eventName, (event) => {
                element.dispatchEvent(new CustomEvent("fireenjinTrigger", {
                    detail: {
                        event,
                        name,
                        payload,
                    },
                }));
            });
        });
        document.querySelectorAll("[data-fetch]").forEach(async (element) => {
            const url = element?.dataset?.fetch;
            const fetchParams = element?.dataset?.fetchParams?.includes("{") &&
                JSON.parse(element?.dataset?.fetchParams);
            const fetchOptions = element?.dataset?.fetchOptions?.includes("{") &&
                JSON.parse(element?.dataset?.fetchOptions);
            let res;
            const stateKey = element?.dataset?.state;
            const signalKey = element?.dataset?.signal || `state:${stateKey}`;
            const eventName = element?.dataset?.triggerOn;
            const subscribeBind = async () => {
                res = await this.fetch(url, fetchParams, fetchOptions);
                this.subscribe(signalKey, () => {
                    Object.keys(element.dataset).forEach((key) => {
                        if (key.includes("bind")) {
                            let propName = firstToLowerCase(key.replace("bind", ""));
                            if (propName === "innerHtml")
                                propName = "innerHTML";
                            if (propName === "outerHtml")
                                propName = "outerHTML";
                            const value = getByPath(this.state[stateKey], element.dataset[key]);
                            element[propName] = value;
                        }
                        return;
                    });
                });
            };
            eventName
                ? document.addEventListener(eventName, () => subscribeBind())
                : subscribeBind();
            if (typeof stateKey === "string")
                setByPath(this.state, stateKey, res);
        });
        document
            .querySelectorAll("[data-signal],[data-state]")
            .forEach(async (element) => {
            const stateKey = element?.dataset?.state;
            const signalKey = element?.dataset?.signal || `state:${stateKey}`;
            this.subscribe(signalKey, () => {
                Object.keys(element.dataset).forEach((key) => {
                    if (key.includes("bind")) {
                        let propName = firstToLowerCase(key.replace("bind", ""));
                        if (propName === "innerHtml")
                            propName = "innerHTML";
                        if (propName === "outerHtml")
                            propName = "outerHTML";
                        if (this.state?.[stateKey])
                            element[propName] = getByPath(this.state[stateKey], element.dataset[key]);
                    }
                    return;
                });
                const subscriptionDetails = {
                    bubbles: true,
                    cancelable: true,
                    composed: false,
                    data: {
                        state: this.state,
                        signal: this.signals[signalKey],
                        timestamp: new Date(),
                    },
                    signalKey,
                };
                if (typeof this.options?.onSubscription === "function")
                    this.options.onSubscription(subscriptionDetails);
                fireenjinSubscription(subscriptionDetails);
            });
        });
    }
}
