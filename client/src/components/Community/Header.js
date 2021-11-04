import {
  CalendarIcon,
  CollectionIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import UserContext from "../../contexts/User"
import ProfileMenu from "./ProfileMenu"
import { ReactComponent as SmallLogo } from "../../assets/small.svg"
import { Link } from "react-router-dom"

const Header = () => {
  const { view, views, setView } = useContext(UserContext)

  return (
    <div className="flex w-full md:bg-white bg-black shadow-lg p-3">
      <div className="flex flex-grow items-center space-x-4 lg:space-x-0">
        <a href="https://www.founderland.org" alt="Founderland homepage">
          <SmallLogo className="h-10 text-black bg-white md:text-white md:bg-black fill-current" />
        </a>
        <h1 className="md:hidden text-lg sm:text-xl tracking-wider font-medium text-mono md:text-gray-800 text-white">
          {views[view].toUpperCase()}
        </h1>
        <div class="md:flex flex-grow hidden justify-center ">
          <Link
            to="/community"
            class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
              view === 0 && "border-b-2 border-fblue"
            }`}
            onClick={() => setView(0)}
          >
            <UserGroupIcon className="h-8" />
            community
          </Link>

          <Link
            to="/community/events"
            class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
              view === 1 && "border-b-2 border-fblue"
            }`}
            onClick={() => setView(1)}
          >
            <CalendarIcon className="h-8" />
            events
          </Link>

          <Link
            to={`/community/resources`}
            class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
              view === 2 && "border-b-2 border-fblue"
            }`}
            onClick={() => setView(2)}
          >
            <CollectionIcon className="h-8" />
            resources
          </Link>
        </div>
      </div>
      <div className="flex w-full md:w-auto justify-end items-center space-x-6">
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Header
