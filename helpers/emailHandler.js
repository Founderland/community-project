const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")

//Send the connect email template
const sendConnectEmail = (data) => {
  const { email, _id, firstName, lastName } = data

  const token = jwt.sign(
    {
      email,
      _id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
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
    await transporter.sendMail(mail)
  }

  sendMail(config).catch((err) => console.log(err))
}

const sendRejected = (data) => {
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

  sendMail(config).catch((err) => console.log(err))
}

const sendThankYou = (data) => {
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

  sendMail(config).catch((err) => console.log(err))
}

const sendResetEmail = (data) => {
  const { email, _id, firstName, lastName } = data
  console.log("sending email")
  const token = jwt.sign(
    {
      email,
      _id,
    },
    process.env.JWT_KEY,
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

  sendMail(config).catch((err) => console.log(err))
}
