export default function tryOrFail(fn: () => Promise<any>, context: any, options?: {
    retries?: number;
    event?: any;
    cached?: boolean;
    onError?: (error: any) => void;
    onSuccess?: (data: any) => void;
}): Promise<any>;
