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
  "bg-gradient-to-t from-orange-300 to-orange-500 bg-cover",
  "bg-gradient-to-t from-yellow-300 to-yellow-500 bg-cover",
  "bg-gradient-to-t from-green-300 to-green-500 bg-cover",
  "bg-gradient-to-t from-teal-300 to-teal-500 bg-cover",
  "bg-gradient-to-t from-sky-300 to-sky-500 bg-cover",
  "bg-gradient-to-t from-indigo-300 to-indigo-500 bg-cover",
  "bg-gradient-to-t from-purple-300 to-purple-500 bg-cover",
  "bg-gradient-to-t from-pink-300 to-pink-500 bg-cover",
]
const getProfileUrl = "/api/users/profile/user"

const Profile = () => {
  const { token } = useContext(AdminContext)
  const [profile, setProfile] = useState({
    avatar: "",
    firstName: "",
    lastName: "",
    email: "",
    isVerified: false,
    password: "",
    confirmPassword: "",
  })
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState({})
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
        setProfile(res.data.data)
      })
      .catch((err) => {
        setSaving(false)
        setBanner({
          error: 1,
          show: true,
          message: "Error getting profile data!",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 3000)
      })
  }, [])

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefautl()
  }
  const save = () => {
    setSaving(true)
    if (profile.password) {
      if (profile.password !== profile.confirmPassword) {
        setBanner({ error: 1, show: true, message: "Password do not match!" })
        setSaving(false)
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 3000)
      }
    }
  }
  const avatarInitials = () => {
    let initials = profile.firstName.length
      ? profile.firstName[0].toUpperCase()
      : ""
    initials += profile.lastName.length ? profile.lastName[0].toUpperCase() : ""
    return initials
  }

  console.log(profile.avatar)
  return (
    <div className="w-full">
      <div className="relative bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4 flex flex-col my-2">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex items-center justify-center z-20">
            <Banner message={banner} />
          </div>
          <div className="w-full px-3 flex items-center justify-center mb-2">
            <Popover className="relative group">
              <Popover.Button
                as="div"
                className={`w-40 h-40 md:w-52 md:h-52 rounded-2xl p-2 mb-3 border-2 border-gray-100 cursor-pointer transition duration-200 group-hover:border-fblue`}
              >
                <div
                  className={`rounded-full w-36 h-36 md:w-48 md:h-48 ${profile.avatar} flex justify-center items-center`}
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
                {avatarColors.map((color) => {
                  console.log(profile.avatar, color)
                  return (
                    <span
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 hover:border-blue-600 ${color} ${
                        color === profile.avatar
                          ? "border-green-600"
                          : "border-white"
                      }`}
                      onClick={(e) =>
                        setProfile((prev) => {
                          console.log(prev)
                          return { ...prev, avatar: color }
                        })
                      }
                    ></span>
                  )
                })}
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
                value={profile.firstName}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, firstName: e.target.value }))
                }
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
                value={profile.lastName}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, lastName: e.target.value }))
                }
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
                value={profile.email}
                disabled
              />
              {profile.isVerified ? (
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
                type="newpassword"
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, password: e.target.value }))
                }
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
                type="newpassword"
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="******************"
              />
            </div>
          </div>
          <div className="-mx-3 px-4 py-4 flex flex-col-reverse sm:flex-row items-center justify-around -mb-3">
            {!profile.isVerified ? (
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
        </form>
      </div>
    </div>
  )
}

export default Profile
