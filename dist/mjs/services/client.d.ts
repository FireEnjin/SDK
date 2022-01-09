import "isomorphic-unfetch";
declare type RequestDocument = string | any;
declare type Variables = {
    [key: string]: any;
};
declare type BatchRequestDocument<V = Variables> = {
    document: RequestDocument;
    variables?: V;
};
export default class Client {
    url: string;
    options?: RequestInit;
    constructor(url: string, options?: RequestInit);
    rawRequest<T = any, V = any>(query: string, variables?: V, requestOptions?: RequestInit): Promise<{
        data: T;
        extensions?: any;
        headers: HeadersInit;
        status: number;
    }>;
    request<T = any, V = Variables>(endpoint: string, variables?: V, requestOptions?: RequestInit): Promise<T>;
    batchRequests<T extends any = any, V = Variables>(documents: BatchRequestDocument<V>[], requestOptions?: RequestInit): Promise<T>;
    setEndpoint(value: string): boolean;
    setHeader(key: string, value: string): Client;
    setHeaders(headers: HeadersInit): Client;
}
export {};
