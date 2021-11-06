import { useContext } from "react"
import { useParams, useHistory } from "react-router"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import EventsList from "./EventsList"
import Event from "./Event"
import AddEvent from "./AddEvent"
import { PlusIcon } from "@heroicons/react/outline"

const Events = () => {
  const { id } = useParams()
  const history = useHistory()
  const { selectedTab, setSelectedTab } = useContext(AdminContext)
  const tabs = [
    {
      index: 0,
      name: "Upcoming",
      role: "future",
      restricted: "",
    },
    {
      index: 1,
      name: "Past",
      role: "past",
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
      <section className="flex justify-center bg-white outline-none pt-4 pb-8">
        {!id ? (
          <div className="w-full px-4 outline-none">
            <EventsList state={tabs[selectedTab].role} />
            <button
              className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
              onClick={() => history.push("/admin/events/id/new")}
            >
              <PlusIcon className="h-5 w-5" />
              <p className="text-mono text-sm">Add New</p>
            </button>
          </div>
        ) : id === "new" ? (
          <AddEvent />
        ) : (
          <Event />
        )}
      </section>
    </div>
  )
}

export default Events
