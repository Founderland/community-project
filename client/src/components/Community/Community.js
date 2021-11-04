import { useState, useEffect } from "react"
import Login from "../Admin/Login"
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
  const [token, setToken] = useState()
  const [user, setUser] = useState(null)
  const [view, setView] = useState(0)
  const [notifications, setNotifications] = useState([
    { icon: "love", text: "Sasmitha liked your post" },
    { icon: "anot", text: "Salvo wants to connect with you" },
  ])

  useEffect(() => {
    if (localStorage.authToken) {
      setToken(localStorage.authToken)
      const decode = jwt.decode(localStorage.authToken)
      if (decode.id && !decode.avatar) {
        setUser({
          id: decode.id,
          firstName: decode.firstName,
          lastName: decode.lastName,
          email: decode.email,
          role: decode.role,
        })
      } else {
        setUser(null)
        setToken(null)
      }
    }
  }, [token])

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
        setToken,
      }}>
      {user ? <Main /> : <Login />}
    </UserContext.Provider>
  )
}

export default Community
