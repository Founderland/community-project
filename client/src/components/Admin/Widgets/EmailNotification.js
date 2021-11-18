import ListOption from "../Widgets/ListOption"

const EmailNotification = ({
  firstName,
  lastName,
  template,
  setTemplate,
  subject,
  body,
  signOff,
  setEmail,
  required,
}) => {
  let templates = [
    {
      name: "Approved with Community Link",
      value: "approved",
      subject: "Welcome to Founderland!",
      top: `Hello ${firstName} ${lastName}, `,
      body: `We are thrilled to welcome you to the Founderland community.
          In order to have access to our Community resources and connect with other members, please follow the link below and confirm your registration.`,
      signOff: `<Connect with the Community Link>`,
      note: `This link is valid for 5 days, if you have any trouble in the steps to confirm your registration, don't hesitate to contact us: community@founderland.org`,
    },
    {
      name: "Rejected",
      value: "rejected",
      subject: "Update from Founderland!",
      top: `Hello ${firstName} ${lastName}, `,
      body: `Thank you for your interest in joining Founderland's growing community.`,
      signOff: `However, after reviewing your application, we inform you we were unable to approve your request to join.
          We will contact you shortly with further information.
          Sincerely,
          The Founderland team`,
      note: ``,
    },
    {
      name: "Reset password Link",
      value: "reset",
      subject: "Password reset",
      top: `Hello ${firstName} ${lastName}, `,
      body: `This email has been sent following your request to reset your password on Founderland's Admin portal.
          To reset your password, please follow the link below:`,
      signOff: `<Reset Password Link>`,
      note: `Please ignore this email if you did not request a password change.`,
    },
    {
      name: "Thank you",
      value: "thankyou",
      subject: "Thank You!",
      top: `Hello ${firstName} ${lastName}, `,
      body: `Thank you for your interest in joining Founderland's growing community.`,
      signOff: `Please be patient while we review your application, as we are currently a small team, and we will contact you back within 4 weeks.
     
          Sincerely,
          The Founderland team`,
      note: `If you didn't request to sign up, please click here to unsubscribe`,
    },
    {
      name: "Thank you for signing up",
      value: "thankyounewsletter",
      subject: "Thank You!",
      top: `Hello ${firstName} ${lastName}, `,
      body: `Thank you for your interest in joining Founderland's growing community.`,
      signOff: `You have been subscribed to our newsletter.
          Sincerely,
          The Founderland team`,
      note: `If you didn't request to sign up, please click here to unsubscribe`,
    },
    {
      name: "Verify email and set password",
      value: "verify",
      subject: "Welcome to Founderland!",
      top: `Hello ${firstName} ${lastName}, `,
      body: `We are thrilled to welcome you to the Founderland community.
          In order to have access to our Community resources and connect with other members, please follow the link below and confirm your registration.`,
      signOff: `Connect with the Community`,
      note: `This link is valid for 5 days, if you have any trouble in the steps to confirm your registration, don't hesitate to contact us: community@founderland.org`,
    },
    {
      name: "Custom",
      value: "generic",
      subject: "",
    },
  ]

  const setTemplatevalue = (value) => {
    let subject = templates.filter((el) => el.value === value)[0].subject
    setTemplate(value, subject)
  }
  return (
    <>
      <div className="flex justify-center items-center w-full px-3">
        <div className="w-full md:w-1/2 mb-2 px-2">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Template
          </label>
          <div className="w-full">
            <ListOption
              options={templates}
              choice={template}
              setChoice={setTemplatevalue}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full px-3">
        <div className="w-full mb-2 px-2">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Email
          </label>

          <div className="w-full">
            {template !== "generic" ? (
              <>
                <div className="w-full font-bold">
                  {
                    templates.filter((item) => item.value === template)[0]
                      .subject
                  }
                </div>
                <div className="w-full text-base text-mono">
                  {templates.filter((item) => item.value === template)[0].top}
                </div>
                <div className="w-full text-sm text-mono text-justify">
                  {templates.filter((item) => item.value === template)[0].body}
                </div>
                <div className="w-full text-sm text-mono text-justify">
                  {
                    templates.filter((item) => item.value === template)[0]
                      .signOff
                  }
                </div>
                <div className="w-full text-xs text-mono">
                  {templates.filter((item) => item.value === template)[0].note}
                </div>
              </>
            ) : (
              <>
                <div className="w-full mb-2 px-2">
                  <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                    Subject
                  </label>
                  <input
                    className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
                      required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                    }`}
                    type="text"
                    onChange={(e) => {
                      setEmail("subject", e.target.value)
                    }}
                    value={subject}
                  />
                </div>
                <div className="w-full text-sm text-mono py-2">
                  Hello {firstName} {lastName},
                </div>

                <div className="w-full mb-2 px-2">
                  <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                    Body
                  </label>
                  <textarea
                    className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
                      required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                    }`}
                    type="text"
                    onChange={(e) => {
                      setEmail("body", e.target.value)
                    }}
                    value={body}
                  />
                </div>
                <div className="w-full mb-2 px-2">
                  <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                    Sign Off
                  </label>
                  <textarea
                    className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
                      required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                    }`}
                    type="text"
                    onChange={(e) => {
                      setEmail("signOff", e.target.value)
                    }}
                    value={signOff}
                  />
                  Sincerely, The Founderland team
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailNotification
