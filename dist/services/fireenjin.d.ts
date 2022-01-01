export default class FireEnjin {
    client: any;
    sdk: any;
    options: {
        host?: string;
        token?: string;
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
        onRequest?: (action: any, endpoint?: string) => any;
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
