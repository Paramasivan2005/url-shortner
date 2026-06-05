import client from "../db/db.js";
import express from 'express';

export const getUrl = async (req, res) => {


    console.log(req.user);

    try {
        const userId = req.user.id;

        const result = await client.query(`SELECT * FROM urls WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);

        res.json(result.rows);
        console.log(req.user);
        console.log(userId);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "server error"
        });
    }
}