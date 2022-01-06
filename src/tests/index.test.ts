import { FireEnjin } from "../services/fireenjin";
import Client from "../services/client";
/**
 * @jest-environment jsdom
 */
describe("Tests", () => {
  it("Should create FireEnjin", async () => {
    const fire = new FireEnjin({
      onRequest: async (action, endpoint) => {
        console.log(endpoint);
        return action();
      },
    });
  });
  it("Should create a client and make a request", async () => {
    const client = new Client(
      "https://us-central1-madness-labs-pwa.cloudfunctions.net"
    );
    console.log(await client.request("api/template/Ocmq17xVsxRyyngvmct2"));
    expect(client).toMatchObject({});
  });
});
