import {
  AdjustmentsIcon,
  InboxInIcon,
  ClipboardIcon,
  EmojiHappyIcon,
  EmojiSadIcon,
  CollectionIcon,
  DocumentTextIcon,
  DocumentIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline"
import { Disclosure, Transition } from "@headlessui/react"
import { useContext } from "react"
import { ReactComponent as LogoLines } from "../../assets/2_lines.svg"
import AdminContext from "../../contexts/Admin"
import { Link, useParams } from "react-router-dom"

const Menu = () => {
  const active = ""
  const icons = {
    home: <HomeIcon className="h-6 w-6" />,
    textdoc: <DocumentTextIcon className="h-6 w-6" />,
    emptydoc: <DocumentIcon className="h-6 w-6" />,
    user: <UserIcon className="h-6 w-6" />,
    groupuser: <UserGroupIcon className="h-6 w-6" />,
    set: <AdjustmentsIcon className="h-6 w-6" />,
    collection: <CollectionIcon className="h-6 w-6" />,
    inboxin: <InboxInIcon className="h-6 w-6" />,
    clipboard: <ClipboardIcon className="h-6 w-6" />,
    emojisad: <EmojiSadIcon className="h-6 w-6" />,
    emojihappy: <EmojiHappyIcon className="h-6 w-6" />,
  }
  const { view, category } = useParams()
  const { views, changeView, setMenuToggle, menuToggle } =
    useContext(AdminContext)

  const getCategories = (view) => {
    console.log(category)
    return Object.keys(views[view].categories).map((key) => (
      <Link
        to={`/admin/${view}/${key}`}
        onClick={() => setMenuToggle(false)}
        className={`block border-l-4 text-left py-2.5 pl-6 w-full transition duration-200 hover:bg-fblue-300 flex items-center text-sm ${
          category === key ? "border-white bg-fblue-300" : "border-transparent"
        } `}
      >
        {icons[views[view].categories[key].icon]}
        <p className="ml-3 px-2">{views[view].categories[key].name}</p>
      </Link>
    ))
  }
  return (
    <>
      {/* Dark background when mobile menu showing */}
      <div
        className={`${
          menuToggle ? "block " : "hidden "
        }fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden`}
        onClick={() => setMenuToggle(false)}
      ></div>
      <div
        className={`fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-black overflow-y-auto ${
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
                      className={`block border-l-4 text-left py-2.5 px-4 w-full transition duration-200 hover:bg-fblue-700 flex items-center ${
                        view === key
                          ? "border-white bg-fblue-700"
                          : "border-transparent"
                      } `}
                    >
                      {icons[views[key].icon]}
                      <p className="ml-3 px-2 flex-grow">{views[key].name}</p>
                      <ChevronDownIcon
                        className={`h-4 w-4 ${
                          open
                            ? "transition duration-200 transform rotate-180"
                            : ""
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
                      <Disclosure.Panel className="text-gray-300">
                        {getCategories(key)}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ) : (
              <Link
                to={`/admin/${key}`}
                onClick={() => setMenuToggle(false)}
                className={`block border-l-4 text-left py-2.5 px-4 w-full transition duration-200 hover:bg-fblue-700 flex items-center ${
                  view === key
                    ? "border-white bg-fblue-700"
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
