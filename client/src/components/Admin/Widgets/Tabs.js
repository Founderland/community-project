import { useContext } from "react"
import AdminContext from "../../../contexts/Admin"

const Tabs = ({ tabs, selectedTab, setSelectedTab, id }) => {
  const { user } = useContext(AdminContext)
  // LOOP THROUGH TAB DATA
  let color = id ? "gray-400" : "black"
  return (
    <>
      <div
        className={`${
          id ? "cursor-not-allowed opacity-20" : "cursor-pointer"
        }  transition ease-in-out duration-200 max-w-max flex p-1 bg-${color} outline-none justify-start overflow-x-auto`}
      >
        {tabs?.map((tab) =>
          user.role.includes(tab.restricted) ? (
            <div
              className={`min-w-max transition ease-in-out duration-200 px-3 py-0.5 text-${color} text-mono tracking-wide breaksfont-medium outline-none flex justify-center items-center ${
                selectedTab === tab.index
                  ? "font-bold bg-white shadow text-black"
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
              onClick={() =>
                id || tab.name.includes("@") ? null : setSelectedTab(tab.index)
              }
            >
              {tab.name.includes("@") ? (
                tab.component
              ) : (
                <p className="text-xs md:text-md">{tab.name}</p>
              )}
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <div
        className={`w-full border mt-0 border-t border-5 border-black outline-none`}
      ></div>
    </>
  )
}

export default Tabs
