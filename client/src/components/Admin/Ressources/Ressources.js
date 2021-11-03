import { useParams } from "react-router-dom"
import { useContext } from "react"
import { PlusIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import RessourcesList from "./RessourcesList"
import Ressource from "./Ressource"

const Applicants = ({ status }) => {
  const { reload, selectedTab, setSelectedTab } = useContext(AdminContext)
  const { id, category } = useParams()
  const tabs = [
    {
      index: 0,
      name: "Welcome Guide",
      key: "welcomeguide",
      restricted: "",
    },
    {
      index: 1,
      name: "Articles",
      key: "articles",
      restricted: "",
    },
    {
      index: 2,
      name: "Videos",
      key: "videos",
      restricted: "",
    },
    {
      index: 3,
      name: "Mindfulness",
      key: "mindfulness",
      restricted: "",
    },
    {
      index: 4,
      name: "@Edit",
      key: "mindfulness",
      restricted: "admin",
      component: <PlusIcon className="h-5 w-5 text-white" />,
    },
  ]
  return (
    <div className="w-full flex flex-col ">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <tab className="flex justify-center bg-white outline-none md:border border-black pt-4 pb-8">
        {!id ? (
          <div className="w-full px-4 outline-none">
            <RessourcesList folder={tabs[selectedTab].key} reload={reload} />
          </div>
        ) : (
          <Ressource />
        )}
      </tab>
    </div>
  )
}

export default Applicants
