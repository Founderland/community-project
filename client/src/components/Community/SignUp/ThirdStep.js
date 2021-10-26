import axios from "axios"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

import { Image, Transformation } from "cloudinary-react"
import { CheckCircleIcon, CloudUploadIcon } from "@heroicons/react/outline"
import DropzoneCloudinary from "./DropzoneCloudinary"

const ThirdStep = ({ nextStep, previousStep, data, setData }) => {
  // const [previewSource, setPreviewSource] = useState(null)
  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    message: "",
  })

  return (
    <div className='h-screen w-screen flex flex-col  items-center  p-5  lg:w-full'>
      <div className=' flex flex-col justify-between md:justify-start  items-center h-full w-screen bg-white  p-4'>
        <h1 className='font-bold text-xl md:text-2xl w-2/6 text-center'>
          Your picture
        </h1>
        {/* upload response message for user */}
        {uploadStatus.success ? (
          <div className=' w-full md:w-3/4 lg:w-4/6 bg-green-400 flex items-center p-5 font-bold '>
            <CheckCircleIcon className='w-8 h-8' />
            {uploadStatus.message}
          </div>
        ) : (
          !uploadStatus.success &&
          uploadStatus.message && (
            <div className='w-full md:w-3/4 bg-red-400 flex items-center p-5 font-bold'>
              <CheckCircleIcon className='w-8 h-8' />
              {uploadStatus.message}
            </div>
          )
        )}

        <div className='flex flex-col  h-full w-full  lg:w-4/6 md:h-3/4 w-full justify-center items-center '>
          <div className='flex flex-col items-center justify-center h-full w-full md:h-2/4 md:w-2/4 lg:w-3/4 lg:h-1/2'>
            {/* <h1 className='block uppercase text-gray-800 text-md font-bold mb-2 text-center pb-2'>
              Upload your profile picture
            </h1> */}
            <h4 className='text-grotesk text-xl lg:text-2xl'>
              {data.photo.public_id
                ? "Your picturehas been uploaded"
                : "Select a photo for your profile"}
            </h4>
            {/* CLOUDINARY */}
            {data.photo.public_id && (
              <Image
                cloudName='founderland'
                publicId={data.photo.public_id}
                width='130'
                height='120'>
                <Transformation
                  width='200'
                  height='200'
                  gravity='face'
                  crop='thumb'
                />
                <Transformation radius='100' />
              </Image>
            )}
            <DropzoneCloudinary
              data={data}
              setData={setData}
              type='profilePicture'
              setUploadStatus={setUploadStatus}
            />
          </div>
        </div>

        <div className='w-full flex justify-between  lg:w-3/6'>
          <button
            type='button'
            className='p-5 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6 '
            onClick={() => previousStep()}>
            Back
          </button>
          <button
            type='button'
            className='p-5 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6 '
            onClick={() => nextStep()}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThirdStep
