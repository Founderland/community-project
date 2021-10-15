import { useContext, useState } from "react"
import { Tab } from "@headlessui/react"
import { UserAddIcon } from "@heroicons/react/outline"
import AdminContext from "../../contexts/Admin"
import ComponentModal from "../ComponentModal"
import MembersList from "./MembersList"
import AddMember from "./AddMember"

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const Members = ({ tab }) => {
  const [reload, setReload] = useState(0)
  const [task, setTask] = useState(null)
  const { setCModal } = useContext(AdminContext)

  const handleTask = (task) => {
    setTask(task)
    setCModal(true)
  }

  return (
    <div className="flex flex-col w-full bg-white  outline-none">
      {/* Tabs for Navigation */}
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
        <div className="w-full border mt-0 border-t border-5 border-black outline-none"></div>
        <Tab.Panels className="mt-6 bg-white outline-none">
          <Tab.Panel classname="p-3 outline-none ">
            <div className="w-full px-4 outline-none">
              <MembersList reload={reload} role="founder" />
              <button
                className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                onClick={() => handleTask("founder")}
              >
                <UserAddIcon className="h-5 w-5" />
                <p className="text-mono text-sm">Add Founder</p>
              </button>
            </div>
          </Tab.Panel>
          <Tab.Panel classname="p-3 outline-none ">
            <div className="w-full px-4 outline-none">
              <MembersList reload={reload} role="investor" />
              <button
                className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                onClick={() => handleTask("investor")}
              >
                <UserAddIcon className="h-5 w-5" />
                <p className="text-mono text-sm">Add Investor</p>
              </button>
            </div>
          </Tab.Panel>
          <Tab.Panel classname="p-3 outline-none ">
            <div className="w-full px-4 outline-none">
              <MembersList reload={reload} role="ally" />
              <button
                className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                onClick={() => handleTask("ally")}
              >
                <UserAddIcon className="h-5 w-5" />
                <p className="text-mono text-sm">Add Ally</p>
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* Data to display */}
      <ComponentModal>
        <AddMember role={task} reload={reload} setReload={setReload} />
      </ComponentModal>
    </div>
  )
}

export default Members
