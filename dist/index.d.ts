import { GraphQLClient } from "graphql-request";
import AuthService from "./services/auth";
import DatabaseService from "./services/database";
import SessionService from "./services/session";
declare const FireEnjin: {
    init: (getSdkFn: any, options?: {
        host?: string;
        token?: string;
        onError?: (error: any) => void;
        onSuccess?: (data: any) => void;
        onUpload?: (data: any) => void;
        headers?: any;
        functionsHost?: string;
        uploadUrl?: string;
        debug?: boolean;
        disableCache?: boolean;
    }) => Promise<{
        client: GraphQLClient;
        sdk: any;
    }>;
    setHeader(key: string, value: string): boolean;
};
export { AuthService, DatabaseService, SessionService, FireEnjin };
