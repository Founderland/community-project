import { useContext, useEffect, useState, useMemo } from "react"
import { Tab } from "@headlessui/react"
import { UserAddIcon } from "@heroicons/react/outline"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import ListWidget from "../Widgets/ListWidget"
import Loading from "../Widgets/Loading"
import ComponentModal from "../Widgets/ComponentModal"
import AddUser from "./AddUser"
import Profile from "./Profile"
import moment from "moment"

const Settings = () => {
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }
  const usersAPI = "/api/users/all"
  const styles = {
    new: "bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs",
    pending: "bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs",
    reviewed: "bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs",
    founder:
      "bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs",
    investor:
      "bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs",
    ally: "bg-flime bg-opacity-50 py-1 px-3 rounded-full text-xs",
    sadmin: "bg-fred bg-opacity-50 py-1 px-3 rounded-full text-xs",
    admin: "bg-fblue bg-opacity-50 py-1 px-3 rounded-full text-xs",
    user: "bg-fpink bg-opacity-50 py-1 px-3 rounded-full text-xs",
  }
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(0)
  const [task, setTask] = useState(null)
  const {
    user,
    setIModal,
    setModalMessage,
    setCModal,
    token,
    selectedTab,
    setSelectedTab,
  } = useContext(AdminContext)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  //Get all registered Users and set the result as data
  useEffect(() => {
    axios
      .get(usersAPI, config)
      .then((res) => {
        let result = {
          header: [
            { title: "Name", key: "firstName", style: "" },
            { title: " ", key: "lastName", style: "" },
            { title: "Email", key: "email", style: "" },
            { title: "Role", key: "role", style: "sm:block hidden" },
            { title: "Added on", key: "dateCreated", style: "" },
            { title: "Actions", key: "-", style: "" },
          ],
        }
        res.data.data.forEach((element) => {
          element.dateCreated = moment(element.dateCreated).format(
            "DD/M/YYYY hh:mm"
          )
        })
        result = { ...result, ...res.data }
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setModalMessage({
          icon: "info",
          title: "Error loading the database set",
          message: "Sorry, something went wrong",
        })
        setIModal(true)
      })
  }, [reload, setIModal, setModalMessage, config])

  const handleTask = (task) => {
    setTask(task)
    setCModal(true)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Tabs for Navigation */}
      <Tab.Group defaultIndex={selectedTab}>
        <Tab.List className="flex p-1 space-x-1 bg-black max-w-lg outline-none ">
          {user.role === "sadmin" ? (
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-1 text-mono tracking-wide font-medium outline-none",
                  selected
                    ? "font-bold bg-white shadow"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                )
              }
            >
              <p onClick={() => setSelectedTab(0)}>Users</p>
            </Tab>
          ) : (
            ""
          )}
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-1 text-mono tracking-wide font-medium outline-none",
                selected
                  ? "font-bold bg-white shadow"
                  : "text-white hover:bg-white hover:bg-opacity-20"
              )
            }
          >
            <p onClick={() => setSelectedTab(0)}>Profile</p>
          </Tab>
        </Tab.List>
        <div className="w-full border mt-0 border-t border-5 border-black outline-none"></div>
        <Tab.Panels className="mt-6 bg-white outline-none">
          {user.role === "sadmin" ? (
            <Tab.Panel classname="p-3 outline-none">
              {loading && <Loading />}
              {!loading && (
                <div className="w-full px-4 outline-none">
                  <ListWidget
                    title=""
                    data={data}
                    showing={10}
                    styles={styles}
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
          <Tab.Panel classname="p-3 outline-none">
            {!loading && <Profile />}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* Data to display */}
      <ComponentModal>
        {task === "addUser" && (
          <AddUser setReload={setReload} reload={reload} />
        )}
      </ComponentModal>
    </div>
  )
}

export default Settings
