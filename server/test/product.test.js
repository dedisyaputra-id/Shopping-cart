import prismaDb from "../src/app/database.js";
import web from "../src/app/web.js";
import supertest from "supertest";

describe("GET /api/products", () => {
  it("should GET all product", async () => {
    const result = await supertest(web).get("/api/products");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
});

describe("POST /api/products", () => {
  afterEach(async () => {
    await prismaDb.product.delete({
      where: {
        name: "baju gamis perempuan",
      },
    });
  });
  it("should post product", async () => {
    const result = await supertest(web).post("/api/products").send({
      name: "baju gamis perempuan",
      stock: 300,
      price: 70000,
      category_id: 1,
    });

    expect(result.status).toBe(201);
    expect(result.body.data).toBeDefined();
  });
});
