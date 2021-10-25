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
          id ? "cursor-not-allowed" : "cursor-pointer"
        } transition ease-in-out duration-200 w-min flex p-1 bg-${color} outline-none justify-start`}
      >
        {tabs.map((tab) =>
          user.role.includes(tab.restricted) ? (
            <div
              className={`transition ease-in-out duration-200 w-24 md:w-32 px-1 py-0.5 text-${color} text-sm text-mono tracking-wide font-medium outline-none flex justify-center items-center ${
                selectedTab === tab.index
                  ? "font-bold bg-white shadow"
                  : "text-white hover:bg-white hover:bg-opacity-20"
              }`}
              onClick={() => (id ? null : setSelectedTab(tab.index))}
            >
              <p className="text-xs md:text-md">{tab.name}</p>
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
