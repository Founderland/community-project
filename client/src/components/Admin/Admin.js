import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Login from "./Login"
import Main from "./Main"
import InfoModal from "../InfoModal"
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
        history.push("/admin/dashboard")
      }
    }
  }, [])

  const logout = () => {
    localStorage.authToken = ""
    setUser(null)
    history.push("/admin")
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
