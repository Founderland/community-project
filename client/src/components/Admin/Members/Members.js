import { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { UserAddIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import MembersList from "./MembersList"
import AddMember from "./AddMember"

const Members = () => {
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
      component: !id ? (
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
      ) : (
        <AddMember role={role} />
      ),
    },
    {
      index: 1,
      name: "Investor",
      role: "investor",
      restricted: "",
      component: !id ? (
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
      ) : (
        <AddMember role={role} />
      ),
    },
    {
      index: 2,
      name: "Ally",
      role: "ally",
      restricted: "",
      component: !id ? (
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
      ) : (
        <AddMember role={role} />
      ),
    },
  ]
  const handleTask = (role) => {
    setRole(role)
    history.push("members/id/new")
  }
  useEffect(() => {
    setRole(tabs[selectedTab].role)
  }, [selectedTab])

  return (
    <div className="flex flex-col w-full ">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <tab className="flex justify-center bg-white outline-none md:border border-black pt-4 pb-8">
        {tabs[selectedTab].component}
      </tab>{" "}
    </div>
  )
}

export default Members
