import axios from "axios"
import { useState, useContext } from "react"
import AdminContext from "../../contexts/Admin"
import ListOption from "./ListOption"
import { Switch } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"

const roles = [
  { name: "Founder", value: "founder" },
  { name: "Investor", value: "investor" },
  { name: "Ally", value: "ally" },
]

const addMemberURL = "/api/users/community/add"

const AddMember = ({ reload, setReload, role }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    role: role,
    city: "",
    country: "",
    connect: false,
  })
  const [saving, setSaving] = useState(false)
  const { setCModal, setIModal, setModalMessage } = useContext(AdminContext)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const save = () => {
    setSaving(true)
    if (data.email && checkEmail()) {
      if (data.firstName.length > 1 && data.lastName.length > 1) {
        axios
          .post(addMemberURL, data)
          .then((res) => {
            if (res.data.success) {
              setSaving(false)
              setReload(reload + 1)
              setCModal(false)
            }
          })
          .catch((err) => {
            setModalMessage({
              icon: "cross",
              title: "Database Error",
              message: err.message,
            })
            setIModal(true)
            console.log(err)
          })
      } else {
        setIModal(true)
        setModalMessage({
          icon: "info",
          title: "Validation error",
          message: "Full name is required",
        })
        setSaving(false)
      }
    } else {
      setIModal(true)
      setModalMessage({
        icon: "info",
        title: "Validation error",
        message: "A valid email must be provided",
      })
      setSaving(false)
    }
  }

  const handleChange = (value, key) => {
    setData({ ...data, [key]: value })
  }
  const setRole = (value) => {
    handleChange(value, "role")
  }
  const setConnect = (value) => {
    handleChange(value, "connect")
  }
  const checkEmail = () => {
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(data.email)
  }
  return (
    <div className="bg-white px-8 pt-8 pb-4 flex rounded flex-col w-full shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="md:flex w-full px-3">
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              First Name
            </label>
            <input
              className={`${
                data.firstName === ""
                  ? "border-l-4 border-fred"
                  : "border-l-4 border-flime"
              } appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3`}
              type="text"
              onChange={(e) => handleChange(e.target.value, "firstName")}
              value={data.firstName}
              autoComplete="off"
            />
          </div>
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className={`${
                data.lastName === ""
                  ? "border-l-4 border-fred"
                  : "border-l-4 border-flime"
              } appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3`}
              type="text"
              onChange={(e) => handleChange(e.target.value, "lastName")}
              value={data.lastName}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="md:flex w-full px-3">
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Title
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, "title")
              }}
              value={data.title}
            />
          </div>
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Email
            </label>
            <input
              className={`${
                data.email === "" || !checkEmail()
                  ? "border-l-4 border-fred"
                  : "border-l-4 border-flime"
              } appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 outline-none`}
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, "email")
              }}
              value={data.email}
              autoComplete="email"
            />
          </div>
        </div>
        <div className="md:flex w-full px-3">
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              City
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, "city")
              }}
              value={data.city}
            />
          </div>
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Country
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, "country")
              }}
              value={data.country}
            />
          </div>
        </div>
        <div className="md:flex w-full px-3">
          <div className="w-full md:w-3/4 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Role
            </label>
            <div className="w-full">
              <ListOption
                options={roles}
                choice={data.role}
                setChoice={setRole}
              />
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-2 px-2">
            <Switch.Group
              as="div"
              className="flex md:flex-col mt-2 justify-center items-center py-2"
            >
              <Switch.Label className="mt-2 uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Send Email
              </Switch.Label>
              <Switch
                as="button"
                checked={data.connect}
                onChange={setConnect}
                className={`${
                  data.connect ? "bg-flime-600" : "bg-gray-200"
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
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMember
