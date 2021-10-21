import axios from "axios"
import { useState, useContext } from "react"
import AdminContext from "../../../contexts/Admin"
import { Switch } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"

const approveURL = "/api/applicants/response/approve/"

const ApproveApplicant = ({ data, reload, setReload, role }) => {
  const [saving, setSaving] = useState(false)
  const [notify, setNotify] = useState(false)
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
    data.data.status = "approved"
    console.log(data)
    const result = await axios.put(
      approveURL + data.data._id,
      data.data,
      config
    )
    try {
      if (result) {
        console.log(result)
      } else {
        throw new Error("Sorry, something went wrong")
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="bg-white px-8 pt-8 pb-4 flex rounded flex-col w-full shadow-lg">
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
