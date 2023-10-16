import productService from "../service/productService.js";

const get = async (req, res, next) => {
  const products = await productService.get();
  res.status(200).json({
    data: products,
  });
};

export default {
  get,
};
