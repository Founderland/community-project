import axios from "axios"
import { createContext, useState, useEffect, useMemo } from "react"

export const CommunityContext = createContext(null)

function CommunityProvider({ children }) {
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.authToken}`,
        "Content-Type": "application/json",
      },
    }
  }, [])

  const memberData = [
    {
      firstname: "Ali",
      lasname: "Kakande",
      companyname: "Carib Eats",
      website: "https://www.caribeats.org/",
      city: "London",
      lat: "51.507351",
      lng: "-0.127758",
      img: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
      vertical: "D2C, Food",
    },
    {
      firstname: "Alisha",
      lasname: "Morenike Fisher",
      companyname: "Migrant's Bureau",
      website: "www.migrantsbureau.com",
      city: "London",
      lat: "51.507351",
      lng: "-0.127758",
      img: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
      vertical: "DesignTech",
    },
    {
      firstname: "Alissa",
      lasname: "Del Toro",
      companyname: "Playground Logic",
      website: "www.migrantsbureau.com",
      city: "Berlin",
      lat: "52.520008",
      lng: "13.404954",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
      vertical: "Gaming/Entertainment and HealthTech",
    },

    {
      firstname: "Antonia",
      lasname: "Opiah",
      companyname: "Un-ruly",
      website: "https://un-ruly.com",
      city: "Paris",
      lat: "48.8566",
      lng: "2.3522",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
      vertical: "E-comm/Marketplaces",
    },

    {
      firstname: "Vidya",
      lasname: "munde-muller",
      companyname: "Quantum dice",
      website: "https://www.givetastic.org/",
      city: "Hannover",
      lat: "51.507351",
      lng: "-0.127758",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
      vertical: "MediaTech",
    },

    {
      firstname: "Sonita",
      lasname: "Soth",
      companyname: "Feniska",
      website: "https://feniska.com/",
      city: "Berlin",
      lat: "52.520008",
      lng: "13.404954",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
      vertical: "Sustainability/D2C/E-Comm",
    },
    {
      firstname: "Tanya",
      lasname: "Sharma",
      companyname: "Wonderpath",
      website: "https://www.wonder-path.com/",
      city: "London",
      lat: "51.507351",
      lng: "-0.127758",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
      vertical: "CyberSecurity/B2B",
    },

    {
      firstname: "Shilpa",
      lasname: "Mahajan",
      companyname: "Hobbyt",
      website: "https://hobbYt.fun",
      city: "Amsterdam",
      lat: "52.3676",
      lng: "4.9041",
      img: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
      vertical: "FinTech",
    },
    {
      firstname: "Mariel",
      lasname: "Diaz",
      companyname: "Mini Mealtimes ",
      website: "http://triditive.com/",
      city: "Meres,Spain",
      lat: "43.373220",
      lng: "-5.742420",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
      vertical: "",
    },
    {
      firstname: "Rachel",
      lasname: "Wu",
      companyname: "Reef",
      website: "https://www.joinreef.io/",
      city: "Munich",
      lat: "48.1351",
      lng: "11.5820",
      img: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
      vertical: "",
    },
  ]

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
      } catch (error) {}
    }
    getAllFounders()
  }, [])

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
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export default CommunityProvider
