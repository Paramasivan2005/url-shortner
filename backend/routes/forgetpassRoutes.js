import express from "express";
import {
  forgetPassword
} from "../controllers/forgetPassController.js";

const router = express.Router();

router.post("/forgetpassword", forgetPassword);

export default router;