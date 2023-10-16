import express from "express";
import productController from "../controllers/product-controller.js";
import multer from "multer";
import storage from "../../utils/storage.js";

const api = express.Router();
const fileUploadMiddleware = multer({ storage: storage }).single("productImg");
api.post("/api/products", fileUploadMiddleware, productController.post);

export default api;
