import { useState, useEffect, useMemo } from "react"
import Login from "../Admin/Login"
import Main from "./Main"
import UserContext from "../../contexts/User"
import jwt from "jsonwebtoken"
import { useHistory } from "react-router"

const views = ["community", "events", "resources", "profile"]

const Community = () => {
  const [token, setToken] = useState()
  const [user, setUser] = useState(null)
  const [view, setView] = useState(0)
  const history = useHistory()
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
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  const logout = () => {
    localStorage.authToken = ""
    setUser(null)
    setToken(null)
    history.push("/community")
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
        logout,
        token,
        setToken,
        config,
      }}
    >
      {user ? <Main /> : <Login />}
    </UserContext.Provider>
  )
}

export default Community
