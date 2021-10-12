import { useState, useEffect } from "react"
import Login from "./Login"
import Main from "./Main"
import UserContext from "../../contexts/User"
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

const Community = () => {
  const [token] = useState(localStorage.authToken)
  const [user, setUser] = useState(null)
  const [menuToggle, setMenuToggle] = useState(false)
  const [view, setView] = useState(0)
  const [notifications, setNotifications] = useState([
    { icon: "love", text: "Sasmith liked your post" },
    { icon: "anot", text: "Salvo wants to connect with you" },
  ])

  useEffect(() => {
    if (token) {
      var decode = jwt.decode(localStorage.authToken)
      if (decode?.id && decode?.role) {
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
    <UserContext.Provider
      value={{
        menuToggle,
        user,
        setUser,
        setMenuToggle,
        view,
        setView,
        changeView,
        views,
        notifications,
        setNotifications,
        logout,
        token,
      }}
    >
      {user ? <Main /> : <Login />}
    </UserContext.Provider>
  )
}

export default Community
