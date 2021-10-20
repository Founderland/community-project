import ListOption from "../Admin/ListOption"
import { ReactComponent as LogoLines } from "../../assets/line.svg"
import banner from "../../assets/images/banner_black.png"

const businessAreas = [
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

const FirstStep = ({ data, setData, nextStep }) => {
  const isSelectionIncluded = (object) => {
    return Object.values(object).some((item) => item.name === data.businessArea)
  }

  const businessAreas = [
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
    {
      name: "Other",
      value: "Other",
    },
  ]
  return (
    <>
      <div className='h-full  w-screen flex flex-col justify-start items-center '>
        <div className=' flex flex-col justify-between h-full w-screen xl:w-2/3  md:h-5/6 bg-white  p-3'>
          <div className='text-grotesk lg:text-3xl  '>
            We'are thrilled to have you on board! Please fill out the following
            fields with your informations in order to proceed.
          </div>
          <div className=' h-full md:h-screen xl:h-full  '>
            <form className='flex flex-wrap h-4/6 justify-center items-center md:px-5 text-grotesk font-bold'>
              {/* <div className=' flex w-full  justify-center items-center p-4 '>
          <div className='bg-gray-300 rounded-full overflow-hidden bg-gray-300'>
            <UserIcon className='h-12 w-12 md:w-auto md:h-auto xl:w-1/4 xl:h-1/4' />
          </div>
          <label className='w-1/2'>Profile Picture</label>
          <input type='file' className=' w-1/2 p-4' />
        </div> */}

              {/* <div className=' flex w-full justify-center items-center p-4 '>
                <label className='p-2 w-1/4 xl:w-1/6 text-center'>Photo</label>
                <span className=' mx-5  rounded-full overflow-hidden bg-gray-200 shadow-lg '>
                  <UserIcon className='h-12 w-12' />
                </span>
                <button
                  type='file'
                  className='w-1/4 xl:w-1/6 p-2 bg-fblue font-bold text-white shadow-lg'>
                  Choose
                </button>
              </div> */}

              <div className='w-full md:w-1/2 xl:w-1/3 p-4 '>
                <label>First name</label>
                <input
                  type='text'
                  className='w-full p-3 bg-gray-50 shadow-lg '
                  required={true}
                  placeholder='First name'
                  defaultValue={data.firstName}
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                />
              </div>

              <div className='w-full md:w-1/2 xl:w-1/3 p-4 '>
                <label>Last name</label>
                <input
                  type='text'
                  className='w-full p-3 bg-gray-50 shadow-lg'
                  required={true}
                  placeholder='Last name'
                  defaultValue={data.lastName}
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                />
              </div>
              <div className='w-full md:w-1/3 p-4 '>
                <label>Title</label>
                <input
                  type='text'
                  className='w-full p-3 bg-gray-50 shadow-lg'
                  required={true}
                  placeholder='Title'
                  defaultValue={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>
              <div className='w-full md:w-1/3 p-4 '>
                <label>Country</label>
                <input
                  type='text'
                  className='w-full p-3 bg-gray-50 shadow-lg'
                  required={true}
                  placeholder='Country'
                  onChange={(e) =>
                    setData({ ...data, country: e.target.value })
                  }
                />
              </div>
              <div className='w-full md:w-1/3 p-4 '>
                <label>City</label>
                <input
                  type='text'
                  className='w-full p-3 bg-gray-50 shadow-lg'
                  required={true}
                  placeholder='City'
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                />
              </div>

              <div className='w-full   p-4  '>
                <label>Bio</label>
                <textarea
                  type='text'
                  className='w-full p-3 bg-gray-50 shadow-lg'
                  required={true}
                  value={data.about}
                  placeholder='About you (max 3 sentences)'
                  onChange={(e) => setData({ ...data, about: e.target.value })}
                />
              </div>

              <div className='w-full md:w-2/3 p-4'>
                <label>Business area</label>
                <ListOption
                  options={businessAreas}
                  style={" shadow-lg "}
                  required={true}
                  choice={data.businessArea || "Select your business area"}
                  setChoice={(value) => {
                    setData({
                      ...data,
                      businessArea: value,
                    })
                  }}
                />
                <div>
                  <input
                    type='text'
                    className={
                      data.businessArea === "Other" ||
                      !isSelectionIncluded(businessAreas)
                        ? "w-full p-3 bg-gray-50 shadow-lg"
                        : "hidden"
                    }
                    onChange={(e) =>
                      setTimeout(() => {
                        setData({
                          ...data,
                          businessArea: e.target.value,
                        })
                      }, 3000)
                    }
                  />
                </div>
              </div>

              <div className='w-full  flex flex-wrap justify-center items-center'>
                <div className='w-full  h-full p-4 '>
                  <label>Email address</label>
                  <input
                    type='email'
                    className='w-full p-3 bg-gray-50 shadow-lg'
                    required={true}
                    placeholder='Enter email'
                    defaultValue={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>

                <div className='w-full  md:w-1/2 p-4  '>
                  <label>Password</label>
                  <input
                    type='password'
                    className='w-full p-3 bg-gray-50 shadow-lg'
                    required={true}
                    placeholder='Enter password'
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
                <div className='w-full  md:w-1/2 p-4  '>
                  <label>Confirm Password</label>
                  <input
                    type='password'
                    className='w-full p-3 bg-gray-50 shadow-lg'
                    required={true}
                    placeholder='Enter password again'
                    onChange={(e) =>
                      setData({
                        ...data,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className='w-full flex justify-end pt-10'>
                <button
                  type='button'
                  className='p-5 bg-fblue font-bold text-lg text-white shadow-lg '
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

export default FirstStep
