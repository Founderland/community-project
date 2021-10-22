import { useParams } from "react-router-dom"
import { useState, useContext } from "react"
import { Tab } from "@headlessui/react"
import ApplicantsList from "./ApplicantsList"
import Application from "./Application"
import AdminContext from "../../../contexts/Admin"

const Applicants = ({ status }) => {
  const [reload, setReload] = useState(0)
  const { selectedTab, setSelectedTab } = useContext(AdminContext)
  const { id } = useParams()
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }
  let { category } = useParams()
  return (
    <div className="w-full flex flex-col ">
      {id ? (
        <Application />
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
              <p onClick={() => setSelectedTab(1)}>Founders</p>
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
              <p onClick={() => setSelectedTab(1)}> Allies</p>
            </Tab>
          </Tab.List>
          <div className="w-full border mt-0 border-t border-5 border-black outline-none"></div>
          <Tab.Panels className="mt-6 bg-white outline-none">
            <Tab.Panel className="p-3 outline-none ">
              <ApplicantsList
                status={category}
                role="founder"
                reload={reload}
              />
            </Tab.Panel>
            <Tab.Panel className="p-3 outline-none ">
              <ApplicantsList
                status={category}
                role="investor"
                reload={reload}
              />
            </Tab.Panel>
            <Tab.Panel className="p-3 outline-none ">
              <ApplicantsList status={category} role="ally" reload={reload} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  )
}

export default Applicants
