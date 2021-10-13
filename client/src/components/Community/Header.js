import {
  NewspaperIcon,
  CalendarIcon,
  ChatAlt2Icon,
  CollectionIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import { button } from "react-router-dom"
import UserContext from "../../contexts/User"
import Notifications from "./Notifications"
import ProfileMenu from "./ProfileMenu"

const Header = () => {
  const { view, views, setView } = useContext(UserContext)
  return (
    <div className="flex w-full bg-white shadow-lg p-3">
      <div className="flex flex-grow items-center space-x-4 lg:space-x-0">
        <h1 className="md:hidden text-lg sm:text-xl font-medium text-mono text-gray-800">
          {views[view].toUpperCase()}
        </h1>
        <div class="md:flex flex-grow hidden justify-center ">
          <button
            class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
              view === 0 && "border-b-2 border-fblue"
            }`}
            onClick={() => setView(0)}
          >
            <NewspaperIcon className="h-8" />
            <p>newsfeed</p>
          </button>
          <button
            class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
              view === 1 && "border-b-2 border-fblue"
            }`}
            onClick={() => setView(1)}
          >
            <UserGroupIcon className="h-8" />
            community
          </button>
          <button
            class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
              view === 2 && "border-b-2 border-fblue"
            }`}
            onClick={() => setView(2)}
          >
            <CalendarIcon className="h-8" />
            events
          </button>
          <button
            class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
              view === 3 && "border-b-2 border-fblue"
            }`}
            onClick={() => setView(3)}
          >
            <CollectionIcon className="h-8" />
            ressources
          </button>
          <button
            class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
              view === 4 && "border-b-2 border-fblue"
            }`}
            onClick={() => setView(4)}
          >
            <ChatAlt2Icon className="h-8" />
            inbox
          </button>
        </div>
      </div>
      <div className="flex w-full md:w-auto justify-end items-center space-x-6">
        <Notifications />
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Header
