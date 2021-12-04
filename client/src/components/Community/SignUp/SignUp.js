import axios from "axios"
import { useEffect, useState, useMemo, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"

import jwt from "jsonwebtoken"
import { ReactComponent as LogoLines } from "../../../assets/line.svg"
import gifLogo from "../../../assets/images/Logo-Transform.gif"
import whiteLogo from "../../../assets/images/logo_md_white.png"

import founder from "../../../assets/images/founders-community.jpg"
import StepWizard from "react-step-wizard"
import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"
import ThirdStep from "./ThirdStep"
import FourthStep from "./FourthStep"
import { EmojiSadIcon } from "@heroicons/react/outline"
import { CommunityContext } from "../../../contexts/CommunityProvider"

const signUpURL = "/api/auth/signup"
const getProfileURL = "/api/users/community/profile"

const SignUp = () => {
  let history = useHistory()
  const [accountCreated, setAccountCreated] = useState(false)
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
    photo: null,
    companyName: "",
    companyBio: "",
    companyLink: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  const { setRefreshData } = useContext(CommunityContext)

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
          .get(`${getProfileURL}/${jwtDecoded.id}`, config)
          .then((res) => {
            if (res.data.data) {
              setTimeout(() => {
                setData({ ...data, ...res.data.data, photo: [] })
                setShowForm(true)
                setLoading(false)
              }, 3500)
            } else {
              setLoading(false)
              setError("Invalid Token - empty res")
            }
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
            setError("Invalid Token - err on fetch profile")
          })
        //DISPLAY IT ON THE FORM
        //RESULT DATA UPDATES STATES WITH PREREGISTERED DATA
        // setError(jwtDecoded.email)
      } else {
        //OOPS
        setLoading(false)
        setError("Invalid Token - expired")
      }
    } else {
      setLoading(false)
      setError("Invalid Token - no email")
    }
  }, [token])

  //submit form
  const handleSubmit = async () => {
    try {
      //receive new login token and forward to community app
      const { data: res } = await axios.post(signUpURL, data, config)

      setLoading(false)
      if (res.access_token) {
        localStorage.setItem("authToken", res.access_token)
        setAccountCreated(true)
        setRefreshData((prev) => prev + 1)
        //redirect to community
        setTimeout(() => {
          history.push("/community")
        }, 5000)
      } else {
        setLoading(false)
        setError("Sorry, something went wrong")
        throw new Error({
          response: {
            status: 500,
            message: "Sorry, something went wrong",
          },
        })
      }
    } catch (err) {
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
  }

  //Render form with data from database
  //RENDER WELCOME MESSAGE -> 3s
  if (loading) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-screen  h-1/4 '>
          <h1 className='text-hanson text-xl md:text-4xl lg:text-7xl text-center w-3/5'>
            WELCOME TO OUR COMMUNITY
          </h1>
          <img src={gifLogo} alt='founderland logo' />
        </div>
      </div>
    )
  } else if (showForm && data.confirmed === null) {
    return (
      <div className='h-full w-full lg:h-screen flex flex-col lg:flex-row justify-start overflow-hidden '>
        <LogoLines className='w-full h-1/5 lg:hidden' />
        <div className='hidden lg:flex items-end justify-center h-full w-1/3 z-30 relative '>
          <img
            src={founder}
            className='h-full w-full object-cover  object-center'
            alt='founder'
          />
          <img
            src={whiteLogo}
            className=' w-full xl:w-5/6 max-h-36 p-6 pb-3 object-contain absolute object-bottom'
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
            accountCreated={accountCreated}
            error={error}
          />
        </StepWizard>
      </div>
    )
  } else {
    return (
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='sm:shadow w-full h-full sm:w-1/2 p-5'>
          <div className='flex justify-center'>
            <LogoLines className='w-5/6' />
          </div>
          <div className='my-3 flex items-center justify-between'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <p className='text-grotesk text-center text-blue-500 uppercase'>
              Community
            </p>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>
          <div className=' w-full flex flex-col justify-center items-center text-lg text-center'>
            {data.confirmed !== null ? (
              "It looks like you have already registered."
            ) : (
              <>
                <EmojiSadIcon className='w-10 h-10 ' /> Sorry something went
                wrong. Please contact us via email to admin@founderland.org
              </>
            )}{" "}
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
