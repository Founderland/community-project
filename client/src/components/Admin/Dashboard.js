import { EyeIcon, PencilAltIcon } from "@heroicons/react/outline"
import { useContext, useState, useEffect, useMemo } from "react"
import axios from "axios"
import AdminContext from "../../contexts/Admin"
import ChartWidget from "./Widgets/ChartWidget"
import CompactWidget from "./Widgets/CompactWidget"
import ListWidget from "./Widgets/ListWidget"
import {
  listData,
  approved,
  rejected,
  applicants,
  members,
} from "../_DummyData"
const membersAPI = "/api/users/community/"

const AdminDashboard = () => {
  const { view, token } = useContext(AdminContext)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  const [foundersWidget, setFoundersWidget] = useState({})
  const [loadingF, setLoadingF] = useState(true)
  const [investorsWidget, setInvestorsWidget] = useState({})
  const [loadingI, setLoadingI] = useState(true)
  const [alliesWidget, setAlliesWidget] = useState({})
  const [loadingA, setLoadingA] = useState(true)
  // const [widgetData, setWidgetData] = useState({
  //   approvedWidget: {},
  //   rejectedWidget: {},
  //   pendingApplicants: {},
  //   membersChart: {},
  //   newApplicants: {},
  // })
  // const [loading, setLoading] = useState({
  //   foundersWidget: true,
  //   investorsWidget: true,
  //   alliesWidget: true,
  //   approvedWidget: true,
  //   rejectedWidget: true,
  //   pendingApplicants: true,
  //   membersChart: true,
  //   newApplicants: true,
  // })

  //GET FOUNDERS COUNT
  useEffect(() => {
    axios
      .get(membersAPI + "founder", config)
      .then((res) => {
        const data = {
          label: "Founders",
          value: res.data.data.length,
          change: "4 new",
        }
        setFoundersWidget(data)
        setLoadingF(false)
      })
      .catch((err) => {})
  }, [config])
  //GET INVESTORS COUNT
  useEffect(() => {
    axios
      .get(membersAPI + "investor", config)
      .then((res) => {
        const data = {
          label: "Investors",
          value: res.data.data.length,
          change: 0,
        }
        setInvestorsWidget(data)
        setLoadingI(false)
      })
      .catch((err) => {})
  }, [config])
  //GET ALLIES COUNT
  useEffect(() => {
    axios
      .get(membersAPI + "ally", config)
      .then((res) => {
        const data = {
          label: "Allies",
          value: res.data.data.length,
          change: 0,
        }
        setAlliesWidget(data)
        setLoadingA(false)
      })
      .catch((err) => {})
  }, [config])
  return (
    <div className="flex flex-col w-full px-3">
      <div className=" md:flex w-full">
        <CompactWidget loading={loadingF} data={foundersWidget} />
        <CompactWidget loading={loadingI} data={investorsWidget} />
        <CompactWidget loading={loadingA} data={alliesWidget} />
      </div>
      <div className=" md:flex w-full">
        <CompactWidget data={approved} />
        <CompactWidget data={rejected} />
      </div>
      <div className="md:flex w-full">
        <ListWidget
          title="Pending Final Review"
          data={listData}
          showing={5}
          cellAlignment={"justify-center"}
          button1={<PencilAltIcon className="w-5" />}
          button2={<EyeIcon className="w-5" />}
        />
      </div>
      <div className="md:flex w-full justify-around">
        <div className="h-40 w-1/2">
          <ChartWidget data={members} />
        </div>
        <div className="h-40 w-1/2">
          <ChartWidget data={applicants} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
