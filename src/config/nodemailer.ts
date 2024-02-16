import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
});
