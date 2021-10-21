import React from 'react'
import bookImg from "../../../assets/images/bookImg.jfif"

export default function ArticleCard(props) {
   const data = props.data;
console.log("FROM CARD",data.articleSubmittedDate)
   return (
      <div class="py-5 px-3 ">  

    <div class="max-w-sm rounded overflow-hidden shadow-lg  w-80 bg-black bg-opacity-90 text-white text-center ">
 <img class="w-full max-h-36" src={bookImg} alt="Mountain" /> 
      <div class="6px-6 py-4">
        <div class="font-bold text-xl mb-2 shadow-lg font-mono">{data.articleName}</div>
        <p class="text-white-700 text-base text-mono">
          Description : <span class="text-gray-400"> { data.articleDescription }</span>
        </p>
        {/* <p class="text-white text-base text-mono">
          Calories : <span class="text-gray-400"> 123</span>
        </p> */}
        {/* <p class="text-white text-base text-mono">
          Type : <span class="text-gray-400"> 3434</span>
        </p> */}
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Submitted date : { data.articleSubmittedDate }</span>
        {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
      </div>
    </div>
  </div>
   )
}
