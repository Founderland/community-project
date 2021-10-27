import { useContext } from "react"
import { useHistory, useParams } from "react-router"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import EventsList from "./EventsList"

const Events = () => {
  const history = useHistory()
  const { id } = useParams()
  const { reload, selectedTab, setSelectedTab } = useContext(AdminContext)
  const tabs = [
    {
      index: 0,
      name: "Upcoming",
      role: "open",
      restricted: "",
    },
    {
      index: 1,
      name: "Past",
      role: "closed",
      restricted: "",
    },
  ]

  return (
    <div className="flex flex-col w-full ">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <tab className="flex justify-center bg-white outline-none md:border border-black pt-4 pb-8">
        <EventsList state={tabs[selectedTab].role} />
      </tab>
    </div>
  )
}

export default Events
