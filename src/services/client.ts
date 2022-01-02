import "isomorphic-unfetch";

export default class Client {
  host?: string;
  requestOptions?: RequestInit;

  constructor(host?: string, requestOptions?: RequestInit) {
    this.host = host || "http://localhost:4000";
    this.requestOptions = requestOptions || {};
  }

  async request(url: string, requestOptions?: RequestInit) {
    const response = await fetch(url, {
      ...(this.requestOptions || {}),
      ...requestOptions,
    });
    return response.json();
  }

  setEndpoint(host: string) {
    this.host = host;

    return true;
  }

  setHeader(key: string, value: any) {
    if (!this.requestOptions) this.requestOptions = {};
    if (!this.requestOptions?.headers) this.requestOptions.headers = {};
    this.requestOptions.headers[key] = value;

    return true;
  }

  setHeaders(values: any) {
    for (const [key, value] of Object.entries(values)) {
      this.setHeader(key, value);
    }

    return true;
  }
}
