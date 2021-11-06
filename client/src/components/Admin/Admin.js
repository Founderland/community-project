import { useState, useEffect, useMemo } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import Main from "./Main"
import Login from "./Login"
import AdminContext from "../../contexts/Admin"
import jwt from "jsonwebtoken"

const views = {
  dashboard: { icon: "home", name: "Dashboard" },
  resources: { icon: "collection", name: "Resources" },
  events: { icon: "calendar", name: "Events" },
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
const rolesLabel = {
  sadmin: "Supervisor",
  admin: "Administrator",
  user: "Reviewer",
}

const Admin = () => {
  const history = useHistory()
  const { isExact } = useRouteMatch()
  const [token, setToken] = useState()
  const [user, setUser] = useState(null)
  const [menuToggle, setMenuToggle] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [cModal, setCModal] = useState(false)
  const [cCModal, setCCModal] = useState(false)
  const [notifications, setNotifications] = useState([
    { icon: "user", text: "15 founders applicants pending review" },
    { icon: "pending", text: "4 founders applicants pending approval" },
  ])
  const [status, setStatus] = useState("")
  const [reload, setReload] = useState("")
  const getUuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  useEffect(() => {
    if (localStorage.authToken) {
      setToken(localStorage.authToken)
      const decode = jwt.decode(localStorage.authToken)
      if (decode.id && decode.avatar) {
        setUser({
          id: decode.id,
          firstName: decode.firstName,
          lastName: decode.lastName,
          avatar: decode.avatar,
          role: decode.role,
        })
        if (isExact) history.push("/admin/dashboard")
      } else {
        // setUser(null)
        setToken(null)
      }
    }
  }, [token])

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
        setMenuToggle,
        user,
        setUser,
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
        reload,
        setReload,
        getUuid,
        config,
        cCModal,
        setCCModal,
        rolesLabel,
      }}
    >
      {user ? <Main /> : <Login isAdminLogin />}
    </AdminContext.Provider>
  )
}

export default Admin
