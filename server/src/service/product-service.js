import prismaDb from "../app/database.js";
import validation from "../validation/validation.js";
import productSchema from "../validation/product-validation.js";
import responseError from "../error/responseError.js";
const get = async () => {
  const products = await prismaDb.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },

    orderBy: { id: "desc" },
  });

  return products;
};

const post = async (request, image) => {
  const validate = await validation(productSchema, request);
  const product = await prismaDb.product.findUnique({
    where: {
      name: validate.name,
    },
  });

  if (product) {
    throw new responseError(400, "product name already exist");
  }
  if (!image) {
    throw new responseError(400, "image is required");
  }

  const result = await prismaDb.product.create({
    data: {
      image: image.filename,
      ...validate,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return result;
};

export default {
  get,
  post,
};
