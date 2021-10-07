import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext } from 'react'
import { UserIcon } from '@heroicons/react/solid'
import UserContext from '../../contexts/User'
import axios from 'axios'
import AdminContext from '../../contexts/Admin'

const logoutURL = 'api/auth/log-out'

const ProfileMenu = () => {
  const { user, setUser } = useContext(UserContext)
  const { setView } = useContext(AdminContext)
  const logout = () => {
    axios
      .post(logoutURL)
      .then((res) => setUser(null))
      .catch((err) => console.log(err))
  }
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-3 relative focus:outline-none">
        <h2 className="text-gray-800 text-bold text-sm hidden sm:block">
          {user.name}
        </h2>
        <img
          className="h-9 w-9 rounded-full border-2 border-fblue object-cover"
          src={user.avatar}
          alt={user.name}
        />
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
            className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-flime"
            onClick={() => setView(6)}
          >
            <UserIcon className="w-6" />
            <p className="ml-4">Profile</p>
          </Menu.Item>
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
