import { useContext, useEffect, useState } from "react"
import { Tab } from "@headlessui/react"
import { UserAddIcon } from "@heroicons/react/outline"
import axios from "axios"
import AdminContext from "../../contexts/Admin"
import ListWidget from "./ListWidget"
import Loading from "../Loading"
import ComponentModal from "../ComponentModal"
import AddUser from "./AddUser"

const usersAPI = "/api/users/all"

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const Settings = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState(null)
  const { user, setIModal, setModalMessage, setCModal } =
    useContext(AdminContext)

  //Get all registered Users and set the result as data
  useEffect(() => {
    axios
      .get(usersAPI)
      .then((res) => {
        let result = {
          header: [
            { title: "Name", key: "name", style: "" },
            { title: "Email", key: "email", style: "" },
            { title: "Role", key: "role", style: "sm:block hidden" },
            { title: "Added on", key: "date", style: "" },
            { title: "Actions", key: "-", style: "" },
          ],
        }
        result = { ...result, ...res.data }
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setModalMessage({
          title: "Error loading the database set",
          message: err,
        })
        setIModal(true)
      })
  }, [])

  const handleTask = (task) => {
    setTask(task)
    setCModal(true)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Tabs for Navigation */}
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-fblue max-w-lg">
          {user.role === "sadmin" ? (
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-1 text-mono tracking-wide font-medium ",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-40",
                  selected
                    ? "text-fblue bg-white shadow"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                )
              }
            >
              Users
            </Tab>
          ) : (
            ""
          )}
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-1 text-mono tracking-wide font-medium",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                selected
                  ? "text-fblue bg-white shadow"
                  : "text-white hover:bg-white hover:bg-opacity-20"
              )
            }
          >
            Profile
          </Tab>
        </Tab.List>
        <div className="w-full border -mt-0 border-t border-4 border-fblue"></div>
        <Tab.Panels className="mt-6">
          {user.role === "sadmin" ? (
            <Tab.Panel classname="p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60">
              {loading && <Loading />}
              {!loading && (
                <div className="w-full px-4">
                  <ListWidget
                    title="Current Registered Users"
                    data={data}
                    showing={5}
                    cellAlignment={"justify-center"}
                  />
                  <button
                    className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                    onClick={() => handleTask("addUser")}
                  >
                    <UserAddIcon className="h-5 w-5" />
                    <p className="text-mono text-sm">Add user</p>
                  </button>
                </div>
              )}
            </Tab.Panel>
          ) : (
            ""
          )}
          <Tab.Panel>{!loading && "User Profile"}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* Data to display */}
      <ComponentModal>{task === "addUser" && <AddUser />}</ComponentModal>
    </div>
  )
}

export default Settings
