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
  ChevronDownIcon,
  ClipboardListIcon,
  CalendarIcon,
} from "@heroicons/react/outline"
import { Disclosure, Transition } from "@headlessui/react"
import { useContext } from "react"
import { ReactComponent as LogoLines } from "../../assets/2_lines.svg"
import AdminContext from "../../contexts/Admin"
import { Link, useParams } from "react-router-dom"

const Menu = () => {
  const icons = {
    home: <HomeIcon className="h-5 w-5 group-hover:text-pink-500" />,
    textdoc: <DocumentTextIcon className="h-5 w-5 group-hover:text-cyan-500" />,
    emptydoc: <DocumentIcon className="h-5 w-5 group-hover:text-orange-500" />,
    user: <UserIcon className="h-5 w-5 group-hover:text-fpink-500" />,
    groupuser: <UserGroupIcon className="h-5 w-5 group-hover:text-fblue-500" />,
    set: <AdjustmentsIcon className="h-5 w-5 group-hover:text-red-600" />,
    collection: (
      <CollectionIcon className="h-5 w-5 group-hover:text-purple-500" />
    ),
    calendar: <CalendarIcon className="h-5 w-5 group-hover:text-indigo-500" />,
    inboxin: <InboxInIcon className="h-5 w-5 group-hover:text-green-500" />,
    clipboard: (
      <ClipboardListIcon className="h-5 w-5 group-hover:text-yellow-500" />
    ),
    emojisad: <EmojiSadIcon className="h-5 w-5 group-hover:text-fred" />,
    emojihappy: (
      <EmojiHappyIcon className="h-5 w-5 group-hover:text-green-500" />
    ),
  }
  const { view, category } = useParams()
  const { views, setMenuToggle, menuToggle, setSelectedTab } =
    useContext(AdminContext)

  const getCategories = (view) => {
    return Object.keys(views[view].categories).map((key) => (
      <Link
        to={`/admin/${view}/${key}`}
        onClick={() => handleMenu()}
        className={` group border-l-4 text-left py-2.5 pl-6 w-full transition duration-200 hover:bg-white hover:text-black flex items-center text-xs ${
          category === key
            ? "border-gray-200 bg-gray-300 text-black"
            : "border-transparent"
        } `}
      >
        {icons[views[view].categories[key].icon]}
        <p className="ml-3 px-2">{views[view].categories[key].name}</p>
      </Link>
    ))
  }

  const handleMenu = () => {
    setMenuToggle(false)
    setSelectedTab(0)
  }

  return (
    <>
      {/* Dark background when mobile menu showing */}
      <div
        className={`${
          menuToggle ? "block " : "hidden "
        }fixed z-40 inset-0 bg-black opacity-50 transition-opacity lg:hidden`}
        onClick={() => setMenuToggle(false)}
      ></div>
      <div
        className={`fixed z-40 inset-y-0 left-0 w-60 transition duration-300 transform bg-gray-900 overflow-y-auto ${
          !menuToggle && "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <LogoLines className="p-3 text-white fill-current w-full" />
        <nav className="text-white text-mono pt-6 text-md">
          {Object.keys(views).map((key, index) =>
            views[key].categories ? (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={` group border-l-4 text-left py-2.5 px-4 w-full transition duration-200 hover:bg-white hover:text-black flex text-sm items-center ${
                        view === key
                          ? "border-gray-200 bg-white text-black"
                          : "border-transparent"
                      } `}
                    >
                      {icons[views[key].icon]}
                      <p className="ml-3 px-2 flex-grow">{views[key].name}</p>
                      <ChevronDownIcon
                        className={`h-4 w-4 ${
                          open
                            ? "transition duration-200 transform rotate-180"
                            : "transition duration-200 transform rotate-0"
                        }`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="-translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="-translate-x-full"
                    >
                      <Disclosure.Panel className="text-white ">
                        {getCategories(key)}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ) : (
              <Link
                to={`/admin/${key}`}
                onClick={() => handleMenu()}
                className={`group border-l-4 text-left py-2.5 px-4 w-full transition duration-200 hover:bg-white hover:text-black  flex items-center text-sm tracking-wider ${
                  view === key
                    ? "border-gray-200 bg-white text-black"
                    : "border-transparent"
                } `}
              >
                {icons[views[key].icon]}
                <p className="ml-3 px-2">{views[key].name}</p>
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  )
}

export default Menu
