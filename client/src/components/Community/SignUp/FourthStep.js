import { useState } from "react"

const FourthStep = ({ data, setData, previousStep, handleSubmit }) => {
  const checkPasswordsMatch = () => {
    if (data.password === data.confirmPassword) {
      handleSubmit()
    } else {
      console.log("Pass Do not match")
    }
  }
  return (
    <div className='h-screen w-screen lg:w-full flex flex-col justify-around items-center '>
      {/* <div className='flex flex-col justify-between  items-center h-full w-screen lg:w-2/3  bg-white p-3 '> */}

      <div className='flex flex-col text-grotesk text-xl lg:text-2xl lg:w-4/6 p-2'>
        <h1 className='font-bold text-xl md:text-2xl text-grotesk mb-3 text-center'>
          Choose a Password
        </h1>
        Please enter a log-in password to access into the Founderland Community
      </div>

      <div className='w-full h-full lg:h-5/6 lg:w-5/6 flex flex-col items-center justify-around p-4'>
        <div className='w-full md:w-5/6 flex flex-col justify-center items-center'>
          <div className='w-full xl:w-3/5 px-2 py-6'>
            <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
              Password
            </label>
            <input
              type='password'
              className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
              required={true}
              placeholder='Enter password'
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className='w-full xl:w-3/5  px-2  py-6 '>
            <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
              required={true}
              placeholder='Enter password again'
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
          </div>
        </div>
        <div className='w-full flex justify-between pt-10'>
          <button
            type='button'
            className='p-5 bg-fblue font-bold text-lg text-white shadow-lg '
            onClick={() => previousStep()}>
            Back
          </button>
          <button
            type='button'
            className='p-5 bg-black font-bold text-lg text-white shadow-lg '
            onClick={() => {
              checkPasswordsMatch()
            }}>
            Create account
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default FourthStep
