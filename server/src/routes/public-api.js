import express from "express";
import productController from "../controllers/product-controller.js";

const publicApi = express.Router();

publicApi.get("/api/products", productController.get);

export default publicApi;
