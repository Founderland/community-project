import { useEffect, useState, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { Switch } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import EventsList from "./EventsList"
import Event from "./Event"
import AddEvent from "./AddEvent"
import { PlusIcon } from "@heroicons/react/outline"
import { CommunityContext } from "../../../contexts/CommunityProvider"
import UserContext from "../../../contexts/User"

const Events = () => {
  const { category, id } = useParams()
  const history = useHistory()
  const [filter, setFilter] = useState(false)
  const [hosting, setHosting] = useState(false)
  const { scrollUp } = useContext(CommunityContext)
  const { isMobile, isRunningStandalone } = useContext(UserContext)

  useEffect(() => {
    if (category === "member") setHosting(true)
    scrollUp()
  }, [category])

  return (
    <div
      className={`absolute top-0 w-full h-full flex flex-col justify-start items-center overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-fblue scrollbar-track-blue-100 ${
        isMobile && isRunningStandalone() ? "pb-10" : "pb-6"
      }`}
    >
      {!id && category !== "new" ? (
        <>
          <div className="w-full h-18 py-2 flex space-x-4 justify-center">
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
                    <CheckIcon className="w-5 h-5" />
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
                    <CheckIcon
                      className={`w-5 h-5 ${!hosting ? "hidden" : ""}`}
                    />
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
          <div className="relative w-full md:w-5/6 h-full pb-10 px-4 overflow-hidden">
            <EventsList state={filter ? "past" : "future"} filter={hosting} />
            <div className="absolute bottom-0 md:bottom-5 right-0 md:left-4 space-x-2 pb-10 md:pb-0">
              <button
                className="flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                onClick={() => history.push("/community/events/new")}
              >
                <PlusIcon className="h-5 w-5" />
                <p className="text-mono text-sm">Host an event</p>
              </button>
            </div>
          </div>
        </>
      ) : category === "new" ? (
        <section className="h-full w-full lg:w-4/6 md:px-4 mx-auto overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-fblue scrollbar-track-blue-100">
          <AddEvent />
        </section>
      ) : (
        <Event />
      )}
    </div>
  )
}

export default Events
