import {
  NewspaperIcon,
  CalendarIcon,
  ChatAlt2Icon,
  CollectionIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import Notifications from "./Notifications"
import ProfileMenu from "./ProfileMenu"

const Header = () => {
  return (
    <div className="flex w-full bg-white shadow-lg p-4">
      <div className="flex flex-grow items-center space-x-4 lg:space-x-0">
        <h1 className="md:hidden text-lg sm:text-xl font-medium text-mono text-gray-800">
          Newsfeed
        </h1>
        <div class="md:flex flex-grow hidden justify-center space-x-6">
          <Link
            class="block flex flex-col justify-center mr-4 hover:text-fblue"
            to="/community"
          >
            <NewspaperIcon className="h-8" />
            newsfeed
          </Link>
          <Link
            class="block flex flex-col justify-center mr-4 hover:text-fblue"
            to="/community"
          >
            <UserGroupIcon className="h-8" />
            community
          </Link>
          <Link
            class="block flex flex-col justify-center mr-4 hover:text-fblue"
            to="/community"
          >
            <CalendarIcon className="h-8" />
            events
          </Link>
          <Link
            class="block flex flex-col justify-center mr-4 hover:text-fblue"
            to="/community"
          >
            <CollectionIcon className="h-8" />
            ressources
          </Link>
          <Link
            class="block flex flex-col justify-center mr-4 hover:text-fblue"
            to="/community"
          >
            <ChatAlt2Icon className="h-8" />
            inbox
          </Link>
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
