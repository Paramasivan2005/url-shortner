import upload from "../cloudinary/upload.js";
import express from "express";
import client from "../db/db.js";
import bcrypt from "bcryptjs";

import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/profile", upload.single("image"), async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const avatar = req.file?.path;

        let hashedPassword = null;

        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        // database update query

        const result = await client.query(`UPDATE users SET username = $1, password = COALESCE($2, password), avatar = COALESCE($3, avatar) WHERE email = $4 RETURNING *`,
            [
                username,
                hashedPassword,
                avatar,
                email
            ]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' })
        };


        res.json({
            message: "Profile updated",
            user: result.rows[0],
        });

    } catch (error) {
        res.status(500).json({
            message: "Update failed",
        });
    }
}
);

router.get("/profile", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await client.query(
            `SELECT id, username, email, password, avatar FROM users WHERE id = $1`,
            [userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            user: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
        });
    }
});

export default router;