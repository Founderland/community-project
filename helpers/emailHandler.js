require("dotenv").config()
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")

//Send the connect email template
const sendConnectEmail = async (req, res, next) => {
  console.log("sending email")
  const { email, _id, firstName, lastName } = req.newMember
  const token = jwt.sign({ email, id: _id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  })

  // config for mailserver and mail
  const config = {
    mailserver: {
      service: "outlook",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    mail: {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Founderland!",
      template: "connect",
      context: {
        token,
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
      expiresIn: "1d",
    }
  )

  // config for mailserver and mail
  const config = {
    mailserver: {
      service: "outlook",
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

const sendRejected = async (req, res, next) => {
  const { email, firstName, lastName } = req.body
  console.log("sending email")
  // config for mailserver and mail
  const config = {
    mailserver: {
      service: "outlook",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    mail: {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Update from Founderland!",
      template: "rejected",
      context: {
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
    await transporter.sendMail(mail)
  }
  const result = await sendMail(config)
  try {
    return next()
  } catch (e) {
    return next(e)
  }
}

const sendThankYou = async (req, res, next) => {
  const { email, firstName, lastName } = data
  console.log("sending email")

  // config for mailserver and mail
  const config = {
    mailserver: {
      service: "outlook",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    mail: {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you!",
      template: "thankYou",
      context: {
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
  console.log("sending email", req.user)
  const token = jwt.sign(
    {
      email,
      id,
      avatar,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  )
  // config for mailserver and mail
  const config = {
    mailserver: {
      service: "outlook",
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
  sendConnectEmail,
  sendThankYou,
  sendRejected,
  sendResetEmail,
  sendVerifyEmail,
}
