import { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { PlusIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import Question from "./Question"
import FormsList from "./FormsList"

const Forms = () => {
  const history = useHistory()
  const { id } = useParams()
  const { reload, selectedTab, setSelectedTab } = useContext(AdminContext)
  const [role, setRole] = useState("founder")
  const tabs = [
    {
      index: 0,
      name: "Founder",
      role: "founder",
      component: !id ? (
        <div className="w-full px-4 outline-none">
          <FormsList role="founder" reload={reload} />
          <button
            className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
            onClick={() => handleTask("founder")}
          >
            <PlusIcon className="h-5 w-5" />
            <p className="text-mono text-sm">Add new</p>
          </button>
        </div>
      ) : (
        <Question role={role} />
      ),
    },
    {
      index: 1,
      name: "Investor",
      role: "investor",
      component: !id ? (
        <div className="w-full px-4 outline-none">
          <FormsList role="investor" reload={reload} />
          <button
            className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
            onClick={() => handleTask("investor")}
          >
            <PlusIcon className="h-5 w-5" />
            <p className="text-mono text-sm">Add new</p>
          </button>
        </div>
      ) : (
        <Question role={role} />
      ),
    },
    {
      index: 2,
      name: "Ally",
      role: "ally",
      component: !id ? (
        <div className="w-full px-4 outline-none">
          <FormsList role="ally" reload={reload} />
          <button
            className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
            onClick={() => handleTask("ally")}
          >
            <PlusIcon className="h-5 w-5" />
            <p className="text-mono text-sm">Add new</p>
          </button>
        </div>
      ) : (
        <Question role={role} />
      ),
    },
  ]
  const handleTask = (role) => {
    setRole(role)
    history.push("forms/id/new")
  }
  useEffect(() => {
    setRole(tabs[selectedTab].role)
  }, [selectedTab])

  return (
    <div className="w-full flex flex-col ">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      {tabs[selectedTab].component}
    </div>
  )
}

export default Forms
