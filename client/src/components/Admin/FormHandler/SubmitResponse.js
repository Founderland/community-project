import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline"

const SubmitResponse = ({ isSuccessful, isError, message }) => {
  return (
    <>
      <div
        className={
          isSuccessful
            ? `flex flex-row w-full justify-start items-center px-5 text-grotesk bg-fblue text-white`
            : `hidden`
        }>
        {/* <SuccessIcon className='w-9' /> */}
        <CheckCircleIcon className='w-8 text-green-500' />
        <h1 className='px-3'> {message}</h1>
      </div>
      <div
        className={
          isError
            ? `flex  flex-row  w-full  justify-start items-center px-5 text-grotesk bg-fpink-light`
            : `hidden`
        }>
        <ExclamationCircleIcon className='w-8 text-red-500' />
        <h1 className='px-3'>
          {message ? message : "Sorry something went wrong"}
        </h1>
      </div>
    </>
  )
}

export default SubmitResponse
