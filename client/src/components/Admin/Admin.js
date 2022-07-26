import { useState, useEffect, useMemo, useRef } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import Main from "./Main"
import Login from "./Login"
import AdminContext from "../../contexts/Admin"
import jwt from "jsonwebtoken"

const views = {
  dashboard: { icon: "home", name: "Dashboard" },
  resources: { icon: "collection", name: "Resources" },
  events: { icon: "calendar", name: "Events" },
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
const rolesLabel = {
  sadmin: "Supervisor",
  admin: "Administrator",
  user: "Reviewer",
}

const Admin = () => {
  const [offset, setOffset] = useState(0)
  const history = useHistory()
  const { isExact } = useRouteMatch()
  const pageTop = useRef()
  const [token, setToken] = useState()
  const [user, setUser] = useState(null)
  const [menuToggle, setMenuToggle] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [cModal, setCModal] = useState(false)
  const [cCModal, setCCModal] = useState(false)
  const [status, setStatus] = useState("")
  const [reload, setReload] = useState("")

  const scrollUp = () => {
    pageTop.current.scrollIntoView({ behavior: "smooth" })
  }
  const getUuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  const avatarInitials = (first, last) => {
    let initials
    let lastInitial
    if (first && last) {
      lastInitial =
        last.trim().split(" ").length === 1
          ? last.trim()[0].toUpperCase()
          : last.trim().split(" ")[0][0] +
            last.trim().split(" ")[1][0]?.toUpperCase()
      initials = first[0]?.toUpperCase() + lastInitial
    } else {
      initials = ""
    }
    return initials
  }
  const clearTimeOut = () => {
    let timeOutIds = window.setTimeout(function () {}, 0)
    while (timeOutIds--) {
      window.clearTimeout(timeOutIds)
    }
  }

  useEffect(() => {
    if (localStorage.authToken) {
      setToken(localStorage.authToken)
      const decode = jwt.decode(localStorage.authToken)
      if (decode.id && decode.avatar) {
        setUser({
          id: decode.id,
          firstName: decode.firstName,
          lastName: decode.lastName,
          avatar: decode.avatar,
          role: decode.role,
        })
        if (isExact) history.push("/admin/dashboard")
      } else {
        // setUser(null)
        setToken(null)
      }
    }
  }, [token])

  const logout = () => {
    localStorage.authToken = ""
    setUser(null)
    setToken(null)
    history.push("/admin")
  }

  return (
    <AdminContext.Provider
      value={{
        pageTop,
        scrollUp,
        menuToggle,
        setMenuToggle,
        user,
        setUser,
        views,
        selectedTab,
        setSelectedTab,
        cModal,
        setCModal,
        logout,
        token,
        setToken,
        status,
        setStatus,
        reload,
        setReload,
        getUuid,
        config,
        cCModal,
        setCCModal,
        rolesLabel,
        avatarInitials,
        clearTimeOut,
        offset,
        setOffset,
      }}
    >
      {user ? <Main /> : <Login isAdminLogin />}
    </AdminContext.Provider>
  )
}

export default Admin
