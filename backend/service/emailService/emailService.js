const nodemailer = require("nodemailer");


const emailClient = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    },
});

const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: '',
    subject: '',
    html: null
};


module.exports = {emailClient,mailOptions};