require('dotenv').config();
const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER, // generated ethereal user
    pass: EMAIL_PASSWORD, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log('Ready for send emails');
});

module.exports = {
  transporter,
};
