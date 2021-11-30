import axios from "axios"
import { createContext, useState, useEffect, useMemo, useRef } from "react"

export const CommunityContext = createContext(null)

function CommunityProvider({ children }) {
  const pageTop = useRef()
  const [refreshData, setRefreshData] = useState(0)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.authToken}`,
        "Content-Type": "application/json",
      },
    }
  }, [])

  useEffect(() => {
    const getAllFounders = async () => {
      try {
        const allFounders = await axios.get(
          "/api/users/community/members/founder",
          config
        )
        if (allFounders) {
          setMemberDetails(allFounders.data.data)
        } else {
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllFounders()
  }, [refreshData])

  const scrollUp = () => {
    pageTop.current.scrollIntoView({ behavior: "smooth" })
  }

  const [category, setCategory] = useState(false)
  const [memberDetails, setMemberDetails] = useState([])
  const [isSidebarSelected, setIssideSelected] = useState(false)
  const [selectedName, setSelectedName] = useState("")
  const [isNameSelected, setIsNameselected] = useState(false)

  //  useEffect(() => {
  //    setMemberDetails(memberData)
  //  }, [])

  const isNameSelectedEvent = (val) => {
    setIsNameselected(val)
  }
  const selectedNameEvent = (val) => {
    setSelectedName(val)
  }

  const categoryHandler = (value) => {
    setCategory(value)
  }
  const sidebarHandler = (value) => {
    setIssideSelected(value)
  }

  return (
    <CommunityContext.Provider
      value={{
        categoryHandler: categoryHandler,
        category: category,
        memberDetails: memberDetails,
        sidebarHandler: sidebarHandler,
        isSidebarSelected: isSidebarSelected,
        isNameSelectedEvent: isNameSelectedEvent,
        isNameSelected: isNameSelected,
        selectedNameEvent: selectedNameEvent,
        selectedName: selectedName,
        scrollUp,
        setRefreshData,
      }}>
      <span ref={pageTop}></span>
      {children}
    </CommunityContext.Provider>
  )
}

export default CommunityProvider
