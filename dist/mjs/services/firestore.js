import cleanFirestoreData from "../helpers/cleanFirestoreData";
export default class FirestoreClient {
    url;
    db;
    options;
    constructor(url, options) {
        this.url = url || "http://localhost:4000";
        this.options = {
            ...options,
            headers: options?.headers || {},
        };
        this.db = options?.db;
    }
    async rawRequest(query, variables, requestOptions) {
        const method = requestOptions?.method || "GET";
        const headers = requestOptions?.headers || this.options?.headers || {};
        const endpoint = query;
        const response = await (method.toLowerCase() === "post"
            ? this.db.add(endpoint, await cleanFirestoreData(variables?.data || {}), variables?.id)
            : method.toLowerCase() === "put"
                ? this.db.update(endpoint, await cleanFirestoreData(variables?.data || {}), variables?.id)
                : method.toLowerCase() === "delete"
                    ? this.db.delete(endpoint, variables?.id)
                    : variables?.id
                        ? this.db.find(endpoint, variables.id)
                        : this.db.list(endpoint, variables?.where || [], variables?.orderBy || null, variables?.limit || null));
        return {
            data: response,
            headers,
            extensions: {
                query: response?.query,
                metadata: response?.metadata,
                size: response?.size,
            },
            status: 200,
        };
    }
    async request(endpoint, variables, requestOptions) {
        const response = await this.rawRequest(endpoint, variables, requestOptions);
        return response?.data || null;
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
        const headers = this.options?.headers || {};
        headers[key] = value;
        //@ts-ignore
        this.options.headers = headers;
        return this;
    }
    setHeaders(headers) {
        for (const [key, value] of Object.entries(headers)) {
            this.setHeader(key, value);
        }
        return this;
    }
}
