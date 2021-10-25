import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline"
import { Popover } from "@headlessui/react"
import { useParams, useHistory } from "react-router-dom"
import { useContext, useEffect, useState, useMemo } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"
import ListOption from "../Widgets/ListOption"
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

const Profile = ({ reload, setReload }) => {
  const { token, selectedTab, setUser } = useContext(AdminContext)
  const history = useHistory()

  const { id } = useParams()
  const [profile, setProfile] = useState({
    avatar: "bg-gradient-to-t from-red-300 to-red-500 bg-cover",
    firstName: "",
    lastName: "",
    email: "",
    isVerified: false,
    password: "",
    confirmPassword: "",
    role: "sadmin",
  })
  const [saving, setSaving] = useState(false)
  const [notifying, setNotifying] = useState(false)
  const [banner, setBanner] = useState({})
  const [notified, setNotified] = useState(false)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  useEffect(() => {
    if (id !== "new") {
      axios
        .get(id ? profileUrl + id : profileUrl + "user", config)
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
    }
  }, [selectedTab])

  const save = async () => {
    setSaving(true)
    if (profile.password !== profile.confirmPassword) {
      setBanner({ error: 1, show: true, message: "Password do not match!" })
      setSaving(false)
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 3000)
    } else {
      try {
        let result = null
        if (profile._id) result = await axios.put(profileUrl, profile, config)
        else {
          delete profile.password
          delete profile.confirmPassword
          delete profile.isVerified
          console.log(profile)
          if (Object.values(profile).every((value) => value.length > 0)) {
            result = await axios.post(addUserURL, profile, config)
          } else {
            setSaving(false)
            setBanner({
              error: 1,
              show: true,
              message: "All fields are required",
            })
            setTimeout(() => {
              setBanner((prev) => ({ ...prev, show: false }))
            }, 3000)
            return null
          }
        }

        if (result) {
          setSaving(false)
          setReload(reload + 1)
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
              ? "User profile updated! redirecting.."
              : "User saved and notified! redirecting..",
          })
          setTimeout(() => {
            setBanner((prev) => ({ ...prev, show: false }))
            if (id) history.goBack()
          }, 3000)
        }
      } catch (e) {
        setSaving(false)
        setBanner({
          error: 1,
          show: true,
          message: "Error saving profile!",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 3000)
      }
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
      }, 3000)
    }
  }
  const setRole = (v) => {
    setProfile((prev) => ({ ...prev, role: v }))
  }
  const avatarInitials = () => {
    let initials = profile.firstName.length
      ? profile.firstName[0].toUpperCase()
      : ""
    initials += profile.lastName.length ? profile.lastName[0].toUpperCase() : ""
    return initials
  }

  return (
    <div className="w-full md:w-5/6 lg:w-3/4">
      <div className="relative bg-white px-8 pt-4 pb-8 mb-4 flex flex-col my-2">
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
              {avatarColors.map((color) => (
                <span
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 hover:border-blue-600 ${color} ${
                    color === profile.avatar
                      ? "border-green-600"
                      : "border-white"
                  }`}
                  onClick={(e) =>
                    setProfile((prev) => ({ ...prev, avatar: color }))
                  }
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
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red py-3 px-4 mb-3"
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
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4"
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
          {id !== "new" ? (
            <div className="relative md:w-full px-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                className=" appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4 mb-3"
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
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border py-3 px-4"
                type="text"
                onChange={(e) => {
                  setProfile((prev) => ({ ...prev, email: e.target.value }))
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
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4 mb-3"
                  id="password"
                  type="password"
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
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
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4 mb-3"
                  id="confirmpassword"
                  type="password"
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="******************"
                />
              </div>
            </div>{" "}
          </>
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
                  setChoice={setRole}
                />
              </div>
            </div>
          </div>
        )}
        <div className="-mx-3 px-4 py-4 flex flex-col-reverse sm:flex-row items-center justify-around -mb-3">
          {!profile.isVerified && id !== "new" ? (
            <button
              className="flex items-center justify-center space-x-4 px-8 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-4"
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
              className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-4"
              onClick={() => {
                history.goBack()
              }}
            >
              Cancel
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
            ) : id === "new" ? (
              "Save"
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
