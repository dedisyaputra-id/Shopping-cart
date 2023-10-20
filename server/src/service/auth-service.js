import validation from "../validation/validation.js";
import registerSchema from "../validation/register-validation.js";
import prismaDb from "../app/database.js";
import responseError from "../error/responseError.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import loginSchema from "../validation/login-validation.js";

const register = async (request) => {
  const validate = await validation(registerSchema, request);

  const hashPassword = await bcrypt.hash(validate.password, 10);
  const result = await prismaDb.user.create({
    data: {
      ...validate,
      password: hashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return result;
};

const login = async (request) => {
  const validate = await validation(loginSchema, request);

  const user = await prismaDb.user.findUnique({
    where: {
      email: validate.email,
    },
  });

  if (!user) {
    throw new responseError(400, "email or password wrong");
  }

  const comparePassword = await bcrypt.compare(
    validate.password,
    user.password
  );

  if (!comparePassword) {
    throw new responseError(400, "email or password wrong");
  }

  const token = v4();
  const result = await prismaDb.user.update({
    where: {
      email: user.email,
    },
    data: {
      token: token,
    },
    select: {
      token: true,
    },
  });

  return result;
};

export default {
  register,
  login,
};
