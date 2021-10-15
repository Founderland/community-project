import {
  AdjustmentsIcon,
  DocumentTextIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import { ReactComponent as LogoLines } from "../../assets/2_lines.svg"
import AdminContext from "../../contexts/Admin"

const active = "border-r-4 border-white bg-blue-700"

const Menu = () => {
  const { view, views, changeView, setMenuToggle, menuToggle } =
    useContext(AdminContext)
  return (
    <div
      className={`fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-fblue overflow-y-auto ${
        !menuToggle && "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-0`}>
      <button className='w-full p-2' onClick={() => setMenuToggle(!menuToggle)}>
        <LogoLines className='text-white fill-current w-full' />
      </button>
      <nav className='text-white text-mono py-4 text-md'>
        {views.map((item, index) => (
          <button
            onClick={() => {
              changeView(index)
            }}
            className={`block ${
              view === index && active
            } text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex items-center`}>
            {item === "Dashboard" ? (
              <HomeIcon className='h-6 w-6' />
            ) : item.includes("Form") ? (
              <DocumentTextIcon className='h-6 w-6' />
            ) : item.includes("Applicants") ? (
              <UserGroupIcon className='h-6 w-6' />
            ) : item === "Profile" ? (
              <UserIcon className='h-6 w-6' />
            ) : (
              <AdjustmentsIcon className='h-6 w-6' />
            )}
            <p className='px-2'>{item}</p>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Menu
