import productService from "../service/product-service.js";
import fs from "fs/promises";
const get = async (req, res, next) => {
  const products = await productService.get();
  res.status(200).json({
    data: products,
  });
};

const post = async (req, res, next) => {
  try {
    const products = await productService.post(req.body, req.file);
    res.status(201).json({
      data: products,
    });
  } catch (error) {
    if (req.file) {
      fs.unlink("../client/public/assets/product/" + req.file.filename);
      next(error);
    }
    next(error);
  }
};
const addToCart = async (req, res, next) => {
  try {
    const products = await productService.addToCart(
      req.params.productName,
      req.body
    );
    res.status(201).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

const productByName = async (req, res, next) => {
  try {
    const product = await productService.productByName(req.params);
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  get,
  post,
  addToCart,
  productByName,
};
