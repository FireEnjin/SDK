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
    upload(event: any): Promise<boolean>;
    fetch(event: any): Promise<boolean>;
    submit(event: any): Promise<boolean>;
    setHeader(key: string, value: string): boolean;
}
