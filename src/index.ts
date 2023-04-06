import AuthService from "./services/auth";
import DatabaseService from "./services/database";
import FireEnjin from "./services/fireenjin";
import Model from "./services/model";
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
  Model,
  type FireEnjinEvent,
  type FireEnjinErrorEvent,
  type FireEnjinFetchEvent,
  type FireEnjinSubmitEvent,
  type FireEnjinSuccessEvent,
  type FireEnjinUploadEvent,
  type FireEnjinEndpoints,
  type FireEnjinHost,
  type FireEnjinOptions,
  type FireEnjinFetchInput,
  type FireEnjinFetchOptions,
  type FireEnjinMethodOptions,
  type FireEnjinSubmitInput,
  type FireEnjinSubmitOptions,
  type FireEnjinTriggerInput,
  type FireEnjinUploadInput,
  type FireEnjinUploadOptions,
  type FireEnjinErrorCallback,
  type FireEnjinSuccessCallback,
  type FireEnjinUploadCallback,
};
