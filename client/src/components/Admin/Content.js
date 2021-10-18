import { useContext, useEffect } from "react"
import AdminContext from "../../contexts/Admin"
import QuestionsList from "./QuestionsList"
import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Settings from "./Settings"
import ResponseList from "./ResponseList"
import Members from "./Members"

const Content = () => {
  const { view, views, setMemberType, setApplicantType } =
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
          {views[view].name === "Dashboard" && <Dashboard />}
          {views[view].name === "Members" && <Members />}
          {views[view].name.includes("Form") && <QuestionsList />}
          {views[view].name.includes("Applicants") && <ResponseList />}
          {views[view].name === "Profile" && <Profile />}
          {views[view].name === "Settings" && <Settings />}
        </div>
      </div>
    </main>
  )
}

export default Content
