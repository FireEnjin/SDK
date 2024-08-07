import { initializeApp, FirebaseApp } from "@firebase/app";
import {
  getAuth,
  Auth,
  connectAuthEmulator,
  getIdTokenResult,
  signOut,
  reauthenticateWithCredential,
  updatePassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  getIdToken,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  updateEmail,
  signInWithRedirect,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPhoneNumber,
  signInWithCredential,
  signInWithCustomToken,
  reload,
  RecaptchaVerifier,
  RecaptchaParameters,
  ApplicationVerifier,
  ConfirmationResult,
} from "@firebase/auth";
// import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import { getDatabase } from "@firebase/database";
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
  private app: FirebaseApp;
  private confirmationResult?: ConfirmationResult;
  private recaptchaVerifier?: RecaptchaVerifier;
  private sessionManager?: SessionManager;
  private config: IFireEnjinAuthConfig = {
    authLocalStorageKey: "enjin:session",
    tokenLocalStorageKey: "enjin:token",
    facebook: {
      permissions: ["email", "public_profile", "user_friends"],
    },
  };
  private widgetId?: number;

  public isOnline = false;
  public service: Auth;

  constructor(options?: { config?: IFireEnjinAuthConfig; app?: any }) {
    this.config = { ...this.config, ...(options?.config || {}) };
    this.app = options?.app || null;
    const isWindow = typeof window !== "undefined" && window;
    if (!this.app && isWindow) {
      try {
        this.app = initializeApp(options?.config?.firebase as any);
        console.log("Initializing Firebase App...", this.app);
      } catch (e) {
        console.log(e);
      }
    }

    this.service = isWindow ? getAuth(this.app) : (null as any);
    this.service.useDeviceLanguage();

    if (
      !this.config.googlePlus ||
      !this.config.googlePlus.options ||
      !this.config.googlePlus.options.webClientId
    ) {
      console.log(
        "googlePlus.options.webClientId is required for Google Native Auth See Here: https://github.com/EddyVerbruggen/cordova-plugin-googleplus#6-usage"
      );
    }

    if (this.config?.emulate && isWindow) {
      connectAuthEmulator(this.service, "http://localhost:9099");
    }

    if (isWindow) this.onEmailLink(window.location.href);
  }

  // async initializePushNotifications(
  //   onMessageCallback?: (payload: any) => void,
  //   options?: { vapidKey?: string }
  // ) {
  //   try {
  //     const messaging = getMessaging(this.app);
  //     if (onMessageCallback && typeof onMessageCallback === "function") {
  //       onMessage(messaging, onMessageCallback);
  //     }
  //     const vapidKey = options?.vapidKey;
  //     let messagingToken = await getToken(messaging, {
  //       vapidKey,
  //       serviceWorkerRegistration:
  //         await navigator.serviceWorker.getRegistration(),
  //     });
  //     if (!messagingToken) {
  //       const permission = await Notification.requestPermission();
  //       if (permission === "granted") {
  //         console.log("Notification permission granted.");
  //         messagingToken = await getToken(messaging, {
  //           vapidKey,
  //           serviceWorkerRegistration:
  //             await navigator.serviceWorker.getRegistration(),
  //         });
  //       } else {
  //         console.log("Unable to get permission to notify.");
  //       }
  //     }
  //     return messagingToken;
  //   } catch (error) {
  //     console.log(
  //       "Service worker not enabled, push notifications will not work!",
  //       error
  //     );
  //   }
  // }

  async getApplicationVerifier() {
    return this.recaptchaVerifier;
  }

  async getUser(skipReload?: boolean) {
    if (!skipReload) await reload(this.service.currentUser as any);
    return this.service.currentUser;
  }

  async getClaims() {
    try {
      await reload(this.service.currentUser as any);
      const { claims } = await getIdTokenResult(
        this.service?.currentUser as any
      );
      return claims;
    } catch (error) {
      return {};
    }
  }

  async getToken() {
    const currentToken = this.service?.currentUser
      ? await getIdToken(this.service.currentUser)
      : localStorage.getItem(this.config?.tokenLocalStorageKey || "");

    await this.setToken(currentToken);

    return currentToken;
  }

  async setToken(token) {
    localStorage.setItem(this.config.tokenLocalStorageKey || "", token);

    return token;
  }

  async onEmailLink(link) {
    if (isSignInWithEmailLink(this.service, link)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      const authUser = await signInWithEmailLink(
        this.service,
        email || "",
        link
      );
      window.localStorage.removeItem("emailForSignIn");

      this.emitLoggedInEvent(authUser);

      return authUser;
    }
  }

  async verify() {
    return new Promise((resolve, reject) => {
      try {
        this.recaptchaVerifier?.verify()?.then?.((response) => {
          resolve(response);
        });
        reject("No recaptchaVerifier found");
      } catch (error) {
        reject(error);
      }
    });
  }

  createCaptcha(el: string | HTMLElement, options: RecaptchaParameters = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        this.recaptchaVerifier = new RecaptchaVerifier(this.service, el, {
          size: "invisible",
          callback(response) {
            resolve(response);
          },
          "expired-callback": () => {
            reject("expired");
          },
          ...options,
        });
        (window as any).recaptchaVerifier = this.recaptchaVerifier;
        this.widgetId = await this.recaptchaVerifier?.render?.();
      } catch (error) {
        reject(error);
      }
    });
  }

  resetCaptcha(widgetId?: string) {
    const captcha = this.recaptchaVerifier || (window as any).recaptchaVerifier;
    captcha.reset(this.widgetId || widgetId);
    return captcha;
  }

  withGoogleCredential(token) {
    return GoogleAuthProvider.credential(token);
  }

  withCredential(credential) {
    return signInWithCredential(this.service, credential);
  }

  withToken(token: string) {
    return signInWithCustomToken(this.service, token);
  }

  withPhoneNumber(phoneNumber: string) {
    phoneNumber = "+" + phoneNumber;
    window.localStorage.setItem("phoneForSignIn", phoneNumber);

    const signInRef = signInWithPhoneNumber(
      this.service,
      phoneNumber,
      (this.recaptchaVerifier ||
        (window as any).recaptchaVerifier) as ApplicationVerifier
    );

    signInRef.then((confirmationResult) => {
      this.confirmationResult = confirmationResult;
    });

    return signInRef;
  }

  confirmPhoneNumber(code: string) {
    return this.confirmationResult?.confirm?.(code);
  }

  withEmailLink(email: string, actionCodeSettings: any) {
    window.localStorage.setItem("emailForSignIn", email);

    return sendSignInLinkToEmail(this.service, email, actionCodeSettings);
  }

  anonymously() {
    return signInAnonymously(this.service);
  }

  onAuthChanged(callback) {
    onAuthStateChanged(this.service, async (session) => {
      if (
        !session ||
        (!session.emailVerified &&
          session.providerData &&
          session.providerData[0].providerId === "password")
      ) {
        return false;
      }
      if (session) {
        localStorage.setItem(
          this.config?.authLocalStorageKey || "",
          JSON.stringify(session)
        );
        localStorage.setItem(
          this.config?.tokenLocalStorageKey || "",
          await getIdToken(this.service?.currentUser as any, true)
        );
      }
      if (callback && typeof callback === "function") {
        callback(session);
      }
    });

    if (!localStorage.getItem(this.config?.authLocalStorageKey || "")) {
      callback(null);
    }
  }

  getFromStorage() {
    return localStorage.getItem(this.config?.authLocalStorageKey || "")
      ? JSON.parse(
          localStorage.getItem(this.config?.authLocalStorageKey || "") as string
        )
      : null;
  }

  isLoggedIn(): any {
    const session = this.service;
    return session ? session : this.getFromStorage();
  }

  emitLoggedInEvent(data) {
    document.body.dispatchEvent(
      new CustomEvent("authLoggedIn", { detail: { data } })
    );
  }

  emitLoggedOutEvent() {
    document.body.dispatchEvent(
      new CustomEvent("authLoggedOut", { detail: {} })
    );
  }

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.service, email, password);
  }

  sendEmailVerification(options?) {
    return sendEmailVerification(
      this.service.currentUser as any,
      options ? options : null
    );
  }

  sendPasswordReset(emailAddress: string, options?) {
    return sendPasswordResetEmail(
      this.service,
      emailAddress,
      options ? options : null
    );
  }

  withEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      try {
        signInWithEmailAndPassword(this.service, email, password)
          .then((user) => {
            this.emitLoggedInEvent({ user });
            resolve({ data: { user } });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  updateEmail(newEmail: string, actionOptions: any) {
    return new Promise((resolve, reject) => {
      try {
        updateEmail(this.service?.currentUser as any, newEmail)
          .then((user) => {
            resolve({ data: { user } });
            this.sendEmailVerification(actionOptions);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  async withSocial(
    network: string,
    { redirect, scopes }: { redirect?: boolean; scopes?: string[] } = {}
  ): Promise<any> {
    let provider;
    return new Promise(async (resolve, reject) => {
      if (network === "facebook") {
        provider = new FacebookAuthProvider();
      } else if (network === "google") {
        provider = new GoogleAuthProvider();
      } else if (network === "twitter") {
        provider = new TwitterAuthProvider();
      } else {
        reject({
          message:
            "A social network is required or the one provided is not yet supported.",
        });
      }

      try {
        for (const scope of scopes || []) {
          provider.addScope(scope);
        }
      } catch (error) {
        console.log(error);
      }

      try {
        if (redirect) {
          await signInWithRedirect(this.service, provider);
        } else {
          await signInWithPopup(this.service, provider);
        }
        this.emitLoggedInEvent({ currentUser: this.service.currentUser });
      } catch (error) {
        console.log(error);
      }
    });
  }

  logout() {
    this.emitLoggedOutEvent();

    return signOut(this.service);
  }

  async updatePassword(newPassword: string, credential) {
    if (credential) {
      await reauthenticateWithCredential(
        this.service?.currentUser as any,
        credential
      );
    }

    return updatePassword(this.service.currentUser as any, newPassword);
  }

  async storeRoles(roles: any[]) {
    localStorage.setItem("roles", JSON.stringify(roles));

    return roles;
  }

  async checkRolePermission(
    roleId: string,
    permission: string,
    ignoreAdmin?: boolean
  ) {
    let roles: any[] = [];
    const claims = await this.getClaims();
    if (!ignoreAdmin && claims?.admin) {
      return true;
    }
    try {
      roles = JSON.parse(localStorage.getItem("roles") as string);
    } catch (e) {
      console.log("Error getting roles from local storage");
    }
    for (const role of roles) {
      if (
        role.id === roleId &&
        role.permissions &&
        role.permissions.includes(permission)
      ) {
        return true;
      }
    }

    return false;
  }

  async goOnline() {
    if (!this.sessionManager) {
      const rdb = getDatabase(this.app);
      this.sessionManager = new SessionManager(rdb, this.service);
    }
    this.isOnline = true;
    document.body.dispatchEvent(
      new CustomEvent("fireenjin:online", {
        detail: { sessionManager: this.sessionManager },
      })
    );

    return this.sessionManager.goOnline();
  }

  async goOffline() {
    if (!this.sessionManager) return null;
    this.isOnline = false;
    document.body.dispatchEvent(
      new CustomEvent("fireenjin:offline", {
        detail: { sessionManager: this.sessionManager },
      })
    );

    return this.sessionManager.goOffline();
  }

  async getSessionManager() {
    return this.sessionManager;
  }

  async getApp() {
    return this.app;
  }

  async getService() {
    return this.service;
  }
}
