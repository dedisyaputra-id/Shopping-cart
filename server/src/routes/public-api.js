import express from "express";
import productController from "../controllers/product-controller.js";
import authController from "../controllers/auth-controller.js";
const publicApi = express.Router();

publicApi.get("/api/products", productController.get);
publicApi.post("/api/register", authController.register);

export default publicApi;
