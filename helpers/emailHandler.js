require("dotenv").config()
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")

//Send the connect email template
const sendCustomEmail = async (req, res, next) => {
  const { email, _id, firstName, lastName } = req.newMember
  const { subject, body, signOff, template } = req.body
  console.log("Composing email - " + template + "/" + subject)
  const token = jwt.sign({ email, id: _id }, process.env.JWT_SECRET, {
    expiresIn: subject.includes("Reset") ? "15m" : "1d",
  })
  // config for mailserver and mail
  const config = {
    mailserver: {
      service: process.env.EMAIL_PROVIDER,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    mail: {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      template: template,
      context: {
        token,
        subject,
        firstName,
        lastName,
        body,
        signOff,
        host: process.env.HOST,
      },
    },
  }

  const sendMail = async ({ mailserver, mail }) => {
    // create a nodemailer transporter using smtp
    let transporter = nodemailer.createTransport(mailserver)
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
      } else {
        console.log("Server is ready to take our messages")
      }
    })
    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          partialsDir: "./emails/",
          defaultLayout: "",
        },
        viewPath: "./emails/",
        extName: ".hbs",
      })
    )

    // send mail using transporter
    return await transporter.sendMail(mail)
  }

  const result = await sendMail(config)
  try {
    console.log("Email sent")
    return next()
  } catch (e) {
    console.log(e)
  }
}

const sendVerifyEmail = async (req, res, next) => {
  console.log("sending email")
  const { email, _id, firstName, lastName } = req.unverified
  const token = jwt.sign(
    { email, id: _id, avatar: true },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  )

  // config for mailserver and mail
  const config = {
    mailserver: {
      service: process.env.EMAIL_PROVIDER,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    mail: {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification!",
      template: "verify",
      context: {
        token,
        subject: "Email Verification!",
        firstName,
        lastName,
        host: process.env.HOST,
      },
    },
  }

  const sendMail = async ({ mailserver, mail }) => {
    // create a nodemailer transporter using smtp
    let transporter = nodemailer.createTransport(mailserver)

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          partialsDir: "./emails/",
          defaultLayout: "",
        },
        viewPath: "./emails/",
        extName: ".hbs",
      })
    )

    // send mail using transporter
    return await transporter.sendMail(mail)
  }

  const result = await sendMail(config)
  try {
    return next()
  } catch (e) {
    return next(e)
  }
}

const sendThankYou = async (req, res, next) => {
  const { email, firstName, lastName, role } = req.newResponse
  console.log("sending email")
  let template = "thankyounewsletter"
  if (role) template = "thankyou"
  // config for mailserver and mail
  const config = {
    mailserver: {
      service: process.env.EMAIL_PROVIDER,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    mail: {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you!",
      template: template,
      context: {
        firstName,
        lastName,
        subject: "Thank you!",
        host: process.env.HOST,
      },
    },
  }

  const sendMail = async ({ mailserver, mail }) => {
    // create a nodemailer transporter using smtp
    let transporter = nodemailer.createTransport(mailserver)

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          partialsDir: "./emails/",
          defaultLayout: "",
        },
        viewPath: "./emails/",
        extName: ".hbs",
      })
    )

    // send mail using transporter
    await transporter.sendMail(mail)
  }

  const result = await sendMail(config)
  try {
    return next()
  } catch (e) {
    return next(e)
  }
}

const sendResetEmail = async (req, res, next) => {
  const { email, _id: id, firstName, lastName, avatar } = req.user
  const token = jwt.sign(
    {
      email,
      id,
      avatar,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  )
  // config for mailserver and mail
  const config = {
    mailserver: {
      service: process.env.EMAIL_PROVIDER,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    mail: {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password reset",
      template: "reset",
      context: {
        token,
        firstName,
        lastName,
        subject: "Password reset",
        avatar,
        host: process.env.HOST,
      },
    },
  }
  const sendMail = async ({ mailserver, mail }) => {
    // create a nodemailer transporter using smtp
    let transporter = nodemailer.createTransport(mailserver)

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          partialsDir: "./emails/",
          defaultLayout: "",
        },
        viewPath: "./emails/",
        extName: ".hbs",
      })
    )

    // send mail using transporter
    await transporter.sendMail(mail)
  }
  try {
    const result = await sendMail(config)
    return next()
  } catch (e) {
    return next(e)
  }
}

module.exports = {
  sendCustomEmail,
  sendThankYou,
  sendResetEmail,
  sendVerifyEmail,
}
