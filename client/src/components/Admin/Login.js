import axios from "axios"
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import jwt from "jsonwebtoken"
import { ReactComponent as LogoLines } from "../../assets/line.svg"
import { ReactComponent as SmallLogo } from "../../assets/small.svg"
import AdminContext from "../../contexts/Admin"
import UserContext from "../../contexts/User"
import { ArrowLeftIcon } from "@heroicons/react/outline"

const loginURL = "/api/auth/login"
const forgotPassURL = "/api/auth/forgot-password"

const Login = ({ isAdminLogin }) => {
  const history = useHistory()
  const { setToken } = useContext(isAdminLogin ? AdminContext : UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [forgotPassword, setForgotPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  let color
  let title

  if (isAdminLogin) {
    color = "black"
    title = "Admin Login"
  } else {
    color = "fred"
    title = "Community"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!forgotPassword) {
      const loginData = { email, password, isAdminLogin }
      if (email.length && password.length) {
        setLoading(true)
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        }
        try {
          const { data } = await axios.post(loginURL, loginData, config)
          console.log(data.access_token)
          localStorage.setItem("authToken", data.access_token)
          var decode = jwt.decode(data.access_token)
          if (decode) {
            setToken(localStorage.authToken)
            if (decode.avatar && isAdminLogin) {
              history.push("/admin/dashboard")
            } else {
              setLoading(false)
              setError("Sorry, wrong credentials")
              setTimeout(() => {
                setError("")
              }, 5000)
            }
          } else {
            throw new Error("401")
          }
        } catch (err) {
          setLoading(false)
          console.log(err)
          setError(
            err?.response?.status === 401 || err?.message === "401"
              ? "Wrong credentials"
              : "Sorry, something went wrong"
          )
          setTimeout(() => {
            setError("")
          }, 5000)
        }
      } else {
        setError("Please fill in your details")
        setTimeout(() => {
          setError("")
        }, 6000)
      }
    } else {
      setLoading(true)
      try {
        const result = await axios.post(forgotPassURL, {
          email,
          isAdmin: isAdminLogin,
        })
        setLoading(false)
        if (result) {
          setError(result.data.message)
        } else {
          setError("Sorry, Something went wrong")
        }
        setTimeout(() => {
          setError("")
          setForgotPassword(false)
        }, 5000)
      } catch (err) {
        if (err.response.status === 404) {
          setError("Request sent")
        } else {
          setError("Sorry, Something went wrong")
        }
      }
      setTimeout(() => {
        setError("")
      }, 6000)
    }
  }
  return (
    <div className="flex h-screen justify-center items-center w-full ">
      <div className="flex bg-white shadow-lg md:w-5/6 lg:w-2/3 xl:w-1/2">
        <div className={`relative hidden md:block md:w-1/2 bg-${color}`}>
          <SmallLogo className="absolute bottom-0 h-20 w-20 text-white fill-current" />
        </div>
        <div className="w-full p-8 md:w-1/2">
          <div className="flex justify-center">
            <LogoLines className="w-full" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p className="text-grotesk text-center text-blue-500 uppercase">
              {forgotPassword ? "Forgot password?" : title}
            </p>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="text-grotesk block text-sm font-bold mb-2">
                email
              </label>
              <input
                className="border border-gray-300 py-2 px-4 block w-full appearance-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={forgotPassword ? "hidden" : "mt-4"}>
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
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className={`${
                  forgotPassword
                    ? ""
                    : "hover:text-fblue transform hover:scale-110 duration-200 ease-in "
                } text-grotesk text-xs text-gray-500`}
              >
                {forgotPassword
                  ? " We’ll send instructions to your inbox to reset your password."
                  : "Forgot Password?"}
              </button>
            </div>
            <div className="mt-8 flex w-full justify-between">
              <button
                type="button"
                onClick={() => {
                  setForgotPassword(false)
                }}
                className={
                  forgotPassword
                    ? "group  lg:w-1/4 px-4 py-2 text-mono bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-lg text-black hover:text-white flex justify-center items-center  "
                    : "hidden"
                }
              >
                <ArrowLeftIcon className="w-5 h-5 mr-1" />
                <span className="hidden xl:block text-sm">Back</span>
              </button>
              <button
                type="submit"
                className={`
                  ${forgotPassword ? "w-4/6 " : "w-full "}
                     group px-4 py-2 text-mono bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-sm text-black hover:text-white`}
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
                ) : forgotPassword ? (
                  "Reset Password"
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
