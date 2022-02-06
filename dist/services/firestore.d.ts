import DatabaseService from "./database";
declare type RequestDocument = string | any;
declare type Variables = {
    [key: string]: any;
};
declare type BatchRequestDocument<V = Variables> = {
    document: RequestDocument;
    variables?: V;
};
export default class FirestoreClient {
    url: string;
    db: DatabaseService;
    options?: {
        db: DatabaseService;
        headers?: HeadersInit;
    };
    constructor(url: string, options: {
        db: DatabaseService;
        headers?: HeadersInit;
    });
    rawRequest<T = any, V = any>(query: string, variables?: any, requestOptions?: RequestInit): Promise<{
        data: T;
        extensions?: any;
        headers: HeadersInit;
        status: number;
    }>;
    request<T = any, V = Variables>(endpoint: string, variables?: any, requestOptions?: RequestInit): Promise<T>;
    batchRequests<T extends any = any, V = Variables>(documents: BatchRequestDocument<V>[], requestOptions?: RequestInit): Promise<T>;
    setEndpoint(value: string): boolean;
    setHeader(key: string, value: string): FirestoreClient;
    setHeaders(headers: HeadersInit): FirestoreClient;
}
export {};
