import { useState, useEffect } from "react"
import Login from "./Login"
import Main from "./Main"
import InfoModal from "../InfoModal"
import AdminContext from "../../contexts/Admin"
import jwt from "jsonwebtoken"

const views = [
  "Dashboard",
  "New Applicants",
  "Founder Form",
  "Investor Form",
  "Ally Form",
  "Settings",
  "Profile",
]

const Admin = () => {
  const [token] = useState(localStorage.authToken)
  const [user, setUser] = useState(null)
  const [menuToggle, setMenuToggle] = useState(false)
  const [view, setView] = useState(0)
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

  useEffect(() => {
    if (token) {
      var decode = jwt.decode(localStorage.authToken)
      if (decode.id && decode.role) {
        setUser({
          id: decode.id,
          firstName: decode.firstName,
          lastName: decode.lastName,
          avatar: decode.avatar,
          role: decode.role,
        })
      }
    }
  }, [])

  const logout = () => {
    localStorage.authToken = ""
    setUser(null)
  }
  const changeView = (view) => {
    setView(view)
    setMenuToggle(!menuToggle)
  }
  return (
    <AdminContext.Provider
      value={{
        menuToggle,
        user,
        setUser,
        setMenuToggle,
        view,
        setView,
        changeView,
        views,
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
      }}
    >
      <InfoModal />
      {user ? <Main /> : <Login />}
    </AdminContext.Provider>
  )
}

export default Admin
