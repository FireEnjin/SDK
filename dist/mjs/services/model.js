export default class Model {
    fireenjin;
    endpoint;
    endpoints;
    constructor({ fireenjin, endpoint, endpoints, }) {
        this.fireenjin = fireenjin;
        this.endpoint = endpoint;
        this.endpoints = endpoints;
    }
    async create(data, { id, params, query, endpoint, }) {
        return this.fireenjin.submit(endpoint || this.endpoints?.create || this.endpoint || "", { data, id, params, query });
    }
    async find(id, { params, query, endpoint, }) {
        return this.fireenjin.fetch(endpoint || this.endpoints?.find || this.endpoint || "", { id, params, query });
    }
    async update(id, data, { params, query, endpoint, }) {
        return this.fireenjin.submit(endpoint || this.endpoints?.update || this.endpoint || "", { data, id, params, query });
    }
    async delete(id, { params, query, endpoint, }) {
        return await this.fireenjin.submit(id, {
            endpoint: endpoint || this.endpoints?.delete || this.endpoint || "",
            params,
            query,
        });
    }
    async list({ params, query, endpoint, }) {
        return this.fireenjin.fetch(endpoint || this.endpoints?.list || this.endpoint || "", { params, query });
    }
}
