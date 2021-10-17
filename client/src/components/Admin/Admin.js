import { useState, useEffect } from "react"
import Login from "./Login"
import Main from "./Main"
import InfoModal from "../InfoModal"
import AdminContext from "../../contexts/Admin"
import jwt from "jsonwebtoken"

const views = [
  { icon: "home", name: "Dashboard" },
  { icon: "doc", name: "Ressources" },
  { icon: "groupuser", name: "Members" },
  { icon: "groupuser", name: "New Applicants" },
  { icon: "groupuser", name: "Approved Applicants" },
  { icon: "groupuser", name: "Rejected Applicants" },
  { icon: "groupuser", name: "Pending Applicants" },
  { icon: "doc", name: "Founder Form" },
  { icon: "doc", name: "Investor Form" },
  { icon: "doc", name: "Ally Form" },
  { icon: "set", name: "Settings" },
  { icon: "user", name: "Profile" },
]
const Admin = () => {
  const [token, setToken] = useState()
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
  const [selectedItem, setSelectedItem] = useState(null)
  const [memberType, setMemberType] = useState("")
  const [applicantType, setApplicantType] = useState("")

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
        selectedItem,
        setSelectedItem,
        memberType,
        setMemberType,
        applicantType,
        setApplicantType,
      }}
    >
      <InfoModal />
      {user ? <Main /> : <Login />}
    </AdminContext.Provider>
  )
}

export default Admin
