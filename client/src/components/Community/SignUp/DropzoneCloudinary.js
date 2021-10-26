import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import { CloudUploadIcon } from "@heroicons/react/outline"

const DropzoneCloudinary = ({ data, setData, type, setUploadStatus }) => {
  const [previewSource, setPreviewSource] = useState(null)

  // CLOUDINARY
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])
    reader.onerror = () => console.log("file reading has failed")
    reader.onloadend = () => {
      const binaryStr = reader.result
      setPreviewSource(binaryStr)
      // uploadImage(binaryStr)
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
        public_id: `${type}-${Date.now()}`,
        folder: `${data.firstName}-${data.lastName}`,
      })

      if (result.data?.public_id) {
        setUploadStatus({ success: true, message: result.data.message })
        setData({
          ...data,
          photo: { public_id: result.data.public_id, url: result.data.url },
        })
        setTimeout(() => {
          setUploadStatus({
            success: false,
            message: "",
          })
          setPreviewSource(null)
        }, 3000)
      }
      //   {
      //     message: "Picture uploaded succesfully",
      //     public_id: 'profile_pictures/e1ln3u5t1aoe9nipu3nn',
      //     url: 'https://res.cloudinary.com/founderland/image/upload/v1635157373/profile_pictures/e1ln3u5t1aoe9nipu3nn.png',
      //     format: 'png',
      //   }
    } catch (e) {
      console.log(e)
      setUploadStatus({
        success: false,
        message: e.response?.data.message || "Sorry something went wrong",
      })
      setTimeout(() => {
        setUploadStatus({
          success: false,
          message: "",
        })
      }, 3000)
    }
  }

  return (
    <>
      <div
        {...getRootProps()}
        className=' h-3/5 md:h-5/6 w-4/5 xl:w-3/6  flex flex-col justify-center items-center border-dashed border-4 border-black-600 p-4 m-3 rounded-xl'>
        <input {...getInputProps()} />

        {previewSource && (
          <img
            src={previewSource}
            alt='chosen'
            className='h-3/5 w-full md:h-4/5 p-4 object-scale-down'
          />
        )}
        <p className='block uppercase text-gray-600 text-md font-bold mb-2'>
          {previewSource
            ? "Click the Upload button to confrim"
            : "Drag and drop some files here, or click to select files"}
        </p>
      </div>
      <button
        type='button'
        onClick={handleSubmitPicture}
        className=' flex justify-center bg-gray-700 text-white font-bold p-3 w-1/2 md:w-2/5 m-4 transition duration-200 hover:bg-green-700 '>
        Upload <CloudUploadIcon className='w-7 h-7 ml-2' />
      </button>
    </>
  )
}

export default DropzoneCloudinary
