import {
  CalendarIcon,
  CollectionIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

const Menu = () => {
  const { view, setView } = useContext(UserContext)
  return (
    <div className="fixed bottom-0 w-full z-50">
      <div className="md:hidden bottom-0 w-full bg-black text-xs">
        <div className="flex items-center justify-center text-white text-center">
          <Link
            to="/"
            onClick={() => setView(1)}
            className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
              view === 1 ? "bg-fpink text-black" : ""
            }`}
          >
            <UserGroupIcon className="h-6" />
          </Link>
          <Link
            to="/events"
            onClick={() => setView(2)}
            className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
              view === 2 ? "bg-fpink text-black" : ""
            }`}
          >
            <CalendarIcon className="h-6" />
          </Link>
          <Link
            to="/ressources"
            onClick={() => setView(3)}
            className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
              view === 3 ? "bg-fpink text-black" : ""
            }`}
          >
            <CollectionIcon className="h-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
