import ListOption from "../../Admin/Widgets/ListOption"
import { useEffect, useState } from "react"
import axios from "axios"

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

const config = {
  headers: {
    "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRIES,
    "Content-Type": "application/json",
  },
}

const FirstStep = ({ data, setData, nextStep }) => {
  const [countryList, setCountryList] = useState([])
  const [cityList, setCityList] = useState([])
  const [selectedCountry, setSelectedCounty] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [businessAreas, setbusinessAreas] = useState([...defaultBusinessAreas])

  // check if the value entered by the user is included in the object list
  const isSelectionIncluded = (object) => {
    return Object.values(object).some((item) => item.name === data.businessArea)
  }

  // get all the cities
  useEffect(() => {
    axios
      .get(`https://api.countrystatecity.in/v1/countries`, config)
      .then((res) => {
        setCountryList(res.data)
      })
      .catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    // check if the country entered is in our list
    setSelectedCounty(
      countryList.find((country) => country.name === data.country)
    )
    // get list of cities in the selected country
    if (selectedCountry) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry?.iso2}/cities`,
          config
        )
        .then((res) => {
          setCityList(res.data)
        })
        .catch((e) => console.log(e))
    }
  }, [data.country, selectedCountry, countryList])

  useEffect(() => {
    // check if the city entered is in our list
    setSelectedCity(cityList.find((city) => city.name === data.city))

    // get city coordinates
    if (data.country.length & data.city.length) {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${data.city},${selectedCountry?.iso2}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER}`
        )
        .then((res) => {
          console.log(res.data)
          setData({
            ...data,
            geoLocation: { lat: res.data[0].lat, lon: res.data[0].lon },
          })
        })
        .catch((e) => console.log(e))
    }
  }, [data.city, cityList, selectedCountry])

  return (
    <>
      <div className='h-full md:h-screen  w-full flex flex-col lg:flex-row justify-center items-center z-0 '>
        <div className=' flex flex-col justify-around items-center h-full w-screen  lg:w-full xl:w-5/6  bg-white  p-3'>
          <div className='md:p-8 lg:w-full flex flex-col justify-center items-center'>
            <h1 className='font-bold text-xl md:text-2xl lg:text-4xl p-3 text-hanson text-center'>
              Welcome to Founderland!
            </h1>
            <h1 className='text-grotesk text-xl lg:text-3xl  p-2'>
              We'are thrilled to have you on board! Please fill out the
              following fields with your informations in order to proceed.
            </h1>
          </div>
          <div className=' h-full lg:w-full lg:h-5/6 flex '>
            <form className='flex flex-wrap h-5/6 justify-center items-center md:px-5 text-grotesk font-bold'>
              <div className='w-screen md:w-1/2  p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  First name
                </label>
                <input
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  placeholder='First name'
                  defaultValue={data.firstName}
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                />
              </div>

              <div className='w-screen md:w-1/2  p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Last name
                </label>
                <input
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  placeholder='Last name'
                  defaultValue={data.lastName}
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                />
              </div>
              <div className='w-screen md:w-1/2 p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Title
                </label>
                <input
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  placeholder='Title'
                  defaultValue={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
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
                            name: e.target.value,
                            value: e.target.value,
                          },
                        ])
                        setData({
                          ...data,
                          businessArea: e.target.value,
                        })
                      }, 10000)
                    }
                  />
                </div>
              </div>

              <div className='w-screen md:w-1/2 p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Country
                </label>
                <input
                  type='text'
                  className={`
                    ${
                      selectedCountry
                        ? " border-green-300 "
                        : " border-yellow-300 "
                    } 
                         w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none`}
                  required={true}
                  list='countries'
                  defaultValue={data.country}
                  placeholder='Country'
                  onChange={(e) => {
                    const value = e.target.value.trimStart()
                    setData({
                      ...data,
                      country: value.replace(value[0], value[0]?.toUpperCase()),
                    })
                  }}
                />
                <datalist id='countries'>
                  {countryList.length > 0 &&
                    countryList
                      .filter((country) =>
                        country.name.startsWith(data.country)
                      )
                      .splice(0, 10)
                      .map((country, i) => (
                        <option key={i}>{country.name}</option>
                      ))}
                </datalist>
              </div>
              <div className='w-screen md:w-1/2 p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  City
                </label>
                <input
                  type='text'
                  className={`${
                    selectedCity ? " border-green-300 " : " border-yellow-300 "
                  }w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none`}
                  list='cities'
                  required={true}
                  defaultValue={data.city}
                  placeholder='City'
                  onChange={(e) => {
                    const value = e.target.value.trimStart()
                    setData({
                      ...data,
                      city: value.replace(value[0], value[0]?.toUpperCase()),
                    })
                  }}
                />
                <datalist id='cities'>
                  {cityList.length > 0 &&
                    cityList
                      .filter((city) => city.name.startsWith(data.city))
                      .splice(0, 10)
                      .map((city, i) => <option key={i}>{city.name}</option>)}
                </datalist>
              </div>
              <div className='w-full p-4 py-6  '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Bio
                </label>
                <textarea
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  value={data.about}
                  placeholder='About you (max 3 sentences)'
                  onChange={(e) => setData({ ...data, about: e.target.value })}
                />
              </div>

              <div className='w-full flex justify-end pt-10 pr-5'>
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
