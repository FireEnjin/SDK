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
        const method = requestOptions?.method || this.options?.method || "POST";
        const headers = requestOptions?.headers || this.options?.headers || {};
        const endpoint = query;
        const response = await (method.toLowerCase() === "post"
            ? this.db.update(endpoint, variables?.data || {}, variables?.id)
            : this.db.query(endpoint, variables?.where || [], variables?.orderBy || null, variables?.limit || null));
        return {
            data: method.toLowerCase() === "post" ? response : response?.docs,
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
        return {
            data: response.data,
        };
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