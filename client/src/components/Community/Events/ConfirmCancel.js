import axios from "axios"
import { useState, useContext } from "react"
import UserContext from "../../../contexts/User"

import Banner from "../../Admin/Widgets/Banner"

const cancelUrl = "/api/events/cancel/"

const Confirm = ({ data }) => {
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState({ show: false })
  const { setCModal, config, reload, setReload } = useContext(UserContext)
  const save = async () => {
    setSaving(true)
    try {
      const canceled = await axios.put(
        cancelUrl + data._id,
        { isCanceled: true },
        config
      )
      if (canceled.data) {
        setSaving(false)
        setBanner({
          success: 1,
          show: true,
          message: "Event canceled!",
        })
        setTimeout(() => {
          setReload(reload + 1)
          setCModal(false)
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
          message: "Event is locked by system and cannot be canceled",
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
            Are you sure you want to cancel this event
          </label>
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

export default Confirm
