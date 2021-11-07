import axios from "axios"
import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import AdminContext from "../../../contexts/Admin"
import { Switch } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import Banner from "../Widgets/Banner"

const ApproveApplicant = ({ data, confirm }) => {
  const [saving, setSaving] = useState(false)
  const [notify, setNotify] = useState(false)
  const [custom, setCustom] = useState(false)
  const [required, setRequired] = useState(false)

  const [body, setBody] = useState("")
  const [signOff, setSignOff] = useState("")
  const history = useHistory()
  const [banner, setBanner] = useState({ show: false })
  const { setCModal, config, reload, setReload } = useContext(AdminContext)

  const save = async () => {
    setSaving(true)

    try {
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
        connect: notify,
        applicationId: data.data._id,
        status: confirm,
        custom: custom,
        body: body,
        signOff: signOff,
      }
      console.log(updateData)

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
            notify ? " and applicant notified" : ""
          }! Redirecting..`,
        })
        setTimeout(() => {
          setReload(reload + 1)
          setCModal(false)
          setBanner((prev) => ({ ...prev, show: false }))
          data.task === "approved"
            ? history.push("/admin/members")
            : history.push("/admin/applicants/rejected")
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
      } else {
        setBanner({
          error: 1,
          show: true,
          message: e.message,
        })
      }
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    }
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
              checked={notify}
              onChange={setNotify}
              className={`${
                notify ? "bg-flime-600" : "bg-gray-200"
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
          {notify && (
            <>
              <Switch.Group
                as="div"
                className="flex justify-center items-center space-x-6 py-2"
              >
                <Switch.Label className="mt-2 uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Custom Email
                </Switch.Label>
                <Switch
                  as="button"
                  checked={custom}
                  onChange={setCustom}
                  className={`${
                    custom ? "bg-flime-600" : "bg-gray-200"
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

              <div className="w-full">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Email
                </label>
                <div className="w-full mb-1 px-2 text-xs text-mono">
                  <p>
                    Hello {data.data.firstName} {data.data.lastName},
                  </p>
                  <p>
                    {" "}
                    Thank you for your interest in joining Founderland's growing
                    community.
                  </p>
                </div>
                {custom ? (
                  <>
                    <div className="w-full mb-2 px-2">
                      <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                        Body
                      </label>
                      <textarea
                        className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
                          required
                            ? "bg-red-200 animate-pulse"
                            : "bg-grey-lighter "
                        }`}
                        type="text"
                        onChange={(e) => {
                          setBody(e.target.value)
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
                          required
                            ? "bg-red-200 animate-pulse"
                            : "bg-grey-lighter "
                        }`}
                        type="text"
                        onChange={(e) => {
                          setSignOff(e.target.value)
                        }}
                        value={signOff}
                      />
                    </div>
                  </>
                ) : confirm === "rejected" ? (
                  <div className="w-full mb-1 px-2 text-xs text-mono">
                    <p>
                      However, after reviewing your application, we inform you
                      we were unable to approve your request to join.
                    </p>
                    <p>We will contact you shortly with further information.</p>
                  </div>
                ) : (
                  <div className="w-full mb-1 px-2 text-xs text-mono">
                    <p>
                      We are thrilled to welcome you to the Founderland
                      community.
                    </p>
                    <p>
                      In order to have access to our Community resources and
                      connect with other members, please follow the link below
                      and confirm your registration. Link:'Connect with the
                      Community'
                    </p>
                    <p>
                      This link is valid for 5 days, if you have any trouble in
                      the steps to confirm your registration, don't hesitate to
                      contact us: community@founderland.org
                    </p>
                  </div>
                )}
                <div className="w-full mb-1 px-2 text-xs text-mono">
                  Sincerely, The Founderland team
                </div>
              </div>
            </>
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
