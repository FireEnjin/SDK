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
    request(url: string, requestOptions?: RequestInit): Promise<any>;
}
