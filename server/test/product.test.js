import web from "../src/app/web.js";
import supertest from "supertest";

describe("/api/products", () => {
  it("should GET all product", async () => {
    const result = await supertest(web).get("/api/products");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
});
