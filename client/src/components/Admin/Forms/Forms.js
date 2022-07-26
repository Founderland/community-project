import { useContext } from "react"
import { useHistory, useParams } from "react-router"
import { PlusIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import Question from "./Question"
import FormsList from "./FormsList"

const Forms = () => {
  const history = useHistory()
  const { id } = useParams()
  const { reload, selectedTab, setSelectedTab, user } = useContext(AdminContext)
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
      <section className="relative h-full w-full flex md:px-4 items-center flex-col bg-white outline-none overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-fblue">
        {!id ? (
          <>
            <FormsList role={tabs[selectedTab].role} reload={reload} />
            {user.role.includes("admin") && (
              <div className="absolute bottom-0 md:bottom-5 right-0 md:left-4 space-x-2">
                <button
                  className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                  onClick={() => history.push("/admin/forms/id/new")}
                >
                  <PlusIcon className="h-5 w-5" />
                  <p className="text-mono text-sm">Add new</p>
                </button>
              </div>
            )}
          </>
        ) : (
          <Question role={tabs[selectedTab].role} />
        )}
      </section>
    </>
  )
}

export default Forms
