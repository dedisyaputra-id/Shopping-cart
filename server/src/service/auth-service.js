import validation from "../validation/validation.js";
import registerSchema from "../validation/register-validation.js";
import prismaDb from "../app/database.js";

const register = async (request) => {
  const validate = await validation(registerSchema, request);

  const result = await prismaDb.user.create({
    data: {
      ...validate,
    },
  });

  return result;
};

export default {
  register,
};
