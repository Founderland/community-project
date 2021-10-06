import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex h-15 justify-around items-center w-full shadow-xl py-5 absolute fixed bg-white sticky z-2">
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
        className="py-2 px-2 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black"
        to="/admin"
      >
        Admin
      </Link>
    </div>
  )
}

export default Navbar
