import React, { useContext, useEffect, useState } from "react"
import { CommunityContext } from "../../../contexts/CommunityProvider"
import mapCard from "../../../assets/images/mapCard.svg"
import { useHistory } from "react-router"
import { XIcon } from "@heroicons/react/outline"

export default function Sidebar(props) {
  const {
    memberDetails,
    sidebarHandler,
    isSidebarSelected,
    isNameSelected,
    isNameSelectedEvent,
  } = useContext(CommunityContext)
  const [sidebarDisplay, setSidebarDisplay] = useState([])
  const [isCardSelected, setIsCardSelected] = useState(false)
  // const [selectedMember, setSelectedMember] = useState({})
  const history = useHistory()
  useEffect(() => {
    setIsCardSelected(false)
    const fiteredArray = memberDetails.filter((items) => {
      return (
        props.data?.lat === items.geoLocation?.lat &&
        props.data?.lng === items.geoLocation?.lng
      )
    })
    setSidebarDisplay(fiteredArray)
  }, [props.data])

  // useEffect(() => {
  //   if (isNameSelected) {
  //     setSelectedMember(selectedName)
  //   }
  // }, [selectedName, isNameSelected])

  const closeHandler = () => {
    sidebarHandler(false)
    isNameSelectedEvent(false)
  }
  const memberBackHandler = () => {
    setIsCardSelected(false)
  }

  const profileButtonHandler = (id) => {
    history.push(`/community/profile/${id}`)
    sidebarHandler(false)
  }

  return (
    <div className="absolute right-0 top-0 bottom-0 pb-3 z-50 m-2 md:mr-4 max-w-lg">
      <div className="h-full px-5 py-4 mt-2 bg-gray-900 opacity-90 shadow-xl flex flex-col items-evenly">
        <div className="flex justify-end" onClick={closeHandler}>
          <XIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col justify-center items-center pb-2 pt-2">
          <h1 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-white text-mono mx-auto">
            Founders In
          </h1>
          <h1 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-white font-bold text-mono mx-auto">
            {sidebarDisplay[0]?.city.toUpperCase()}
          </h1>
        </div>
        <div className="overflow-y-scroll h-full scrollbar scrollbar-thin scrollbar-thumb-fblue scrollbar-track-blue-100">
          {sidebarDisplay?.map((item) => (
            <div className=" flex flex-col items-center md:items-stretch md:flex md:flex-row max-w-md bg-white shadow-lg rounded-sm overflow-hidden m-5">
              <div className="w-1/2 md:w-1/3 flex flex-col mt-2 md:mt-0 ">
                <img
                  className="w-full h-4/5 object-cover"
                  src={item.photo && item.photo.url}
                  alt="profile"
                />
                <img
                  className="w-full h-1/5 object-cover"
                  src={mapCard}
                  alt="profile"
                />
              </div>
              <div className="flex-grow flex flex-col w-3/4 md:w-2/3 p-4">
                <h1 className="text-gray-900 font-bold text-base md:text-lg lg:text-xl 2xl:text-xl">
                  {item.firstName + " " + item.lastName}
                </h1>
                <p className="py-2 text-gray-800 text-xs lg:text-sm 2xl:text-base ">
                  {item.companyName && item.companyName.toUpperCase()}
                </p>
                <p className="mb-2 text-gray-800 text-xs lg:text-sm 2xl:text-base ">
                  {item.title && item.title.toUpperCase()}
                </p>
                <div className="self-end my-auto flex w-full">
                  <button
                    type="button"
                    disabled=""
                    className="min-w-min px-4 py-2 bg-fred-600 hover:bg-fred-800 focus:ring-fred-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-grotesk text-xs md:text-sm lg:text-base 2xl:text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-80 "
                    onClick={() => profileButtonHandler(item._id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
