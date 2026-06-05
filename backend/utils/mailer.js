import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
console.log("EMAIL:", process.env.EMAIL);
console.log("PASS:", process.env.EMAIL_PASSWORD);
export const sendOtpMail = async (email, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset OTP",
        html: `
            <h2>Your OTP is</h2>
            <h1>${otp}</h1>
            <p>Valid for 5 minutes</p>
        `
    });
};