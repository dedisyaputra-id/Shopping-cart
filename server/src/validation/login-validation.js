import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().min(8).max(100).required(),
  password: Joi.string().min(8).max(100).required(),
});

export default schema;
