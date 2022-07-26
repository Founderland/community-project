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
  const { selectedTab, setSelectedTab, user } = useContext(AdminContext)
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
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <section className="relative h-full w-full flex md:px-4  items-center flex-col bg-white outline-none overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-fblue">
        {!id ? (
          <>
            <EventsList state={tabs[selectedTab].role} />
            {user.role.includes("admin") && (
              <div className="absolute bottom-0 md:bottom-5 right-0 md:left-4 space-x-2">
                <button
                  className="flex self-start max-w-max px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                  onClick={() => history.push("/admin/events/id/new")}
                >
                  <PlusIcon className="h-5 w-5" />
                  <p className="text-mono text-sm">Add New</p>
                </button>
              </div>
            )}
          </>
        ) : id === "new" ? (
          <AddEvent />
        ) : (
          <Event />
        )}
      </section>
    </>
  )
}

export default Events
