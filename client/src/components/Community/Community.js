import { useState, useEffect, useMemo } from "react"
import Login from "../Admin/Login"
import Main from "./Main"
import UserContext from "../../contexts/User"
import jwt from "jsonwebtoken"
import { useHistory } from "react-router"

const views = {
  community: { icon: "userGroup", name: "Community", hide: false },
  resources: { icon: "collection", name: "Resources", hide: false },
  events: { icon: "calendar", name: "Events", hide: false },
  profile: { icon: "user", name: "Profile", hide: true },
}
const Community = () => {
  const [token, setToken] = useState()
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(0)
  const [cModal, setCModal] = useState(false)
  const [cCModal, setCCModal] = useState(false)
  const history = useHistory()
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
    setToken(null)
    history.push("/community")
  }
  const getUuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        views,
        logout,
        token,
        setToken,
        config,
        reload,
        setReload,
        getUuid,
        cModal,
        setCModal,
        cCModal,
        setCCModal,
      }}
    >
      {user ? <Main /> : <Login />}
    </UserContext.Provider>
  )
}

export default Community
