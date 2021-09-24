import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { UserGroupIcon, ClipboardCheckIcon, BellIcon } from '@heroicons/react/outline'
import { UserIcon, MenuIcon } from '@heroicons/react/solid'
const AdminHeader = ({view, setLogged, setView, setMenuToggle}) => {
    return (
        <div className="flex justify-between items-center p-6">
            <div className="flex items-center space-x-4 lg:space-x-0">
                <button
                    className="text-gray-800 focus:outline-none lg:hidden" onClick={()=>setMenuToggle(true)}>
                    <MenuIcon className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-medium text-gray-800 dark:text-white">{view}</h1>
                </div>
            </div>

            <div className="flex items-center space-x-8">
                <Menu as="div" className="relative">
                    <Menu.Button className="flex text-gray-600 focus:outline-none">
                    <BellIcon className="h-5 w-5" />
                        <div className="h-1 w-1 p-1 bg-fred rounded-full -mx-2"></div>
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
                        <Menu.Items className="absolute right-0 mt-2 bg-white w-80 overflow-hidden shadow-xl">
                            <Menu.Item as="button"
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-fblue hover:text-white"><UserGroupIcon className="w-4 mr-2" /> 15 founders applicants pending review</Menu.Item>
                            <Menu.Item as="button"
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-fblue hover:text-white"><ClipboardCheckIcon className="w-4 mr-2" />  4 founders applicants pending approval</Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
                <Menu as="div" className="relative">
                    <Menu.Button
                        className="flex items-center space-x-3 relative focus:outline-none">
                        <h2 className="text-gray-800 text-bold text-sm hidden sm:block">Stephanie von Behr</h2>
                        <img className="h-9 w-9 rounded-full border-2 border-fblue object-cover"
                            src="https://images.squarespace-cdn.com/content/v1/5f58bcc144bc680d3a67282c/1628171726454-GXR3U23TUCVBAJJ7D2YZ/steph_FDL.png?format=750w"
                            alt="Your avatar"/>
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
                    <Menu.Items className="absolute w-40 bg-white overflow-hidden shadow-xl z-10">
                        <Menu.Item as="button"
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-flime" onClick={()=>setView(6)}><UserIcon className="w-6" /><p className="ml-4">Profile</p></Menu.Item>
                        <Menu.Item as="button"
                            className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-fred hover:text-white" onClick={() => setLogged(false)}>Logout</Menu.Item>
                    </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}

export default AdminHeader


