import client from "../db/db.js"
import express from "express";
import { sendOtpMail } from "../utils/mailer.js";

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (user.rows.length === 0) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        // otp generate

        const otp = Math.floor(100000 + Math.random() * 900000);

        // otp save
        const expiredAt = new Date();
        expiredAt.setMinutes(expiredAt.getMinutes() + 5);

        await client.query(`DELETE FROM password_resets WHERE email = $1`, [email]);

        await client.query(`INSERT INTO password_resets (email, otp, expires_at) VALUES ($1, $2, $3)`, [email, otp, expiredAt]);

        // gmail send
        await sendOtpMail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent succesfully"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error"
        })
    }
}