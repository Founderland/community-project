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
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <section className="relative h-full flex flex-col bg-white outline-none md:px-4 overflow-hidden">
        {!id ? (
          <>
            <FormsList role={tabs[selectedTab].role} reload={reload} />
            <div className="absolute bottom-2 lg:bottom-10 right-0 md:left-4 space-x-2">
              <button
                className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                onClick={() => history.push("/admin/forms/id/new")}
              >
                <PlusIcon className="h-5 w-5" />
                <p className="text-mono text-sm">Add new</p>
              </button>
            </div>
          </>
        ) : (
          <section className="h-full w-full xl:w-5/6 md:px-4 mx-auto overflow-auto">
            <Question role={tabs[selectedTab].role} />
          </section>
        )}
      </section>
    </>
  )
}

export default Forms
