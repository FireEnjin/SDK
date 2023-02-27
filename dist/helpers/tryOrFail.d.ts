import { FireEnjinErrorCallback, FireEnjinSuccessCallback } from "../interfaces";
export default function tryOrFail<T = any>(fn: () => Promise<T>, options?: {
    endpoint?: string;
    name?: string;
    retries?: number;
    event?: any;
    target?: any;
    cached?: boolean;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    onError?: FireEnjinErrorCallback;
    onSuccess?: FireEnjinSuccessCallback;
}): Promise<T>;
