// import express from 'express';
import client from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


const saltRounds = 10;

export const signup = async (req, res) => {

    try {

        const { userName, email, password } = req.body;

        // check email already exists
        const existingUser = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "email already exists" })
        }

        // password hasing 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await client.query(`INSERT INTO users (userName, email, password) VALUES ($1, $2, $3)`, [userName, email, hashedPassword]);


        res.status(201).json({
            message: "Signup success"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await client.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({
                message: "invalid email"
            })
        }

        // compare password

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({
                message: "invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user.rows[0].id,
                email: user.rows[0].email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "login successfull",
            token
        })
    }
    catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}