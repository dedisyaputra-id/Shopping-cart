import express from "express";
import publicApi from "../routes/public-api.js";
import api from "../routes/api.js";
import errorMiddleware from "../middleware/error-middleware.js";
const web = express();

web.use(express.json());

web.use(publicApi);
web.use(api);
web.use(errorMiddleware);

export default web;
