import { useContext, useEffect } from "react"
import AdminContext from "../../contexts/Admin"
import QuestionsList from "./QuestionsList"
import Dashboard from "./Dashboard"
import Ressources from "./Ressources"
import Settings from "./Settings"
import ResponseList from "./Applicant Response/ResponseList"
import Members from "./Members"
import { useParams } from "react-router"

const Content = () => {
  let { view, category } = useParams()

  const { views, selectTab, setMemberType, setApplicantType } =
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
      setApplicantType(views[view].name.split(" ")[0])
    }
  }, [view, views, setApplicantType, setMemberType])
  return (
    <main className="overflow-x-hidden">
      <div className="items-center mx-auto md:px-4 py-2">
        <div className="flex justify-center h-screen">
          {view === "dashboard" && <Dashboard />}
          {view === "ressources" && <Ressources />}
          {view === "members" && <Members />}
          {view.includes("Form") && <QuestionsList />}
          {view === "applicants" && <ResponseList applicantType={category} />}
          {view === "settings" && <Settings tab={selectTab} />}
        </div>
      </div>
    </main>
  )
}

export default Content
