import { MenuIcon } from "@heroicons/react/solid"
import { useContext } from "react"
import AdminContext from "../../contexts/Admin"
import ProfileMenu from "./ProfileMenu"
import { useParams, useHistory } from "react-router"
import { ChevronLeftIcon } from "@heroicons/react/outline"
import { Transition } from "@headlessui/react"
import {
  AdjustmentsIcon,
  InboxInIcon,
  EmojiHappyIcon,
  EmojiSadIcon,
  CollectionIcon,
  DocumentTextIcon,
  DocumentIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  ClipboardListIcon,
  CalendarIcon,
} from "@heroicons/react/outline"

const icons = {
  home: <HomeIcon className="hidden sm:block h-6 w-6 text-pink-500" />,
  textdoc: (
    <DocumentTextIcon className="hidden sm:block h-6 w-6 text-cyan-500" />
  ),
  emptydoc: (
    <DocumentIcon className="hidden sm:block h-6 w-6 text-orange-500" />
  ),
  user: <UserIcon className="hidden sm:block h-6 w-6 text-fpink-500" />,
  groupuser: (
    <UserGroupIcon className="hidden sm:block h-6 w-6 text-fblue-500" />
  ),
  set: <AdjustmentsIcon className="hidden sm:block h-6 w-6 text-red-600" />,
  collection: (
    <CollectionIcon className="hidden sm:block h-6 w-6 text-purple-500" />
  ),
  calendar: (
    <CalendarIcon className="hidden sm:block h-6 w-6 text-indigo-500" />
  ),
  inboxin: <InboxInIcon className="hidden sm:block h-6 w-6 text-green-500" />,
  clipboard: (
    <ClipboardListIcon className="hidden sm:block h-6 w-6 text-yellow-500" />
  ),
  emojisad: <EmojiSadIcon className="hidden sm:block h-6 w-6 text-fred" />,
  emojihappy: (
    <EmojiHappyIcon className="hidden sm:block h-6 w-6 text-green-500" />
  ),
}

const AdminHeader = () => {
  let { view, category, id } = useParams()
  const { views, setMenuToggle } = useContext(AdminContext)
  const history = useHistory()
  let back = ""
  if (view === "applicants") back = "/admin/applicants/new"
  else back = "/admin/" + view
  return (
    <div className="flex justify-between items-center p-6 z-10">
      <div className="flex items-center space-x-4 lg:space-x-0">
        <button
          className="text-gray-800 focus:outline-none lg:hidden"
          onClick={() => setMenuToggle(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <div className="w-full flex items-center ">
          <Transition
            show={id ? true : false}
            enter="transform transition ease-in-out duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-75 opacity-0"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <button
              onClick={() =>
                history.action === "POP" ? history.push(back) : history.goBack()
              }
              className="flex justify-center items-center bg-fblue text-gray-200 px-8 py-2 space-x-2 shadow-lg m-2 transition duration-200 hover:bg-fblue-900 hover:text-white"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <p className="text-mono text-lg">Back</p>
            </button>
          </Transition>
          <Transition
            show={id ? false : true}
            enter="transition-opacity ease-linear duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`${
                id ? "hidden" : ""
              } flex justify-center items-center px-8 py-2 space-x-4 m-2`}
            >
              {icons[views[view]?.icon]}
              <p className="text-grotesk text-lg md:text-xl">
                {!views[view]?.categories
                  ? views[view]?.name
                  : views[view]?.categories[category]?.name}
              </p>
            </div>
          </Transition>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <ProfileMenu />
      </div>
    </div>
  )
}

export default AdminHeader
