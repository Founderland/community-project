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
  sadmin:
    "flex justify-center items-center w-min m-1 font-medium py-1 px-2 rounded-full text-fred-700 bg-fred-100 border border-fred-300 bg-opacity-30",
  admin:
    "flex justify-center items-center w-min m-1 font-medium py-1 px-2 rounded-full text-fred-700 bg-fblue-100 border border-fblue-300 bg-opacity-30",
  user: "flex justify-center items-center w-min m-1 font-medium py-1 px-2 rounded-full text-fpink-700 bg-fpink-100 border border-fpink-300 bg-opacity-30",
}

const Settings = () => {
  const history = useHistory()
  const { id } = useParams()
  console.log(id)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(0)
  const { token, selectedTab, setSelectedTab } = useContext(AdminContext)
  const tabs = [
    {
      index: 0,
      name: "Users",
      component: !id ? (
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
      ) : (
        <User setReload={setReload} />
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
            { title: "Name", key: "firstName", style: "text-xs md:text-sm" },
            { title: "", key: "lastName", style: "text-xs md:text-sm" },
            { title: "Email", key: "email", style: "text-xs md:text-sm" },
            {
              title: "Role",
              key: "role",
              style: "text-xs md:text-sm sm:block hidden",
            },
            { title: "Actions", key: "-", style: "text-xs md:text-sm" },
          ],
          ...res.data,
        }
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
        id={id}
      />
      <tab className="flex justify-center bg-white outline-none md:border border-black py-2">
        {loading ? <Loading /> : tabs[selectedTab].component}
      </tab>
    </div>
  )
}

export default Settings
