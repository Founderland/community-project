import axios from "axios"
import { useEffect, useState, useMemo } from "react"
import { useParams, useHistory } from "react-router-dom"

import jwt from "jsonwebtoken"
import { ReactComponent as LogoLines } from "../../assets/line.svg"
import { ReactComponent as SmallLogo } from "../../assets/small.svg"
import gifLogo from "../../assets/images/Logo-Transform.gif"
import banner from "../../assets/images/banner_black.png"
import founder from "../../assets/images/founder-laptop.jpg"
import StepWizard from "react-step-wizard"
import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import ThirdStep from "./ThirdStep"

const signUpURL = "/api/auth/signup"
const getProfileURL = "/api/users/community/profile"

const SignUp = () => {
  let history = useHistory()
  const { token } = useParams()
  const [firstName, setFirstName] = useState("")
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    city: "",
    country: "",
    email: "",
    geoLocation: "",
    about: "",
    businessArea: "Select your business area",
    password: "",
    confirmPassword: "",
    photo: null,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  //Get token from URL
  useEffect(() => {
    const jwtDecoded = jwt.decode(token)
    //Get data from token and fetch DB data
    if (jwtDecoded?.email) {
      //check if token is expired or load the data
      const now = Date.now() / 1000
      const expiry = jwtDecoded.iat + jwtDecoded.exp
      if (now < expiry) {
        //VALID TOKEN
        //GET THE REGISTERED DATA BASED ON THE ID OR EMAIL
        axios
          .get(getProfileURL, config)
          .then((res) => {
            if (res.data.data) {
              setTimeout(() => {
                setData({ ...data, ...res.data.data })
              }, 3000)
            } else {
              setError("Invalid Token - empty res")
            }
          })
          .catch((err) => {
            console.log(err.response)
            setError("Invalid Token - err on fetch profile")
          })
        //DISPLAY IT ON THE FORM
        //RESULT DATA UPDATES STATES WITH PREREGISTERED DATA
        setError(jwtDecoded.email)
      } else {
        //OOPS
        setError("Invalid Token - expired")
      }
    } else {
      setError("Invalid Token - no email")
    }
  }, [token])

  //submit form
  const handleSubmit = async () => {
    // e.preventDefault()
    // if (data.password.length && data.confirmPassword.length) {
    setLoading(true)
    try {
      //receive new login token and forward to community app
      const { data: res } = await axios.post(signUpURL, data, config)
      setLoading(false)
      if (res.access_token) {
        localStorage.setItem("authToken", res.access_token)
        //redirect to community
        history.push("/community")
      } else {
        setLoading(false)
        throw new Error({
          response: {
            status: 500,
            message: "Sorry, something went wrong",
          },
        })
      }
    } catch (err) {
      console.log(err.message)
      setLoading(false)
      setError(
        err?.response?.status === 401
          ? "Invalid token"
          : "Sorry, something went wrong"
      )
      setTimeout(() => {
        setError("")
      }, 5000)
    }
    // } else {
    //   setError("Please fill in all required fields")
    //   setTimeout(() => {
    //     setError("")
    //   }, 6000)
    // }
  }

  //Render form with data from database
  //RENDER WELCOME MESSAGE -> 3s

  if (!data.firstName.length) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-screen  h-1/4 '>
          <h1 className='text-hanson text-xl md:text-4xl lg:text-7xl lg:text-4xl text-center w-3/5'>
            WELCOME TO OUR COMMUNITY
          </h1>
          <img src={gifLogo} alt='founderland logo' />
        </div>
      </div>
    )
  }

  //RENDER FORM WITH ALL PROFILE TEXT FIELDS

  //RENDER FORM FOR PHOTO UPLOAD (OR SKIP)

  //FINISH STEP TO SAVE AND FINAL MESSAGE BEFORE REDIRECT TO COMMUNITY

  return (
    <div className='h-full lg:h-screen flex flex-col lg:flex-row justify-start overflow-hidden '>
      <LogoLines className='w-full h-1/5 lg:hidden' />
      <div className='hidden lg:flex h-full w-1/3 z-30'>
        <img
          src={founder}
          className='h-full w-full object-cover filter blur-sm '
        />
      </div>
      <StepWizard initialStep={1} className='h-3/5 w-full lg:h-full w-2/3 p-3'>
        <FirstStep data={data} setData={setData} className='overflow-hidden' />
        <SecondStep data={data} setData={setData} />
        <ThirdStep data={data} setData={setData} handleSubmit={handleSubmit} />
      </StepWizard>

      {/* {/* <div className=''>
        <img
          src={banner}
          // style={{ height: "250px" }}
          alt='founderland banner'
          className=' w-full md:h-1/2 object-scale-down md:object-cover object-bottom md:object-top'></img>
      </div> */}
    </div>
  )
  // !showForm ? (
  //     <div className='flex h-screen justify-center items-center w-full '>
  //       <div className='flex bg-white md:w-2/3 xl:w-1/2'>
  //         <div className='w-full p-8 md:w-1/2'>
  //           <div className='flex justify-center'>
  //             <LogoLines className='w-full ' />
  //           </div>
  //           <div className='mt-4 flex items-center justify-between'>
  //             <span className='border-b w-1/5 lg:w-1/4'></span>
  //             <p className='text-grotesk text-center text-fblue uppercase'>
  //               Welcome to Founderland
  //             </p>
  //             <span className='border-b w-1/5 lg:w-1/4'></span>
  //             <p className='text-grotesk text-center'>
  //               Please, complete your profile before proceeding
  //             </p>
  //           </div>
  //           <form onSubmit={handleSubmit}>
  //             <div className='mt-4'>
  //               <label className='text-grotesk block text-sm font-bold mb-2'>
  //                 First Name
  //               </label>
  //               <input className='border border-gray-300 py-2 px-4 block w-full appearance-none' />
  //             </div>
  //             <div className='mt-4'>
  //               <label className='text-grotesk block text-sm font-bold mb-2'>
  //                 Password
  //               </label>
  //               <input
  //                 className='border border-gray-300 py-2 px-4 block w-full appearance-none'
  //                 type='password'
  //                 value={data.password}
  //                 onChange={(e) => handleChange(e.target.value, "password")}
  //               />
  //             </div>
  //             <div className='mt-1 flex justify-end'>
  //               <button className='text-grotesk text-xs text-gray-500'>
  //                 Forgot Password?
  //               </button>
  //             </div>
  //             <div className='mt-8'>
  //               <button
  //                 type='submit'
  //                 className='group w-full px-4 py-2 text-mono bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-sm text-white hover:text-black'>
  //                 {loading ? (
  //                   <div className='flex justify-center'>
  //                     <div
  //                       style={{
  //                         borderTopColor: "transparent",
  //                       }}
  //                       className='w-5 h-5 border-2 border-black group-hover:border-white border-dotted rounded-full animate-spin'></div>
  //                   </div>
  //                 ) : error.length ? (
  //                   <span className=' animate-pulse'>{error}</span>
  //                 ) : (
  //                   "Login"
  //                 )}
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   ) : (
  //     `Nothing to show yet - ${error}`
  //   )
}

export default SignUp
