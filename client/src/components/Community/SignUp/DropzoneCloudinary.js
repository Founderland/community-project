import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"

const DropzoneCloudinary = ({ data, setData, type }) => {
  const [previewSource, setPreviewSource] = useState(null)
  const [uploadStatus, setuploadStatus] = useState({
    success: false,
    message: "",
  })

  // CLOUDINARY
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])
    reader.onerror = () => console.log("file reading has failed")
    reader.onloadend = () => {
      const binaryStr = reader.result
      console.log(binaryStr)
      setPreviewSource(binaryStr)
      uploadImage(binaryStr)
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  //   const handleSubmitPicture = () => {
  //     if (!previewSource) return
  //     uploadImage(previewSource)
  //   }

  const uploadImage = async (base64EncodedImage) => {
    try {
      const result = await axios.post("/api/profile-picture/upload", {
        data: base64EncodedImage,
        public_id: `${type}-${Date.now()}`,
        folder: `${data.firstName}-${data.lastName}`,
      })
      console.log(result)
      //   {
      //     message: "Picture uploaded succesfully",
      //     public_id: 'profile_pictures/e1ln3u5t1aoe9nipu3nn',
      //     url: 'https://res.cloudinary.com/founderland/image/upload/v1635157373/profile_pictures/e1ln3u5t1aoe9nipu3nn.png',
      //     format: 'png',
      //   }
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
        message: e.response?.data.message || "Sorry something went wrong",
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
    <div
      {...getRootProps()}
      className=' h-full w-3/4   flex flex-col justify-center items-center border-dashed border-4 border-black-600 p-4 m-3 rounded-xl'>
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
  )
}

export default DropzoneCloudinary
