import React, { useContext, useEffect, useState } from "react";
import { CommunityContext } from "../../../contexts/CommunityProvider";
import mapCard from "../../../assets/images/mapCard.svg";
import horizontalSymbols from '../../../assets/images/SymbolsHorizontal.png'

export default function Sidebar(props) {
  const { memberDetails, sidebarHandler, isSidebarSelected } =
    useContext(CommunityContext);
  const [sidebarDisplay, setSidebarDisplay] = useState([]);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});

  useEffect(() => {
    setIsCardSelected(false)
    const fiteredArray = memberDetails.filter((items) => {
      return props.data?.lat === items.lat && props.data?.lng === items.lng;
    });
    setSidebarDisplay(fiteredArray);
  }, [props.data]);



 

  const closeHandler = () => {
    sidebarHandler(false);
  };
  const memberBackHandler = () => {
 
    setIsCardSelected(false)
  };
  const cardHandler = (value) => {
    console.log("SELECTED MEMBER", value);
    setIsCardSelected(true);
    setSelectedMember(value);
    
  };

  console.log("isCardSelected", isCardSelected);
  return (
    <div>
      <div className='absolute right-0 top-0 bottom-0 pb-3 z-50  '>
        {(!isCardSelected && isSidebarSelected) ? (
          <div className='w-full h-full max-w-2xl px-5 py-6 mt-2 bg-gray-900 opacity-90  shadow flex flex-col items-evenly'>
            <div className='flex justify-end' onClick={closeHandler}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='h-6 w-6 text-gray-300'
                viewBox='0 0 1792 1792'
              >
                <path d='M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z'></path>
              </svg>
            </div>

            <div className='flex flex-col justify-center items-center pb-6 pt-4 '>
              <h1 className='text-4xl text-white  text-mono mx-4 pb-2'>
                Founders  In
              </h1>
             
              <h1 className='text-4xl text-white font-bold text-mono  mx-4'>
           {sidebarDisplay[0]?.city.toUpperCase()}{" "}
              </h1>
            </div>
            <div className="overflow-y-scroll h-full scrollbar  scrollbar-thin scrollbar-thumb-fblue scrollbar-track-blue-100 dark:scrollbar-thumb-blue-100 dark:scrollbar-track-gray-700 ">
            {sidebarDisplay?.map((item) => (
              <div class='flex max-w-md bg-white shadow-lg rounded-sm overflow-hidden m-5'>
                <div class='w-1/3 flex flex-col'>
                  <img
                    className='w-full h-4/5 object-cover'
                    src={item.img}
                    alt='profile'
                  />
                  <img
                    className='w-full h-1/5 object-cover'
                    src={mapCard}
                    alt='profile'
                  />
                </div>
                <div class='w-2/3 p-4'>
                  <h1 class='text-gray-900 font-bold text-2xl '>
                    {item.firstname}
                  </h1>
                  <h1 class='text-gray-900 font-bold text-2xl'>
                    {item.lasname}
                  </h1>
                  <p class='mt-2 text-gray-800 text-xl  font-semibold'>
                    {item.companyname && item.companyname.toUpperCase()}
                  </p>
                  <p class='mt-2 text-gray-800 text-lg font-semibold'>
                    {/* Company-website :{" "} */}
                    {item.website && item.website}
                  </p>
                  <div className='mt-4 flex justify-end '>
                    <button
                      type='button'
                      disabled=''
                      className='w-2/3 py-2  bg-fred-600 hover:bg-fred-800 focus:ring-fred-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-grotesk    font-semibold text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-80 '
                      onClick={() => cardHandler(item)}
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
          //   Member Card
            <div className='w-full  h-full max-w-2xl px-5 py-6 mt-2 bg-gray-900 opacity-90  shadow flex flex-col items-evenly '>
              
              <div className='flex justify-end' onClick={closeHandler}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='h-6 w-6 text-gray-300'
                viewBox='0 0 1792 1792'
              >
                <path d='M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z'></path>
              </svg>
              </div>
              
              <div className=' overflow-hidden shadow-lg  max-w-md bg-white shadow-lg rounded-sm overflow-hidden m-5'>
                

                
              <div className='font-bold text-4xl m-4 flex justify-center'>
                <h1>
                  {" "}
                  {selectedMember.firstname} {selectedMember.lasname}
                </h1>
              </div>
              <div className='w-full h-1/2'>
                <img
                  className='w-full h-full object-cover'
                  src={selectedMember.img}
                  alt='member'
                />
              </div>
              <div class='px-6 py-4'>
                <div class='font-bold text-xl mb-2'>{selectedMember.companyname}</div>
                <p class='text-gray-900  text-xl'>
             {selectedMember.city}
                  </p>
                  <p class='text-gray-700 text-xl'>
             {selectedMember.website}
                  </p>
                  <p class='text-gray-700 text-xl'>
             {selectedMember.vertical}
                </p>
              </div>
               <div className='w-full h-14'>
                {/* <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700  m-2'>
                  #photography
                </span> */}
                  <img className="w-full h-full object-cover" src ={horizontalSymbols} alt="symbols" />
              </div> 
              </div>
              <div className="flex  mt-4 justify-center">
              <button className="w-2/3 py-2  bg-fblue-700 hover:bg-fblue-800 focus:ring-fblue-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-grotesk   font-semibold text-lg font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-mds" onClick={memberBackHandler} > Go BACK </button> </div>
          </div>
        )}
      </div>
    </div>
  );
}
