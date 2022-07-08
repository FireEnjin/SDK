import FireEnjin from "../src/services/fireenjin";
import Client from "../src/services/client";
import { getSdk } from "./sdk";
import DatabaseService from "../src/services/database";
/**
 * @jest-environment jsdom
 */
describe("Tests", () => {
  it("Should create a client and make a request", async () => {
    const client = new Client("https://fireenjin.com");
    console.log(await client.request("api/template/Ocmq17xVsxRyyngvmct2"));
    expect(client).toMatchObject({});
  });
  it.only("Should create fireenjin and make a request", async () => {
    const enjin = new FireEnjin({
      getSdk,
      host: "https://fireenjin.com/graphql",
      onRequest: async (action, endpoint) => {
        const result = await action();
        console.log(`New Request: ${endpoint}`, result);

        return result;
      },
    } as any);
    const res = await enjin.fetch("findTemplate", {
      params: {
        id: "test",
      },
    });

    console.log(res);
    expect(res).toMatchObject({});
  });
  it("Should create fireenjin and make a request", async () => {
    const enjin = new FireEnjin({
      getSdk,
      host: "https://fireenjin.com/graphql",
      onRequest: async (action, endpoint) => {
        const result = await action();
        console.log(`New Request: ${endpoint}`, result);

        return result;
      },
    } as any);
    const res = await enjin.submit("addTemplate", {
      data: {
        html: "<p>test</p>",
        subject: "Testing",
      },
    });

    console.log(res);
    expect(res).toMatchObject({});
  });
  it("Should create fireenjin and make a request", async () => {
    const enjin = new FireEnjin({
      getSdk,
      host: "https://fireenjin.com/graphql",
      onRequest: async (action, endpoint) => {
        const result = await action();
        console.log(`New Request: ${endpoint}`, result);

        return result;
      },
    } as any);
    const res = await enjin.submit("editTemplate", {
      id: "test",
      data: {
        html: "<p>test</p>",
        subject: "asdf",
      },
    });

    console.log(res);
    expect(res).toMatchObject({});
  });
  it.only("Should create fireenjin and make a request", async () => {
    const db = new DatabaseService({
      config: {
        apiKey: "AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM",
        authDomain: "fireenjin-live.firebaseapp.com",
        databaseURL: "https://fireenjin-live.firebaseio.com",
        projectId: "fireenjin-live",
        storageBucket: "fireenjin-live.appspot.com",
        messagingSenderId: "756564610596",
        appId: "1:756564610596:web:4fdf5a6ddfd319a93392b1",
        measurementId: "G-Q0ZHGFCQFN",
      },
    });
    const enjin = new FireEnjin({
      connections: [
        {
          type: "firebase",
          db,
        },
      ],
      onRequest: async (action, endpoint) => {
        const result = await action();
        console.log(`New Request: ${endpoint}`, result);

        return result;
      },
    } as any);
    const res = await enjin.fetch(`/templates`);

    console.log(res);
    expect(res).toMatchObject({});
  });
});
