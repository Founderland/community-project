import { useHistory, useParams } from "react-router"
import { useContext, useEffect, useState } from "react"
import { PlusIcon, TrashIcon } from "@heroicons/react/outline"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import ResourcesList from "./ResourcesList"
import Resource from "./Resource"
import AddResource from "./AddResource"
import ComponentModal from "../Widgets/ComponentModal"
import ConfirmModal from "../Widgets/ConfirmModal"
import AddCategory from "./AddCategory"
import ConfirmCategory from "./ConfirmCategory.js"

const Resources = () => {
  const history = useHistory()
  const {
    selectedTab,
    setSelectedTab,
    setCModal,
    setCCModal,
    config,
    reload,
    user,
  } = useContext(AdminContext)
  const [tabs, setTabs] = useState([])
  const [categories, setCategories] = useState([])
  const { id } = useParams()

  //  getCategories
  useEffect(() => {
    axios
      .get("/api/resources/", config)
      .then((res) => {
        let filteredTabs = res.data.map((category, i) => ({
          index: i,
          id: category._id,
          name: category.categoryName,
          key: category.categoryKey,
          value: category.categoryKey,
          locked:
            category.categoryKey === "welcomeguide" ||
            category.numberOfArticles !== 0
              ? true
              : false,
          restricted: "",
        }))
        setCategories(filteredTabs)
        filteredTabs = [
          ...filteredTabs,
          {
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
        setTabs(filteredTabs)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [reload])
  const handleTask = () => {
    history.push("/admin/resources/id/new")
  }

  return (
    <>
      <ComponentModal>
        <AddCategory />
      </ComponentModal>
      {!id && (
        <ConfirmModal>
          <ConfirmCategory data={tabs[selectedTab]} />
        </ConfirmModal>
      )}
      {tabs.length > 0 ? (
        <>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            id={id}
          />
          <section className="relative h-full w-full flex md:px-4  items-center flex-col bg-white outline-none overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-fblue">
            {!id ? (
              <>
                <ResourcesList category={tabs[selectedTab].key} />
                {user.role.includes("sadmin") && (
                  <div className="md:flex absolute bottom-0 md:bottom-5 right-0 md:left-4 space-x-2">
                    <button
                      className="flex px-8 py-2 w-60 space-x-2 shadow-xl m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                      onClick={() => handleTask()}
                    >
                      <PlusIcon className="h-5 w-5" />
                      <p className="text-mono text-sm">Add New Resource</p>
                    </button>
                    {!tabs[selectedTab].locked && (
                      <button
                        className="mx-auto flex px-8 py-2 w-60 space-x-2 shadow-xl m-2 bg-gray-700 transition duration-200 hover:bg-fred text-white"
                        onClick={() => {
                          setCCModal(true)
                        }}
                      >
                        <TrashIcon className="h-5 w-5" />
                        <p className="text-mono text-sm">Delete Category</p>
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : id === "new" ? (
              <div className="relative self-center flex flex-col w-full xl:w-5/6 2xl:w-4/6 pb-6 shadow-lg border-0">
                <AddResource
                  category={tabs[selectedTab].key}
                  categories={categories}
                />
              </div>
            ) : (
              <Resource
                category={tabs[selectedTab].key}
                categories={categories}
              />
            )}
          </section>
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default Resources
