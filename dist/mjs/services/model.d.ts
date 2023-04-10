import FireEnjin from "./fireenjin";
export default class Model<I = any, T = any> {
    fireenjin: FireEnjin;
    endpoint?: string;
    endpoints?: {
        create?: string;
        find?: string;
        list?: string;
        update?: string;
        delete?: string;
    };
    constructor({ fireenjin, endpoint, endpoints, }: {
        fireenjin: FireEnjin;
        endpoint?: string;
        endpoints?: {
            create?: string;
            find?: string;
            list?: string;
            update?: string;
            delete?: string;
        };
    });
    create<P = any, D = I>(data: D, { id, params, query, endpoint, }: {
        id?: string;
        params?: P;
        query?: string;
        endpoint?: string;
    }): Promise<T>;
    find<P = any>(id: string, { params, query, endpoint, }: {
        params?: P;
        query?: string;
        endpoint?: string;
    }): Promise<T>;
    update<P = any, D = I>(id: string, data: D, { params, query, endpoint, }: {
        params?: P;
        query?: string;
        endpoint?: string;
    }): Promise<T>;
    delete<P = any>(id: string, { params, query, endpoint, }: {
        params?: P;
        query?: string;
        endpoint?: string;
    }): Promise<T>;
    list<P = any>({ params, query, endpoint, }: {
        params?: P;
        query?: string;
        endpoint?: string;
    }): Promise<T[]>;
}
