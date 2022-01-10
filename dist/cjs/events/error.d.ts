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
    onError?: (error: any) => void;
}): Promise<void>;
