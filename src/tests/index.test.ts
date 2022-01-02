import { FireEnjin } from "..";
import Client from "../services/client";

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
    const client = new Client({});
    console.log(
      await client.request(
        "https://us-central1-madness-labs-pwa.cloudfunctions.net/api/template/Ocmq17xVsxRyyngvmct2"
      )
    );
    expect(client).toMatchObject({});
  });
});
