import Header from "./Header"
import Menu from "./Menu"
import Content from "./Content"
import { Route } from "react-router-dom"
import { useState, Fragment, useContext } from "react"
import { Dialog, Transition } from "@headlessui/react"
import instructions from "../../assets/images/instructions.png"
import UserContext from "../../contexts/User"

const Main = () => {
  const { isMobile, isRunningStandalone } = useContext(UserContext)
  console.log(isMobile)
  const [isOpen, setIsOpen] = useState(isMobile && !isRunningStandalone())
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Route exact path={`/community/:view?/:category?/:id?/`}>
      <div className={`flex flex-col h-screen`}>
        <Header />
        <Content />
        <Menu />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl z-50">
                <Dialog.Title
                  as="h3"
                  className="text-mono text-lg font-bold leading-6 text-gray-900"
                >
                  📲 Add to Homescreen
                </Dialog.Title>
                <div className="my-2">
                  <p className="mb-1 text-mono text-justify text-sm text-gray-500">
                    To have quicker access from your mobile, select the option{" "}
                    <i>Add to Homescreen</i> as detailed below
                  </p>
                  <img
                    src={instructions}
                    className="w-full h-full object-cover"
                    alt="instructions"
                  />
                  <p className="mt-1 text-mono text-justify text-xs text-gray-500">
                    It will run as an app without taking space on your phone! 😊
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-fblue-900 bg-blue-300 border border-transparent hover:bg-fblue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fblue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Route>
  )
}

export default Main
