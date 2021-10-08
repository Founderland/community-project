import { Popover, Listbox, Transition } from "@headlessui/react"
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/outline"
import axios from "axios"
import { set } from "mongoose"
import { useState, Fragment, useContext } from "react"
import AdminContext from "../../contexts/Admin"

const avatarColors = [
  "bg-gradient-to-t from-red-300 to-red-500 bg-cover",
  "bg-gradient-to-t from-orange-300 to-orange-500",
  "bg-gradient-to-t from-yellow-300 to-yellow-500",
  "bg-gradient-to-t from-green-300 to-green-500",
  "bg-gradient-to-t from-teal-300 to-teal-500",
  "bg-gradient-to-t from-sky-300 to-sky-500",
  "bg-gradient-to-t from-indigo-300 to-indigo-500",
  "bg-gradient-to-t from-purple-300 to-purple-500",
  "bg-gradient-to-t from-pink-300 to-pink-500",
]

const roles = [
  { name: "Supervisor", value: "sadmin" },
  { name: "Administrator", value: "admin" },
  { name: "Reviewer", value: "user" },
]

const addUserURL = "/api/users/add"

const AddUser = ({ reload, setReload }) => {
  const [avatar, setAvatar] = useState(avatarColors[0])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("sadmin")
  const [saving, setSaving] = useState(false)
  const { setCModal, setIModal, setModalMessage } = useContext(AdminContext)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const save = () => {
    setSaving(true)
    const data = { firstName, lastName, email, password, role, avatar }
    if (Object.values(data).every((value) => value.length > 0)) {
      if (password !== confirmPassword) {
        setIModal(true)
        setModalMessage({
          icon: "info",
          title: "Validation error",
          message: "Both passwords must match",
        })
        setSaving(false)
      } else {
        axios
          .post(addUserURL, data)
          .then((res) => {
            if (res.data.success) {
              setSaving(false)
              setReload(reload + 1)
              setCModal(false)
            }
          })
          .catch((err) => {
            setModalMessage({ icon: "", title: "", message: err.message })
            setIModal(true)
            console.log(err)
          })
      }
    } else {
      setIModal(true)
      setModalMessage({
        icon: "info",
        title: "Validation error",
        message: "All fields are required",
      })
      setSaving(false)
    }
  }

  const avatarInitials = () => {
    let initials = firstName.length ? firstName[0].toUpperCase() : ""
    initials += lastName.length ? lastName[0].toUpperCase() : ""
    return initials
  }
  return (
    <div className="bg-white p-8 flex rounded flex-col w-full shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="-mx-3 md:flex mb-4">
          <div className="md:w-1/2 px-3 flex items-center justify-center">
            <div className="flex justify-center items-center">
              <Popover className="relative group">
                <Popover.Button
                  as="div"
                  className={`w-40 h-40 md:w-52 md:h-52 rounded-2xl p-2 mb-3 border-2 border-gray-100 cursor-pointer transition duration-200 group-hover:border-fblue`}
                >
                  <div
                    className={`rounded-full w-36 h-36 md:w-48 md:h-48 ${avatar} flex justify-center items-center`}
                  >
                    <p className="text-6xl md:text-8xl text-mono">
                      {avatarInitials()}
                    </p>
                  </div>
                </Popover.Button>
                <Popover.Button className="absolute bottom-0 outline-none right-0 bg-flime p-1 h-8 w-8 text-center rounded-full cursor-pointer transition duration-200 group-hover:bg-fblue group-hover:text-white">
                  <ChevronDownIcon className="h-6 w-6" />
                </Popover.Button>
                <Popover.Panel className="absolute -bottom-32 right-3 md:right-2 rounded shadow-lg bg-white w-32 h-32 p-2 flex flex-wrap justify-between ">
                  {avatarColors.map((color) => (
                    <span
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 hover:border-blue-600 ${color} ${
                        color === avatar ? "border-green-600" : "border-white"
                      }`}
                      onClick={() => setAvatar(color)}
                    ></span>
                  ))}
                </Popover.Panel>
              </Popover>
            </div>
          </div>
          <div className="md:w-1/2 px-3">
            <div className="md:w-full mb-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                autoComplete="off"
              />
            </div>
            <div className="md:w-full mb-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                value={lastName}
                autoComplete="off"
              />
            </div>
            <div className="md:w-full mb-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
                autoComplete="email"
              />
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              type="password"
              placeholder="******************"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              autoComplete="new-password"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              type="password"
              placeholder="******************"
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              value={confirmPassword}
              autoComplete="new-password"
            />
          </div>
        </div>
        <div className="-mx-3  mb-4">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Role
            </label>
            <div className="w-full">
              <Listbox value={role} onChange={setRole}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {roles.filter((item) => item.value === role)[0].name}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon
                        className="w-5 h-5 text-gray-600"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {roles.map((role) => (
                        <Listbox.Option
                          key={role.value}
                          className={({ active }) =>
                            `${
                              active
                                ? "text-fblue bg-fblue bg-opacity-20"
                                : "text-gray-900"
                            }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                          }
                          value={role.value}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-medium" : "font-normal"
                                } block truncate`}
                              >
                                {role.name}
                              </span>
                              {selected ? (
                                <span className="text-fblue absolute inset-y-0 left-0 flex items-center pl-3">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="-mx-3 px-4 py-4 flex flex-col-reverse sm:flex-row items-center justify-around -mb-3">
          <button
            className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-4"
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

export default AddUser
