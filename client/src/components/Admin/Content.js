import Dashboard from "./Dashboard"
import Ressources from "./Ressources/Ressources"
import Settings from "./Settings/Settings"
import Applicants from "./Applicants/Applicants"
import Members from "./Members/Members"
import Forms from "./Forms/Forms"
import { useParams } from "react-router"

const Content = () => {
  let { view } = useParams()

  return (
    <main className="overflow-x-hidden w-full h-screen items-center mx-auto md:px-4 py-2 justify-center">
      {view === "dashboard" && <Dashboard />}
      {view === "ressources" && <Ressources />}
      {view === "members" && <Members />}
      {view === "forms" && <Forms />}
      {view === "applicants" && <Applicants />}
      {view === "settings" && <Settings />}
    </main>
  )
}

export default Content
