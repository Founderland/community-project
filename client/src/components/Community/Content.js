import { useContext } from "react"
import UserContext from "../../contexts/User"

const Content = () => {
  const { views, view } = useContext(UserContext)
  return <div className="p-4">{views[view]}</div>
}

export default Content
