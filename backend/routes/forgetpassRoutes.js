import express from "express";
import { forgetPassword } from "../controllers/forgetpassController.js";
import { verifyOtp } from "../controllers/verifyOtpController.js";
// import { verifyResetpassword } from "../middleware/resetpasswordMiddleware.js";
import { verifyResetToken } from "../middleware/verifyResetMiddleware.js";
import { resetPassword } from "../controllers/updatePassController.js";


const router = express.Router();

router.post("/forget_password", forgetPassword);
router.post("/verify-otp", verifyOtp);
router.post("/password", verifyResetToken, resetPassword);

export default router;