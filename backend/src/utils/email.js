const nodemailer = require('nodemailer');

const generateOTP = () => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

const generateExpirationTime = () => {
  const now = Math.floor(Date.now() / 1000);
  const expirationInMinutes = 2;
  return now + expirationInMinutes * 60;
};

const sendOTPEmail = async (recipient, otpCode) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user:  process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipient,
    subject: 'Kode OTP Anda',
    text: `Kode OTP Anda untuk registrasi: ${otpCode}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  generateOTP,
  generateExpirationTime,
  sendOTPEmail,
};