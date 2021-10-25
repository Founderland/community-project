import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import WelcomeGuide from '../../../assets/images/CodeOfConduct.png'
import Resources from '../../../assets/images/Resources.png'
import Video from '../../../assets/images/Videos.png'
import guideClicked from '../../../assets/images/guideclicked.svg'
import resourceclicked from '../../../assets/images/resourceClicked.svg'
import videoClicked from '../../../assets/images/videosclicked.svg'
import { CommunityContext } from '../../../contexts/CommunityProvider';

export default function CategoryDisplay(props) {
   const data = props.data;
   const isActive = props.active;
   let history = useHistory();
   const { view } = useParams()
   const { category, categoryHandler } = useContext(CommunityContext)

   const categoryClickHandler = () => {
      categoryHandler(data.path)
      history.push(data.path);
   }

   const findBg = () => {
      switch (category) {
         case "welcome-guide":
            return "bg-fpink"
         case "resources":
            return "bg-fblue"
         case "videos":
            return "bg-fred"
         default:
            break;
      }
   }
   


   return (
      <Link to={`/community/resources/${data.path}`}>
         <div className={`flex mb-14 ${isActive && findBg()}`} onClick={categoryClickHandler }>
         
            {/* {category!==data.path || data.path==="resources" ?  <img classname="" src={folder} alt="folder" /> : <img classname="" src={redFolder} alt="folder" />} */}

            {data.categoryName === "Welcome Guide" && <img classname="" src={isActive?guideClicked:WelcomeGuide} alt="welcomeguide" />}
            {data.categoryName === "Resources" && <img classname="" src={isActive?resourceclicked:Resources} alt="rsources" />}
            {data.categoryName==="Videos" && <img classname="" src={isActive?videoClicked:Video} alt="resources" />}

            <div className="flex items-center ">
               <h1 className={` ${isActive ? "text-white" : "text-black"} text-grotesk font-semibold lg:text-2xl xl:text-2xl 2xl:text-3xl p-2 `}> {data.categoryName}</h1>
               </div>
         </div>
         
      </Link>
   )
}

