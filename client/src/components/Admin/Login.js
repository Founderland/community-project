import axios from "axios"
import { useContext, useState } from "react"
import jwt from "jsonwebtoken"
import { ReactComponent as LogoLines } from "../../assets/line.svg"
import { ReactComponent as SmallLogo } from "../../assets/small.svg"
import AdminContext from "../../contexts/Admin"

const loginURL = "/api/auth/login"

const AdminLogin = () => {
  const { setUser } = useContext(AdminContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginData = { email, password }
    if (email.length && password.length) {
      setLoading(true)
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      }
      try {
        const { data } = await axios.post(loginURL, loginData, config)
        localStorage.setItem("authToken", data.access_token)
        var decode = jwt.decode(data.access_token)
        setUser({
          id: decode.id,
          firstName: decode.firstName,
          lastName: decode.lastName,
          avatar: decode.avatar,
          role: decode.role,
        })
      } catch (err) {
        setLoading(false)
        setError(
          err.response.status === 401
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
  }
  return (
    <div className="flex h-screen justify-center items-center w-full ">
      <div className="flex bg-white shadow-lg md:w-2/3 xl:w-1/2">
        <div className="relative hidden md:block md:w-1/2 bg-fblue">
          <SmallLogo className="absolute bottom-0 h-20 w-20 text-white fill-current" />
        </div>
        <div className="w-full p-8 md:w-1/2">
          <div className="flex justify-center">
            <LogoLines className="w-full" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p className="text-grotesk text-center text-blue-500 uppercase">
              Admin login
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
                className="group w-full px-4 py-2 text-mono bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-sm text-black hover:text-white"
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
  )
}

export default AdminLogin
