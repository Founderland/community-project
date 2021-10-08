import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import AdminContext from '../contexts/Admin'
import InfoModal from './InfoModal'

const ComponentModal = ({ children }) => {
	const { cModal, setCModal } = useContext(AdminContext)
	return (
		<Transition appear show={cModal} as={Fragment}>
			<Dialog as="div" onClose={() => setCModal(false)} className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex justify-center items-center h-screen">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-100"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-75"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-100"
						enterFrom="opacity-0 scale-80"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-75"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-80"
					>
						<div className="relative p-2 w-full md:w-5/6 lg:w-1/2">{children}</div>
					</Transition.Child>
				</div>
				<InfoModal />
			</Dialog>
		</Transition>
	)
}

export default ComponentModal
