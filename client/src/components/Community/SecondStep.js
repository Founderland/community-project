import axios from "axios"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

import { Image, Transformation } from "cloudinary-react"
import { CheckCircleIcon, CloudUploadIcon } from "@heroicons/react/outline"

const SecondStep = ({ nextStep, previousStep }) => {
  const [previewSource, setPreviewSource] = useState(null)
  const [uploadStatus, setuploadStatus] = useState({
    success: false,
    message: "",
  })

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])
    reader.onabort = () => console.log("file reading was aborted")
    reader.onerror = () => console.log("file reading has failed")
    reader.onloadend = () => {
      const binaryStr = reader.result
      console.log(binaryStr)
      setPreviewSource(binaryStr)
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSubmitPicture = () => {
    if (!previewSource) return
    uploadImage(previewSource)
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      const result = await axios.post("/api/profile-picture/uploaad", {
        data: base64EncodedImage,
      })
      setuploadStatus({ success: true, message: result.data.message })
      setPreviewSource(null)
      setTimeout(() => {
        setuploadStatus({
          success: false,
          message: "",
        })
      }, 3000)
    } catch (e) {
      console.log(e)
      setuploadStatus({
        success: false,
        message: e.response.data.message || "Sorry something went wrong",
      })
      setTimeout(() => {
        setuploadStatus({
          success: false,
          message: "",
        })
      }, 3000)
    }
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-around items-center p-5  lg:w-full'>
      <div className=' flex flex-col justify-center  items-center h-full w-full lg:w-full md:h-4/6 bg-white '>
        <div>
          <h1 className='block uppercase text-gray-800 text-md font-bold mb-2'>
            Upload your profile picture
          </h1>
        </div>

        <div className='flex flex-col h-1/2 md:h-full w-full justify-around items-center '>
          {uploadStatus.success ? (
            <div className=' w-full md:w-3/4 bg-green-400 flex items-center p-5 font-bold '>
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
          <div
            {...getRootProps()}
            className=' h-full md:h-3/4 w-full md:w-3/4 flex flex-col justify-center items-center border-dashed border-4 border-black-600 p-2'>
            <input {...getInputProps()} />

            {previewSource && (
              <img
                src={previewSource}
                alt='chosen'
                className='h-3/4 w-full md:w-3/4 p-4 object-scale-down'
              />
            )}
            <p className='block uppercase text-gray-600 text-md font-bold mb-2'>
              {previewSource
                ? "Click the Upload button to confrim"
                : "Drag and drop some files here, or click to select files"}
            </p>
          </div>
        </div>
        <button
          type='button'
          onClick={handleSubmitPicture}
          className=' flex justify-center bg-black text-white font-bold p-3 w-1/2 md:w-1/5 m-4'>
          Upload <CloudUploadIcon className='w-7 h-7 ml-2' />
        </button>

        {/* <Image
          cloudName='founderland'
          publicId='profile_pictures/zvtphvyq5eb9hdvswyph'
          width='100'
          height='100'>
          <Transformation
            width='200'
            height='200'
            gravity='face'
            crop='thumb'
          />
          <Transformation radius='90' />
        </Image> */}

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
            onClick={() => nextStep()}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default SecondStep
