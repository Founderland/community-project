import { useContext } from "react"
import { useHistory, useParams } from "react-router"
import { UserAddIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import MembersList from "./MembersList"
import AddMember from "./AddMember"
import MemberProfile from "./MemberProfile"

const Members = () => {
  const history = useHistory()
  const { id } = useParams()
  const { reload, selectedTab, setSelectedTab } = useContext(AdminContext)
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
  const handleTask = () => {
    history.push("members/id/new")
  }

  return (
    <div className="flex flex-col w-full ">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <tab className="flex justify-center bg-white outline-none md:border border-black pt-4 pb-8">
        {!id ? (
          <div className="w-full px-4 outline-none">
            <MembersList reload={reload} role={tabs[selectedTab].role} />
            <button
              className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
              onClick={() => handleTask("ally")}
            >
              <UserAddIcon className="h-5 w-5" />
              <p className="text-mono text-sm">Add New</p>
            </button>
          </div>
        ) : id === "new" ? (
          <AddMember role={tabs[selectedTab].role} />
        ) : (
          <MemberProfile />
        )}
      </tab>
    </div>
  )
}

export default Members
