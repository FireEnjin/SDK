import "isomorphic-unfetch";
import objectToUrlParams from "../helpers/objectToUrlParams";

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

  constructor(url: string, options?: RequestInit) {
    this.url = url || "http://localhost:4000";
    this.options = options || {};
  }

  async rawRequest<T = any, V = any>(
    query: string,
    variables?: V,
    requestOptions?: RequestInit
  ): Promise<{
    data: T;
    extensions?: any;
    headers: HeadersInit;
    status: number;
  }> {
    const method: string =
      requestOptions?.method || this.options?.method || "GET";
    const headers: HeadersInit =
      requestOptions?.headers || this.options?.headers || {};
    const endpoint = `${this.url}/${query}${
      method === "get" ? objectToUrlParams(variables) : ""
    }`;
    const response = await fetch(`${this.url}/${endpoint}`, {
      method,
      ...(this.options || {}),
      ...(requestOptions || {}),
      headers,
      body: method === "get" ? null : JSON.stringify(variables || {}),
    });

    return {
      data: (await response?.json?.()) || null,
      headers: response.headers,
      status: response.status,
      extensions: {},
    };
  }

  async request<T = any, V = Variables>(
    endpoint: string,
    variables?: V,
    requestOptions?: RequestInit
  ): Promise<T> {
    const method: string =
      requestOptions?.method || this.options?.method || "GET";
    const headers: HeadersInit =
      requestOptions?.headers || this.options?.headers || {};
    const response = await fetch(`${this.url}/${endpoint}`, {
      method,
      ...(this.options || {}),
      ...(requestOptions || {}),
      headers,
      body:
        (!["get", "post"].includes(method.toLowerCase()) &&
          JSON.stringify(variables || {})) ||
        null,
    });

    return response.json();
  }

  async batchRequests<T extends any = any, V = Variables>(
    documents: BatchRequestDocument<V>[],
    requestOptions?: RequestInit
  ): Promise<T> {
    const response: {
      [endpoint: string]: any;
    } = {};
    for (const { document, variables } of documents) {
      try {
        response[document] = await this.request(
          document,
          variables,
          requestOptions
        );
      } catch {
        response[document] = null;
      }
    }

    return response as any;
  }

  setEndpoint(value: string) {
    this.url = value;

    return true;
  }

  setHeader(key: string, value: string): Client {
    if (!this.options) this.options = {};
    if (!this.options?.headers) this.options.headers = {};
    this.options.headers[key] = value;

    return this;
  }

  setHeaders(headers: HeadersInit): Client {
    for (const [key, value] of Object.entries(headers)) {
      this.setHeader(key, value);
    }

    return this;
  }
}
