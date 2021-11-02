import {
  NewspaperIcon,
  CalendarIcon,
  ChatAlt2Icon,
  CollectionIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import UserContext from "../../contexts/User"
import Notifications from "./Notifications"
import ProfileMenu from "./ProfileMenu"
import { ReactComponent as SmallLogo } from "../../assets/small.svg"
import { Link, useRouteMatch, useLocation } from "react-router-dom"

const Header = () => {
  const { view, views, setView } = useContext(UserContext)
  const { path, url } = useRouteMatch()
  const location = useLocation()
  console.log("location", location)

  if (location.pathname === "/") setView(0)
  else if (location.pathname === "/community/community") setView(1)
  else if (location.pathname === "/community/events") setView(2)
  else if (location.pathname === "/community/resources") setView(3)
  else if (location.pathname === "/community/resources/welcome-guide") setView(3)
  else if (location.pathname === "/community/resources/resources") setView(3)
  else if (location.pathname === "/community/resources/videos") setView(3)  
  else if (location.pathname === "/community/inbox") setView(4)
  return (
    <div className='flex w-full bg-white shadow-lg p-3'>
      <div className='flex flex-grow items-center space-x-4 lg:space-x-0'>
        <SmallLogo className='h-10 text-white bg-black fill-current' />
        <h1 className='md:hidden text-lg sm:text-xl font-medium text-mono text-gray-800'>
          {views[view].toUpperCase()}
        </h1>
        <div class='md:flex flex-grow hidden justify-center '>
          <Link to='/'>
            <button
              class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
                view === 0 && "border-b-2 border-fblue"
              }`}
              // onClick={() => setView(0)}
            >
              <NewspaperIcon className='h-8' />
              <p>newsfeed</p>
            </button>
          </Link>

          <Link to='/community/community'>
            <button
              class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
                view === 1 && "border-b-2 border-fblue"
              }`}
              // onClick={() => setView(1)}
            >
              <UserGroupIcon className='h-8' />
              community
            </button>
          </Link>

          <Link to='/community/events'>
            <button
              class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
                view === 2 && "border-b-2 border-fblue"
              }`}
              // onClick={() => setView(2)}
            >
              <CalendarIcon className='h-8' />
              events
            </button>
          </Link>

          <Link to={`/community/resources`}>
            <button
              class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
                view === 3 && "border-b-2 border-fblue"
              }`}
              // onClick={() => setView(3)}
            >
              <CollectionIcon className='h-8' />
              ressources
            </button>
          </Link>

          <Link to='/community/inbox'>
            <button
              class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
                view === 4 && "border-b-2 border-fblue"
              }`}
              // onClick={() => setView(4)}
            >
              <ChatAlt2Icon className='h-8' />
              inbox
            </button>
          </Link>
        </div>
      </div>
      <div className='flex w-full md:w-auto justify-end items-center space-x-6'>
        <Notifications />
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Header
