import {
  CalendarIcon,
  CollectionIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import UserContext from "../../contexts/User"
import ProfileMenu from "./ProfileMenu"
import { ReactComponent as SmallLogo } from "../../assets/small.svg"
import { Link, useParams } from "react-router-dom"

const Header = () => {
  const { views } = useContext(UserContext)
  const icons = {
    user: <UserIcon className="h-8" />,
    userGroup: <UserGroupIcon className="h-8" />,
    collection: <CollectionIcon className="h-8" />,
    calendar: <CalendarIcon className="h-8" />,
  }
  const { view } = useParams()
  let selectedView = view
  if (!view) selectedView = "community"
  return (
    <div className="flex w-full md:bg-white bg-black shadow p-3">
      <div className="flex flex-grow items-center space-x-4 lg:space-x-0">
        <a href="https://www.founderland.org" alt="Founderland homepage">
          <SmallLogo className="h-8 text-black bg-white md:text-white md:bg-black fill-current ml-4" />
        </a>
        <h1 className="md:hidden text-lg sm:text-xl tracking-wider font-medium text-mono md:text-gray-800 text-white">
          {selectedView.toUpperCase()}
        </h1>
        <div class="md:flex flex-grow hidden justify-center ">
          {Object.keys(views).map((key) =>
            views[key].hide ? (
              ""
            ) : (
              <Link
                to={key !== "community" ? `/community/${key}` : "/community"}
                class={`flex flex-col items-center mx-2 px-2 hover:text-fblue  ${
                  selectedView === key && "border-b-2 border-fblue"
                }`}
              >
                {icons[views[key].icon]}
                {views[key].name}
              </Link>
            )
          )}
        </div>
      </div>
      <div className="flex w-full md:w-auto justify-end items-center space-x-6">
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Header
