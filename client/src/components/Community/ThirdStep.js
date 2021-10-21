import { useState } from "react"

const ThirdStep = ({ data, setData, previousStep, handleSubmit }) => {
  const checkPasswordsMatch = () => {
    if (data.password === data.confirmPassword) {
      handleSubmit()
    } else {
      console.log("Pass Do not match")
    }
  }
  return (
    <div className='h-screen w-screen lg:w-full flex flex-col justify-around items-center '>
      <div className='flex flex-col justify-between  items-center h-full w-screen lg:w-2/3 md:h-4/6 bg-white p-3'>
        <div className='w-full h-full lg:h-4/6 flex flex-col items-center justify-center '>
          <div className='text-grotesk text-xl lg:text-2xl xl:w-4/6 p-2'>
            <h2> We are almost done... </h2>
            Please enter a log-in password to access into the Founderland
            Community
          </div>
          <div className='w-full p-4 py-6'>
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
          <div className='w-full  p-4  py-6 '>
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
            className='p-5 bg-fblue font-bold text-lg text-white shadow-lg '
            onClick={() => {
              checkPasswordsMatch()
            }}>
            Create account
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThirdStep
