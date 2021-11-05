import { useState, useCallback, useContext, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"

const Dropzone = ({
  data,
  setData,
  type,
  setUploadStatus,
  uploadStatus,
  classes,
  folder,
  required,
}) => {
  const [previewSource, setPreviewSource] = useState(null)
  const [loading, setLoading] = useState(false)
  const { getUuid, config } = useContext(AdminContext)
  const regex = new RegExp("(?:Cover)", "g")

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
      const result = await axios.post(
        "/api/profile-picture/upload",
        {
          data: base64EncodedImage,
          public_id: `${type}`, //-${Date.now()}
          folder: `${folder}/${getUuid()}`,
        },
        config
      )
      if (result.data?.public_id) {
        setUploadStatus({ success: true, message: result.data.message })
        setData((prev) => ({
          ...prev,
          [type]: { public_id: result.data.public_id, url: result.data.url },
        }))
        setLoading(false)
        setTimeout(() => {
          setUploadStatus({
            success: false,
            message: "",
          })
          if (type.match(regex)) {
            setPreviewSource(null)
          }
        }, 2000)
      }
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
      }, 4000)
    }
  }

  return (
    <>
      <div
        {...getRootProps()}
        className={`${classes} ${
          required ? "border-red-600 animate-pulse" : ""
        }`}
      >
        <input {...getInputProps()} />
        {loading && (
          <div className="flex justify-center">
            <span
              style={{ borderTopColor: "transparent" }}
              className="w-16 h-16 border-8 border-black border-dotted rounded-full animate-spin"
            ></span>
          </div>
        )}
        {!loading && previewSource && (
          <img
            src={previewSource}
            alt="chosen"
            className="w-full p-2 object-cover"
          />
        )}
        {!previewSource && (
          <p
            className={`block uppercase tracking-wide text-gray-600 text-xs font-bold ${
              required ? "text-red-600 animate-pulse" : ""
            }`}
          >
            <p>Drag and drop your file here, or click to select it</p>
            {type.match(regex) ? (
              <p className="text-xs">(optimal ratio: 2:1)</p>
            ) : (
              ""
            )}
          </p>
        )}
      </div>
    </>
  )
}

export default Dropzone
