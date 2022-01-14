import { useState } from "react"
import Banner from "../../Admin/Widgets/Banner"

import BusinessAreaSelect from "../Profile/BusinessAreaSelect"

const SecondStep = ({ data, setData, previousStep, nextStep }) => {
  const [banner, setBanner] = useState({ show: false })
  const formatValue = (value) => {
    const newValue = value.trimStart()
    return newValue.replace(value[0], value[0]?.toUpperCase())
  }
  return (
    <div className="flex flex-col justify-around items-center h-full w-full bg-white p-3">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-grotesk text-xl md:text-2xl lg:text-3xl">
          You and your business
        </h1>
        <span className="w-full flex justify-center items-center">
          <Banner message={banner} />
        </span>
      </div>
      <div className="w-full flex ">
        <form
          onSubmit={(e) => {
            e.preventDefault(e)
            if (
              data.businessArea !== "Select the business area" &&
              data.businessArea !== "Other"
            ) {
              nextStep()
            } else {
              setBanner({
                success: 0,
                show: true,
                message: "Please fill out all the fields",
              })
              setTimeout(() => {
                setBanner((prev) => ({ ...prev, show: false }))
              }, 3000)
            }
          }}
          className="flex flex-wrap h-5/6 justify-center items-center md:px-5 text-grotesk font-bold"
        >
          <div className="w-screen md:w-1/2 p-4 py-6 ">
            <label className="block uppercase text-gray-400 text-md font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
              required={true}
              placeholder="Title"
              value={data.title}
              onChange={(e) =>
                setData({ ...data, title: formatValue(e.target.value) })
              }
            />
          </div>
          <div className="w-screen md:w-1/2 p-4 py-6 ">
            <label className="block uppercase text-gray-400 text-md font-bold mb-2">
              Business area
            </label>
            <BusinessAreaSelect
              profile={data}
              setProfile={setData}
              required={banner.show}
              bgColor={"bg-white"}
            />
          </div>
          <div className="w-screen md:w-1/2 p-4 py-6 ">
            <label className="block uppercase text-gray-400 text-md font-bold mb-2">
              Company name
            </label>
            <input
              type="text"
              className="w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
              required={true}
              placeholder="Title"
              value={data.companyName}
              onChange={(e) =>
                setData({
                  ...data,
                  companyName: formatValue(e.target.value),
                })
              }
            />
          </div>
          <div className="w-screen md:w-1/2 p-4 py-6 ">
            <label className="block uppercase text-gray-400 text-md font-bold mb-2">
              Company Website
            </label>
            <input
              type="text"
              className="w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
              required={true}
              placeholder="Title"
              value={data.companyLink}
              onChange={(e) =>
                setData({
                  ...data,
                  companyLink: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full p-4 py-6  ">
            <label className="block uppercase text-gray-400 text-md font-bold mb-2">
              Company Bio
            </label>
            <textarea
              type="text"
              className="w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
              required
              value={data.companyBio}
              placeholder="About you (max 3 sentences)"
              onChange={(e) =>
                setData({
                  ...data,
                  companyBio: formatValue(e.target.value),
                })
              }
            />
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
              type="submit"
              className="px-5 py-2 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6 "
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SecondStep
