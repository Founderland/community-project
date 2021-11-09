import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ChevronDownIcon,
  ExclamationIcon,
} from "@heroicons/react/outline"
import { Popover } from "@headlessui/react"
import { useParams, useHistory } from "react-router-dom"
import { useContext, useEffect, useState, useMemo } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"
import ListOption from "../Widgets/ListOption"
import Loading from "../Widgets/Loading"

const roles = [
  { name: "Supervisor", value: "sadmin" },
  { name: "Administrator", value: "admin" },
  { name: "Reviewer", value: "user" },
]
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

const profileUrl = "/api/users/profile/"
const notifyUrl = "/api/users/notify/"
const addUserURL = "/api/users/add"
const lockUrl = "/api/users/lock"

const Profile = () => {
  const { config, selectedTab, setUser, reload, setReload, avatarInitials } =
    useContext(AdminContext)
  const history = useHistory()
  const { id } = useParams()
  const [profile, setProfile] = useState({
    avatar: "bg-gradient-to-t from-red-300 to-red-500 bg-cover",
    firstName: "",
    lastName: "",
    email: "",
    isVerified: false,
    isLocked: false,
    password: "",
    confirmPassword: "",
    role: "sadmin",
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notifying, setNotifying] = useState(false)
  const [locking, setLocking] = useState(false)
  const [banner, setBanner] = useState({ show: false })
  const [notified, setNotified] = useState(false)
  const [update, setUpdate] = useState(false)

  //PROFILE API CALLS
  useEffect(() => {
    setBanner((prev) => ({ ...prev, show: false }))
    const loadProfile = async () => {
      try {
        if (id !== "new") {
          console.log("reloading")
          setLoading(true)
          const getUser = await axios.get(
            id ? profileUrl + id : profileUrl + "user",
            config
          )
          if (getUser.data) {
            setProfile(getUser.data.data)
            setLoading(false)
            setUpdate(false)
          } else {
            await Promise.reject(new Error("error_getting_profile"))
          }
          setUpdate(false)
        }
      } catch (e) {
        setLoading(false)
        setBanner({
          error: 1,
          show: true,
          message: "Error loading profile data",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
        return null
      }
    }
    loadProfile()
    return () => {
      setProfile({
        avatar: "bg-gradient-to-t from-red-300 to-red-500 bg-cover",
        firstName: "",
        lastName: "",
        email: "",
        isVerified: false,
        password: "",
        confirmPassword: "",
        role: "sadmin",
      })
    }
  }, [selectedTab, id, reload])

  const save = async () => {
    setSaving(true)
    try {
      if (
        !id &&
        (profile.password !== profile.confirmPassword ||
          !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(profile.password))
      ) {
        await Promise.reject(new Error("Password does not match requirement"))
      } else {
        let result = null
        if (profile._id) result = await axios.put(profileUrl, profile, config)
        else {
          delete profile.password
          delete profile.confirmPassword
          delete profile.isVerified
          delete profile.isLocked
          if (Object.values(profile).every((value) => value.length > 0)) {
            result = await axios.post(addUserURL, profile, config)
          } else {
            await Promise.reject(new Error("All fields are required"))
          }
        }
        if (result) {
          setSaving(false)
          if (!id) {
            setUser((prev) => ({
              ...prev,
              avatar: profile.avatar,
              firstName: profile.firstName,
              lastName: profile.lastName,
            }))
          }
          setBanner({
            success: 1,
            show: true,
            message: !id
              ? "User profile updated"
              : id !== "new"
              ? "User profile updated! Redirecting.."
              : "User saved and notified! Redirecting..",
          })
          setTimeout(() => {
            setReload(reload + 1)
            setBanner((prev) => ({ ...prev, show: false }))
            if (id) history.goBack()
          }, 1000)
        }
      }
    } catch (e) {
      setBanner({
        error: 1,
        show: true,
        message:
          e?.response?.status === 403 ? "Email already registerd" : e.message,
      })
      setSaving(false)
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    }
  }

  const notify = async () => {
    setNotifying(true)
    try {
      const notified = await axios.post(notifyUrl, { id: profile._id }, config)
      if (notified) {
        setNotified(true)
        setNotifying(false)
      }
    } catch (e) {
      setNotifying(false)
      setBanner({
        error: 1,
        show: true,
        message: "Error notifying the user!",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    }
  }

  const lock = async () => {
    setLocking(true)
    try {
      const locked = await axios.put(
        lockUrl,
        { _id: id, isLocked: !profile.isLocked },
        config
      )
      if (locked) {
        setProfile((prev) => ({ ...prev, isLocked: !prev.isLocked }))
        setLocking(false)
        setBanner({
          success: 1,
          show: true,
          message: locked.data.data.isLocked
            ? "Account locked"
            : "Account unlocked",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 2000)
      } else {
        setLocking(false)
        setBanner({
          error: 1,
          show: true,
          message: "Error locking user!",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
      }
    } catch (e) {
      setLocking(false)
      setBanner({
        error: 1,
        show: true,
        message: "Error locking user!",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    }
  }

  //HELPER FUNCTIONS
  const handleChange = (v, target) => {
    console.log(v, target)
    setUpdate(true)
    if (target) setProfile((prev) => ({ ...prev, [target]: v }))
    else setProfile((prev) => ({ ...prev, role: v }))
  }

  const checkPassword = () => {
    if (profile.password) {
      return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(
        profile.password
      )
        ? "border-l-4 border-flime"
        : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }
  const checkConfirmPassword = () => {
    if (profile.password) {
      return profile.password === profile.confirmPassword
        ? "border-l-4 border-flime"
        : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }
  const checkEmail = (email) => {
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)
  }
  //COMPONENT RENDER
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" h-full py-1 bg-white flex flex-col items-center justify-center w-full lg:w-11/12 px-4 mx-auto mt-6">
          <div className="w-full flex items-center justify-center">
            <Banner message={banner} />
          </div>
          <div className="relative self-center flex flex-col w-full xl:w-5/6 2xl:w-3/6 mb-6 shadow-lg border-0 px-4 md:px-6 ">
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
                      {avatarInitials(profile.firstName, profile.lastName)}
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
                        color === profile.avatar
                          ? "border-green-600"
                          : "border-white"
                      }`}
                      onClick={(e) => handleChange(color, "avatar")}
                    ></span>
                  ))}
                </Popover.Panel>
              </Popover>
            </div>
            <div className="-mx-3 md:flex">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red py-3 px-4 mb-3"
                  id="first-name"
                  disabled={profile.isLocked}
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleChange(e.target.value, "firstName")}
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
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4"
                  id="last-name"
                  disabled={profile.isLocked}
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleChange(e.target.value, "lastName")}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              {id !== "new" ? (
                <div className="relative md:w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border py-3 px-4"
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
              ) : (
                <div className="md:w-full px-3 mb-2">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    className={`${
                      selectedTab === 0
                        ? ""
                        : !checkEmail(profile.email)
                        ? "border-l-4 border-fred"
                        : "border-l-4 border-flime"
                    } appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4 mb-3`}
                    type="text"
                    onChange={(e) => {
                      handleChange(e.target.value, "email")
                    }}
                    value={profile.email}
                  />
                </div>
              )}
            </div>
            {!id ? (
              <>
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
                      className={`${checkPassword()} appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4 mb-3`}
                      id="password"
                      type="password"
                      autocomplete="new-password"
                      onChange={(e) => handleChange(e.target.value, "password")}
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
                      className={`${checkConfirmPassword()} appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4 mb-3`}
                      id="confirmpassword"
                      type="password"
                      autocomplete="new-password"
                      onChange={(e) =>
                        handleChange(e.target.value, "confirmPassword")
                      }
                      placeholder="******************"
                    />
                  </div>
                </div>
                <div className="-mt-6 text-xs">
                  *Minimum eight characters, at least one upper case letter, one
                  lower case letter and one number
                </div>
              </>
            ) : profile.isLocked ? (
              <div className=" flex justify-center items-center space-x-4  w-full -mx-3 mb-4">
                <ExclamationIcon className="w-8 h-8 text-fred" />
                <p className=" ">Access has been locked for this account</p>
              </div>
            ) : (
              <div className="-mx-3  mb-4">
                <div className="md:w-full px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                    Role
                  </label>
                  <div className="w-full">
                    <ListOption
                      options={roles}
                      choice={profile.role}
                      setChoice={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="-mx-3 px-4 py-4 flex flex-col-reverse sm:flex-row items-center justify-around -mb-3">
              {!profile.isVerified && id !== "new" ? (
                <button
                  className="flex items-center justify-center space-x-4 px-8 py-2 w-full shadow-lg sm:w-1/4 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-4"
                  onClick={() => notify()}
                  disabled={notified}
                >
                  {notifying ? (
                    <div className="flex justify-center">
                      <div
                        style={{ borderTopColor: "transparent" }}
                        className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
                      ></div>
                    </div>
                  ) : notified ? (
                    <>
                      <ShieldCheckIcon className="w-6 h-6" />
                      <p>User notified</p>
                    </>
                  ) : (
                    <>
                      <ShieldCheckIcon className="w-6 h-6" />
                      <p>Verify Email</p>
                    </>
                  )}
                </button>
              ) : id === "new" ? (
                <button
                  className="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-fred-300 transition duration-200 hover:bg-fred-800 text-white mb-4"
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
              {id !== "new" && id ? (
                <button
                  className="px-10 py-2 w-full shadow-lg sm:w-1/4 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4 flex justify-center items-center "
                  onClick={() => lock()}
                >
                  {locking ? (
                    <div className="flex justify-center">
                      <div
                        style={{ borderTopColor: "transparent" }}
                        className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
                      ></div>
                    </div>
                  ) : profile.isLocked ? (
                    "Unlock Access"
                  ) : (
                    "Lock Access"
                  )}
                </button>
              ) : (
                ""
              )}
              {!profile.isLocked && update && (
                <button
                  className="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
                  onClick={() => save()}
                >
                  {saving ? (
                    <div className="flex justify-center">
                      <div
                        style={{ borderTopColor: "transparent" }}
                        className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
                      ></div>
                    </div>
                  ) : id === "new" ? (
                    "Save"
                  ) : (
                    "Update"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
