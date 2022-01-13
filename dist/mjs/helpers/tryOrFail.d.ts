import { FireEnjinErrorCallback, FireEnjinSuccessCallback } from "../interfaces";
export default function tryOrFail(fn: () => Promise<any>, options?: {
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
}): Promise<any>;
