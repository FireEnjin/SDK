export default function tryOrFail(fn: () => Promise<any>, options?: {
    endpoint?: string;
    name?: string;
    retries?: number;
    event?: any;
    cached?: boolean;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    onError?: (error: any) => void;
    onSuccess?: (data: any) => void;
}): Promise<any>;
