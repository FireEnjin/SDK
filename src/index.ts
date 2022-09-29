import AuthService from "./services/auth";
import DatabaseService from "./services/database";
import FireEnjin from "./services/fireenjin";
import SessionService from "./services/session";
import {
  FireEnjinEvent,
  FireEnjinErrorEvent,
  FireEnjinFetchEvent,
  FireEnjinSubmitEvent,
  FireEnjinSuccessEvent,
  FireEnjinUploadEvent,
  FireEnjinEndpoints,
  FireEnjinFetchInput,
  FireEnjinFetchOptions,
  FireEnjinHost,
  FireEnjinMethodOptions,
  FireEnjinOptions,
  FireEnjinSubmitInput,
  FireEnjinSubmitOptions,
  FireEnjinTriggerInput,
  FireEnjinUploadInput,
  FireEnjinUploadOptions,
  FireEnjinErrorCallback,
  FireEnjinSuccessCallback,
  FireEnjinUploadCallback,
} from "./interfaces";

try {
  if (window && !(window as any).FireEnjin) {
    (window as any).FireEnjin = FireEnjin;
  }
} catch (error) {
  console.log(error);
}

export {
  AuthService,
  DatabaseService,
  SessionService,
  FireEnjin,
  FireEnjinEvent,
  FireEnjinErrorEvent,
  FireEnjinFetchEvent,
  FireEnjinSubmitEvent,
  FireEnjinSuccessEvent,
  FireEnjinUploadEvent,
  FireEnjinEndpoints,
  FireEnjinHost,
  FireEnjinOptions,
  FireEnjinFetchInput,
  FireEnjinFetchOptions,
  FireEnjinMethodOptions,
  FireEnjinSubmitInput,
  FireEnjinSubmitOptions,
  FireEnjinTriggerInput,
  FireEnjinUploadInput,
  FireEnjinUploadOptions,
  FireEnjinErrorCallback,
  FireEnjinSuccessCallback,
  FireEnjinUploadCallback,
};
