import { Link } from "react-router-dom";
import { ReactComponent as FullLogo } from "../assets/full_logo.svg";
import { ReactComponent as TwoLinesLogo } from "../assets/2_lines_logo.svg";
import FoundersLogo from "../assets/images/Founder.png";
import InvestorsLogo from "../assets/images/Investor.gif";
import AllyLogo from "../assets/images/Ally.png";

const ApplicantsDispatcher = () => {
  return (
    <>
      <div className=" h-screen md:h-full w-full flex flex-col justify-between  ">
        <div className="flex flex-col  justify-start items-center h-1/3 md:h-1/4 ">
          <FullLogo className="hidden md:flex w-screen h-60 " />
          <TwoLinesLogo className=" sm:flex md:hidden h-auto w-screen" />
          <h3 className="text-grotesk px-10 pb-10 text-xs md:text-base">
            WE’RE HERE TO BUILD A NEW INCLUSIVE, INTERSECTIONAL STANDARD FOR
            ENTREPRENEURS
          </h3>
        </div>
        <div className=" flex flex-col justify-evenly items-center h-full w-screen md:h-1/4 ">
          <div className="h-1/4 w-1/2  md:h-4/5 md:w-full">
            <Link
              to="/form/founder"
              className=" h-full w-full flex bg-fred md:bg-white md:w-full justify-center items-center">
              <div className="hidden md:flex items-center justify-end h-full md:w-2/6 xl:w-2/6 ">
                <img
                  src={FoundersLogo}
                  alt="founder_logo"
                  className="h-full w-full"
                />
              </div>

              <div className=" flex justify-center items-center md:w-2/6   md:h-5/6 xl:w-2/6 text text-hanson text-white md:text-black text-xl xl:text-4xl  ">
                FOUNDERS
              </div>
            </Link>
          </div>

          <div className="h-1/4 w-1/2  md:h-4/5 md:w-full">
            <Link
              to="/form/founder"
              className=" h-full w-full flex flex-row-reverse bg-fblue md:bg-white md:w-full justify-center items-center ">
              <div className="hidden md:flex items-center justify-start h-full md:w-2/6 xl:w-2/6  ">
                <img
                  src={InvestorsLogo}
                  alt="Investor logo"
                  className="h-full w-full"
                />
              </div>

              <div className=" flex justify-center items-center md:w-2/6  md:h-5/6 xl:w-2/6 text text-hanson text-white md:text-black text-xl xl:text-4xl ">
                INVESTORS
              </div>
            </Link>
          </div>
          <div className="h-1/4 w-1/2  md:h-4/5 md:w-full">
            <Link
              to="/form/founder"
              className=" h-full w-full flex bg-flime md:bg-white md:w-full justify-center items-center">
              <div className="hidden md:flex items-center justify-end h-full md:w-2/6 xl:w-2/6 ">
                <img src={AllyLogo} alt="Ally logo" className="h-full w-full" />
              </div>

              <div className=" flex justify-center items-center md:w-2/6   md:h-5/6 xl:w-2/6  text text-hanson  text-xl xl:text-4xl  ">
                ALLY
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-start  w-screen h-60   md:justify-end items-center md:h-1/4  ">
          <Link
            className="flex items-center justify-center p-5 text-white text-center text-hanson  text-xl md:text-lg xl:text-3xl h-2/5 w-full  md:h-2/5 md:w-1/4 bg-black "
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
