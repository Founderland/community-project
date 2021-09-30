import { MenuIcon } from '@heroicons/react/solid'
import { useContext } from 'react'
import { AdminContext } from '../../contexts/Admin'
import Notifications from './Notifications'
import ProfileMenu from './ProfileMenu'

const notifications = [
  { icon: 'user', text: '15 founders applicants pending review' },
  { icon: 'pending', text: '4 founders applicants pending approval' },
]

const AdminHeader = () => {
  const { view, setMenuToggle } = useContext(AdminContext)
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
          <h1 className="text-2xl font-medium text-mono text-gray-800">
            {view}
          </h1>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <Notifications data={notifications} />
        <ProfileMenu />
      </div>
    </div>
  )
}

export default AdminHeader
