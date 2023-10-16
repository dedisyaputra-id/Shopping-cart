import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(4).max(100).required(),
  stock: Joi.number().required(),
  price: Joi.number().required(),
  category_id: Joi.number().required(),
});

export default schema;
