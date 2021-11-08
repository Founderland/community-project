import ResourcesList from "./Resources/ResourcesList"
import Events from "./Events/Events"
import Profile from "./Profile/Profile"
import MapDisplay from "./Directory/MapDisplay"
import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { CommunityContext } from "../../contexts/CommunityProvider"

const Content = () => {
  const { scrollUp } = useContext(CommunityContext)
  const { view } = useParams()
  let selectedView = view
  if (!view) selectedView = "community"

  useEffect(() => {
    scrollUp()
  }, [view])

  return (
    <main className="overflow-x-hidden overflow-none w-full h-screen">
      {selectedView === "community" && <MapDisplay />}
      {selectedView === "events" && <Events />}
      {selectedView === "resources" && <ResourcesList />}
      {selectedView === "profile" && <Profile />}
    </main>
  )
}

export default Content
