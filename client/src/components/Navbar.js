import { Link } from 'react-router-dom'
import { ReactComponent as SmallLogo } from '../assets/small.svg'

const Navbar = () => {
  return (
    <div className="relative flex h-15 pl-28 justify-around items-center w-full shadow-xl py-5 absolute fixed bg-white sticky z-2">
      <SmallLogo className="absolute left-10 h-10 w-10 text-black fill-current" />
      <Link
        className="py-2 px-2 text-mono font-bold bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-xs text-black hover:text-white"
        to="/join-our-community"
      >
        Join Our Community
      </Link>
      <Link
        className="py-2 px-2 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black"
        to="/community"
      >
        Sign In
      </Link>
      <Link
        className="py-2 px-2 text-mono w-1/3 font-bold bg-white transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black"
        to="/admin"
      >
        Admin
      </Link>
    </div>
  )
}

export default Navbar
