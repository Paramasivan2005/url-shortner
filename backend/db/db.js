import pkg from 'pg';
const { Client } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

await client.connect().then(() => {
    console.log("Database connected succesfully")
}).catch((err) => {
    console.log(err.message);
});

export default client;