export default function fireenjinError(input?: {
    cached?: boolean;
    event?: Event;
    error?: any;
    name?: string;
    endpoint?: string;
}, options?: {
    onError?: (error: any) => void;
}): Promise<void>;
