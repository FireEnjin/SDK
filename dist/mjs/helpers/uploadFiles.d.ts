export default function uploadFiles(app: any, files: File[], options?: {
    path?: string;
}): Promise<{
    success?: boolean;
    name?: string;
    url?: string;
    error?: any;
}[]>;
