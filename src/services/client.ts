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

  constructor(url: string, options?: RequestInit) {
    this.url = url || "http://localhost:4000";
    this.options = options || {};
  }

  async rawRequest<T = any, V = any>(
    query: string,
    variables?: V,
    requestHeaders?: HeadersInit
  ): Promise<{
    data: T;
    extensions?: any;
    headers: Headers;
    status: number;
  }> {
    const response = await fetch(`${this.url}/${query}`, {
      ...(this.options || {}),
      headers: requestHeaders || this.options?.headers || {},
      body: JSON.stringify(variables || {}),
    });

    return {
      data: (await response?.json?.()) || null,
      headers: response.headers || {},
      status: response.status,
      extensions: {},
    };
  }

  async request<T = any, V = Variables>(
    endpoint: string,
    variables?: V,
    requestHeaders?: HeadersInit
  ): Promise<T> {
    const response = await fetch(`${this.url}/${endpoint}`, {
      ...(this.options || {}),
      headers: requestHeaders || this.options?.headers || {},
      body: JSON.stringify(variables || {}),
    });

    return response.json();
  }

  async batchRequests<T extends any = any, V = Variables>(
    documents: BatchRequestDocument<V>[],
    requestHeaders?: HeadersInit
  ): Promise<T> {
    const response: {
      [endpoint: string]: any;
    } = {};
    for (const { document, variables } of documents) {
      try {
        response[document] = await this.request(
          document,
          variables,
          requestHeaders
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
