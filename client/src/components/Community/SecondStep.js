import axios from "axios"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

import { Image, Transformation } from "cloudinary-react"

const SecondStep = () => {
  const [fileInputState, setFileInputState] = useState("")
  const [previewSource, setPreviewSource] = useState()

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
        setPreviewSource(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps, inputRef } = useDropzone({ onDrop })

  //   console.log(acceptedFiles, "ACCEPTED")
  //   const handleFileInput = () => {
  //     // console.log(acceptedFiles[0], "ACCEPTED")
  //     console.log(inputRef.current.files[0])
  //     // if (!inputRef.current.files[0]) return
  //     const picture = inputRef.current.files[0]
  //     previewPicture(picture)
  //   }

  //   const previewPicture = (picture) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(picture)
  //     reader.onloadend = () => {
  //       setPreviewSource(reader.result)
  //     }
  //   }

  const handleSubmitPicture = (e) => {
    // e.preventDefault()
    console.log("running", previewSource)
    if (!previewSource) return
    uploadImage(previewSource)
  }

  const uploadImage = async (base64EncodedImage) => {
    console.log("uploading pic")
    try {
      const result = await axios.post("/api/profile-picture/upload", {
        data: base64EncodedImage,
      })
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-start items-center '>
      <div className=' flex flex-col justify-center  items center h-full w-screen xl:w-2/3 md:h-5/6 bg-white p-3'>
        {/* <form onSubmit={handleSubmitPicture}>
          <input
            type='file'
            name='image'
            onChange={handleFileInput}
            value={fileInputState}
          />
          <button type='submit' className='bg-fblue text-white font-bold p-4'>
            Upload
          </button>
        </form> */}
        <div
          {...getRootProps({
            // onDrop: () => handleFileInput(),
          })}
          className='h-1/2 flex justify-center items-center border-dashed border-4 border-black-600'>
          <input
            {...getInputProps({
              //   onChange: () => handleFileInput(),
            })}
          />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {previewSource && (
          <img src={previewSource} alt='chosen' className='h-1/3 w-1/3' />
        )}
        <button
          type='button'
          onClick={handleSubmitPicture}
          className='bg-fblue text-white font-bold p-4'>
          Upload
        </button>
        <Image
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
        </Image>
      </div>
    </div>
  )
}

export default SecondStep
