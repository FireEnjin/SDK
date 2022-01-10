import { FireEnjinErrorCallback } from "../interfaces";
export default function fireenjinError(input?: {
    cached?: boolean;
    event?: CustomEvent;
    error?: any;
    name?: string;
    endpoint?: string;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}, options?: {
    onError?: FireEnjinErrorCallback;
}): Promise<void>;
