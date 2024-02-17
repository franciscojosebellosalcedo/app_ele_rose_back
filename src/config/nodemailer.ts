import { createTransport } from "nodemailer";
import {  config} from "dotenv";
config();

export const transporter = createTransport({
  host: process.env.NODEMAILER_HOST,
  port: parseInt(process.env.NODEMAILER_PORT as string),
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER as string,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

