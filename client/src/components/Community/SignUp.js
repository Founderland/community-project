import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

import jwt from "jsonwebtoken"
import { ReactComponent as LogoLines } from "../../assets/line.svg"
import { ReactComponent as SmallLogo } from "../../assets/small.svg"

const signUpURL = "/api/auth/userlogin"

const SignUp = () => {
  let history = useHistory()
  const { token } = useParams()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [title, setTitle] = useState("")
  const [city, setCity] = useState("")
  const [geoLocation, setGeoLocation] = useState("")
  const [about, setAbout] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [photo, setPhoto] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  //Get token from URL
  useEffect(() => {
    const decode = jwt.decode(token)
    //Get data from token and fetch DB data
    if (decode?.email) {
      //check if token is expired or load the data
      const now = Date.now() / 1000
      const expiry = decode.iat + decode.exp
      if (now < expiry) {
        setError("valid token " + now + " - " + expiry)
      } else {
        setError("Invalid Token")
      }
    } else {
      setError("Invalid Token")
    }
  }, [token])

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginData = {
      firstName,
      lastName,
      title,
      city,
      geoLocation,
      about,
      password,
      confirmPassword,
      photo,
    }
    if (password.length && confirmPassword.length) {
      setLoading(true)
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      }
      try {
        //receive new login token and forward to community app
        const { data } = await axios.post(signUpURL, loginData, config)
        if (data.access_token) {
          localStorage.setItem("authToken", data.access_token)
          //redirect to community
          history.push("/community")
        } else {
          setLoading(false)
          throw new Error({
            response: { status: 500, message: "Sorry, something went wrong" },
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
    } else {
      setError("Please fill in all required fields")
      setTimeout(() => {
        setError("")
      }, 6000)
    }
  }

  //Render form with data from database
  return showForm ? (
    <div className="flex h-screen justify-center items-center w-full ">
      <div className="flex bg-white md:w-2/3 xl:w-1/2">
        <div className="relative hidden md:block md:w-1/2 bg-fred">
          <SmallLogo className="absolute bottom-0 h-20 w-20 text-white fill-current" />
        </div>
        <div className="w-full p-8 md:w-1/2">
          <div className="flex justify-center">
            <LogoLines className="w-full " />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p className="text-grotesk text-center text-fblue uppercase">
              Community
            </p>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="text-grotesk block text-sm font-bold mb-2">
                email
              </label>
              <input className="border border-gray-300 py-2 px-4 block w-full appearance-none" />
            </div>
            <div className="mt-4">
              <label className="text-grotesk block text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="border border-gray-300 py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-1 flex justify-end">
              <button className="text-grotesk text-xs text-gray-500">
                Forgot Password?
              </button>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="group w-full px-4 py-2 text-mono bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-sm text-white hover:text-black"
              >
                {loading ? (
                  <div className="flex justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="w-5 h-5 border-2 border-black group-hover:border-white border-dotted rounded-full animate-spin"
                    ></div>
                  </div>
                ) : error.length ? (
                  <span className=" animate-pulse">{error}</span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    `Nothing to show yet - ${error}`
  )
}

export default SignUp
