import supertest from "supertest";
import web from "../src/app/web.js";

describe("GET /api/carts", () => {
  it("should get all cart data", async () => {
    const result = await supertest(web)
      .get("/api/carts")
      .set("Authorization", "ca1f1dbe-3f8b-470d-9642-a214997f0510");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
});
