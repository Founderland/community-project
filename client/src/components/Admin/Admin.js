import { useState, useEffect } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import Main from "./Main"
import Login from "./Login"
import AdminContext from "../../contexts/Admin"
import jwt from "jsonwebtoken"

const views = {
  dashboard: { icon: "home", name: "Dashboard" },
  ressources: { icon: "collection", name: "Ressources" },
  members: { icon: "groupuser", name: "Members" },
  applicants: {
    icon: "textdoc",
    name: "Applicants",
    categories: {
      new: { icon: "inboxin", name: "New Submissions" },
      pending: { icon: "clipboard", name: "Reviewed" },
      rejected: { icon: "emojisad", name: "Rejected" },
      approved: { icon: "emojihappy", name: "Approved" },
    },
  },
  forms: { icon: "emptydoc", name: "Forms" },
  settings: { icon: "set", name: "Settings" },
}
const Admin = () => {
  const history = useHistory()
  const { isExact } = useRouteMatch()
  const [token, setToken] = useState()
  const [user, setUser] = useState(null)
  const [menuToggle, setMenuToggle] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [cModal, setCModal] = useState(false)
  const [notifications, setNotifications] = useState([
    { icon: "user", text: "15 founders applicants pending review" },
    { icon: "pending", text: "4 founders applicants pending approval" },
  ])
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (localStorage.authToken) {
      setToken(localStorage.authToken)
      const decode = jwt.decode(localStorage.authToken)
      if (decode.id && decode.role) {
        setUser({
          id: decode.id,
          firstName: decode.firstName,
          lastName: decode.lastName,
          avatar: decode.avatar,
          role: decode.role,
        })
        if (isExact) history.push("/admin/dashboard")
      }
    }
  }, [])

  const logout = () => {
    localStorage.authToken = ""
    setUser(null)
    setToken(null)
    history.push("/admin")
  }

  return (
    <AdminContext.Provider
      value={{
        menuToggle,
        user,
        setUser,
        setMenuToggle,
        views,
        selectedTab,
        setSelectedTab,
        cModal,
        setCModal,
        notifications,
        setNotifications,
        logout,
        token,
        setToken,
        status,
        setStatus,
      }}
    >
      {user ? <Main /> : <Login />}
    </AdminContext.Provider>
  )
}

export default Admin
