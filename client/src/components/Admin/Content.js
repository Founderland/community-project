import { useContext, useEffect } from "react"
import AdminContext from "../../contexts/Admin"
import Dashboard from "./Dashboard"
import Ressources from "./Ressources/Ressources"
import Settings from "./Settings/Settings"
import Applicants from "./Applicants/Applicants"
import Members from "./Members/Members"
import { useParams } from "react-router"

const Content = () => {
  let { view } = useParams()

  const { views, selectTab, setMemberType, setStatus } =
    useContext(AdminContext)
  //SCROLL BACK UP ON MENU CHANGE
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  useEffect(() => {
    if (views[view].name.includes("Form")) {
      setMemberType(views[view].name.toLowerCase().split(" ")[0])
    }
    if (views[view].name.includes("Applicants")) {
      setStatus(views[view].name.split(" ")[0])
    }
  }, [view])
  return (
    <main className="overflow-x-hidden">
      <div className="items-center mx-auto md:px-4 py-2">
        <div className="flex justify-center h-screen">
          {view === "dashboard" && <Dashboard />}
          {view === "ressources" && <Ressources tab={selectTab} />}
          {view === "members" && <Members />}
          {view === "applicants" && <Applicants tab={selectTab} />}
          {view === "settings" && <Settings tab={selectTab} />}
        </div>
      </div>
    </main>
  )
}

export default Content
