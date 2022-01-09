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
    method?: string;
    db: DatabaseService;
    headers?: HeadersInit;
  };

  constructor(
    url: string,
    options: {
      db: DatabaseService;
      headers?: HeadersInit;
    }
  ) {
    this.url = url || "http://localhost:4000";
    this.options = {
      ...options,
      headers: options?.headers || {},
    };
    this.db = options?.db;
  }

  async rawRequest<T = any, V = any>(
    query: string,
    variables?: any,
    requestOptions?: RequestInit
  ): Promise<{
    data: T;
    extensions?: any;
    headers: HeadersInit;
    status: number;
  }> {
    const method: string =
      requestOptions?.method || this.options?.method || "POST";
    const headers: HeadersInit =
      requestOptions?.headers || this.options?.headers || {};
    const endpoint = query;
    const response = await (method.toLowerCase() === "post"
      ? this.db.update(endpoint, variables?.data || {}, variables?.id)
      : this.db.query(
          endpoint,
          variables?.where || [],
          variables?.orderBy || null,
          variables?.limit || null
        ));

    return {
      data:
        method.toLowerCase() === "post" ? response : (response?.docs as any),
      headers,
      extensions: {
        query: response?.query,
        metadata: response?.metadata,
        size: response?.size,
      },
      status: 200,
    };
  }

  async request<T = any, V = Variables>(
    endpoint: string,
    variables?: any,
    requestOptions?: RequestInit
  ): Promise<T> {
    const response = await this.rawRequest(endpoint, variables, requestOptions);

    return {
      data: response.data,
    } as any;
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

  setHeader(key: string, value: string): FirestoreClient {
    const headers: HeadersInit = this.options?.headers || {};
    headers[key] = value;
    //@ts-ignore
    this.options.headers = headers;

    return this;
  }

  setHeaders(headers: HeadersInit): FirestoreClient {
    for (const [key, value] of Object.entries(headers)) {
      this.setHeader(key, value);
    }

    return this;
  }
}
