import client from "../db/db.js";
import { nanoid } from "nanoid";
import QRCode from 'qrcode';

export const createShorturl = async (req, res) => {
    try {
        const { original_url } = req.body;

        if (!original_url) {
            return res.status(400).json({
                message: "url required"
            })
        }
        const qrCode = await QRCode.toDataURL(original_url);
        const shortcode = nanoid(6);
        const userId = req.user.id;

        const query = `INSERT INTO urls (original_url, short_code, qr_code, user_id) VALUES ($1, $2, $3, $4) RETURNING * `;
        const values = [original_url, shortcode, qrCode, userId];

        const result = await client.query(query, values);
        res.status(201).json({
            message: "short url was created",
            data: result.rows[0]
        })


    } catch (error) {
        console.log("CREATE SHORT URL ERROR:");
        console.log(error);
        res.status(500).json({
            message: "server error"
        })
    }
};

// redirect logic

export const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const query = `SELECT * FROM urls WHERE short_code = $1`;

        const result = await client.query(query, [shortCode]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Url not found'
            })
        }

        const originalUrl = result.rows[0].original_url;

        await client.query(
            `UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1`,
            [shortCode]
        );
        res.redirect(originalUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error"
        })
    }
}