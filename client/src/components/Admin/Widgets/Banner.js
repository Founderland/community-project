import { Transition } from "@headlessui/react"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline"

const Banner = ({ result }) => {
  let show = result.show ? result.show : false
  return (
    <Transition
      show={show}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-y-full opacity-0"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-full opacity-0"
      className={`font-bold ${
        result.success
          ? "bg-green-100 text-green-700 border-green-400 "
          : "text-red-700 bg-red-100 border-red-400 "
      } border flex space-x-4 items-center pr-6 text-grotesk px-4 py-3 rounded absolute`}
    >
      {result.success ? (
        <CheckCircleIcon className="w-8" />
      ) : (
        <ExclamationCircleIcon className="w-8" />
      )}
      <p class="text-sm">{result.message ? result.message : ""}</p>
    </Transition>
  )
}

export default Banner
