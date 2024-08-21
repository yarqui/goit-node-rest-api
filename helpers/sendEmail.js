import nodemailer from "nodemailer";
import "dotenv/config";

const { GMAIL_SENDER, GMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_SENDER,
    pass: GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: GMAIL_SENDER };
  return transporter.sendMail(email);
};

export default sendEmail;
