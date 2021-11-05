import {
  CalendarIcon,
  CollectionIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import UserContext from "../../contexts/User"
import { Link, useParams } from "react-router-dom"

const Menu = () => {
  const { views } = useContext(UserContext)
  const icons = {
    user: <UserIcon className="h-5 w-5 group-hover:text-fpink-500" />,
    userGroup: <UserGroupIcon className="h-5 w-5 group-hover:text-fblue-500" />,
    collection: (
      <CollectionIcon className="h-5 w-5 group-hover:text-purple-500" />
    ),
    calendar: <CalendarIcon className="h-5 w-5 group-hover:text-indigo-500" />,
  }
  const { view } = useParams()
  let selectedView = view
  if (!view) selectedView = "community"
  return (
    <div className="fixed bottom-0 w-full z-50">
      <div className="md:hidden bottom-0 w-full bg-black text-xs">
        <div className="flex items-center justify-center text-white text-center">
          {Object.keys(views).map((key) =>
            views[key].hide ? (
              ""
            ) : (
              <Link
                to={key !== "community" ? `/community/${key}` : "/community"}
                className={`flex justify-center p-4 hover:bg-fpink hover:text-black w-1/5 justify-center ${
                  selectedView === key ? "bg-fpink text-black" : ""
                }`}
              >
                {icons[views[key].icon]}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
