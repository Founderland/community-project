import { MenuIcon } from "@heroicons/react/solid"
import { useContext } from "react"
import AdminContext from "../../contexts/Admin"
import Notifications from "./Notifications"
import ProfileMenu from "./ProfileMenu"
import { useParams } from "react-router"

const AdminHeader = () => {
  let { view, category } = useParams()
  const { views, setMenuToggle } = useContext(AdminContext)
  return (
    <div className="flex justify-between items-center p-6">
      <div className="flex items-center space-x-4 lg:space-x-0">
        <button
          className="text-gray-800 focus:outline-none lg:hidden"
          onClick={() => setMenuToggle(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-lg sm:text-2xl font-medium text-mono text-gray-800">
            {views[view].categories
              ? views[view].categories[category].name
              : views[view].name}
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
