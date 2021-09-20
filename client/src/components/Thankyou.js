import logoMdWhite from '../assets/images/logo_md_white.png'
import symbolVertical from '../assets/images/symbols_vertical.png'
import arrowMobile from '../assets/images/arrow_mobile.png'
import smallArrow from '../assets/images/smallArrow.png'


const Thankyou = () => {
   return (
      
      <div>
       <div className="flex h-screen flex-col ">
           
            <div className="flex w-full justify-end h-4/5">
               <div className="flex flex-col max-w-xs justify-evenly" >
                  <div className="text-right flex justify-end pr-8">
                  <img src={arrowMobile} alt="Logo" />
                  </div>
               <div className="w-full text-hanson   pr-8  text-right ">
                  <h1 className="text-5xl"> THANK YOU </h1>
               </div>
               <div className="w-full text-grotesk pr-8  text-right ">
                  <h1 className="text-2xl"> DREAMS TO REALITIES, A PATH TAKEN HONESTLY, TOGETHER AND CLEAR.</h1>
               </div>
               </div>

            <div className="max-w-20 w-20 self-end">
               <img src={symbolVertical} alt="Logo" />
            </div>

            </div>

            <div className="h-1/5 bg-black flex justify-end items-center p-6">
              <div>
                  <img src={logoMdWhite} alt="Logo" />
                  </div>
            </div>
        </div> 
      
      </div>
   )

}

export default Thankyou