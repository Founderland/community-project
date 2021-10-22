import { Popover } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import axios from "axios"
import { useState, useContext, useMemo } from "react"
import { useHistory } from "react-router"
import AdminContext from "../../../contexts/Admin"
import ListOption from "../Widgets/ListOption"
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

const roles = [
  { name: "Supervisor", value: "sadmin" },
  { name: "Administrator", value: "admin" },
  { name: "Reviewer", value: "user" },
]

const addUserURL = "/api/users/add"

const User = ({ reload, setReload }) => {
  const history = useHistory()
  const [avatar, setAvatar] = useState(avatarColors[0])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("sadmin")
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState({})
  const { token } = useContext(AdminContext)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  const save = async () => {
    setSaving(true)
    const data = { firstName, lastName, email, password, role, avatar }
    if (Object.values(data).every((value) => value.length > 0)) {
      if (password !== confirmPassword) {
        setSaving(false)
        setBanner({ error: 1, show: true, message: "Password do not match!" })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 3000)
      } else {
        axios
          .post(addUserURL, data, config)
          .then((res) => {
            console.log(res)
            if (res.data.success) {
              setSaving(false)
              setReload(reload + 1)
              setBanner({
                success: 1,
                show: true,
                message: "User saved! redirecting..",
              })
              setTimeout(() => {
                setBanner((prev) => ({ ...prev, show: false }))
                history.goBack()
              }, 3000)
            }
          })
          .catch((err) => {
            console.log(err)
            setSaving(false)
            setBanner({
              error: 1,
              show: true,
              message: "Sorry, something went wrong",
            })
            setTimeout(() => {
              setBanner((prev) => ({ ...prev, show: false }))
            }, 3000)
          })
      }
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
    }
  }

  const avatarInitials = () => {
    let initials = firstName.length ? firstName[0].toUpperCase() : ""
    initials += lastName.length ? lastName[0].toUpperCase() : ""
    return initials
  }
  return (
    <div className="bg-white p-8 flex rounded flex-col w-full shadow-lg">
      <div className="w-full flex items-center justify-center z-20">
        <Banner message={banner} />
      </div>
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
            <ListOption options={roles} choice={role} setChoice={setRole} />
          </div>
        </div>
      </div>
      <div className="-mx-3 px-4 py-4 flex flex-col-reverse sm:flex-row items-center justify-around -mb-3">
        <button
          className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-4"
          onClick={() => {
            history.goBack()
          }}
        >
          Cancel
        </button>
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
  )
}

export default User
