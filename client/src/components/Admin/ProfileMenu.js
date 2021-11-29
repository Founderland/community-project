import { Menu, Transition } from "@headlessui/react"
import { Fragment, useContext } from "react"
import { UserIcon } from "@heroicons/react/solid"
import AdminContext from "../../contexts/Admin"
import { useHistory } from "react-router"

const ProfileMenu = () => {
  const { user, setSelectedTab, logout, avatarInitials } =
    useContext(AdminContext)
  const history = useHistory()
  const goToProfile = () => {
    setSelectedTab(0)
    history.push("/admin/settings")
  }
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="group flex items-center space-x-3 relative outline-none">
        <h2 className="text-gray-800 text-bold text-sm lg:text-lg hidden sm:block">
          {user.firstName + " " + user.lastName}
        </h2>
        <span
          className={`flex items-center justify-center text-mono text-lg lg:text-2xl tracking-wide w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 group-hover:border-fblue ${user.avatar}`}
        >
          {avatarInitials(user.firstName, user.lastName)}
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 outline-none w-40 bg-white overflow-hidden shadow-xl right-0">
          <Menu.Item
            as="button"
            className="flex z-50 items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-flime"
            onClick={() => goToProfile()}
          >
            <UserIcon className="w-6" />
            <p className="ml-4">Profile</p>
          </Menu.Item>
          <Menu.Item
            as="button"
            className="w-full z-50 px-4 py-2 text-sm text-gray-800 hover:bg-fred hover:text-white"
            onClick={() => logout()}
          >
            Logout
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileMenu
