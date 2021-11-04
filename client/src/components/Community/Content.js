import { useContext } from "react"
import ResourcesList from "./Resources/ResourcesList"
import Events from "./Events"
import Profile from "./Profile/Profile"
import MapDisplay from "./Directory/MapDisplay"
import UserContext from "../../contexts/User"

const Content = () => {
  const { view } = useContext(UserContext)
  return (
    <main className="overflow-x-hidden w-full h-screen md:px-4 ">
      {view === 0 && <MapDisplay />}
      {view === 1 && <Events />}
      {view === 2 && <ResourcesList />}
      {view === 3 && <Profile />}
    </main>
  )
}

export default Content
