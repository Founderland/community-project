import {
  NewspaperIcon,
  CalendarIcon,
  ChatAlt2Icon,
  CollectionIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import UserContext from "../../contexts/User"

const Menu = () => {
  const { view, setView } = useContext(UserContext)
  return (
    <div className="fixed bottom-0 w-full">
      <div className="md:hidden bottom-0 w-full bg-fblue text-xs">
        <div className="flex text-white text-center">
          <button
            onClick={() => setView(0)}
            className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
              view === 0 ? "bg-fpink text-black" : ""
            }`}
          >
            <NewspaperIcon className="h-6" />
          </button>
          <button
            onClick={() => setView(1)}
            className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
              view === 1 ? "bg-fpink text-black" : ""
            }`}
          >
            <UserGroupIcon className="h-6" />
          </button>
          <button
            onClick={() => setView(2)}
            className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
              view === 2 ? "bg-fpink text-black" : ""
            }`}
          >
            <CalendarIcon className="h-6" />
          </button>
          <button
            onClick={() => setView(3)}
            className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
              view === 3 ? "bg-fpink text-black" : ""
            }`}
          >
            <CollectionIcon className="h-6" />
          </button>
          <button
            onClick={() => setView(4)}
            className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
              view === 4 ? "bg-fpink text-black" : ""
            }`}
          >
            <ChatAlt2Icon className="h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
