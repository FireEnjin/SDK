import "isomorphic-unfetch";

export default class Client {
  options: {
    host?: string;
    requestOptions?: RequestInit;
  };

  constructor(options: { host?: string; requestOptions?: RequestInit }) {
    this.options = options || {};
  }

  async request(url: string, requestOptions?: RequestInit) {
    const response = await fetch(url, {
      ...(this.options?.requestOptions || {}),
      ...requestOptions,
    });
    return response.json();
  }

  setHeader(key: string, value: any) {
    if (!this.options?.requestOptions) this.options.requestOptions = {};
    if (!this.options?.requestOptions?.headers)
      this.options.requestOptions.headers = {};
    this.options.requestOptions.headers[key] = value;

    return true;
  }

  setHeaders(values: any) {
    for (const [key, value] of Object.entries(values)) {
      this.setHeader(key, value);
    }

    return true;
  }
}
