import prismaDb from "../app/database.js";

const get = async () => {
  return await prismaDb.cart.findMany({});
};

const destroy = async (params) => {
  const product = await prismaDb.product.findUnique({
    where: {
      slug: params.productName,
    },
  });

  if (!product) {
    throw new responseError(404, "product not found");
  }

  const result = await prismaDb.cart.delete({
    where: { product_id: product.id },
  });

  return result;
};

export default {
  get,
  destroy,
};
