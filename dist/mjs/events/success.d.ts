export default function fireenjinSuccess(input?: {
    event?: CustomEvent;
    cached?: boolean;
    dataPropsMap?: any;
    data?: any;
    name?: string;
    endpoint?: string;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}, options?: {
    onSuccess?: (data: any) => void;
}): Promise<void>;
