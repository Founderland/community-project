import axios from "axios"
import { useEffect, useState, useMemo } from "react"
import { useParams, useHistory } from "react-router-dom"

import jwt from "jsonwebtoken"
import { ReactComponent as LogoLines } from "../../../assets/line.svg"
import { ReactComponent as SmallLogo } from "../../../assets/small.svg"
import gifLogo from "../../../assets/images/Logo-Transform.gif"
import whiteLogo from "../../../assets/images/logo_md_white.png"

import founder from "../../../assets/images/founder-laptop.jpg"
import StepWizard from "react-step-wizard"
import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import ThirdStep from "./ThirdStep"
import FourthStep from "./FourthStep"

const signUpURL = "/api/auth/signup"
const getProfileURL = "/api/users/community/profile"

const SignUp = () => {
  let history = useHistory()
  const { token } = useParams()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    city: "",
    country: "",
    email: "",
    geoLocation: "",
    bio: "",
    businessArea: "Select your business area",
    password: "",
    confirmPassword: "",
    photo: [],
    companyName: "",
    companyBio: "",
    companyLink: "",
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
                setData({ ...data, ...res.data.data, photo: [] })
                setShowForm(true)
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
        // setError(jwtDecoded.email)
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
  console.log(error.length)
  if (!showForm && !error.length) {
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
  } else if (showForm) {
    return (
      <div className='h-full w-full lg:h-screen flex flex-col lg:flex-row justify-start overflow-hidden '>
        <LogoLines className='w-full h-1/5 lg:hidden' />
        <div className='hidden lg:flex items-end justify-center h-full w-1/3 z-30 relative'>
          <img
            src={founder}
            className='h-full w-full object-cover filter blur-sm '
            alt='founder'
          />
          <img
            src={whiteLogo}
            className=' w-full xl:w-5/6 p-3 object-contain absolute object-bottom'
            alt='founder'
          />
        </div>
        <StepWizard
          initialStep={1}
          className='h-full md:h-screen lg:w-2/3 flex flex-col justify-center lg:justify-start items-center'>
          <FirstStep data={data} setData={setData} />
          <SecondStep data={data} setData={setData} />
          <ThirdStep data={data} setData={setData} />
          <FourthStep
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
          />
        </StepWizard>
      </div>
    )
  } else {
    return <h1>{error}</h1>
  }
}

export default SignUp
