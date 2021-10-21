import axios from "axios"
import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import AdminContext from "../../../contexts/Admin"
import { Switch } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import Banner from "../Widgets/Banner"

const approveURL = "/api/applicants/response/approve/"

const ApproveApplicant = ({ data, reload, setReload, role }) => {
  const [saving, setSaving] = useState(false)
  const [notify, setNotify] = useState(false)
  const history = useHistory()

  const [result, setResult] = useState({
    success: null,
    show: false,
    error: null,
    message: null,
  })
  const { setCModal, token } = useContext(AdminContext)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const save = async () => {
    setSaving(true)
    const updateData = {
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      title: data.data.answerData.filter((item) =>
        item.question.includes("Title")
      )[0].answer_value,
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
      status: "approved",
    }
    try {
      const result = await axios.put(approveURL, updateData, config)
      if (result.data.success) {
        setSaving(false)
        setResult({
          success: 1,
          show: true,
          message: `User saved ${notify ? "and notified" : ""}! redirecting..`,
        })
        setTimeout(() => {
          setResult({ ...result, show: false })
          history.push("/admin/members")
        }, 3000)
      } else {
        throw new Error("Sorry, something went wrong while saving")
      }
    } catch (e) {
      console.log(e.response.status)
      setSaving(false)
      if (e?.response.status === 403) {
        setResult({
          error: 1,
          show: true,
          message: "Email already exists as Member",
        })
      } else {
        setResult({
          error: 1,
          show: true,
          message: e.message,
        })
      }
      setTimeout(() => {
        setResult({ ...result, show: false })
      }, 3000)
    }
  }

  return (
    <div className="bg-white px-8 pt-8 pb-4 flex rounded flex-col w-full shadow-lg">
      <div className="w-full flex justify-center items-center">
        <Banner result={result} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="md:flex w-full px-3">
          <div className="w-full mb-2 px-2 flex flex-col justify-center items-center">
            <label className="block uppercase tracking-wide text-grey-darker text-md font-bold mb-2">
              Approve applicant to Community
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
      </form>
    </div>
  )
}

export default ApproveApplicant
