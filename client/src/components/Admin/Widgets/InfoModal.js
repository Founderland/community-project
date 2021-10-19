import { Fragment, useContext } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  InformationCircleIcon,
  ShieldExclamationIcon,
  XIcon,
} from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
const icons = {
  shield: <ShieldExclamationIcon className="h-4 w-4 sm:h-8 sm:w-8 text-fred" />,
  cross: <XIcon className="h-8 w-8" />,
  info: <InformationCircleIcon className="h-8 w-8" />,
}

const InfoModal = () => {
  const { modalMessage, iModal, setIModal } = useContext(AdminContext)
  return (
    <Transition appear show={iModal} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setIModal(false)}
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
            <div className="relative bg-white rounded shadow-xl max-w-lg p-5">
              <div className="flex flex-col rounded-lg text-left p-2 space-y-2">
                <Dialog.Title
                  as="h3"
                  className="flex space-x-2 items-center text-sm sm:text-xl font-bold text-gray-900 text-mono mb-4"
                >
                  {icons[modalMessage.icon]}
                  <p>{modalMessage.title}</p>
                </Dialog.Title>
                <Dialog.Description className="flex space-x-4 text-sans text-xs sm:text-lg p-1 items-center">
                  <p>{modalMessage.message}</p>
                </Dialog.Description>
              </div>
              <div className="flex flex-row-reverse mt-4">
                <button
                  className="bg-flime text-black transition duration-200 hover:bg-fblue hover:text-white text-mono p-2 w-1/2 text-sm"
                  onClick={() => setIModal(false)}
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

export default InfoModal
