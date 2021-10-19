import { useState, useEffect } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import Login from "./Login"
import Main from "./Main"
import InfoModal from "./Widgets/InfoModal"
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
  const path = useRouteMatch()
  const [token, setToken] = useState()
  const [user, setUser] = useState(null)
  const [menuToggle, setMenuToggle] = useState(false)
  const [selectTab, setSelectTab] = useState(null)
  const [modalMessage, setModalMessage] = useState({
    icon: "",
    title: "",
    message: "",
  })
  const [iModal, setIModal] = useState(false)
  const [cModal, setCModal] = useState(false)
  const [notifications, setNotifications] = useState([
    { icon: "user", text: "15 founders applicants pending review" },
    { icon: "pending", text: "4 founders applicants pending approval" },
  ])
  const [selectedItem, setSelectedItem] = useState(null)
  const [memberType, setMemberType] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (localStorage.authToken) {
      setToken(localStorage.authToken)
      var decode = jwt.decode(localStorage.authToken)
      if (decode.id && decode.role) {
        setUser({
          id: decode.id,
          firstName: decode.firstName,
          lastName: decode.lastName,
          avatar: decode.avatar,
          role: decode.role,
        })
        if (path === "/admin") history.push("/admin/dashboard")
      }
    }
  }, [])

  const logout = () => {
    localStorage.authToken = ""
    setUser(null)
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
        selectTab,
        setSelectTab,
        modalMessage,
        setModalMessage,
        iModal,
        setIModal,
        cModal,
        setCModal,
        notifications,
        setNotifications,
        logout,
        token,
        selectedItem,
        setSelectedItem,
        memberType,
        setMemberType,
        status,
        setStatus,
      }}
    >
      <InfoModal />
      {user ? <Main /> : <Login />}
    </AdminContext.Provider>
  )
}

export default Admin
