import client from "../db/db.js";


export const verifyResetpassword =async (req, res, next) => {
    const { email, otp } = req.body;

    const result = await client.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (!result.rows.length) {
        return res.status(404).json({
            message: "user not found"
        });
    };

    const user = result.rows[0];

    if (user.otp != otp) {
        return res.status(400).json({ message: "invalid OTP" });
    }

    if (new Date() > user.expires_at) {
        return res.status(400).json({ message: "OTP expired" });
    }

    next();
};
