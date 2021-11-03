import { useHistory, useParams } from "react-router"
import { useContext } from "react"
import { PlusIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import RessourcesList from "./RessourcesList"
import Ressource from "./Ressource"
import AddRessource from "./AddRessource"
import ComponentModal from "../Widgets/ComponentModal"
import AddCategory from "./AddCategory"

const Ressources = () => {
  const history = useHistory()

  const { selectedTab, setSelectedTab, setCModal } = useContext(AdminContext)
  const { id } = useParams()
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
      key: "",
      restricted: "admin",
      component: (
        <button
          className="w-full flex justify-center"
          onClick={() => {
            setCModal(true)
          }}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      ),
    },
  ]
  const categories = [
    { name: "Welcome Guide", value: "welcomeguide", icon: "1" },
    { name: "Mindfulness", value: "mindfulness", icon: "1" },
    { name: "Videos", value: "videos", icon: "1" },
    { name: "Articles", value: "articles", icon: "1" },
  ]
  const handleTask = () => {
    history.push("ressources/id/new")
  }
  return (
    <div className="w-full flex flex-col ">
      <ComponentModal>
        <AddCategory />
      </ComponentModal>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <tab className="flex justify-center bg-white outline-none md:border border-black pt-4 pb-8">
        {!id ? (
          <div className="w-full px-4 outline-none">
            <RessourcesList category={tabs[selectedTab].key} />
            <button
              className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
              onClick={() => handleTask()}
            >
              <PlusIcon className="h-5 w-5" />
              <p className="text-mono text-sm">Add New</p>
            </button>
          </div>
        ) : id === "new" ? (
          <AddRessource
            category={tabs[selectedTab].key}
            categories={categories}
          />
        ) : (
          <Ressource />
        )}
      </tab>
    </div>
  )
}

export default Ressources
