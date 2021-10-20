import { MenuIcon } from "@heroicons/react/solid"
import { useContext } from "react"
import AdminContext from "../../contexts/Admin"
import Notifications from "./Widgets/Notifications"
import ProfileMenu from "./ProfileMenu"
import { useParams, useHistory } from "react-router"
import { ChevronLeftIcon } from "@heroicons/react/outline"

const AdminHeader = () => {
  let { view, category, id } = useParams()
  const { views, setMenuToggle } = useContext(AdminContext)
  const history = useHistory()
  return (
    <div className="flex justify-between shadow items-center p-6 z-10">
      <div className="flex items-center space-x-4 lg:space-x-0">
        <button
          className="text-gray-800 focus:outline-none lg:hidden"
          onClick={() => setMenuToggle(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-lg sm:text-2xl font-medium text-mono text-gray-800">
            {category === "id" ? (
              <button
                onClick={() => history.goBack()}
                className="flex justify-center items-center bg-fblue text-gray-200 px-8 py-2 space-x-2 shadow-lg m-2 transition duration-200 hover:bg-fblue-900 hover:text-white"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                <p className="text-mono text-sm">Back</p>
              </button>
            ) : !views[view].categories ? (
              views[view].name
            ) : (
              views[view].categories[category].name
            )}
          </h1>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <Notifications />
        <ProfileMenu />
      </div>
    </div>
  )
}

export default AdminHeader
