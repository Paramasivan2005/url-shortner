import bcrypt from "bcryptjs";
import client from "../db/db.js";

export const resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await client.query(`UPDATE users SET password = $1 WHERE email = $2`, [hashedPassword, req.email]);

        res.status(200).json({
            message: "password updated successfully"
        })
    } catch (error) {

        res.status(500).json({
            message: "Server error"
        })

    }
}