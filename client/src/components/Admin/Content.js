import Dashboard from "./Dashboard"
import Resources from "./Resources/Resources"
import Settings from "./Settings/Settings"
import Applicants from "./Applicants/Applicants"
import Members from "./Members/Members"
import Forms from "./Forms/Forms"
import { useParams } from "react-router"
import Events from "./Events/Events"

const Content = () => {
  let { view } = useParams()
  return (
    <main className="overflow-x-hidden w-full h-screen md:px-4 ">
      {view === "dashboard" && <Dashboard />}
      {view === "resources" && <Resources />}
      {view === "events" && <Events />}
      {view === "members" && <Members />}
      {view === "forms" && <Forms />}
      {view === "applicants" && <Applicants />}
      {view === "settings" && <Settings />}
    </main>
  )
}

export default Content
