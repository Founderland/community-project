import { useState, useEffect } from "react"
import Login from "./Login"
import Main from "./Main"
import UserContext from "../../contexts/User"
import jwt from "jsonwebtoken"

const views = [
  "newsfeed",
  "community",
  "events",
  "ressources",
  "inbox",
  "profile",
  "settings",
]

const Community = () => {
  const [token] = useState(localStorage.authToken)
  const [user, setUser] = useState(null)
  const [view, setView] = useState(0)
  const [notifications, setNotifications] = useState([
    { icon: "love", text: "Sasmitha liked your post" },
    { icon: "anot", text: "Salvo wants to connect with you" },
  ])

  useEffect(() => {
    if (token) {
      var decode = jwt.decode(token)
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
  }
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
