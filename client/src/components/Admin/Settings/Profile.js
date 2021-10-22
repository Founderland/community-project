import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline"
import { Popover } from "@headlessui/react"
import { useContext, useEffect, useState, useMemo } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"
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
const getProfileUrl = "/api/users/profile/user"

const Profile = () => {
  const { user, token } = useContext(AdminContext)
  const [avatar, setAvatar] = useState(user.avatar)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState({})
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  useEffect(() => {
    axios
      .get(getProfileUrl, config)
      .then((res) => {
        setIsVerified(res.data.data.isVerified)
        setEmail(res.data.data.email)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const save = () => {
    setSaving(true)
    const updateData = {
      firstName,
      lastName,
      avatar,
    }
    if (password) {
      if (password === confirmPassword) {
        updateData.password = password
      } else {
        setResult({ error: 1, show: true, message: "Password do not match!" })
        setSaving(false)
        setTimeout(() => {
          setResult({ ...result, show: false })
        }, 3000)
      }
    }
  }
  const avatarInitials = () => {
    let initials = firstName.length ? firstName[0].toUpperCase() : ""
    initials += lastName.length ? lastName[0].toUpperCase() : ""
    return initials
  }
  return (
    <div className="w-full">
      <div className="relative bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4 flex flex-col my-2">
        <div className="w-full flex items-center justify-center z-20">
          <Banner result={result} />
        </div>
        <div className="w-full px-3 flex items-center justify-center mb-2">
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
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="relative md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              className=" appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="email"
              type="text"
              value={email}
              disabled
            />
            {isVerified ? (
              <ShieldCheckIcon className="absolute top-8 right-10 w-8 h-8 text-green-500" />
            ) : (
              <ShieldExclamationIcon className="absolute top-8 right-10 w-8 h-8 text-red-500" />
            )}
          </div>
        </div>
        <div className="-mx-3 px-3 md:flex mb-1">
          <label
            className="block uppercase tracking-wide text-grey-darker text-lg font-bold mb-2"
            for="password"
          >
            Set a new password
          </label>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
            />
          </div>
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="password"
            >
              Confirm Password
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="******************"
            />
          </div>
        </div>
        <div className="-mx-3 px-4 py-4 flex flex-col-reverse sm:flex-row items-center justify-around -mb-3">
          {!isVerified ? (
            <button className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-4">
              Notify to verify email
            </button>
          ) : (
            ""
          )}
          <button
            className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
            onClick={() => save()}
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
      </div>
    </div>
  )
}

export default Profile
