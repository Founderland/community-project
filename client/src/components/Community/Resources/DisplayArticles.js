import React from 'react'
import LibrarySymbol from '../../../assets/images/banner-icons.png'

export default function DisplayArticles(props) {
   const data = props.data[0];
   
   return (
      <div className="h-full">

         <div className="h-1/4 flex justify-between bg-fpink-400 mt-20  items-center">
            <div className="">
               <h1 className="text-4xl text-white text-grotesk font-bold uppercase pl-36">{data.categoryName} </h1>
               </div>
            <div className="h-full">
               <img className="w-full h-full object-contain" src={LibrarySymbol} alt="symbols" />
               </div>
         </div>
         <div className="h-3/4">
         {data.articles.map((item) => <h1> {item.articleName}</h1>)}
         </div>

      </div>
   )
}
