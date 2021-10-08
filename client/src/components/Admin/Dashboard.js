import { useContext } from "react"
import AdminContext from "../../contexts/Admin"
import ChartWidget from "./ChartWidget"
import CompactWidget from "./CompactWidget"
import ListWidget from "./ListWidget"
import {
  founders,
  investors,
  allies,
  listData,
  approved,
  rejected,
  applicants,
  members,
} from "./_DummyData"

const AdminDashboard = () => {
  const { user } = useContext(AdminContext)
  return (
    <div className="flex flex-col w-full px-3">
      <div className=" md:flex lg:flex w-full">
        <CompactWidget data={founders} />
        <CompactWidget data={investors} />
        <CompactWidget data={allies} />
      </div>
      {user.role === "admin" ? (
        <div className=" md:flex lg:flex w-full">
          <CompactWidget data={approved} />
          <CompactWidget data={rejected} />
        </div>
      ) : (
        "nothing to show"
      )}
      <div className="md:flex lg:flex w-full">
        <ListWidget
          title="Pending Final Review"
          data={listData}
          showing={5}
          cellAlignment={"justify-center"}
        />
      </div>
      <div className="md:flex lg:flex w-full justify-around">
        <div className="h-40 w-1/3">
          <ChartWidget data={members} />
        </div>
        <div className="h-40 w-1/3">
          <ChartWidget data={applicants} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
