import AuthService from "./services/auth";
import DatabaseService from "./services/database";
import FireEnjin from "./services/fireenjin";
import SessionService from "./services/session";
import FireEnjinModel from "./services/model";
try {
    if (window && !window.FireEnjin) {
        window.FireEnjin = FireEnjin;
    }
}
catch (error) {
    console.log(error);
}
export { AuthService, DatabaseService, SessionService, FireEnjin, FireEnjinModel, };
