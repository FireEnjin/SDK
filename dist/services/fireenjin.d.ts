declare type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
export default class FireEnjin {
    client: any;
    sdk: any;
    options: {
        host?: string;
        token?: string;
        onRequest?: SdkFunctionWrapper;
        onError?: (error: any) => void;
        onSuccess?: (data: any) => void;
        onUpload?: (data: any) => void;
        headers?: any;
        functionsHost?: string;
        uploadUrl?: string;
        debug?: boolean;
        disableCache?: boolean;
    };
    constructor(options?: {
        host?: string;
        token?: string;
        getSdk?: any;
        onRequest?: SdkFunctionWrapper;
        onError?: (error: any) => void;
        onSuccess?: (data: any) => void;
        onUpload?: (data: any) => void;
        headers?: any;
        functionsHost?: string;
        uploadUrl?: string;
        debug?: boolean;
        disableCache?: boolean;
    });
    upload(event: any): Promise<any>;
    fetch(event: any): Promise<any>;
    submit(event: any): Promise<any>;
    setHeader(key: string, value: string): boolean;
}
export {};
