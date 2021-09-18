const mail = require("nodemailer");
require("dotenv").config();

// MESSAGES TEMPLATES
const message1 = {
  from: "Founderland <founderland-dev@outlook.com>", // sender address
  to: "salvopatti110@gmail.com", // list of receivers
  subject: "Founderland - test", // Subject line
  text: "Thank you for applying to be part of Founderland! Please be patient, we are a small team and will get back to you within 4 weeks",
  html: "<b>Thank you for applying to be part of Founderland! Please be patient, we are a small team and will get back to you within 4 weeks.</b>",
};

const message2 = {
  from: "Founderland <founderland-dev@outlook.com>", // sender address
  to: "salvopatti110@gmail.com", // list of receivers
  subject: "Founderland - test", // Subject line
  text: "Thank you for applying to be part of Founderland!  We will get back to you within 4 weeks.</b>",
  html: "<b>Thank you for applying to be part of Founderland! We will get back to you within 4 weeks.</b>",
};

// EMAIL CONFIGURATION
async function sendEmail(messageNum) {
  const transporter = mail.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: `${process.env.EMAIL_USER}`,
      pass: `${process.env.EMAIL_PASS}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info;
  // SENDS DIFFERENT EMAIL BASED ON THE PARAMETER
  messageNum === 1
    ? (info = await transporter.sendMail(message1))
    : (info = await transporter.sendMail(message2));

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", mail.getTestMessageUrl(info));
}

// UNCOMMENT THIS AND RUN NODE TO TEST IT
// sendEmail(2).catch(console.error);

module.exports = sendEmail;
