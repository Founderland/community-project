import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"

const Dropzone = ({ data, setData, type, setUploadStatus, uploadStatus }) => {
  const [previewSource, setPreviewSource] = useState(null)
  const [loading, setLoading] = useState(false)
  // CLOUDINARY
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])
    reader.onerror = () => console.log("file reading has failed")
    reader.onloadend = () => {
      const binaryStr = reader.result
      setPreviewSource(binaryStr)
      uploadImage(binaryStr)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const uploadImage = async (base64EncodedImage) => {
    setLoading(true)
    try {
      const result = await axios.post("/api/profile-picture/upload", {
        data: base64EncodedImage,
        public_id: `${type}`, //-${Date.now()}
        folder: `${data.firstName}-${data.lastName}`,
      })

      if (result.data?.public_id) {
        setUploadStatus({ success: true, message: result.data.message })
        setData({
          ...data,
          photo: { public_id: result.data.public_id, url: result.data.url },
        })
        setLoading(false)
        setTimeout(() => {
          setUploadStatus({
            success: false,
            message: "",
          })
          // setPreviewSource(null)
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
      setLoading(false)
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
        className="w-full flex flex-col justify-center items-center border-dashed border-4 border-black-600 rounded-xl"
      >
        <input {...getInputProps()} />
        {loading && (
          <div className="flex justify-center">
            <span
              style={{ borderTopColor: "transparent" }}
              className="w-16 h-16 border-8 border-black  border-dotted rounded-full animate-spin"
            ></span>
          </div>
        )}
        {!loading && previewSource && (
          <img
            src={previewSource}
            style={{ width: "200px", height: "80px" }}
            alt="chosen"
            className=" p-2 object-cover rounded"
          />
        )}
        <p className="block uppercase text-gray-600 text-xs font-bold mb-2">
          {data.photo.public_id
            ? " "
            : "Drag and drop your photo here, or click to select it"}
        </p>
      </div>
    </>
  )
}

export default Dropzone
