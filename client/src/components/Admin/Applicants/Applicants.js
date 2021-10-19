import { useParams } from "react-router-dom"
import { useState } from "react"
import { Tab } from "@headlessui/react"
import ApplicantsList from "./ApplicantsList"

const Applicants = ({ status, tab }) => {
  const [reload, setReload] = useState(0)
  const { id } = useParams()
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }
  let { category } = useParams()

  return (
    <div className="w-full flex flex-col ">
      {id ? (
        id
      ) : (
        <Tab.Group defaultIndex={tab}>
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
              Founders
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
              Investors
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
              Allies
            </Tab>
          </Tab.List>
          {/* <div className=' '>Founders Response</div> */}
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
