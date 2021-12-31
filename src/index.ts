import AuthService from "./services/auth";
import DatabaseService from "./services/database";
import FireEnjin from "./services/fireenjin";
import SessionService from "./services/session";

if (window && !(window as any).FireEnjin) {
  (window as any).FireEnjin = FireEnjin;
}

export { AuthService, DatabaseService, SessionService, FireEnjin };
