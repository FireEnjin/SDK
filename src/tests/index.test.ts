import RestClient from "../services/client";

describe("Create Payout", () => {
  it("Should Payout with Stripe to an account", async () => {
    const client = new RestClient({});
    console.log(client);
    expect(client).toMatchObject({});
  });
});
