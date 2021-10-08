import { useState } from "react"
import Login from "./Login"
import Main from "./Main"
import AdminContext from "../../contexts/Admin"

const views = [
  "Dashboard",
  "New Applicants",
  "Founders Form",
  "Investors Form",
  "Allies Form",
  "Settings",
  "Profile",
]

const Admin = () => {
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
      }}
    >
      {user ? <Main /> : <Login />}
    </AdminContext.Provider>
  )
}

export default Admin
