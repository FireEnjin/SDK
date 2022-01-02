import "isomorphic-unfetch";
export default class Client {
    host?: string;
    requestOptions?: RequestInit;
    constructor(host?: string, requestOptions?: RequestInit);
    request(url: string, requestOptions?: RequestInit): Promise<any>;
    setEndpoint(host: string): boolean;
    setHeader(key: string, value: any): boolean;
    setHeaders(values: any): boolean;
}
