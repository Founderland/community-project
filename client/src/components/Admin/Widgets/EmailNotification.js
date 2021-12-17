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
      name: "Welcome with Community Link",
      value: "approved",
      subject: "Welcome to Founderland!",
      top: `<p style="font-size: 10px;"><span style="font-size: 10px;  color: #666666;">Hello ${firstName} ${lastName},</span></p>`,
      body: `
      <p style="font-size: 10px; "><span style="font-size: 10px;  color: #666666;">We are thrilled to welcome you to the Founderland community.</span></p>
      <p style="font-size: 10px;"><span style="font-size: 10px;  color: #666666;">In order to be an active member of our Community, please follow the link below to register.  </span></p>`,
      signOff: `<div align="left">
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
        <p style="box-sizing: border-box;display: inline-block; text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #d7fb03; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
          <span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 10px; ">Connect with the Community</span></span>
        </p>
        <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
    </div>`,
      note: `<div style="color: #000000; line-height: 100%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 10px; line-height: 100%;"><span style="color: #888888; font-size: 10px; line-height: 19.6px;"><em><span style="font-size: 10px; ">This link is valid for 5 days, if you have any trouble in the steps to confirm your registration, don't hesitate to contact us: <a href="mailto:admin@founderland.org?subject=Sign up confirmation">admin@founderland.org</a> </span></em></span></p>
  </div>`,
    },
    {
      name: "Rejected",
      value: "rejected",
      subject: "Update from Founderland!",
      top: `<p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px; color: #666666;">Hello ${firstName} ${lastName},</span></p>`,
      body: `
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Founderland exists to accelerate the success of women of colour founders across Europe and the UK. We foster a peer community of founders, offer educational programming on fundraising, and connect our member founders with capital. Doing so creates new, diverse representations of entrepreneurship for the next generation of founders. We aim to level the playing field for all entrepreneurs, by addressing the most underrepresented.</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">After reviewing your application to join our Founder community, we determined your application did not indicate you were a founder and business within our limited scope of focus or resources. If you feel we got this wrong, you are welcome to <a style="color: #0063e2;"href="mailto:hello@founderland.org?subject=Application info"> email us directly</a>, with further information that outlines the following:</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Your identification as a woman of colour who has faced obstacles in your business journey tied to either your race or ethnicity, and</span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679; <span style="font-size: 10px;  color: #666666; padding-left:7px;">Your identification as a founder based in Europe or the UK, operating a business based in Europe or the UK</span></p>
      
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Although Founderland might not be able to provide you with direct support, we would like to encourage you to apply/engage with other inspiring, women-led initiatives in the EU and the UK:</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Female Founders: <a  rel="noopener" href="https://www.female-founders.org/" target="_blank">https://www.female-founders.org</a></span> </p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Women in Tech:  <a  rel="noopener" href="https://women-in-tech.org/" target="_blank">https://women-in-tech.org</a></span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Google for Startups: <a  rel="noopener" href="https://startup.google.com/" target="_blank">https://startup.google.com/</a></span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;"> &#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Hatch Enterprise:  <a  rel="noopener" href="https://hatchenterprise.org/" target="_blank">https://hatchenterprise.org/</a></span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> WeGate:  <a  rel="noopener" href="https://wegate.eu/" target="_blank">https://wegate.eu/</a></span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Foundervine: <a  rel="noopener" href="https://www.foundervine.com/" target="_blank">https://www.foundervine.com/</a></span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Grace:  <a  rel="noopener" href="https://www.grace-accelerator.de/" target="_blank">https://www.grace-accelerator.de/</a></span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> StealthMode:  <a  rel="noopener" href="https://www.female-founders.org/" target="_blank">https://www.female-founders.org/</a></span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Parentpreneurs:  <a  rel="noopener" href="https://factoryberlin.com/stealth-mode/" target="_blank">https://www.female-founders.org/</a></span></p>
        <p style="font-size: 10px; line-height: 100%; margin-left: 40px;">&#9679;<span style="font-size: 10px;  color: #666666; padding-left:7px;"> Allbright:  <a  rel="noopener" href="https://www.allbrightcollective.com/" target="_blank">https://www.allbrightcollective.com/</a></span></p>
        <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>`,
      signOff: `<p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 12px; color: #666666;"><a style="color: #0063e2;"  rel="noopener" href="https://founderland.herokuapp.com/form/ally" target="_blank">Click here </a> if you want to become an ally to directly support women of colour founders in our community. If we change or expand our focus in the future, we will reach out to you. </span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Thank you,</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Founderland Applicant Review Team</span></p>`,
      note: ``,
    },
    {
      name: "Reset password Link",
      value: "reset",
      subject: "Password reset",
      top: `<p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Hello ${firstName} ${lastName},</span></p>`,
      body: `<p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <span style="font-size: 10px;  color: #666666;">This email has been sent following your request to reset your password on Founderland's Community.</span>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">To reset your password, please follow the link below: </span></p>`,
      signOff: `<p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #d7fb03; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
      <span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 10px; ">Reset Password</span></span>
    </p>
    <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
    `,
      note: `<div style="line-height: 100%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 10px; line-height: 100%;"><span style="color: #888888; font-size: 10px; "><em><span style="font-size: 10px;">Please ignore this email if you did not request a password change.</span></em></span><br /><span style="color: #888888; font-size: 10px; line-height: 19.6px;"><em><span style="font-size: 16px; line-height: 22.4px;">&nbsp;</span></em></span></p>
    </div>`,
    },
    {
      name: "Thank you Founder",
      value: "thankyou",
      subject: "Thank You!",
      top: `<p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Hello ${firstName} ${lastName},</span></p>`,
      body: `<p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Thank you for your interest in joining Founderland's growing community.</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>`,
      signOff: `<p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">We review applications on a regular basis and will get back to you soon. </span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Sincerely,</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Team Founderland</span></p>`,
      note: `
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
<p style="font-size: 10px; line-height: 100%;">If you didn't request to sign-up, please click here to contact us</p>
      `,
    },
    {
      name: "Thank you Investor/Ally",
      value: "thankyouallies",
      subject: "Thank You!",
      top: `<p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Hello ${firstName} ${lastName},</span></p>`,
      body: `<p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Thank you for your interest in supporting Founderland.</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>`,
      signOff: `<p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">We are a small team, but we will be in touch soon. </span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Sincerely,</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Team Founderland</span></p>`,
      note: `
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
<p style="font-size: 10px; line-height: 100%;">If you didn't request to sign-up, please click here to contact us</p>
      `,
    },
    {
      name: "Thank you for signing up",
      value: "thankyounewsletter",
      subject: "Thank You!",
      top: `<p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Hello ${firstName} ${lastName},</span></p>`,
      body: `<p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Thank you for your interest in joining Founderland's growing community.</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>`,
      signOff: `<p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">You have successfully subscribed to our newsletter</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Sincerely,</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>
      <p style="font-size: 10px; line-height: 100%;"><span style="font-size: 10px;  color: #666666;">Team Founderland</span></p>
      <p style="font-size: 10px; line-height: 100%;">&nbsp;</p>`,
      note: `<p style="font-size: 10px; line-height: 100%;">If you didn't request to subscribe, please click here to unsubscribe</p>`,
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

          <div className="w-full max-h-96 overflow-y-auto">
            {template !== "generic" ? (
              <>
                <div className="w-full font-bold py-2">
                  {
                    templates.filter((item) => item.value === template)[0]
                      .subject
                  }
                </div>
                <div
                  className="w-full  text-sm text-mono text-justify "
                  dangerouslySetInnerHTML={{
                    __html: templates.filter(
                      (item) => item.value === template
                    )[0].top,
                  }}
                ></div>

                <div
                  className="w-full  text-sm text-mono text-justify "
                  dangerouslySetInnerHTML={{
                    __html: templates.filter(
                      (item) => item.value === template
                    )[0].body,
                  }}
                ></div>

                <div
                  className="w-full  text-sm text-mono text-justify "
                  dangerouslySetInnerHTML={{
                    __html: templates.filter(
                      (item) => item.value === template
                    )[0].signOff,
                  }}
                ></div>
                <div
                  className="w-full  text-sm text-mono text-justify "
                  dangerouslySetInnerHTML={{
                    __html: templates.filter(
                      (item) => item.value === template
                    )[0].note,
                  }}
                ></div>
              </>
            ) : (
              <>
                <div className="w-full mb-2 px-2">
                  <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                    Subject
                  </label>
                  <input
                    className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-2 ${
                      required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                    }`}
                    type="text"
                    onChange={(e) => {
                      setEmail("subject", e.target.value)
                    }}
                    value={subject}
                  />
                </div>
                <div className="w-full text-xs text-mono mb-2 px-2">
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
                  <p className="text-mono text-xs">
                    Sincerely, <br /> Team Founderland
                  </p>
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
