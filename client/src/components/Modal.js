import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShieldExclamationIcon, XIcon } from '@heroicons/react/outline'
import AdminContext from '../contexts/Admin'

const Modal = ({ message }) => {
  const { modal, setModal } = useContext(AdminContext)
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setModal(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen h-full">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-40"
            leave="ease-in duration-200"
            leaveFrom="opacity-40"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative  bg-white rounded-2xl max-w-sm w-4/6 p-5">
              <div className="flex flex-col justify-between bg-gray-50 h-full rounded-lg shadow-inner items-center">
                <Dialog.Title className="bg-fred-light text-white text-center text-mono font-bold rounded-t p-2 w-full">
                  {message.title}
                </Dialog.Title>
                <Dialog.Description className="flex justify-evenly items-center text-center text-mono text-lg w-full p-1 ">
                  <XIcon className="h-4 w-4" />
                  {message.message}
                </Dialog.Description>
              </div>
              <div className="mt-2">
                <button
                  className="bg-flime text-black transition duration-200 hover:bg-fblue hover:text-white text-mono p-2 w-1/2 sel"
                  onClick={() => setModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
