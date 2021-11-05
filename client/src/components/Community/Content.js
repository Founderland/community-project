import ResourcesList from "./Resources/ResourcesList"
import Events from "./Events"
import Profile from "./Profile/Profile"
import MapDisplay from "./Directory/MapDisplay"
import { useParams } from "react-router-dom"

const Content = () => {
  const { view } = useParams()
  let selectedView = view
  if (!view) selectedView = "community"
  return (
    <main className="overflow-x-hidden w-full h-screen">
      {selectedView === "community" && <MapDisplay />}
      {selectedView === "events" && <Events />}
      {selectedView === "resources" && <ResourcesList />}
      {selectedView === "profile" && <Profile />}
    </main>
  )
}

export default Content
