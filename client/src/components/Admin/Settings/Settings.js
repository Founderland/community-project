import { useContext, useEffect, useState, useMemo } from "react"
import { Tab } from "@headlessui/react"
import { UserAddIcon } from "@heroicons/react/outline"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import ListWidget from "../Widgets/ListWidget"
import Loading from "../Widgets/Loading"
import User from "./User"
import Profile from "./Profile"
import moment from "moment"
import { useHistory, useParams } from "react-router"
import Tabs from "../Widgets/Tabs"

const usersAPI = "/api/users/all"

const styles = {
  new: "bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs",
  pending: "bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs",
  reviewed: "bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs",
  founder:
    "bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs",
  investor: "bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs",
  ally: "bg-flime bg-opacity-50 py-1 px-3 rounded-full text-xs",
  sadmin: "bg-fred bg-opacity-50 py-1 px-3 rounded-full text-xs",
  admin: "bg-fblue bg-opacity-50 py-1 px-3 rounded-full text-xs",
  user: "bg-fpink bg-opacity-50 py-1 px-3 rounded-full text-xs",
}

const Settings = () => {
  const history = useHistory()
  const { id } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(0)
  const { user, token, selectedTab, setSelectedTab } = useContext(AdminContext)
  const tabs = [
    {
      index: 0,
      name: "Users",
      component: (
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
            onClick={() => history.push("settings/id/new")}
          >
            <UserAddIcon className="h-5 w-5" />
            <p className="text-mono text-sm">Add user</p>
          </button>
        </div>
      ),
    },
    {
      index: 1,
      name: "Profile",
      component: <Profile />,
    },
  ]
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
        let response = {
          header: [
            { title: "Name", key: "firstName", style: "text-sm" },
            { title: " ", key: "lastName", style: "text-sm" },
            { title: "Email", key: "email", style: "text-sm" },
            { title: "Role", key: "role", style: "text-sm sm:block hidden" },
            { title: "Added on", key: "dateCreated", style: "text-sm" },
            { title: "Actions", key: "-", style: "text-sm" },
          ],
        }
        res.data.data.forEach((element) => {
          element.dateCreated = moment(element.dateCreated).format(
            "DD/M/YYYY hh:mm"
          )
        })
        response = { ...response, ...res.data }
        setData(response)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [reload])

  return (
    <div className="flex flex-col w-full">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <tab className="flex justify-center bg-white outline-none md:border border-black py-2">
        {loading ? <Loading /> : tabs[selectedTab].component}
      </tab>
    </div>
  )
}

export default Settings
