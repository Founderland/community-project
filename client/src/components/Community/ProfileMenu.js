import { Menu, Transition } from "@headlessui/react"
import { Fragment, useContext } from "react"
import UserContext from "../../contexts/User"

const ProfileMenu = () => {
  const { user, setView, logout } = useContext(UserContext)

  const avatarInitials = () => {
    let initials =
      user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
    return initials
  }
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="group flex items-center space-x-3 relative focus:outline-none">
        <h2 className="text-gray-800 text-bold text-sm lg:text-lg hidden sm:block">
          {user.firstName + " " + user.lastName}
        </h2>
        <span
          className={`flex items-center justify-center text-mono text-lg lg:text-2xl tracking-wide w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 group-hover:border-fblue ${user.avatar}`}
        >
          {avatarInitials()}
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
        <Menu.Items className="absolute w-40 bg-white overflow-hidden shadow-xl right-0">
          <Menu.Item
            as="button"
            className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-flime"
            onClick={() => setView(2)}
          >
            My Events
          </Menu.Item>
          <Menu.Item
            as="button"
            className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-flime"
            onClick={() => setView(5)}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            as="button"
            className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-flime"
            onClick={() => setView(6)}
          >
            Settings
          </Menu.Item>
          <div className="flex items-center justify-between">
            <span className="border-b w-full"></span>
          </div>
          <Menu.Item
            as="button"
            className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-fred hover:text-white"
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
