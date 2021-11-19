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
  // rejected to be fixed
  let templates = [
    {
      name: "Approved with Community Link",
      value: "approved",
      subject: "Welcome to Founderland!",
      top: `Hello ${firstName} ${lastName}, `,
      body: `We are thrilled to welcome you to the Founderland community.
      In order to be an active member of our Community, please follow the link below to register. `,
      signOff: `<Connect with the Community Link>`,
      note: `This link is valid for 5 days, if you have any trouble in the steps to confirm your registration, don't hesitate to contact us: admin@founderland.org`,
    },
    {
      name: "Rejected",
      value: "rejected",
      subject: "Update from Founderland!",
      top: `Hello ${firstName} ${lastName}, `,
      body: `We appreciate your interest in Founderland.
      Founderland exists to accelerate the success of women of colour founders across Europe and the UK. We foster a peer community of founders, offer educational programming on fundraising, and connect our member founders with capital. Doing so creates new, diverse representations of entrepreneurship for the next generation of founders. We aim to level the playing field for all entrepreneurs, by addressing the most underrepresented.
 
After reviewing your application to join our Founder community, we determined your application did not indicate you were a founder and business within our limited scope of focus or resources. If you feel we got this wrong, you are welcome to email us directly (hello@founderland.org), with further information that outlines the following:
 
Your identification as a woman of colour who has faced obstacles in your business journey tied to either your race or ethnicity, and
Your identification as a founder based in Europe or the UK, operating a business based in Europe or the UK 
 
Although Founderland might not be able to provide you with direct support, we would like to encourage you to apply/engage with other inspiring, women-led initiatives in the EU and the UK:
 
Female Founders: https://www.female-founders.org/
Women in Tech: https://women-in-tech.org/
Google for Startups: https://startup.google.com/
Hatch Enterprise: https://hatchenterprise.org/
WeGate: https://wegate.eu/
Foundervine: https://www.foundervine.com/
Grace: https://www.grace-accelerator.de/
 
StealthMode: https://factoryberlin.com/stealth-mode/
Parentpreneurs: https://parentpreneurs.net/en/
Allbright: https://www.allbrightcollective.com/`,
      signOff: `Click here if you want to become an ally to directly support women of colour founders in our community. If we change or expand our focus in the future, we will reach out to you.
      Thank you,
 
      Founderland Applicant Review Team
      `,
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
      signOff: `We review applications on a regular basis and will get back to you soon. 
     
          Sincerely,
          Team Founderland`,
      note: `If you didn't request to sign up, please click here to unsubscribe`,
    },
    {
      name: "Thank you for signing up",
      value: "thankyounewsletter",
      subject: "Thank You!",
      top: `Hello ${firstName} ${lastName}, `,
      body: `Thank you for your interest in joining Founderland's growing community.`,
      signOff: `You have successfully subscribed to our newsletter.
          Sincerely,
          Team Founderland`,
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
      note: `This link is valid for 5 days, if you have any trouble in the steps to confirm your registration, don't hesitate to contact us: admin@founderland.org`,
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
      <div className='flex justify-center items-center w-full px-3'>
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            Template
          </label>
          <div className='w-full'>
            <ListOption
              options={templates}
              choice={template}
              setChoice={setTemplatevalue}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center w-full px-3'>
        <div className='w-full mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            Email
          </label>

          <div className='w-full max-h-96 overflow-y-auto'>
            {template !== "generic" ? (
              <>
                <div className='w-full font-bold'>
                  {
                    templates.filter((item) => item.value === template)[0]
                      .subject
                  }
                </div>
                <div className='w-full text-base text-mono'>
                  {templates.filter((item) => item.value === template)[0].top}
                </div>
                <div className='w-full  text-sm text-mono text-justify '>
                  {templates.filter((item) => item.value === template)[0].body}
                </div>
                <div className='w-full text-sm text-mono text-justify'>
                  {
                    templates.filter((item) => item.value === template)[0]
                      .signOff
                  }
                </div>
                <div className='w-full text-xs text-mono'>
                  {templates.filter((item) => item.value === template)[0].note}
                </div>
              </>
            ) : (
              <>
                <div className='w-full mb-2 px-2'>
                  <label className='block uppercase tracking-wide text-xs font-bold mb-2'>
                    Subject
                  </label>
                  <input
                    className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
                      required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                    }`}
                    type='text'
                    onChange={(e) => {
                      setEmail("subject", e.target.value)
                    }}
                    value={subject}
                  />
                </div>
                <div className='w-full text-sm text-mono py-2'>
                  Hello {firstName} {lastName},
                </div>

                <div className='w-full mb-2 px-2'>
                  <label className='block uppercase tracking-wide text-xs font-bold mb-2'>
                    Body
                  </label>
                  <textarea
                    className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
                      required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                    }`}
                    type='text'
                    onChange={(e) => {
                      setEmail("body", e.target.value)
                    }}
                    value={body}
                  />
                </div>
                <div className='w-full mb-2 px-2'>
                  <label className='block uppercase tracking-wide text-xs font-bold mb-2'>
                    Sign Off
                  </label>
                  <textarea
                    className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
                      required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                    }`}
                    type='text'
                    onChange={(e) => {
                      setEmail("signOff", e.target.value)
                    }}
                    value={signOff}
                  />
                  Sincerely, <br /> Team Founderland
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
