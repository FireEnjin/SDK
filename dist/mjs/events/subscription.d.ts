import { FireEnjinErrorCallback, FireEnjinSuccessCallback, FireEnjinQuery } from "../interfaces";
export default function fireenjinSubscription(input?: {
    event?: CustomEvent;
    target?: any;
    cached?: boolean;
    dataPropsMap?: any;
    data?: any;
    name?: string;
    endpoint?: string;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    query?: FireEnjinQuery;
    params?: any;
    signalKey?: string;
}, options?: {
    onSuccess?: FireEnjinSuccessCallback;
    onError?: FireEnjinErrorCallback;
}): Promise<void>;
