import { useContext } from "react"
import AdminContext from "../../contexts/Admin"
import AddQuestionForm from "./AddQuestionForm"
import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Settings from "./Settings"

const Content = () => {
  const { view, views } = useContext(AdminContext)

  return (
    <main className="overflow-x-hidden">
      <div className="items-center mx-auto px-4 py-2">
        <div className="flex justify-center h-screen">
          {views[view] === "Dashboard" && <Dashboard />}
          {/* {view === 'Founders Form' && (
                        <AddQuestionForm memberType={'founder'} />
                    )}
                    {view === 'Investors Form' && (
                        <AddQuestionForm memberType={'investor'} />
                    )} */}
          {views[view] === "Profile" && <Settings tab={1} />}
          {views[view] === "Settings" && <Settings tab={0} />}
        </div>
      </div>
    </main>
  )
}

export default Content
