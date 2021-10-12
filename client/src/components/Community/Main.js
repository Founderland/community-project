import { useContext } from "react"
import Menu from "./Menu"
import Content from "./Content"
import Header from "./Header"
import UserContext from "../../contexts/User"

const Main = () => {
  const { menuToggle, setMenuToggle } = useContext(UserContext)
  return (
    <div>
      <div>
        <div className="flex h-screen font-roboto">
          {/* Dark background when mobile menu showing */}
          <div
            className={`${
              menuToggle ? "block " : "hidden "
            }fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden`}
            onClick={() => setMenuToggle(false)}
          ></div>
          <Menu />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <Content />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
