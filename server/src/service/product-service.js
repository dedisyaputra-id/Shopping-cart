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
      slug: validate.name.replace(" ", "-").toLowerCase(),
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

const addToCart = async (params, request) => {
  const product = await prismaDb.product.findUnique({
    where: {
      slug: params,
    },
  });

  if (!product) {
    throw new responseError(404, "product not found");
  }

  const cart = await prismaDb.cart.findUnique({
    where: {
      product_id: product.id,
    },
  });

  if (!cart) {
    const result = await prismaDb.cart.create({
      data: {
        product_id: product.id,
        user_id: 2,
        quantity: request.quantity,
      },
    });
    return result;
  }

  const result = await prismaDb.cart.update({
    where: {
      product_id: cart.product_id,
    },
    data: {
      quantity: request.quantity + cart.quantity,
    },
  });

  return result;
};

const productByName = async (params) => {
  const product = await prismaDb.product.findUnique({
    where: {
      slug: params.productName,
    },
  });

  if (!product) {
    throw new responseError(404, "product not found");
  }

  return product;
};

export default {
  get,
  post,
  addToCart,
  productByName,
};
