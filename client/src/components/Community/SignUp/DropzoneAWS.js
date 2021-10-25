import S3 from "react-aws-s3"
import { useDropzone } from "react-dropzone"
import { useState, useCallback } from "react"

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_DIR_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
}

const ReactS3Client = new S3(config)

const DropzoneAWS = ({ data, setData, type }) => {
  // AWS
  const onDrop = useCallback((acceptedFiles) => {
    // type: "image/jpeg"
    // type: "application/pdf"
    console.log(acceptedFiles)
    acceptedFiles.forEach((element) => {
      handleUpload(element)
    })
  }, [])

  const handleUpload = (file) => {
    const now = Date.now()
    let newFileName = `${data._id}-${type}-${data.firstName}-${data.lastName}-${now}`
    ReactS3Client.uploadFile(file, newFileName).then((res) => {
      console.log(res.location)
      data.photo.push(res.location)
      setData({ ...data, photo: [...data.photo] })
      if (res.status === 204) {
        console.log("success")
      } else {
        console.log("fail")
      }
    })
  }
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop })
  //   console.log(acceptedFiles.length === data.photo.length)
  //   console.log(acceptedFiles)
  return (
    <div
      {...getRootProps()}
      className=' h-full w-3/4   flex flex-col justify-center items-center border-dashed border-4 border-black-600 p-4 m-3 rounded-xl'>
      <input {...getInputProps()} multiple />

      {/* {previewSource && (
          <img
            src={previewSource}
            alt='chosen'
            className='h-3/4 w-full md:w-3/4 p-4 object-scale-down'
          />
        )} */}
      <p className='block uppercase text-gray-600 text-md font-bold mb-2'>
        Drag and drop some files here, or click to select files
      </p>
    </div>
  )
}

export default DropzoneAWS
