import { useParams, useHistory } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import { ReactComponent as LogoLines } from "../assets/line.svg"
import axios from "axios"
import jwt from "jsonwebtoken"

const verifyUrl = "/api/auth/verify"

const Verify = () => {
  const { token } = useParams()
  const history = useHistory()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    if (checkPassword() && checkConfirmPassword()) {
      try {
        const decode = jwt.decode(token)
        const data = { id: decode.id, password, confirmPassword, isAdmin }
        const result = await axios.post(verifyUrl, data, config)

        if (result) {
          localStorage.setItem("authToken", result.data.access_token)
          if (isAdmin) {
            history.push("/admin/dashboard")
          } else {
            history.push("/community")
          }
        } else {
          setSaving(false)
          setError("Sorry, something went wrong")
          setTimeout(() => {
            setError("")
          }, 6000)
        }
      } catch (e) {
        setSaving(false)
        setError("Sorry, something went wrong")
        setTimeout(() => {
          setError("")
        }, 6000)
      }
    } else {
      setSaving(false)
      setError(
        !checkPassword()
          ? "Password doesn't fulfill requirement"
          : "Password do not match!"
      )
      setTimeout(() => {
        setError("")
      }, 6000)
    }
  }
  const checkPassword = () => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)
  }
  const checkConfirmPassword = () => {
    return password === confirmPassword
  }

  useEffect(() => {
    const decoded = jwt.decode(token)
    if (decoded.avatar) {
      setIsAdmin(true)
    }
    console.log(decoded)
    const now = Date.now()
    const expiry = decoded?.exp //1667224386000
    if (now < expiry) {
      setIsTokenValid(true)
    }
  }, [token])

  if (!isTokenValid) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='sm:shadow w-full  h-1/5 sm:w-1/2 p-5'>
          <div className='flex justify-center'>
            <LogoLines className='w-5/6' />
          </div>
          <div className='my-3 flex items-center justify-between'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <p className='text-grotesk text-center text-blue-500 uppercase'>
              {isAdmin ? " Admin login" : "Community"}
            </p>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>
          <div className=' flex justify-center text-lg'>
            Sorry your request has expired.
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='sm:shadow w-full sm:w-1/2 p-5'>
          <div className='flex justify-center'>
            <LogoLines className='w-5/6' />
          </div>
          <div className='my-3 flex items-center justify-between'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <p className='text-grotesk text-center text-blue-500 uppercase'>
              {isAdmin ? " Admin login" : "Community"}
            </p>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>
          <div className='flex flex-col px-3 mb-5'>
            <label
              className='block uppercase tracking-wide text-grey-darker text-lg font-bold mb-2'
              for='password'>
              Set a new password
            </label>
          </div>
          <div className='-mx-3 md:flex mb-6'>
            <div className='md:w-full px-3'>
              <label
                className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
                for='password'>
                Password
              </label>
              <input
                className={`${
                  password === ""
                    ? ""
                    : !checkPassword()
                    ? "border-l-4 border-fred"
                    : "border-l-4 border-flime"
                } appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4 mb-3`}
                id='password'
                type='password'
                autocomplete='new-password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='******************'
              />
            </div>
            <div className='md:w-full px-3'>
              <label
                className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
                for='password'>
                Confirm Password
              </label>
              <input
                className={`${
                  password === ""
                    ? ""
                    : !checkConfirmPassword()
                    ? "border-l-4 border-fred"
                    : "border-l-4 border-flime"
                } appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter py-3 px-4 mb-3`}
                id='confirmpassword'
                type='password'
                autocomplete='new-password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='******************'
              />
            </div>
          </div>
          <div className='-mt-6 text-xs'>
            *Minimum eight characters, at least one upper case letter, one lower
            case letter and one number
          </div>
          <div className='mt-4 px-4 py-4 flex flex-col-reverse sm:flex-row items-center justify-around -mb-3'>
            <button
              className='px-6 py-2 w-full shadow-lg sm:w-1/2 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4'
              onClick={(e) => handleSubmit(e)}>
              {saving ? (
                <div className='flex justify-center'>
                  <div
                    style={{ borderTopColor: "transparent" }}
                    className='w-5 h-5 border-2 border-black group-hover:border-white border-dotted rounded-full animate-spin'></div>
                </div>
              ) : error?.length ? (
                <span className=' animate-pulse'>{error}</span>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Verify
