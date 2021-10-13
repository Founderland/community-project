import { useContext } from "react"
import UserContext from "../../contexts/User"

const Content = () => {
  const { views, view } = useContext(UserContext)
  return views[view]
}

export default Content
