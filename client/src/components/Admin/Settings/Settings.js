import { useContext, useEffect, useState, useMemo } from "react"
import { UserAddIcon } from "@heroicons/react/outline"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import ListWidget from "../Widgets/ListWidget"
import Loading from "../Widgets/Loading"
import Profile from "./Profile"
import { useHistory, useParams } from "react-router"
import Tabs from "../Widgets/Tabs"

const usersAPI = "/api/users/all"

const styles = {
  supervisor:
    "flex justify-center items-center w-min m-1 font-medium py-1 px-2 rounded-full text-green-700 bg-green-100 border border-green-300 bg-opacity-30",
  administrator:
    "flex justify-center items-center w-min m-1 font-medium py-1 px-2 rounded-full text-fblue-700 bg-fblue-100 border border-fblue-300 bg-opacity-30",
  reviewer:
    "flex justify-center items-center w-min m-1 font-medium py-1 px-2 rounded-full text-fpink-700 bg-fpink-100 border border-fpink-300 bg-opacity-30",
}

const Settings = () => {
  const history = useHistory()
  const { id } = useParams()
  const [data, setData] = useState({
    header: [
      { title: "Name", key: "name", style: "text-xs md:text-sm" },
      { title: "Email", key: "email", style: "text-xs md:text-sm" },
      {
        title: "Role",
        key: "role",
        style: "hidden text-xs md:text-sm sm:block",
      },
      { title: "Actions", key: "-", style: "text-xs md:text-sm" },
    ],
    data: [],
  })
  const [filter, setFilter] = useState([
    { key: "name", search: "", show: false, type: "text" },
    { key: "email", search: "", show: false, type: "text" },
    { key: "role", search: "", show: false, type: "text" },
  ])
  const [loading, setLoading] = useState(false)
  const { config, rolesLabel, selectedTab, setSelectedTab, user, reload } =
    useContext(AdminContext)
  const tabs = [
    {
      index: 0,
      name: "Profile",
      restricted: "",
    },
    {
      index: 1,
      name: "Users",
      restricted: "sadmin",
    },
  ]

  //Get all registered Users and set the result as data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(usersAPI, config)
        let filteredData = response.data.data
          .filter((item) => item._id !== user.id)
          .map((item) => ({
            ...item,
            name: item.firstName + " " + item.lastName,
            role: rolesLabel[item.role],
          }))
        filter.forEach(
          (term) =>
            (filteredData = [
              ...filteredData.filter((item) =>
                item[term.key].toLowerCase().includes(term.search.toLowerCase())
              ),
            ])
        )
        setData({ ...data, data: [...filteredData] })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [selectedTab, reload, filter])

  return (
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <section className="relative h-full flex flex-col bg-white outline-none md:px-4 overflow-hidden py-4">
        {loading ? (
          <Loading />
        ) : !id && selectedTab !== 0 ? (
          <>
            <ListWidget
              title=""
              data={data}
              showing={8}
              styles={styles}
              cellAlignment={"justify-center"}
              filter={filter}
              setFilter={setFilter}
            />
            <div className="absolute bottom-0 md:bottom-5 right-0 md:left-4 space-x-2">
              <button
                className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                onClick={() => history.push("settings/id/new")}
              >
                <UserAddIcon className="h-5 w-5" />
                <p className="text-mono text-sm">Add user</p>
              </button>
            </div>
          </>
        ) : (
          <Profile />
        )}
      </section>
    </>
  )
}

export default Settings
