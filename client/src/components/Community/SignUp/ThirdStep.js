import { useState } from "react"

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline"
import DropzoneCloudinary from "./DropzoneCloudinary"
import Banner from "../../Admin/Widgets/Banner"

const ThirdStep = ({ nextStep, previousStep, data, setData }) => {
  // const [previewSource, setPreviewSource] = useState(null)
  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    message: "",
  })
  const [banner, setBanner] = useState({ show: false })

  return (
    <div className="h-full flex flex-col justify-around items-center w-full bg-white p-3">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl w-2/6 text-center text-grotesk">
          Your picture
        </h1>
        {/* upload response message for user */}
        {uploadStatus.success ? (
          <div className=" w-full md:w-3/4 lg:w-4/6 bg-green-400 flex items-center p-5 font-bold ">
            <CheckCircleIcon className="w-8 h-8" />
            {uploadStatus.message}
          </div>
        ) : (
          !uploadStatus.success &&
          uploadStatus.message && (
            <div className="w-full md:w-3/4  lg:w-4/6 bg-red-400 flex items-center p-5 font-bold">
              <XCircleIcon className="w-8 h-8" />
              {uploadStatus.message}
            </div>
          )
        )}
        <Banner message={banner} />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col justify-center items-center w-full text-grotesk font-bold">
          <h4 className="w-full py-4 text-grotesk text-center text-xl lg:text-2xl">
            {data.photo.public_id
              ? "Your picture has been uploaded"
              : "Select a photo for your profile"}
          </h4>
          <div className="w-full flex justify-center h-60">
            <DropzoneCloudinary
              data={data}
              setData={setData}
              type="profilePicture"
              setUploadStatus={setUploadStatus}
              uploadStatus={uploadStatus}
            />
          </div>
        </div>
        <div className="w-full flex justify-between p-4">
          <button
            type="button"
            className="px-5 py-2 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6 "
            onClick={() => previousStep()}
          >
            Back
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6 "
            onClick={() => {
              if (data.photo?.url) {
                nextStep()
              } else {
                setBanner({
                  error: 1,
                  show: true,
                  message: "Please select a picture for your profile",
                })
                setTimeout(() => {
                  setBanner((prev) => ({ ...prev, show: false }))
                }, 3000)
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThirdStep
