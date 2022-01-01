import "isomorphic-unfetch";
export default class Client {
    options: {
        host?: string;
        requestOptions?: RequestInit;
    };
    constructor(options: {
        host?: string;
        requestOptions?: RequestInit;
    });
    get(url: string, requestOptions?: RequestInit): Promise<Response>;
}
