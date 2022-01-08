import { FireEnjin } from "../services/fireenjin";
import Client from "../services/client";
import { getSdk } from "./sdk";
/**
 * @jest-environment jsdom
 */
describe("Tests", () => {
  it("Should create a client and make a request", async () => {
    const client = new Client(
      "https://us-central1-madness-labs-pwa.cloudfunctions.net"
    );
    console.log(await client.request("api/template/Ocmq17xVsxRyyngvmct2"));
    expect(client).toMatchObject({});
  });
  it.only("Should create fireenjin and make a request", async () => {
    const enjin = new FireEnjin({
      getSdk,
      host: "https://us-central1-madness-labs-pwa.cloudfunctions.net/graphql",
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
      host: "https://us-central1-madness-labs-pwa.cloudfunctions.net/graphql",
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
      host: "https://us-central1-madness-labs-pwa.cloudfunctions.net/graphql",
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
  it("Should create fireenjin and make a request", async () => {
    const enjin = new FireEnjin({
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
      onRequest: async (action, endpoint) => {
        const result = await action();
        console.log(`New Request: ${endpoint}`, result);

        return result;
      },
    } as any);
    const res = await enjin.fetch(`templates`);

    console.log(res);
    expect(res).toMatchObject({});
  });
});
