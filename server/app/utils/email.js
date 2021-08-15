import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_LOGIN,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: 1484314697598,
  },
});

export const getPasswordResetURL = (user, token) =>
  `http://localhost:3010/password_reset/${user._id}?token=${token}`;

export const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "🌻 Helix Sense Password Reset 🌻";
  const html = `
  <p>Hey ${user.firstname} ${user.lastname},</p>
  <p>We heard that you lost your Helix Sense password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Helix Sense</p>
  `;

  return { from, to, subject, html };
};
