import prismaDb from "../src/app/database.js";
import bcrypt from "bcrypt";

export const createUser = async () => {
  const hashPassword = await bcrypt.hash("password", 10);
  const user = await prismaDb.user.create({
    data: {
      name: "user 2",
      email: "user2@gmail.com",
      password: hashPassword,
    },
  });

  return user;
};
