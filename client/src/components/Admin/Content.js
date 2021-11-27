import Dashboard from "./Dashboard"
import Resources from "./Resources/Resources"
import Settings from "./Settings/Settings"
import Applicants from "./Applicants/Applicants"
import Members from "./Members/Members"
import Forms from "./Forms/Forms"
import { useParams } from "react-router"
import Events from "./Events/Events"
import { useContext } from "react"
import AdminContext from "../../contexts/Admin"

const Content = () => {
  let { view } = useParams()
  const { pageTop } = useContext(AdminContext)
  return (
    <main className="overflow-hidden w-full h-screen md:px-4 flex flex-col">
      <span ref={pageTop}></span>
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
