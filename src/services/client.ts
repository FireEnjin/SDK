import "isomorphic-unfetch";

export default class Client {
  options: {
    host?: string;
    requestOptions?: RequestInit;
  };

  constructor(options: { host?: string; requestOptions?: RequestInit }) {
    this.options = options || {};
  }

  get(url: string, requestOptions?: RequestInit) {
    return fetch(url, { method: "GET", ...requestOptions });
  }

  post(url: string, requestOptions?: RequestInit) {
    return fetch(url, { method: "POST", ...requestOptions });
  }
}
