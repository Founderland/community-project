import { useContext, useState, useEffect } from "react"
import axios from "axios"
import AdminContext from "../../contexts/Admin"
import CompactWidget from "./Widgets/CompactWidget"
import ListWidget from "./Widgets/ListWidget"
import Loading from "./Widgets/Loading"
const membersAPI = "/api/users/community/members/"
const styles = {
  new: "bg-green-200 text-green-600 mx-auto py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl capitalize",
  pending:
    "bg-yellow-200 text-yellow-600 mx-auto py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl capitalize",
  reviewed:
    "bg-purple-200 text-purple-600 mx-auto py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl capitalize",
  founder:
    "bg-fblue bg-opacity-50 text-blue-900  mx-auto py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl capitalize",
  investor:
    "bg-fred bg-opacity-50 text-red-900  mx-auto py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl capitalize",
  ally: "bg-flime bg-opacity-50  mx-auto py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl capitalize",
  sadmin: "border border-green-600",
  admin: "border-fblue",
  user: "border-fpink",
}

const applicantsURL = "/api/applicants/response/"

const AdminDashboard = () => {
  const { config } = useContext(AdminContext)
  const [widgetData, setWidgetData] = useState({
    foundersWidget: {},
    investorsWidget: {},
    alliesWidget: {},
    pendingApplicants: {},
  })
  const [loading, setLoading] = useState({
    foundersWidget: true,
    investorsWidget: true,
    alliesWidget: true,
    pendingApplicants: true,
  })
  const [filter, setFilter] = useState([
    { key: "name", search: "", show: false, type: "text" },
    { key: "email", search: "", show: false, type: "text" },
    { key: "role", search: "", show: false, type: "list" },
  ])
  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 8)
  //GET FOUNDERS COUNT
  useEffect(() => {
    axios
      .get(membersAPI + "founder", config)
      .then((res) => {
        //# from LAST 7 DAYS
        const newInvestors = res.data.data.filter(
          (founder) =>
            new Date(founder.created).toString() >= lastWeek.toString()
        )
        const data = {
          label: "Founders",
          value: res.data.data.length,
          new: newInvestors.length,
        }
        setWidgetData((prev) => ({ ...prev, foundersWidget: data }))
        setLoading((prev) => ({ ...prev, foundersWidget: false }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [config])
  //GET INVESTORS COUNT
  useEffect(() => {
    axios
      .get(membersAPI + "investor", config)
      .then((res) => {
        //# from LAST 7 DAYS
        const newInvestors = res.data.data.filter(
          (investor) =>
            new Date(investor.created).toString() >= lastWeek.toString()
        )
        const data = {
          label: "Investors",
          value: res.data.data.length,
          new: newInvestors.length,
        }
        setWidgetData((prev) => ({ ...prev, investorsWidget: data }))
        setLoading((prev) => ({ ...prev, investorsWidget: false }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [config])
  //GET ALLIES COUNT
  useEffect(() => {
    axios
      .get(membersAPI + "ally", config)
      .then((res) => {
        //# from LAST 7 DAYS
        const newAllies = res.data.data.filter(
          (ally) => new Date(ally.created).toString() >= lastWeek.toString()
        )
        const data = {
          label: "Allies",
          value: res.data.data.length,
          new: newAllies.length,
        }
        setWidgetData((prev) => ({ ...prev, alliesWidget: data }))
        setLoading((prev) => ({ ...prev, alliesWidget: false }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [config])
  //GET PENDING REVIEWS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          applicantsURL + "allpending/null",
          config
        )
        const userData = result.data.map((item) => {
          // Getting first and last name
          const firstName = item.firstName.length
            ? item.firstName
            : item.answerData.find((x) => x.question === "First name")
                ?.answer_value

          const lastName = item.lastName.length
            ? item.lastName
            : item.answerData.find((x) => x.question === "Last name")
                ?.answer_value

          let finalObject = {
            ...item,
            applicantName: `${firstName} ${lastName}`,
          }

          return finalObject
        })

        setWidgetData((prev) => ({
          ...prev,
          pendingApplicants: {
            header: [
              {
                title: "Role",
                key: "role",
                style: "py-3 px-6 text-center",
              },
              {
                title: "Name",
                key: "applicantName",
                style: "table-cell text-left ",
              },
              {
                title: "Comments",
                key: "comments",
                style: "hidden lg:table-cell items-center text-left",
              },
              {
                title: "Status",
                key: "status",
                style: "text-center hidden md:table-cell ",
              },
              { title: "", key: "-", style: "text-center" },
            ],
            data: userData,
            colSize: [<colgroup></colgroup>],
          },
        }))
        setLoading((prev) => ({ ...prev, pendingApplicants: false }))
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="flex flex-col w-full px-3 overflow-auto">
      <div className="flex-none md:flex h-full w-full">
        <CompactWidget
          loading={loading.foundersWidget}
          data={widgetData.foundersWidget}
        />
        <CompactWidget
          loading={loading.investorsWidget}
          data={widgetData.investorsWidget}
        />
        <CompactWidget
          loading={loading.alliesWidget}
          data={widgetData.alliesWidget}
        />
      </div>
      <div className="md:flex w-full bg-white">
        {loading.pendingApplicants ? (
          <Loading />
        ) : (
          <ListWidget
            title="Latest Pending Applicants"
            data={widgetData.pendingApplicants}
            showing={5}
            styles={styles}
            link="applicants/id/"
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
