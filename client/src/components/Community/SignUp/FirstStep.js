import { useEffect, useState } from "react"
import axios from "axios"

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
          setData({
            ...data,
            geoLocation: { lat: res.data[0].lat, lon: res.data[0].lon },
          })
        })
        .catch((e) => console.log(e))
    }
  }, [data.city, cityList, selectedCountry])

  // trim initial white spaces and makes first letter cap
  const formatValue = (value) => {
    const newValue = value.trimStart()
    return newValue.replace(value[0], value[0]?.toUpperCase())
  }

  const checkCountry = () => {
    if (data.country) {
      return selectedCountry
        ? "border-l-4 border-flime"
        : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }

  const checkCity = () => {
    if (data.city) {
      return selectedCity ? "border-l-4 border-flime" : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }

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
            <form
              onSubmit={(e) => {
                e.preventDefault(e)
                nextStep()
              }}
              className='flex flex-wrap h-5/6 justify-center items-center md:px-5 text-grotesk font-bold'>
              <div className='w-screen md:w-1/2  p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  First name
                </label>
                <input
                  type='text'
                  className='w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none'
                  required={true}
                  placeholder='First name'
                  value={data.firstName}
                  onChange={(e) =>
                    setData({ ...data, firstName: formatValue(e.target.value) })
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
                  value={data.lastName}
                  onChange={(e) =>
                    setData({ ...data, lastName: formatValue(e.target.value) })
                  }
                />
              </div>

              <div className='w-screen md:w-1/2 p-4 py-6 '>
                <label className='block uppercase text-gray-400 text-md font-bold mb-2'>
                  Country
                </label>
                <input
                  type='text'
                  className={
                    checkCountry() +
                    " w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
                  }
                  required={true}
                  list='countries'
                  value={data.country}
                  placeholder='Country'
                  onChange={(e) => {
                    setData({
                      ...data,
                      country: formatValue(e.target.value),
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
                  className={
                    checkCity() +
                    " w-full text-2xl appearance-none bg-grey-50 text-grey-500 border p-3 outline-none"
                  }
                  list='cities'
                  required={true}
                  value={data.city}
                  placeholder='City'
                  onChange={(e) => {
                    setData({
                      ...data,
                      city: formatValue(e.target.value),
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
                  value={data.bio}
                  placeholder='About you (max 3 sentences)'
                  onChange={(e) =>
                    setData({ ...data, bio: formatValue(e.target.value) })
                  }
                />
              </div>

              <div className='w-full flex justify-end pt-10 pr-5'>
                <button
                  type='submit'
                  className='p-5 bg-fblue font-bold text-lg text-white transition duration-200 hover:bg-blue-700 md:w-1/6 '>
                  Next{" "}
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
