import { EmojiHappyIcon } from "@heroicons/react/outline"
import { useState } from "react"
import Banner from "../../Admin/Widgets/Banner"

const FourthStep = ({
  data,
  setData,
  previousStep,
  handleSubmit,
  accountCreated,
  error: submissionError,
}) => {
  const [error, setError] = useState("")
  const [banner, setBanner] = useState({ show: false })

  const isPassSecure = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(
    data.password
  )
  const checkPasswordsAndSumbit = () => {
    if (!isPassSecure) {
      setError(true)
      setBanner({
        success: 0,
        show: true,
        message: "Password doesn't meet the minimum requirements",
      })
      setTimeout(() => {
        setError(false)
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    } else if (!(data.password === data.confirmPassword)) {
      setError(true)
      setBanner({
        success: 0,
        show: true,
        message: "Passwords do not match",
      })
      setTimeout(() => {
        setError(false)
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    } else {
      handleSubmit()
    }
  }
  const checkPassword = () => {
    if (data.password) {
      return isPassSecure ? "border-l-4 border-flime" : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }
  const checkConfirmPassword = () => {
    if (data.password) {
      return data.password === data.confirmPassword
        ? "border-l-4 border-flime"
        : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }

  return accountCreated ? (
    <div className="h-screen w-screen  flex flex-col justify-start lg:justify-center items-center ">
      <div className="flex flex-col items-center justify-center mt-10 text-grotesk text-xl md:text-2xl xl:text-4xl text-center h-1/4 md:w-4/6 lg:w-2/6 p-2 ">
        <span></span>
        <span className="font-bold pb-2">
          Congratulations {data.firstName} your account has been succesfully
          created.
          <EmojiHappyIcon className="w-10 h-10 m-auto" />
        </span>{" "}
        You will now be redirected to our Community in few seconds...
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen  flex flex-col justify-around items-center ">
      <div className="flex flex-col text-grotesk text-xl lg:text-2xl text-center lg:w-4/6 p-2">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-grotesk mb-3 text-center">
          Choose a Password
        </h1>
        Please enter a log-in password to access into the Founderland Community
      </div>
      {(error || submissionError) && (
        <div className="w-full md:w-3/4  lg:w-4/6  flex items-center justify-center font-bold mt-5 ">
          <Banner
            message={
              submissionError
                ? {
                    success: 0,
                    show: true,
                    message: submissionError,
                  }
                : banner
            }
          />
        </div>
      )}
      <div className="w-full h-full lg:h-5/6 lg:w-4/6 xl:w-5/6 flex flex-col items-center justify-start md:justify-around p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault(e)
            checkPasswordsAndSumbit()
          }}
          className="w-full h-3/4 md:w-5/6 flex flex-col justify-around items-center"
        >
          <div className="w-full xl:w-4/5 px-2 py-6">
            <label className="block uppercase text-gray-400 text-md font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className={
                checkPassword() +
                " w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
              }
              required={true}
              placeholder="Enter password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <p className="text-xs">
              * Minimum eight characters, at least one upper case letter, one
              lower case letter and one number
            </p>
          </div>
          <div className="w-full xl:w-4/5  px-2  py-6 ">
            <label className="block uppercase text-gray-400 text-md font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className={
                checkConfirmPassword() +
                " w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
              }
              required={true}
              placeholder="Enter password again"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="w-full flex justify-between pt-10  xl:w-5/6 ">
            <button
              type="button"
              className="p-5 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6  lg:w-1/6 "
              onClick={() => previousStep()}
            >
              Back
            </button>
            <button
              type="submit"
              className="p-5 bg-black font-bold text-lg text-white transition duration-200 hover:bg-flime hover:text-black md:w-1/6 lg:w-2/6"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FourthStep
