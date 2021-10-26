import { useState } from "react"
import ListOption from "../../Admin/Widgets/ListOption"

let defaultBusinessAreas = [
  { name: "Select your business area", value: "Select your business area" },
  { name: "SaaS/Enterprise Software", value: "SaaS/Enterprise Software" },
  {
    name: "Mobility",
    value: "Mobility",
  },
  {
    name: "Sustainability/Impact investment",
    value: "Sustainability/Impact investment",
  },
  { name: "HealthTech", value: "HealthTech" },
  {
    name: "DTC",
    value: "DTC",
  },
  { name: "E-comm/Marketplaces", value: "E-comm/Marketplaces" },
  { name: "IoT", value: "IoT" },
  {
    name: "FoodTech",
    value: "FoodTech",
  },
  { name: "Gaming/Entertainment", value: "Gaming/Entertainment" },
  { name: "Engineering/DeepTech/AI", value: "Engineering/DeepTech/AI" },
  {
    name: "FinTech",
    value: "FinTech",
  },
  { name: "EdTech", value: "EdTech" },
  { name: "Other", value: "Other" },
]
const SecondStep = ({ data, setData, previousStep, nextStep }) => {
  const [businessAreas, setbusinessAreas] = useState([...defaultBusinessAreas])

  // check if the value entered by the user is included in the object list
  const isSelectionIncluded = (object) => {
    return Object.values(object).some((item) => item.name === data.businessArea)
  }

  const formatValue = (value) => {
    const newValue = value.trimStart()
    return newValue.replace(value[0], value[0]?.toUpperCase())
  }
  return (
    <>
      <div className='h-full md:h-screen  w-full flex flex-col lg:flex-row justify-center items-center z-0 '>
        <div className=' flex flex-col justify-around items-center h-full w-screen  lg:w-full xl:w-5/6  bg-white  p-3'>
          <div className='md:p-8 lg:w-full flex flex-col justify-center items-center'>
            <h1 className='font-bold text-grotesk text-xl md:text-2xl'>
              You and your business
            </h1>
            {/* <h1 className='text-grotesk text-xl lg:text-3xl  p-2'>
              We'are thrilled to have you on board! Please fill out the
              following fields with your informations in order to proceed.
            </h1> */}
          </div>
          <div className=' h-full lg:w-full lg:h-5/6 flex '>
            <form className='flex flex-wrap h-5/6 justify-center items-center md:px-5 text-grotesk font-bold'>
              <div className='w-screen md:w-1/2 p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Title
                </label>
                <input
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  placeholder='Title'
                  value={data.title}
                  onChange={(e) =>
                    setData({ ...data, title: formatValue(e.target.value) })
                  }
                />
              </div>
              <div className='w-screen md:w-1/2 p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Business area
                </label>
                <ListOption
                  options={businessAreas}
                  required={true}
                  choice={
                    isSelectionIncluded(businessAreas)
                      ? data.businessArea || "Select your business area"
                      : null
                  }
                  setChoice={(value) => {
                    setData({
                      ...data,
                      businessArea: value,
                    })
                  }}
                />
                <div
                  className={
                    data.businessArea === "Other" ||
                    !isSelectionIncluded(businessAreas)
                      ? "w-full py-6 "
                      : "hidden"
                  }>
                  <input
                    type='text'
                    placeholder='Enter your business area'
                    className={
                      data.businessArea === "Other" ||
                      !isSelectionIncluded(businessAreas)
                        ? "w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
                        : "hidden"
                    }
                    onChange={(e) =>
                      setTimeout(() => {
                        setbusinessAreas([
                          ...businessAreas,
                          {
                            name: formatValue(e.target.value),
                            value: formatValue(e.target.value),
                          },
                        ])
                        setData({
                          ...data,
                          businessArea: formatValue(e.target.value),
                        })
                      }, 10000)
                    }
                  />
                </div>
              </div>

              <div className='w-screen md:w-1/2 p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Company name
                </label>
                <input
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  placeholder='Title'
                  value={data.companyName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      companyName: formatValue(e.target.value),
                    })
                  }
                />
              </div>
              <div className='w-screen md:w-1/2 p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Company Website
                </label>
                <input
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  placeholder='Title'
                  value={data.companyLink}
                  onChange={(e) =>
                    setData({
                      ...data,
                      companyLink: e.target.value,
                    })
                  }
                />
              </div>
              <div className='w-full p-4 py-6  '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Company Bio
                </label>
                <textarea
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  value={data.companyBio}
                  placeholder='About you (max 3 sentences)'
                  onChange={(e) =>
                    setData({
                      ...data,
                      companyBio: formatValue(e.target.value),
                    })
                  }
                />
              </div>

              <div className='w-full flex justify-between pt-10  '>
                <button
                  type='button'
                  className='p-5 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6 '
                  onClick={() => previousStep()}>
                  Back
                </button>
                <button
                  type='button'
                  className='p-5 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6 '
                  onClick={() => nextStep()}>
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SecondStep
