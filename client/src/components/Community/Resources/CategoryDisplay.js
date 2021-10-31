import React, { useContext } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import WelcomeGuide from "../../../assets/images/welcomeguide.png";
import Resources from "../../../assets/images/Resources.png";
import Video from "../../../assets/images/Videos.png";
import guideClicked from "../../../assets/images/guideclicked.svg";
import resourceclicked from "../../../assets/images/resourceClicked.svg";
import videoClicked from "../../../assets/images/videosClicked.svg";
import guidesmall from "../../../assets/images/welcomeguideSmall.svg"
import resourceSmall from "../../../assets/images/heartSmall.svg"
import videosSmall from "../../../assets/images/videosSmall.svg"
import { CommunityContext } from "../../../contexts/CommunityProvider";

export default function CategoryDisplay(props) {
  const data = props.data;
  const isActive = props.active;
  let history = useHistory();
  const { view } = useParams();
  const { category, categoryHandler } = useContext(CommunityContext);

  const categoryClickHandler = () => {
    categoryHandler(data.path);
    history.push(data.path);
  };

  const findBg = () => {
    console.log(category);
    switch (category) {
      case "welcome-guide":
        return "bg-fpink";
      case "resources":
        return "bg-fblue";
      case "videos":
        return "bg-fred";
      default:
        break;
    }
  };

  return (
    <>
    <Link className="hidden xl:flex" to={`/community/resources/${data.path}`}>
      <div
           className={`flex mb-14 ${isActive && findBg()}`}
        onClick={categoryClickHandler}
      >
        {/* {category!==data.path || data.path==="resources" ?  <img classname="" src={folder} alt="folder" /> : <img classname="" src={redFolder} alt="folder" />} */}

        {data.categoryName === "Welcome Guide" && (
          <img
            classname=''
            src={isActive ? guideClicked : WelcomeGuide}
            alt='welcomeguide'
          />
        )}
        {data.categoryName === "Resources" && (
          <img
            classname=''
            src={isActive ? resourceclicked : Resources}
            alt='rsources'
          />
        )}
        {data.categoryName === "Videos" && (
          <img
            classname=''
            src={isActive ? videoClicked : Video}
            alt='resources'
          />
        )}

        <div className='flex items-center '>
          <h1
            className={` ${
              isActive ? "text-white" : "text-black"
            } text-grotesk font-semibold lg:text-2xl xl:text-2xl 2xl:text-3xl p-2 `}
          >
            {" "}
            {data.categoryName}
          </h1>
        </div>
      </div>
      </Link>

      <Link className={`block xl:hidden w-1/3 text-center ${isActive && findBg()}`} to={`/community/resources/${data.path}`}>
       {/* mobile version */}
       <div
          className={`flex flex-col `}
          onClick={categoryClickHandler}
        >
          {data.categoryName === "Welcome Guide" && (
            <img
              classname='w-16 m-4 '
              src={guidesmall}
              alt='welcomeguide'
            />
          )}
          {data.categoryName === "Resources" && (
            <img
              classname='w-16 m-4'
              src={resourceSmall}
              alt='rsources'
            />
          )}
          {data.categoryName === "Videos" && (
            <img
              classname='w-16 m-4'
              src={videosSmall}
              alt='resources'
            />
          )}

          <div className='flex justify-center w-full'>
            <h1
              className={` ${
                isActive ? "text-white" : "text-black"
              } text-grotesk font-semibold text-2xl p-2 `}
            >
              {" "}
              {data.categoryName}
            </h1>
          </div>
        </div>
      </Link>
      </>
  );
}
