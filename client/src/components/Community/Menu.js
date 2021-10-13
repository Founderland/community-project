import {
  NewspaperIcon,
  CalendarIcon,
  ChatAlt2Icon,
  CollectionIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="md:hidden bottom-0 w-full bg-fblue text-xs">
        <div className="flex text-white text-center">
          <Link
            to="/community"
            className="flex justify-center p-4 hover:bg-fpink w-1/5 justify-center"
          >
            <NewspaperIcon className="h-6" />
          </Link>
          <Link
            to="/community"
            className="flex justify-center p-4 hover:bg-fpink w-1/5"
          >
            <UserGroupIcon className="h-6" />
          </Link>
          <Link
            to="/community"
            className="flex justify-center p-4 hover:bg-fpink w-1/5"
          >
            <CalendarIcon className="h-6" />
          </Link>
          <Link
            to="/community"
            className="flex justify-center p-4 hover:bg-fpink w-1/5"
          >
            <CollectionIcon className="h-6" />
          </Link>
          <Link
            to="/community"
            className="flex justify-center p-4 hover:bg-fpink w-1/5"
          >
            <ChatAlt2Icon className="h-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
