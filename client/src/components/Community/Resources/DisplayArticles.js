import React from 'react'
import bannerSymbol from '../../../assets/images/bannerSymbol.png'
import ArticleCard from './ArticleCard';


export default function DisplayArticles(props) {
   const data = props.data[0];
   
   return (
      <div className="h-full ">

         <div className="h-1/4 w-full flex justify-between bg-fred-50 bg-opacity-90 mt-5  rounded  shadow-lg items-center">
            <div className="">
               
               <h1 className="text-5xl text-white text-grotesk font-bold uppercase pl-48">{data.categoryName} </h1>
               </div>
            <div className="h-full ">
               <img className="w-full h-full object-contain" src={bannerSymbol} alt="symbols" />
               </div>
         </div>
         <div className="h-3/4 mt-10 flex justify-around flex-wrap">
            {data.articles.map((item) =>
         
              <ArticleCard data={item} />)}
         </div>

      </div>
   )
}
