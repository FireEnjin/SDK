import { FirebaseApp } from "@firebase/app";
import { Auth, RecaptchaVerifier, RecaptchaParameters, ConfirmationResult } from "@firebase/auth";
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
    private confirmationResult?;
    private recaptchaVerifier?;
    private sessionManager?;
    private config;
    private widgetId?;
    isOnline: boolean;
    service: Auth;
    constructor(options?: {
        config?: IFireEnjinAuthConfig;
        app?: any;
    });
    getApplicationVerifier(): Promise<RecaptchaVerifier>;
    getUser(skipReload?: boolean): Promise<import("@firebase/auth").User>;
    getClaims(): Promise<import("@firebase/auth").ParsedToken>;
    getToken(): Promise<string>;
    setToken(token: any): Promise<any>;
    onEmailLink(link: any): Promise<import("@firebase/auth").UserCredential>;
    verify(): Promise<unknown>;
    createCaptcha(el: string | HTMLElement, options?: RecaptchaParameters): Promise<unknown>;
    resetCaptcha(widgetId?: string): any;
    withGoogleCredential(token: any): import("@firebase/auth").OAuthCredential;
    withCredential(credential: any): Promise<import("@firebase/auth").UserCredential>;
    withToken(token: string): Promise<import("@firebase/auth").UserCredential>;
    withPhoneNumber(phoneNumber: string): Promise<ConfirmationResult>;
    confirmPhoneNumber(code: string): Promise<import("@firebase/auth").UserCredential>;
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
    withSocial(network: string, redirect?: boolean): Promise<any>;
    logout(): Promise<void>;
    updatePassword(newPassword: string, credential: any): Promise<void>;
    storeRoles(roles: any[]): Promise<any[]>;
    checkRolePermission(roleId: string, permission: string, ignoreAdmin?: boolean): Promise<boolean>;
    goOnline(): Promise<void>;
    goOffline(): Promise<any>;
    getSessionManager(): Promise<SessionManager>;
    getApp(): Promise<FirebaseApp>;
    getService(): Promise<Auth>;
}
export {};
