import express from "express";
import { createShorturl, redirectUrl } from "../controllers/urlController.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();
router.post('/shorten', verifyToken, createShorturl);
router.get('/:shortCode', redirectUrl);

export default router;