import { Link } from "react-router-dom"
import { ReactComponent as SmallLogo } from "../assets/small.svg"

const Navbar = () => {
  return (
    <>
      <div className="relative flex  justify-around items-center w-full shadow-xl py-4 absolute fixed bg-white sticky z-10">
        <SmallLogo className=" absolute left-10 top-5 h-10 w-10 text-black fill-current" />
        <div class="flex w-full space-x-4 justify-center items-center">
          <p className="px-10 py-2 text-mono font-semibold">About</p>
          <p className="px-10 py-2 text-mono font-semibold">News</p>
          <p className="px-10 py-2 text-mono font-semibold">Donate</p>
          <Link
            className="py-2 px-10 text-mono font-bold bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-xs text-black hover:text-white"
            to="/join-our-community"
          >
            Join Our Community
          </Link>
          <Link
            className="py-2 px-10 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black"
            to="/community"
          >
            Already a Member?
          </Link>
          <Link
            className="py-2 px-10 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black"
            to="/admin"
          >
            Admin
          </Link>
        </div>
      </div>
      <div>
        <img
          class="h-screen"
          alt="Founderland"
          src="https://images.squarespace-cdn.com/content/v1/5f58bcc144bc680d3a67282c/1626367032538-XK73EPS05FRBT7SI5NAM/Founderland?format=2500w"
        />
      </div>
    </>
  )
}

export default Navbar
