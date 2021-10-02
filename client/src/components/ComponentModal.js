import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const ComponentModal = ({ children, modal, setModal }) => {
  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setModal(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
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
            <div className="relative bg-white rounded shadow-xl max-w-full p-5">
              <div className="flex flex-col text-left space-y-2">
                <Dialog.Title
                  as="h3"
                  className="flex space-x-2 items-center text-sm sm:text-xl font-bold text-gray-900 text-mono mb-4"
                >
                  <p>Title</p>
                </Dialog.Title>
                <div>{children}</div>
              </div>
              <div className="flex flex-row-reverse mt-4">
                <button
                  className="bg-flime text-black transition duration-200 hover:bg-fblue hover:text-white text-mono p-2 w-1/2 text-sm"
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

export default ComponentModal
