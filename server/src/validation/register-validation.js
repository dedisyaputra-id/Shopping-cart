import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(4).max(100).required(),
  email: Joi.string().min(8).max(100).required(),
  password: Joi.string().min(8).required(),
  phone_number: Joi.number(),
  address: Joi.string(),
  token: Joi.string(),
});

export default schema;
