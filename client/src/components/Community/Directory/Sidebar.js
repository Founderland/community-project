import React, { useContext, useEffect, useState } from "react"
import { CommunityContext } from "../../../contexts/CommunityProvider"
import mapCard from "../../../assets/images/mapCard.svg"
import horizontalSymbols from "../../../assets/images/SymbolsHorizontal.png"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"

export default function Sidebar(props) {
  const {
    memberDetails,
    sidebarHandler,
    isSidebarSelected,
    selectedName,
    isNameSelected,
    isNameSelectedEvent,
  } = useContext(CommunityContext)
  const [sidebarDisplay, setSidebarDisplay] = useState([])
  const [isCardSelected, setIsCardSelected] = useState(false)
  const [selectedMember, setSelectedMember] = useState({})
  const history = useHistory()
  useEffect(() => {
    setIsCardSelected(false)
    const fiteredArray = memberDetails.filter((items) => {
      return (
        props.data?.lat === items.geoLocation.lat &&
        props.data?.lng === items.geoLocation.lng
      )
    })
    setSidebarDisplay(fiteredArray)
  }, [props.data])

  useEffect(() => {
    if (isNameSelected) {
      setSelectedMember(selectedName)
    }
  }, [selectedName, isNameSelected])

  const closeHandler = () => {
    sidebarHandler(false)
    isNameSelectedEvent(false)
  }
  const memberBackHandler = () => {
    setIsCardSelected(false)
  }
  // const cardHandler = (value) => {
  //   console.log("SELECTED MEMBER", value);
  //   setIsCardSelected(true);
  //   setSelectedMember(value);

  // };
  const profileButtonHandler = (id) => {
    history.push(`/community/profile/${id}`)
    sidebarHandler(false)
  }

  return (
    <div>
      <div className="  absolute right-0 top-0 bottom-0 pb-3 z-50 m-2 md:mr-4 ">
        {!isCardSelected && isSidebarSelected && !isNameSelected ? (
          <div className=" w-full md:w-10/12 md:w-full h-full max-w-2xl px-5 py-6 mt-2 bg-gray-900 opacity-90  shadow flex flex-col items-evenly">
            <div className="flex justify-end" onClick={closeHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="h-6 w-6 text-gray-300"
                viewBox="0 0 1792 1792"
              >
                <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
              </svg>
            </div>

            <div className="flex flex-col justify-center items-center pb-6 pt-4 ">
              <h1 className=" text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl text-white  text-mono mx-4 pb-2">
                Founders In
              </h1>

              <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl text-white font-bold text-mono  mx-4">
                {sidebarDisplay[0]?.city.toUpperCase()}{" "}
              </h1>
            </div>
            <div className="overflow-y-scroll h-full scrollbar  scrollbar-thin scrollbar-thumb-fblue scrollbar-track-blue-100 dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700 ">
              {sidebarDisplay?.map((item) => (
                <div className="flex flex-col items-center md:items-stretch md:flex md:flex-row   max-w-md bg-white shadow-lg rounded-sm overflow-hidden m-5">
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
                  <div className="w-3/4 md:w-2/3 p-4">
                    <h1 className="text-gray-900 font-bold text-lg md:text-xl lg:text-2xl 2xl:text-3xl ">
                      {item.firstName + " " + item.lastName}
                    </h1>

                    <p className="mt-2 text-gray-800 text-base md:text-lg lg:text-xl 2xl:text-2xl ">
                      {item.companyName && item.companyName.toUpperCase()}
                    </p>
                    <p className="mt-2 text-gray-800 text-sm md:text-base lg:text-lg 2xl:text-xl font-semibold">
                      {/* Company-website :{" "} */}
                      {item.companyLink && item.companyLink}
                    </p>
                    <div className="mt-4 flex ">
                      <button
                        type="button"
                        disabled=""
                        className=" w-full md:w-2/3 py-2  bg-fred-600 hover:bg-fred-800 focus:ring-fred-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-grotesk    font-semibold text-sm md:text-base lg:text-lg 2xl:text-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-80 "
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
        ) : (
          <div></div>

          //   Member Card
          //   (isCardSelected || isNameSelected) && (

          //   <div className='w-full  h-full max-w-2xl  px-8 py-6 mt-2  bg-gray-900 opacity-90  shadow flex flex-col items-evenly '>

          //     <div className='flex justify-end' onClick={closeHandler}>
          //     <svg
          //       xmlns='http://www.w3.org/2000/svg'
          //       width='16'
          //       height='16'
          //       fill='currentColor'
          //       className='h-6 w-6 text-gray-300'
          //       viewBox='0 0 1792 1792'
          //     >
          //       <path d='M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z'></path>
          //     </svg>
          //     </div>

          //     <div className=' overflow-hidden shadow-lg  max-w-md bg-white shadow-lg rounded-sm overflow-hidden m-5'>

          //     <div className='font-bold text-2xl md:text-4xl m-4 flex justify-center'>
          //       <h1>
          //         {" "}
          //         {selectedMember?.firstName} {selectedMember?.lastname}
          //       </h1>
          //     </div>
          //     <div className='w-full h-1/2'>
          //       <img
          //         className='w-full h-full object-cover'
          //         src={selectedMember.img}
          //         alt='member'
          //       />
          //     </div>
          //     <div className='px-6 py-4'>
          //       <div className='font-bold text-lg md:text-xl mb-2'>{(selectedMember?.companyname)?.toUpperCase()}</div>
          //       <p className='text-gray-900 text-base md:text-xl'>
          //    {selectedMember.city}
          //         </p>
          //         <p className='text-gray-700 text-base md:text-xl'>
          //    {selectedMember.website}
          //         </p>
          //         <p className='text-gray-700 text-base md:text-xl'>
          //    {selectedMember.vertical}
          //       </p>
          //     </div>
          //      <div className='w-full h-20'>
          //       {/* <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700  m-2'>
          //         #photography
          //       </span> */}
          //         <img className="w-full h-full object-cover" src ={horizontalSymbols} alt="symbols" />
          //     </div>
          //       </div>
          //       {
          //        !isNameSelected &&

          //     <div className="flex  mt-4 justify-center">
          //     <button className="w-2/3 py-2  bg-fblue-700 hover:bg-fblue-800 focus:ring-fblue-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-grotesk   font-semibold text-base md:text-lg font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-mds" onClick={memberBackHandler} > Go BACK </button> </div>   }
          // </div>)
        )}
      </div>
    </div>
  )
}
