import express from "express";
import publicApi from "../routes/public-api.js";
const web = express();

web.use(publicApi);

export default web;
