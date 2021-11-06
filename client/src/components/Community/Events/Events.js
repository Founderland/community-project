import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"
import { Switch } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import EventsList from "./EventsList"
import Event from "./Event"
import AddEvent from "./AddEvent"
import { PlusIcon } from "@heroicons/react/outline"

const Events = () => {
  const { category, id } = useParams()
  const history = useHistory()
  const [filter, setFilter] = useState(false)
  const [hosting, setHosting] = useState(false)

  useEffect(() => {
    if (category === "member") setHosting(true)
  }, [category])
  return (
    <div className="relative flex flex-col w-full justify-center items-center">
      {!id && category !== "new" ? (
        <>
          <div className="flex space-x-4">
            <Switch.Group
              as="div"
              className="flex justify-center items-center space-x-4 pt-2"
            >
              <Switch.Label
                className={`${
                  !filter ? "text-gray-900" : "text-gray-200"
                } mt-2 uppercase tracking-wide text-xs font-bold mb-2`}
              >
                Upcoming
              </Switch.Label>
              <Switch
                as="button"
                checked={filter}
                onChange={setFilter}
                className={`relative ${
                  filter ? "bg-gray-700" : "bg-flime"
                } inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline ml-4 md:ml-0`}
              >
                {({ checked }) => (
                  <span
                    className={`${
                      checked ? "translate-x-5" : "translate-x-0"
                    } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                  >
                    <CheckIcon />
                  </span>
                )}
              </Switch>
              <Switch.Label
                className={`${
                  filter ? "text-gray-900" : "text-gray-200"
                } mt-2 uppercase tracking-wide text-xs font-bold mb-2`}
              >
                Past
              </Switch.Label>
            </Switch.Group>
            <Switch.Group
              as="div"
              className="flex justify-center items-center space-x-4 pt-2"
              onClick={() => {
                history.push(
                  `${
                    hosting ? "/community/events/" : "/community/events/member"
                  }`
                )
              }}
            >
              <Switch
                as="button"
                checked={hosting}
                onChange={setHosting}
                className={`relative ${
                  !hosting ? "bg-gray-200" : "bg-flime"
                } inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline ml-4 md:ml-0`}
              >
                {({ checked }) => (
                  <span
                    className={`${
                      checked ? "translate-x-5" : "translate-x-0"
                    } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                  >
                    <CheckIcon className={`${!hosting ? "hidden" : ""}`} />
                  </span>
                )}
              </Switch>
              <Switch.Label
                className={`${
                  hosting ? "text-gray-900" : "text-gray-200"
                } mt-2 uppercase tracking-wide text-xs font-bold mb-2`}
              >
                My Events
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="w-full md:w-5/6 px-4 outline-none">
            <EventsList state={filter ? "past" : "future"} filter={hosting} />
            <button
              className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
              onClick={() => history.push("/community/events/new")}
            >
              <PlusIcon className="h-5 w-5" />
              <p className="text-mono text-sm">Host an event</p>
            </button>
          </div>
        </>
      ) : category === "new" ? (
        <AddEvent />
      ) : (
        <Event />
      )}
    </div>
  )
}

export default Events
