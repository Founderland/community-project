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
  const { views, isRunningStandalone } = useContext(UserContext)
  const icons = {
    user: <UserIcon className="h-8 w-8 group-hover:text-fpink-500" />,
    userGroup: <UserGroupIcon className="h-8 w-8 group-hover:text-fblue-500" />,
    collection: (
      <CollectionIcon className="h-8 w-8 group-hover:text-purple-500" />
    ),
    calendar: <CalendarIcon className="h-8 w-8 group-hover:text-indigo-500" />,
  }
  const { view } = useParams()
  let selectedView = view
  if (!view) selectedView = "community"
  console.log(isRunningStandalone())
  return (
    <div
      className="fixed
    inset-x-0
    bottom-0 w-full z-50"
    >
      <div
        className={`md:hidden bottom-0 w-full bg-black text-xs ${
          isRunningStandalone() && "pb-4"
        }`}
      >
        <div className="flex items-center justify-center text-white text-center">
          {Object.keys(views).map((key) =>
            views[key].hide ? (
              ""
            ) : (
              <Link
                key={key}
                to={key !== "community" ? `/community/${key}` : "/community"}
                className={`flex justify-center p-2 hover:bg-fpink hover:text-black w-1/5 ${
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
