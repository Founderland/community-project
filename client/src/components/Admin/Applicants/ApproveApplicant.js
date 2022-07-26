import axios from "axios"
import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import AdminContext from "../../../contexts/Admin"
import { Switch } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import Banner from "../Widgets/Banner"
import EmailNotification from "../Widgets/EmailNotification"

const ApproveApplicant = ({ data, confirm }) => {
  const [saving, setSaving] = useState(false)
  const [notify, setNotify] = useState({
    connect: false,
    template: confirm,
    subject:
      confirm !== "approved"
        ? "Update from Founderland!"
        : "Welcome to Founderland!",
    body: "",
    signOff: "",
  })
  const [required, setRequired] = useState(false)
  const history = useHistory()
  const [banner, setBanner] = useState({ show: false })
  const { setCModal, config, reload, setReload } = useContext(AdminContext)

  const save = async () => {
    setSaving(true)
    try {
      if (
        notify.connect &&
        notify.template === "generic" &&
        (notify.subject === "" || notify.body === "" || notify.signOff === "")
      )
        await Promise.reject(new Error("missing email fields"))
      const updateData = {
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        title: data.data.answerData.filter((item) =>
          item.question.includes("Title")
        )[0]?.answer_value,
        email: data.data.answerData.filter((item) =>
          item.question.includes("Email")
        )[0].answer_value,
        businessArea: "",
        city: data.data.answerData
          .filter((item) => item.question.includes("City"))[0]
          .answer_value.split(",")[0],
        country: data.data.answerData
          .filter((item) => item.question.includes("City"))[0]
          .answer_value.split(",")[0],
        role: data.data.role,
        connect: notify.connect,
        applicationId: data.data._id,
        status: confirm,
        template: notify.template,
        subject: notify.subject,
        body: notify.body,
        signOff: notify.signOff,
      }
      const updateUrl =
        confirm === "approved"
          ? "/api/applicants/response/approve/"
          : "/api/applicants/response/reject/"

      const approved = await axios.put(updateUrl, updateData, config)
      if (approved.data.success) {
        setSaving(false)
        setBanner({
          success: 1,
          show: true,
          message: `Application updated${
            notify.connect ? " and applicant notified" : ""
          }! Redirecting..`,
        })
        setTimeout(() => {
          setReload(reload + 1)
          setCModal(false)
          setBanner((prev) => ({ ...prev, show: false }))
          history.push("/admin/applicants/" + confirm)
        }, 2000)
      } else {
        throw new Error("Sorry, something went wrong while saving")
      }
    } catch (e) {
      setSaving(false)
      if (e?.response?.status === 403) {
        setBanner({
          error: 1,
          show: true,
          message: "Email already exists as Member",
        })
      } else if (e.message === "missing email fields") {
        setRequired(true)
        setBanner({
          error: 1,
          show: true,
          message: "All fields for the custom email are required",
        })
      } else {
        setBanner({
          error: 1,
          show: true,
          message: e.message,
        })
      }
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
        setRequired(false)
      }, 4000)
    }
  }
  const setTemplate = (template, subject) => {
    setNotify((prev) => ({ ...prev, template: template, subject: subject }))
  }
  const setEmail = (target, value) => {
    setNotify((prev) => ({ ...prev, [target]: value }))
  }
  const setConnect = (value) => {
    setNotify((prev) => ({ ...prev, connect: value }))
  }
  return (
    <div className="bg-white px-8 pt-8 pb-4 flex rounded flex-col w-full shadow-lg">
      <div className="w-full flex justify-center items-center">
        <Banner message={banner} />
      </div>
      <div className="md:flex w-full px-3">
        <div className="w-full mb-2 px-2 flex flex-col justify-center items-center">
          <label className="block uppercase tracking-wide text-grey-darker text-md font-bold mb-2">
            {confirm === "approved"
              ? "Approve applicant to Community"
              : "Reject Application"}
          </label>
          <Switch.Group
            as="div"
            className="flex justify-center items-center space-x-6 mt-2 py-2"
          >
            <Switch.Label className="mt-2 uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Notify by Email
            </Switch.Label>
            <Switch
              as="button"
              checked={notify.connect}
              onChange={setConnect}
              className={`${
                notify.connect ? "bg-flime-600" : "bg-gray-200"
              } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline ml-4 md:ml-0`}
            >
              {({ checked }) => (
                <span
                  className={`${
                    checked ? "translate-x-5" : "translate-x-0"
                  } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                >
                  <CheckIcon className={checked ? "" : "hidden"} />
                </span>
              )}
            </Switch>
          </Switch.Group>
          {notify.connect && (
            <EmailNotification
              firstName={data.data.firstName}
              lastName={data.data.lastName}
              template={notify.template}
              setTemplate={setTemplate}
              setEmail={setEmail}
              subject={notify.subject}
              body={notify.body}
              signOff={notify.signOff}
              required={required}
            />
          )}
        </div>
      </div>

      <div className="px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
        <button
          className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4"
          onClick={() => {
            setCModal(false)
          }}
        >
          Cancel
        </button>
        <button
          className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
          onClick={save}
        >
          {saving ? (
            <div className="flex justify-center">
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
              ></div>
            </div>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  )
}

export default ApproveApplicant
