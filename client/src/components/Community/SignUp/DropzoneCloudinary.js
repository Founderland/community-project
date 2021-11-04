import { useState, useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import { config } from "dotenv"

const DropzoneCloudinary = ({
  data,
  setData,
  type,
  setUploadStatus,
  uploadStatus,
  noPreview,
}) => {
  const [previewSource, setPreviewSource] = useState(null)
  const [loading, setLoading] = useState(false)

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    }
  }, [])

  // CLOUDINARY
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.readAsDataURL(acceptedFiles[0])
    reader.onerror = () => console.log("file reading has failed")
    reader.onloadend = () => {
      const binaryStr = reader.result
      if (!noPreview) {
        setPreviewSource(binaryStr)
      }
      uploadImage(binaryStr)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const uploadImage = async (base64EncodedImage) => {
    setLoading(true)
    try {
      const result = await axios.post(
        "/api/profile-picture/upload",
        {
          data: base64EncodedImage,
          public_id: `${type}`, //-${Date.now()}
          folder: `${data.firstName}-${data.lastName}`,
        },
        config
      )

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
        className=" h-3/5 md:h-5/6 w-4/5 xl:w-3/6  flex flex-col justify-center items-center border-dashed border-4 border-black-600 p-4 m-3 rounded-xl"
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
            style={{ width: "200px", height: "200px" }}
            alt="chosen"
            className=" p-4 object-cover rounded-full"
          />
        )}
        <p className="block uppercase text-gray-600 text-md font-bold mb-2">
          Drag and drop your photo here, or click to select it
        </p>
      </div>
    </>
  )
}

export default DropzoneCloudinary
