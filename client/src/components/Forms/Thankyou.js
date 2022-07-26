import logoMdWhite from "../../assets/images/logo_md_white.png"
import arrow from "../../assets/images/arrow.svg"
import symbolVerticalBig from "../../assets/images/symbols_vertical_big.svg"
import logoLgWhite from "../../assets/images/logo_large_white.png"
import founderlandGif from "../../assets/images/founderlandThankyou.gif"
const Thankyou = () => {
  return (
    <div>
      <div className=" h-screen flex flex-col justify-end ">
        <div className="flex w-screen justify-end h-4/5 md:h-full relative">
          <div className="flex flex-col max-w-xs  md:max-w-full justify-evenly ">
            <div className="text-right flex justify-end pt-8 pr-6 md:pl-24 md:py-10 md:justify-start">
              <img
                className="xl:w-64 2xl:w-72 md:w-56 w-20 "
                src={arrow}
                alt="Logo"
              />
            </div>
            <div className="w-full text-hanson  pr-6  text-right md:text-left py-10 md:py-5 md:pl-24 ">
              <h1 className="text-5xl md:text-6xl lg:text-7 xl:lg:text-7  2xl:text-9xl">
                THANK YOU
              </h1>
            </div>
            <div className="w-full text-grotesk pr-6 text-right md:text-left  md:px-24">
              <h1 className="text-lg md:text-2xl  lg:text-2xl xl:text-4xl">
                Thanks for showing interest in our growing community! We will be
                in touch within a few weeks.
              </h1>
            </div>
            <div className="flex justify-start pl-24 py-10 mt-4 pr-6 md:mt-10">
              <a
                href="https://www.founderland.org"
                className="bg-fblue hover:bg-fblue-dark transition ease-in-out duration-600  text-white font-bold py-2 px-2 md:py-4 md:px-4 border border-black-700 text-mono md:text-lg xl:text-2xl "
              >
                RETURN TO HOMEPAGE
              </a>
            </div>
          </div>

          <div className="hidden bg-black items-center justify-center md:flex sm:w-4/12 md:w-2/12 xl:w-1/12">
            <img
              className="md:h-3/4  md:object-fit "
              src={logoLgWhite}
              alt="Logo"
            />
          </div>

          <div className=" self-end md:w-2/12 lg:w-1/12 relative">
            <img
              className="md:w-full md:object-fit"
              src={symbolVerticalBig}
              alt="Logo"
            />
            <div className=" hidden lg:flex lg:w-full absolute inset-x-0 bottom-0">
              <img
                className="lg:w-full lg:object-fit"
                src={founderlandGif}
                alt="Gif"
              />
            </div>
          </div>
        </div>

        <div className="h-1/6 bg-black flex justify-end items-center p-6 md:hidden">
          <div>
            <img src={logoMdWhite} alt="Logo" />
          </div>
        </div>

        {/* Gif */}
      </div>

      {/* For desktop  */}
    </div>
  )
}

export default Thankyou
