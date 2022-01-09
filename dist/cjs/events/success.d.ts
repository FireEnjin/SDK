export default function fireenjinSuccess(input?: {
    event?: Event;
    cached?: boolean;
    dataPropsMap?: any;
    data?: any;
    name?: string;
    endpoint?: string;
}, options?: {
    onSuccess?: (data: any) => void;
}): Promise<void>;
