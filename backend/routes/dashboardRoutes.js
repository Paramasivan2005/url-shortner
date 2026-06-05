import express from 'express';
import { getUrl } from "../controllers/dashboardController.js";
import { verifyToken } from '../middleware/dashMiddleware.js';

const router = express.Router();

router.get('/dashboard' , verifyToken, getUrl);

export default router;