import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext } from 'react'
import { UserGroupIcon, ClipboardCheckIcon, BellIcon } from '@heroicons/react/outline'
import AdminContext from '../../contexts/Admin'

const Notifications = () => {
	const { notifications } = useContext(AdminContext)
	return (
		<Menu as="div" className="relative">
			<Menu.Button className="flex text-gray-600 focus:outline-none">
				<BellIcon className="h-5 w-5" />
				<div className="h-1 w-1 p-1 bg-fred rounded-full -mx-2 animate-pulse"></div>
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
					{notifications.lenght
						? notifications.map((item) => (
								<Menu.Item
									as="button"
									key={item.text}
									className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-fblue hover:text-white outline-none"
								>
									{item.icon === 'user' ? (
										<UserGroupIcon className="w-4 mr-2" />
									) : (
										<ClipboardCheckIcon className="w-4 mr-2" />
									)}
									<p>{item.text}</p>
								</Menu.Item>
						  ))
						: 'No '}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default Notifications
