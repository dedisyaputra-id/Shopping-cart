import express from "express";
import productController from "../controllers/product-controller.js";
import authController from "../controllers/auth-controller.js";
const publicApi = express.Router();

publicApi.post("/api/user/register", authController.register);
publicApi.post("/api/user/login", authController.login);
publicApi.get("/api/products", productController.get);
publicApi.get("/api/products/:productName", productController.productByName);

export default publicApi;
