import { Link } from "react-router-dom";

const ApplicantsDispatcher = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col items-evenly bg-flime-light ">
        <div className="flex flex-col  justify-around items-center h-30 ">
          <h3 className="text-hanson py-4">WHO ARE YOU?</h3>
          <p className="text-grotesk px-5">
            We support women founders based in Europe who’ve faced obstacles
            tied to their ethnicity/race in their business journeys. We bring
            founders, allies and investors together to get more diverse,
            sustainable and scalable businesses funded.
          </p>
        </div>
        <div className=" flex flex-col justify-evenly  md:flex-row md:justify-evenly items-center  h-screen md:h-2/4  w-screen ">
          <Link
            className="flex relative hover-trigger  items-center justify-center px-5 bg-black text-white text-hanson  h-1/4 w-3/6 md:h-2/5 md:w-1/4 transition-colors ease-in-out duration-500 hover:bg-fred-light hover:text-black  shadow-2xl  transform  hover:-translate-y-1 hover:scale-110 duration-500 "
            to="/form/founder">
            FOUNDER
          </Link>
          <Link
            className="flex items-center justify-center px-5 bg-black text-white text-hanson h-1/4 w-3/6 md:h-2/5 md:w-1/4  transition-colors ease-in-out duration-500 hover:bg-fblue-light shadow-2xl  hover:text-black transform  hover:-translate-y-2 hover:scale-110"
            to="/form/investor">
            INVESTOR
          </Link>
          <Link
            className="flex items-center justify-center px-5 bg-black text-white text-hanson h-1/4 w-3/6 md:h-2/5 md:w-1/4 transition-colors ease-in-out duration-500 hover:bg-fpink-light hover:text-black shadow-2xl transform  hover:-translate-y-2 hover:scale-110"
            to="/form/ally">
            ALLY
          </Link>
        </div>
        <div className="flex flex-col justify-end md:justify-center items-center h-60 md:h-1/6 w-screen ">
          <Link
            className="flex items-center justify-center text-white text-hanson h-2/5 w-full  md:h-3/4 md:w-1/4 bg-black transition-colors ease-in-out duration-500 hover:bg-white shadow-xl transition-colors ease-in-out duration-500 hover:bg-white-light hover:text-black shadow-2xl transform  hover:-translate-y-2 hover:scale-110"
            to="/form/newsletter">
            NEWSLETTER
          </Link>
          <p className="hidden md:flex m-auto text-grotesk">
            Subscribe to our newsletter and stay updated
          </p>
        </div>
      </div>
    </>
  );
};

export default ApplicantsDispatcher;
