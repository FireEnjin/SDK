import { FirebaseApp } from "@firebase/app";
import { Auth } from "@firebase/auth";
import SessionManager from "./sessionManager";
interface IFireEnjinAuthConfig {
    emulate?: boolean;
    authLocalStorageKey?: string;
    tokenLocalStorageKey?: string;
    firebase?: {
        apiKey?: string;
        authDomain?: string;
        databaseURL?: string;
        projectId?: string;
        storageBucket?: string;
        messagingSenderId?: string;
    };
    facebook?: {
        permissions?: string[];
    };
    googlePlus?: {
        options?: {
            webClientId?: string;
            offline?: boolean;
        };
    };
}
export default class AuthService {
    private app;
    private sessionManager?;
    private config;
    private facebook;
    private googlePlus;
    private twitter;
    isOnline: boolean;
    service: Auth;
    constructor(options?: {
        config?: IFireEnjinAuthConfig;
        app?: any;
    });
    getUser(skipReload?: boolean): Promise<import("@firebase/auth").User | null>;
    getClaims(): Promise<import("@firebase/auth").ParsedToken>;
    getToken(): Promise<string | null>;
    setToken(token: any): Promise<any>;
    onEmailLink(link: any): Promise<import("@firebase/auth").UserCredential | undefined>;
    withGoogleCredential(token: any): import("@firebase/auth").OAuthCredential;
    withCredential(credential: any): Promise<import("@firebase/auth").UserCredential>;
    withToken(token: string): Promise<import("@firebase/auth").UserCredential>;
    withPhoneNumber(phoneNumber: string, capId: any): Promise<import("@firebase/auth").ConfirmationResult>;
    withEmailLink(email: string, actionCodeSettings: any): Promise<void>;
    anonymously(): Promise<import("@firebase/auth").UserCredential>;
    onAuthChanged(callback: any): void;
    getFromStorage(): any;
    isLoggedIn(): any;
    emitLoggedInEvent(data: any): void;
    emitLoggedOutEvent(): void;
    createUser(email: string, password: string): Promise<import("@firebase/auth").UserCredential>;
    sendEmailVerification(options?: any): Promise<void>;
    sendPasswordReset(emailAddress: string, options?: any): Promise<void>;
    withEmail(email: string, password: string): Promise<unknown>;
    updateEmail(newEmail: string, actionOptions: any): Promise<unknown>;
    facebookNative(): Promise<any>;
    googleNative(): Promise<any>;
    twitterNative(): Promise<any>;
    withSocial(network: string, redirect?: boolean): Promise<any>;
    logout(): Promise<void>;
    updatePassword(newPassword: string, credential: any): Promise<void>;
    storeRoles(roles: any[]): Promise<any[]>;
    checkRolePermission(roleId: string, permission: string, ignoreAdmin?: boolean): Promise<boolean>;
    goOnline(): Promise<void>;
    goOffline(): Promise<any>;
    getSessionManager(): Promise<SessionManager | undefined>;
    getApp(): Promise<FirebaseApp>;
    getService(): Promise<Auth>;
}
export {};
