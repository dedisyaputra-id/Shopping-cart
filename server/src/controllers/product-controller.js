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
      fs.unlink("../client/public/assets/products/" + req.file.filename);
      next(error);
    }
    next(error);
  }
};

export default {
  get,
  post,
};
