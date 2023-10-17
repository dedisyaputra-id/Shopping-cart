import web from "../src/app/web.js";
import supertest from "supertest";
import prismaDb from "../src/app/database";

describe("POST /api/register", () => {
  afterEach(async () => {
    await prismaDb.user.delete({
      where: {
        email: "user1@gmail.com",
      },
    });
  });

  it("should create new user account", async () => {
    const result = await supertest(web).post("/api/register").send({
      name: "user 1",
      email: "user1@gmail.com",
      password: "password",
    });

    expect(result.status).toBe(201);
    expect(result.body.data).toBeDefined();
  });
});
