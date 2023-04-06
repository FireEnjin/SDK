import FireEnjin from './fireenjin';

export default class Model <I = any, T = any> {
    fireenjin: FireEnjin;
    endpoint?: string;
    endpoints?: {
        create?: string;
        find?: string;
        list?: string;
        update?: string;
        delete?: string;
    };

    constructor ({fireenjin, endpoint, endpoints}: {fireenjin: FireEnjin; endpoint?: string; endpoints?: {
        create?: string;
        find?: string;
        list?: string;
        update?: string;
        delete?: string;
    }}) {
        this.fireenjin = fireenjin;
        this.endpoint = endpoint;
        this.endpoints = endpoints;
    }

    async create <P = any, D = I> (data: D, {id, params, query, endpoint}: {id?: string; params?: P; query?: string; endpoint?: string}): Promise <T> {
        return this.fireenjin.submit<P>(endpoint || this.endpoints?.create || this.endpoint || "", {data, id, params, query});
    }

    async find <P = any> (id: string, {params, query, endpoint}: {params?: P; query?: string; endpoint?: string;}): Promise <T> {
        return this.fireenjin.fetch<P>(endpoint || this.endpoints?.find || this.endpoint || "", {id, params, query});
    }

    async update <P = any, D = I> (id: string, data: D, {params, query, endpoint}: {params?: P, query?: string; endpoint?: string;}): Promise <T> {
        return this.fireenjin.submit<P>(endpoint || this.endpoints?.update || this.endpoint || "", {data, id, params, query});
    }

    async delete <P = any> (id: string, {params, query, endpoint}: {params?: P, query?: string; endpoint?: string;}): Promise <T> {
        return await this.fireenjin.submit<P>(id, {endpoint: endpoint || this.endpoints?.delete || this.endpoint || "", params, query});
    }

    async list <P = any> ( {params, query, endpoint}: {params?: P; query?: string, endpoint?: string}): Promise <T[]> {
        return this.fireenjin.fetch<P>(endpoint || this.endpoints?.list || this.endpoint || "" , {params, query});
    }
}