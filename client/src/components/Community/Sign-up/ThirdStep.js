import axios from "axios"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

import S3 from "react-aws-s3"

import { Image, Transformation } from "cloudinary-react"
import { CheckCircleIcon, CloudUploadIcon } from "@heroicons/react/outline"

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_DIR_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
}
const ReactS3Client = new S3(config)

const ThirdStep = ({ nextStep, previousStep, data, setData }) => {
  const [previewSource, setPreviewSource] = useState(null)
  const [uploadStatus, setuploadStatus] = useState({
    success: false,
    message: "",
  })

  // AWS
  // const onDrop = useCallback((acceptedFiles) => {
  //   // type: "image/jpeg"
  //   // type: "application/pdf"
  //   console.log(acceptedFiles)
  //   acceptedFiles.forEach((element) => {
  //     handleUpload(element)
  //   })
  // }, [])

  // const handleUpload = (file) => {
  //   const now = Date.now()
  //   let newFileName = `${data._id}-${data.firstName}-${data.lastName}-${now}`
  //   ReactS3Client.uploadFile(file, newFileName).then((res) => {
  //     console.log(res.location)
  //     data.photo.push(res.location)
  //     setData({ ...data, photo: [...data.photo] })
  //     if (res.status === 204) {
  //       console.log("success")
  //     } else {
  //       console.log("fail")
  //     }
  //   })
  // }

  // CLOUDINARY
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
      const result = await axios.post("/api/profile-picture/upload", {
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
    <div className='h-screen w-screen flex flex-col  items-center p-5  lg:w-full'>
      {/* <div className='h-2/5 md:h-1/6 bg-red-100 flex flex-col justify-around items-center p-4'> */}
      <h1 className='font-bold text-xl md:text-2xl'>Upload your photos</h1>
      <p>
        One of Founderland's key pillars is generating visibility for the women
        in our community. We do this by sharing your image, your story and your
        business with the world, via our own channels, as well as with media
        partners.
      </p>
      {/* </div> */}
      <div className=' flex flex-col justify-between md:justify-start  items-center h-full w-full  bg-white  p-4'>
        <div className='flex flex-col xl:flex-row h-full w-full  lg:w-5/6 lg:h-4/6 w-full justify-around items-center '>
          {/* upload response message for user */}
          {/* {uploadStatus.success ? (
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
          )} */}
          {/* <div className='w-full h-1/2 md:w-1/2 md:h-1/4 xl:h-full  flex flex-col items-center justify-center'>
            <h1 className='block uppercase text-gray-800 text-md font-bold mb-2 text-center'>
              Steps
            </h1>
            <ul className='px-5'>
              <li className='text-lg p-1'>
                <input
                  type='checkbox'
                  checked={false}
                  className=' w-4 h-4 mr-4 '
                />
                Upload your headshot
              </li>
              <li className='text-lg p-1'>
                <input
                  type='checkbox'
                  checked={false}
                  className=' w-4 h-4 mr-4 '
                />
                Upload the signed photografy release
              </li>
            </ul>
          </div> */}
          <div className='flex flex-col items-center justify-center h-full w-full md:h-2/4 md:w-2/4 lg:w-3/4 lg:h-1/2'>
            {/* <h1 className='block uppercase text-gray-800 text-md font-bold mb-2 text-center pb-2'>
              Upload your profile picture
            </h1> */}
            <div
              {...getRootProps()}
              className=' h-3/4  w-3/4   flex flex-col justify-center items-center border-dashed border-4 border-black-600 p-2 rounded-xl'>
              <input {...getInputProps()} multiple />

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
        </div>
        {/* CLOUDINARY */}
        <button
          type='button'
          onClick={handleSubmitPicture}
          className=' flex justify-center bg-gray-700 text-white font-bold p-3 w-1/2 md:w-1/5 m-4'>
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

        <div className='w-full flex justify-between pt-10 lg:w-5/6'>
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

export default ThirdStep
