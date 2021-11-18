import { useState, useContext } from "react"
import { useParams } from "react-router"

import AdminContext from "../../../contexts/Admin"
import axios from "axios"
import Banner from "../Widgets/Banner"
import { ShieldCheckIcon } from "@heroicons/react/outline"
import EmailNotification from "../Widgets/EmailNotification"

const Notify = ({ member }) => {
  const notifyUrl = "/api/users/community/notify/"
  const { id } = useParams()
  const { config, reload, setReload, setCModal } = useContext(AdminContext)
  const [notifying, setNotifying] = useState(false)
  const [required, setRequired] = useState(false)
  const [banner, setBanner] = useState({ show: false })
  const [data, setData] = useState({
    connect: true,
    template: "approved",
    subject: "Welcome to Founderland!",
    body: "",
    signOff: "",
  })

  const notify = async () => {
    setNotifying(true)
    try {
      if (
        data.connect &&
        data.template === "generic" &&
        (data.subject === "" || data.body === "" || data.signOff === "")
      )
        await Promise.reject(new Error("missing email fields"))
      const notified = await axios.post(
        notifyUrl + id,
        { _id: id, ...data },
        config
      )
      if (notified.data.success) {
        setBanner({
          success: 1,
          show: true,
          message: "Member notified!",
        })
        setNotifying(false)
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
          setCModal(false)
          setReload(reload + 1)
        }, 3000)
      }
    } catch (e) {
      if (e.message === "missing email fields") setRequired(true)
      setNotifying(false)
      setBanner({
        error: 1,
        show: true,
        message: e.message ? e.message : "Error notifying the user!",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
        setRequired(false)
      }, 4000)
    }
  }

  const setTemplate = (template, subject) => {
    setData((prev) => ({ ...prev, template: template, subject: subject }))
  }
  const setEmail = (target, value) => {
    setData((prev) => ({ ...prev, [target]: value }))
  }

  return (
    <div className="bg-white px-8 pt-8 pb-4 flex rounded flex-col w-full shadow-lg">
      <div className="w-full flex justify-center items-center">
        <Banner message={banner} />
      </div>
      <div className="md:flex w-full px-3">
        <div className="w-full mb-2 px-2 flex flex-col justify-center items-center">
          <label className="block uppercase tracking-wide text-grey-darker text-md font-bold mb-2">
            Notify Member
          </label>
          <EmailNotification
            firstName={member.firstName}
            lastName={member.lastName}
            template={data.template}
            setTemplate={setTemplate}
            setEmail={setEmail}
            subject={data.subject}
            body={data.body}
            signOff={data.signOff}
            required={required}
          />
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
          className="flex justify-center space-x-4 px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
          onClick={() => notify()}
        >
          {notifying ? (
            <div className="flex justify-center">
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
              ></div>
            </div>
          ) : (
            <>
              <ShieldCheckIcon className="w-6 h-6" />
              <p>Notify</p>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Notify
