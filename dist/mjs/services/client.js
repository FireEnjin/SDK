import "isomorphic-unfetch";
import objectToUrlParams from "../helpers/objectToUrlParams";
export default class Client {
    url;
    options;
    constructor(url, options) {
        this.url = url || "http://localhost:4000";
        this.options = options || {};
    }
    async rawRequest(query, variables, requestOptions) {
        const method = requestOptions?.method || this.options?.method || "GET";
        const headers = requestOptions?.headers || this.options?.headers || {};
        const endpoint = `${this.url}/${query}${method === "get" ? objectToUrlParams(variables) : ""}`;
        const response = await fetch(`${this.url}/${endpoint}`, {
            method,
            ...(this.options || {}),
            ...(requestOptions || {}),
            headers,
            body: method === "get" ? null : JSON.stringify(variables || {}),
        });
        return {
            data: (await response?.json?.()) || null,
            headers: response.headers,
            status: response.status,
            extensions: {},
        };
    }
    async request(endpoint, variables, requestOptions) {
        const method = requestOptions?.method || this.options?.method || "GET";
        const headers = requestOptions?.headers || this.options?.headers || {};
        const response = await fetch(`${this.url}/${endpoint}`, {
            method,
            ...(this.options || {}),
            ...(requestOptions || {}),
            headers,
            body: (!["get", "post"].includes(method.toLowerCase()) &&
                JSON.stringify(variables || {})) ||
                null,
        });
        return response.json();
    }
    async batchRequests(documents, requestOptions) {
        const response = {};
        for (const { document, variables } of documents) {
            try {
                response[document] = await this.request(document, variables, requestOptions);
            }
            catch {
                response[document] = null;
            }
        }
        return response;
    }
    setEndpoint(value) {
        this.url = value;
        return true;
    }
    setHeader(key, value) {
        if (!this.options)
            this.options = {};
        if (!this.options?.headers)
            this.options.headers = {};
        this.options.headers[key] = value;
        return this;
    }
    setHeaders(headers) {
        for (const [key, value] of Object.entries(headers)) {
            this.setHeader(key, value);
        }
        return this;
    }
}
