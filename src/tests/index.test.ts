import Client from "../services/client";

describe("Create HTTP client", () => {
  it("Should Payout with Stripe to an account", async () => {
    const client = new Client({});
    console.log(
      await client.get(
        "https://us-central1-madness-labs-pwa.cloudfunctions.net/api/template/Ocmq17xVsxRyyngvmct2"
      )
    );
    expect(client).toMatchObject({});
  });
});
