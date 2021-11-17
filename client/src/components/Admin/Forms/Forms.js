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
      restricted: "",
    },
    {
      index: 1,
      name: "Investor",
      role: "investor",
      restricted: "",
    },
    {
      index: 2,
      name: "Ally",
      role: "ally",
      restricted: "",
    },
  ]

  return (
    <div className="w-full flex flex-col">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <section className="flex justify-center bg-white outline-none pt-4 pb-8">
        {!id ? (
          <div className="w-full px-4 outline-none">
            <FormsList role={tabs[selectedTab].role} reload={reload} />
            <div className="flex ">
              <button
                className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                onClick={() => history.push("/admin/forms/id/new")}
              >
                <PlusIcon className="h-5 w-5" />
                <p className="text-mono text-sm">Add new</p>
              </button>
            </div>
          </div>
        ) : (
          <Question role={tabs[selectedTab].role} />
        )}
      </section>
    </div>
  )
}

export default Forms
