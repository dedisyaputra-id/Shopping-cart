import web from "../src/app/web.js";
import supertest from "supertest";
import prismaDb from "../src/app/database";
import { createUser } from "../utils/createuser.js";

describe("POST /api/user/register", () => {
  afterEach(async () => {
    await prismaDb.user.delete({
      where: {
        email: "user2@gmail.com",
      },
    });
  });

  it("should create new user account", async () => {
    const result = await supertest(web).post("/api/user/register").send({
      name: "user 2",
      email: "user2@gmail.com",
      password: "password",
    });

    expect(result.status).toBe(201);
    expect(result.body.data).toBeDefined();
  });
});

describe("POST /api/user/login", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await prismaDb.user.delete({
      where: {
        email: "user2@gmail.com",
      },
    });
  });

  it("should login user", async () => {
    const result = await supertest(web).post("/api/user/login").send({
      email: "user2@gmail.com",
      password: "password",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
  });
});
