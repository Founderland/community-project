import { Listbox, Transition } from "@headlessui/react"
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/outline"
import { Fragment } from "react"

const ListOption = ({ options, choice, setChoice, format, color }) => {
  return (
    <Listbox value={choice} onChange={setChoice}>
      <div className={"relative mt-1 " + format}>
        {/* className='p-3 bg-white w-auto shadow-md w-full lg:w-1/3 xl:1/6 ' */}
        <Listbox.Button
          className={`${
            color && color
          }  relative w-full py-3 px-4 pr-10 text-left bg-white cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm `}>
          <span className='block truncate text-lg '>
            {options.filter((item) => item.value === choice)[0]?.name}
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center justify-end pr-2 pointer-events-none w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3'>
            <ChevronDownIcon
              className='w-5 h-5 text-gray-600 '
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <Listbox.Options className='absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {options.map((choice) => (
              <Listbox.Option
                key={choice.value}
                className={({ active }) =>
                  `${
                    active
                      ? "text-fblue bg-fblue bg-opacity-20 '"
                      : "text-gray-900 w-full"
                  }
              cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={choice.value}>
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "text-md" : "font-normal"
                      } block truncate`}>
                      {choice.name}
                    </span>
                    {selected ? (
                      <span className='text-fblue absolute inset-y-0 left-0 flex items-center pl-3'>
                        <CheckIcon className='w-5 h-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default ListOption
