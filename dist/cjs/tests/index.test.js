"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fireenjin_1 = require("../services/fireenjin");
const client_1 = __importDefault(require("../services/client"));
const sdk_1 = require("./sdk");
/**
 * @jest-environment jsdom
 */
describe("Tests", () => {
    it("Should create a client and make a request", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new client_1.default("https://us-central1-madness-labs-pwa.cloudfunctions.net");
        console.log(yield client.request("api/template/Ocmq17xVsxRyyngvmct2"));
        expect(client).toMatchObject({});
    }));
    it.only("Should create fireenjin and make a request", () => __awaiter(void 0, void 0, void 0, function* () {
        const enjin = new fireenjin_1.FireEnjin({
            getSdk: sdk_1.getSdk,
            host: "https://us-central1-madness-labs-pwa.cloudfunctions.net/graphql",
            onRequest: (action, endpoint) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield action();
                console.log(`New Request: ${endpoint}`, result);
                return result;
            }),
        });
        const res = yield enjin.fetch("findTemplate", {
            params: {
                id: "test",
            },
        });
        console.log(res);
        expect(res).toMatchObject({});
    }));
    it("Should create fireenjin and make a request", () => __awaiter(void 0, void 0, void 0, function* () {
        const enjin = new fireenjin_1.FireEnjin({
            getSdk: sdk_1.getSdk,
            host: "https://us-central1-madness-labs-pwa.cloudfunctions.net/graphql",
            onRequest: (action, endpoint) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield action();
                console.log(`New Request: ${endpoint}`, result);
                return result;
            }),
        });
        const res = yield enjin.submit("addTemplate", {
            data: {
                html: "<p>test</p>",
                subject: "Testing",
            },
        });
        console.log(res);
        expect(res).toMatchObject({});
    }));
    it("Should create fireenjin and make a request", () => __awaiter(void 0, void 0, void 0, function* () {
        const enjin = new fireenjin_1.FireEnjin({
            getSdk: sdk_1.getSdk,
            host: "https://us-central1-madness-labs-pwa.cloudfunctions.net/graphql",
            onRequest: (action, endpoint) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield action();
                console.log(`New Request: ${endpoint}`, result);
                return result;
            }),
        });
        const res = yield enjin.submit("editTemplate", {
            id: "test",
            data: {
                html: "<p>test</p>",
                subject: "asdf",
            },
        });
        console.log(res);
        expect(res).toMatchObject({});
    }));
    it("Should create fireenjin and make a request", () => __awaiter(void 0, void 0, void 0, function* () {
        const enjin = new fireenjin_1.FireEnjin({
            connections: [
                {
                    auth: {
                        apiKey: "AIzaSyBpVG2JOIVTXfO-fWx7-YZq938dSINu9Lc",
                        authDomain: "madness-labs-pwa.firebaseapp.com",
                        databaseURL: "https://madness-labs-pwa.firebaseio.com",
                        projectId: "madness-labs-pwa",
                        storageBucket: "madness-labs-pwa.appspot.com",
                        messagingSenderId: "540141413358",
                        appId: "1:540141413358:web:94a1558c2ed20ecba8a4ff",
                        measurementId: "G-YCRMJPNHJG",
                    },
                },
            ],
            onRequest: (action, endpoint) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield action();
                console.log(`New Request: ${endpoint}`, result);
                return result;
            }),
        });
        const res = yield enjin.fetch(`templates`);
        console.log(res);
        expect(res).toMatchObject({});
    }));
});
