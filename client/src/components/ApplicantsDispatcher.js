import { Link } from "react-router-dom";
import { ReactComponent as FullLogo } from "../assets/full_logo.svg";
import { ReactComponent as TwoLinesLogo } from "../assets/2_lines_logo.svg";

const ApplicantsDispatcher = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col items-evenly  ">
        <div className="flex flex-col  justify-start items-center h-1/3 md:h-1/3 ">
          <FullLogo className="hidden md:flex w-screen h-auto" />
          <TwoLinesLogo className=" sm:flex md:hidden h-auto w-screen" />
          <h3 className="text-grotesk px-10 pb-10 text-xs md:text-base">
            WE’RE HERE TO BUILD A NEW INCLUSIVE, INTERSECTIONAL STANDARD FOR
            ENTREPRENEURS
          </h3>
        </div>
        <div className=" flex flex-col justify-evenly  md:flex-row md:justify-evenly items-center  h-screen md:h-1/4  w-screen ">
          <Link
            className="flex relative hover-trigger  items-center justify-center px-5  bg-fred  text-hanson text-2xl xl:text-4xl h-1/4 w-3/6 md:h-4/5 md:w-1/4 transition-colors ease-in-out hover:text-black  hover:shadow-2xl  transform  hover:-translate-y-1 hover:scale-102 duration-900 "
            to="/form/founder">
            FOUNDER
          </Link>
          <Link
            className="flex items-center justify-center px-5 bg-fblue  text-hanson  text-2xl xl:text-4xl h-1/4 w-3/6 md:h-4/5 md:w-1/4  transition-colors ease-in-out duration-500  hover:shadow-2xl  hover:text-black transform  hover:-translate-y-1 hover:scale-102"
            to="/form/investor">
            INVESTOR
          </Link>
          <Link
            className="flex items-center justify-center px-5 bg-flime text-hanson  text-2xl xl:text-4xl h-1/4 w-3/6 md:h-4/5 md:w-1/4 transition-colors ease-in-out duration-500   hover:shadow-2xl transform  hover:-translate-y-1 hover:scale-102"
            to="/form/ally">
            ALLY
          </Link>
        </div>
        <div className="flex flex-col-reverse justify-start  w-screen h-60 md:flex-col  md:justify-center items-center md:h-2/5  ">
          <Link
            className="flex items-center justify-center text-white text-center text-hanson  text-xl md:text-lg xl:text-3xl h-2/5 w-full  md:h-2/5 md:w-1/4 bg-black transition-colors ease-in-out duration-500  transition-colors ease-in-out duration-500   hover:shadow-2xl transform  md:hover:-translate-y-1 hover:scale-102"
            to="/form/newsletter">
            NEWSLETTER <br className="hidden md:flex" /> SIGN-UP
          </Link>
          <p className=" text-center md:flex  text-grotesk px-5 my-4 ">
            Subscribe to our newsletter and stay updated
          </p>
        </div>
      </div>
    </>
  );
};

export default ApplicantsDispatcher;
