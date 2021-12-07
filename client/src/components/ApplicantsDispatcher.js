import { Link } from "react-router-dom"
import { ReactComponent as FullLogo } from "../assets/full_logo.svg"
import { ReactComponent as TwoLinesLogo } from "../assets/2_lines_logo.svg"
import { ReactComponent as SmallLogo } from "../assets/small.svg"
import FoundersLogo from "../assets/images/Founder.png"
import InvestorsLogo from "../assets/images/Investor.gif"
import AllyLogo from "../assets/images/Ally.png"

const ApplicantsDispatcher = () => {
  return (
    <>
      <div className=' h-screen md:h-full w-screen flex flex-col justify-between xl:items-center  '>
        <div className='flex flex-col justify-center items-center h-1/4 md:h-1/4 mt-20 md:mt-0 '>
          <a
            href='https://www.founderland.org/'
            className='absolute left-4 top-4 xl:top-6 xl:left-6 '>
            <SmallLogo className=' w-12 h-12 lg:w-16 lg:h-16 p-1 text-white bg-black  transform duration-400 hover:bg-white hover:text-black' />
          </a>
          <FullLogo className='hidden md:flex w-screen h-44 lg:h-60 xl:w-screen' />
          <TwoLinesLogo className=' flex md:hidden h-auto w-screen ' />
          <h3 className='text-grotesk px-10 pb-5 xl:pb-10 text-xs md:text-base lg:text-xl xl:text-2xl'>
            WE’RE HERE TO BUILD A NEW INCLUSIVE, INTERSECTIONAL STANDARD FOR
            ENTREPRENEURS
          </h3>
        </div>
        <div className=' flex flex-col justify-evenly items-center h-3/4 w-screen md:h-1/4 xl:w-4/6 xl:flex-row '>
          <div className='h-2/6 w-4/5  md:h-4/5 md:w-full xl:h-1/3 '>
            <Link
              to='/form/founder'
              className=' h-full w-full flex bg-fred md:bg-white md:w-full justify-center items-center xl:flex-col-reverse '>
              <div className='hidden md:flex items-center justify-end h-full md:w-2/6 xl:w-5/6 xl:hover:bg-fred  xl:justify-center xl:items-center xl:relative '>
                <img
                  src={FoundersLogo}
                  alt='Founders logo'
                  className=' z-10 h-full w-full xl:hover:opacity-0'
                />
                <div className='opacity-0 xl:opacity-100 absolute  z-0 flex flex-row '>
                  <h2 className=' py-5 text-grotesk text-xl text-center text-white px-3'>
                    Are you a woman based in Europe who has faced obstacles in
                    your entrepreneurial journey tied to your
                    gender/race/ethnicity, launching or scaling your business?
                  </h2>
                </div>
              </div>
              <div className=' flex justify-center items-center md:w-2/6   xl:w-2/6 text-hanson   md:flex-col xl:text-3xl '>
                <h1 className='text-white md:text-black text-2xl xl:text-4xl '>
                  FOUNDER
                </h1>
                <div className='hidden md:block  xl:hidden text-grotesk text-lg text-center px-3'>
                  Are you a woman who has faced obstacles in your
                  entrepreneurial journey tied to your gender/race/ethnicity,
                  launching or scaling your business?
                </div>
              </div>
            </Link>
          </div>

          <div className='h-2/6 w-4/5 my-3 md:m-0 md:h-4/5 md:w-full '>
            <Link
              to='/form/investor'
              className=' h-full w-full flex bg-fblue md:bg-white md:w-full justify-center items-center md:flex-row-reverse xl:flex-col-reverse'>
              <div className='hidden md:flex items-center justify-end h-full md:w-2/6 xl:w-5/6 xl:hover:bg-fblue  xl:justify-center xl:items-center xl:relative '>
                <img
                  src={InvestorsLogo}
                  alt='Investors logo'
                  className=' z-10 h-full w-full xl:hover:opacity-0'
                />
                <div className='opacity-0 xl:opacity-100 absolute  z-0 flex flex-row '>
                  <h2 className=' py-5 text-grotesk text-xl text-center text-white px-3'>
                    Are you an Angel Investor or VC committed to diversifying
                    your European pipeline? Get introduced to the impressive
                    women founders of Founderland.
                  </h2>
                </div>
              </div>
              <div className=' flex justify-center items-center md:w-2/6   xl:w-2/6 text-hanson   md:flex-col xl:text-3xl  '>
                <h1 className='text-white md:text-black text-2xl xl:text-4xl '>
                  INVESTOR
                </h1>
                <div className='hidden md:block  xl:hidden text-grotesk text-lg text-center px-3 '>
                  Are you an Angel Investor or Early Stage VC committed to
                  diversifying your European pipeline? Get introduced to the
                  impressive women founders of Founderland
                </div>
              </div>
            </Link>
          </div>
          <div className='h-2/6 w-4/5  md:h-4/5 md:w-full '>
            <Link
              to='/form/ally'
              className=' h-full w-full flex bg-flime md:bg-white md:w-full justify-center items-center xl:flex-col-reverse'>
              <div className='hidden md:flex items-center justify-end h-full md:w-2/6 xl:w-5/6 xl:hover:bg-flime  xl:justify-center xl:items-center xl:relative '>
                <img
                  src={AllyLogo}
                  alt='Ally logo'
                  className=' z-10 h-full w-full xl:hover:opacity-0'
                />
                <div className='opacity-0 xl:opacity-100 absolute  z-0 flex flex-row '>
                  <h2 className=' py-5 text-grotesk text-xl text-center px-3'>
                    Are you an individual seeking to tangibly support overlooked
                    women founders in Europe?
                  </h2>
                </div>
              </div>
              <div className=' flex justify-center items-center md:w-2/6   xl:w-2/6 text-hanson   md:flex-col xl:text-3xl  '>
                <h1 className='text-2xl xl:text-4xl '>ALLY</h1>
                <div className='hidden md:block  xl:hidden text-grotesk text-lg text-center px-3'>
                  Are you an individual seeking to tangibly support overlooked
                  women founders in Europe?
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className='flex flex-col-reverse w-screen h-1/3  md:justify-end items-center md:h-1/4  '>
          <Link
            className='flex items-center justify-center p-5 text-white text-center text-hanson  text-xl md:text-lg xl:text-3xl h-2/5 w-full  md:h-2/5 md:w-1/4 bg-black '
            to='/newsletter'>
            NEWSLETTER <br className='hidden md:flex' /> SIGN-UP
          </Link>
          <p className=' text-center md:flex text-grotesk px-5 my-4 lg:text-2xl'>
            Subscribe to our newsletter and stay updated
          </p>
        </div>
      </div>
    </>
  )
}

export default ApplicantsDispatcher
