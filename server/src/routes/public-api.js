import express from "express";
import productController from "../controllers/product-controller.js";
import authController from "../controllers/auth-controller.js";
const publicApi = express.Router();

publicApi.post("/api/register", authController.register);
publicApi.get("/api/products", productController.get);
publicApi.get("/api/products/:productName", productController.productByName);

export default publicApi;
