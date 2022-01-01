import "isomorphic-unfetch";

export default class Client {
  options: {
    host?: string;
    requestOptions?: RequestInit;
  };

  constructor(options: { host?: string; requestOptions?: RequestInit }) {
    this.options = options || {};
  }

  async get(url: string, requestOptions?: RequestInit) {
    const response = await fetch(url, { method: "GET", ...requestOptions });
    return response.json();
  }

  async post(url: string, requestOptions?: RequestInit) {
    const response = await fetch(url, { method: "POST", ...requestOptions });
    return response.json();
  }
}
