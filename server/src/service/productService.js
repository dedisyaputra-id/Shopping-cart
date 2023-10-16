import prismaDb from "../app/database.js";

const get = async () => {
  const products = await prismaDb.product.findMany({});

  return products;
};

export default {
  get,
};
