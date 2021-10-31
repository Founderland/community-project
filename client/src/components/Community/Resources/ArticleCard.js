import React from 'react'

import sidebarImg from '../../../assets/images/imageSidebar.svg'
import cardImg from '../../../assets/images/cardWomen.jpg'
import forwardArrow from '../../../assets/images/fowardArrow.png'
export default function ArticleCard(props) {
   const data = props.data;
console.log("FROM CARD",data.articleSubmittedDate)
  return (
     <div>
    

      <div className="py-5 px-3 md:mt-10 ">  

      <div className="max-w-sm overflow-hidden shadow-lg w-80 bg-fcard bg-opacity-90 text-white text-center ">
        <div className="flex ">

          <img className="w-4/5" src={cardImg} alt="women" />
          <div className="w-1/5 ">
          <img className="w-full h-full object-fill " src={sidebarImg} alt="Mountain" />
          </div>
         
          </div>
      <div className="6px-6 py-4">
        <div className="font-bold text-black text-xl mb-2  font-mono">{data.articleName}</div>
        <p className="  text-black text-base text-mono">
          Description : <span class="text-black"> { data.articleDescription }</span>
        </p>
      
      </div>
      <div className=" pl-6 pr-2 pt-4 pb-2 flex justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Submitted date : { data.articleSubmittedDate }</span>
       <img className="w-10" src={forwardArrow} alt =" " />
      </div>
      </div>
    
  </div>   
  </div>
    
   )
}
