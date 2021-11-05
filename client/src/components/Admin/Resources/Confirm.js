import axios from "axios"
import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import AdminContext from "../../../contexts/Admin"

import Banner from "../Widgets/Banner"

const deleteUrl = "/api/resources/"

const Confirm = ({ data }) => {
  const [saving, setSaving] = useState(false)
  const history = useHistory()
  const [banner, setBanner] = useState({ show: false })
  const { setCCModal, config, reload, setReload } = useContext(AdminContext)

  const save = async () => {
    setSaving(true)
    try {
      const deleted = await axios.delete(
        deleteUrl + data._id + "/" + data.article._id,
        config
      )
      if (deleted.data.success) {
        setSaving(false)
        setBanner({
          success: 1,
          show: true,
          message: "Resource deleted! Redirecting..",
        })
        setTimeout(() => {
          history.push("/admin/resources/")
          setReload(reload + 1)
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
          message: "Ressource is locked by system and cannot be deleted",
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
            Are you sure you want to delete this resource
          </label>
        </div>
      </div>
      <div className="px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
        <button
          className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4"
          onClick={() => {
            setCCModal(false)
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
