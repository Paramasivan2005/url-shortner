import client from "../db/db.js"
import express from "express";
import jwt from "jsonwebtoken";

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const resetToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "10m"});
        res.status(200).json({
            message:"OTP verified", resetToken
        })

        const result = await client.query(`SELECT * FROM password_resets WHERE email = $1 AND otp = $2`, [email, otp]);

        if (result.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        const otpData = result.rows[0];

        if (new Date() > otpData.expires_at) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });
        };

        await client.query(`UPDATE password_resets SET is_verified = true WHERE email = $1`, [email]);

        return res.status(200).json({
            success: true,
            message: "OTP Verified Successfully",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}