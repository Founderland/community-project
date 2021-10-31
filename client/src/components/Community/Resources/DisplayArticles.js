import React from 'react'
import bannerSymbol from '../../../assets/images/bannerSymbol.png'
import ArticleCard from './ArticleCard';
import SlideShow from './SlideShow';


export default function DisplayArticles(props) {
   const data = props.data[0];
   let headerColor=""
   if (data.categoryName === "Welcome Guide") {
      headerColor = "fpink"
   } else if (data.categoryName === "Resources") {
      headerColor = "fblue"
   } else {
     headerColor = "fred"
   }
          
   
   
   return (
      <div className="h-full ">

         <div className={`hidden xl:h-1/4 w-full xl:flex justify-between  bg-${headerColor} bg-opacity-90 mt-5 shadow-lg items-center `} >
            <div className="">
               
               <h1 className="lg-text-5xl  xl:text-6xl text-white text-grotesk font-bold uppercase pl-48">{data.categoryName} </h1>
               </div>
            <div className="h-full ">
               <img className="w-full h-full object-contain" src={bannerSymbol} alt="symbols" />
               </div>
         </div>
         <div className=" h-2/3 xl:h-3/4 mt-2 flex justify-around flex-wrap">
            {data.articles ?  data.articles.map((item) =>
         
              <ArticleCard data={item} />) :<div className="w-full h-full"> <SlideShow /></div>}
         </div>

      </div>
   )
}
