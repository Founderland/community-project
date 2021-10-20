import { useState, useContext } from "react"
import { useHistory, useParams } from "react-router"
import { Tab } from "@headlessui/react"
import { PlusIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import Question from "./Question"
import FormsList from "./FormsList"

const Forms = () => {
  const { reload, selectedTab, setSelectedTab } = useContext(AdminContext)
  const history = useHistory()
  const { id } = useParams()
  const [role, setRole] = useState("founder")
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }
  const handleTask = (role) => {
    setRole(role)
    history.push("forms/id/new")
  }
  return (
    <div className="w-full flex flex-col ">
      {id ? (
        <Question role={role} />
      ) : (
        <Tab.Group defaultIndex={selectedTab}>
          <Tab.List className="flex p-1 space-x-1 bg-black max-w-lg outline-none">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-1 text-mono tracking-wide font-medium outline-none",
                  selected
                    ? "font-bold bg-white shadow"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                )
              }
            >
              <p onClick={() => setSelectedTab(0)}>Founders</p>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-1 text-mono tracking-wide font-medium outline-none",
                  selected
                    ? "font-bold bg-white shadow"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                )
              }
            >
              <p onClick={() => setSelectedTab(1)}>Investors</p>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-1 text-mono tracking-wide font-medium outline-none",
                  selected
                    ? "font-bold bg-white shadow"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                )
              }
            >
              <p onClick={() => setSelectedTab(2)}>Allies</p>
            </Tab>
          </Tab.List>
          <div className="w-full border mt-0 border-t border-5 border-black outline-none"></div>
          <Tab.Panels className="mt-6 bg-white outline-none">
            <Tab.Panel className="p-3 outline-none ">
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
            </Tab.Panel>
            <Tab.Panel className="p-3 outline-none ">
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
            </Tab.Panel>
            <Tab.Panel className="p-3 outline-none ">
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
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  )
}

export default Forms
