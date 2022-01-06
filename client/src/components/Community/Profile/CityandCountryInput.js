import { PencilIcon } from "@heroicons/react/outline"
import axios from "axios"
import { useState, useEffect } from "react"

const config = {
  headers: {
    "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRIES,
    "Content-Type": "application/json",
  },
}

const CityandCountryInput = ({
  disableEdit,
  profile,
  setProfile,
  selectedCity,
  selectedCountry,
  setSelectedCity,
  setSelectedCountry,
  required,
}) => {
  const [countryList, setCountryList] = useState([])
  const [cityList, setCityList] = useState([])
  // const [selectedCountry, setSelectedCountry] = useState(null)
  // const [selectedCity, setSelectedCity] = useState(null)

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
    setSelectedCountry(
      countryList.find((country) => country.name === profile.country)
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
  }, [profile.country, selectedCountry, countryList])

  useEffect(() => {
    // check if the city entered is in our list
    setSelectedCity(cityList.find((city) => city.name === profile.city))

    // get city coordinates
    if (selectedCity && profile.city) {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${profile.city},${selectedCountry?.iso2}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER}`
        )
        .then(({ data: [location] }) => {
          setProfile({
            ...profile,
            geoLocation: { lat: location?.lat, lng: location?.lon },
          })
        })
        .catch((e) => console.log(e))
    }
  }, [profile.city, selectedCity])

  const checkCountry = () => {
    if (disableEdit) return null
    if (profile.country) {
      return selectedCountry
        ? "border-l-4 border-flime"
        : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }

  const checkCity = () => {
    if (disableEdit) return null
    if (profile.city) {
      return selectedCity ? "border-l-4 border-flime" : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }

  const formatValue = (value) => {
    const newValue = value.trimStart()
    return newValue.replace(value[0], value[0]?.toUpperCase())
  }
  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-1 '>
        <label className='p-2 uppercase text-xs font-bold text-gray-400 flex items-center '>
          City
          {!disableEdit && <PencilIcon className='w-4 h-4 ml-2 text-black ' />}
        </label>
        {!disableEdit ? (
          <input
            required
            readOnly={disableEdit}
            list='cities'
            className={`p-2 text-base text-mono text-gray-800 outline-none my-1 md:my-0  ${checkCity()} ${
              disableEdit
                ? "bg-white  outline-none focus:outline-none cursor-default"
                : required
                ? "bg-red-200 animate-pulse"
                : "bg-sky-50"
            }`}
            value={profile.city}
            onChange={(e) => {
              setProfile({
                ...profile,
                city: formatValue(e.target.value),
              })
            }}
          />
        ) : (
          <p
            className={`p-2 text-base text-mono text-gray-800  outline-none my-1 md:my-0}`}>
            {profile.city}
          </p>
        )}
        <datalist id='cities'>
          {cityList.length > 0 &&
            cityList
              .filter((city) => city.name.startsWith(profile.city))
              .splice(0, 10)
              .map((city, i) => <option key={i}>{city.name}</option>)}
        </datalist>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-1 md:px-1 '>
        <label className='p-2 uppercase text-xs font-bold text-gray-400 flex items-center  '>
          Country
          {!disableEdit && <PencilIcon className='w-4 h-4 ml-2 text-black ' />}
        </label>
        {!disableEdit ? (
          <input
            required
            list='countries'
            className={`p-2 text-base text-mono disabled:opacity-0 text-gray-800  outline-none my-1 md:my-0  ${checkCountry()} ${
              disableEdit
                ? "bg-white outline-none focus:outline-none cursor-default"
                : required
                ? "bg-red-200 animate-pulse"
                : "bg-sky-50"
            }`}
            value={profile.country}
            onChange={(e) => {
              setProfile({
                ...profile,
                country: formatValue(e.target.value),
              })
            }}
          />
        ) : (
          <p
            className={`p-2 text-base text-mono text-gray-800  outline-none my-1 md:my-0}`}>
            {profile.country}
          </p>
        )}
        <datalist id='countries'>
          {countryList.length > 0 &&
            countryList
              .filter((country) => country.name.startsWith(profile.country))
              .splice(0, 10)
              .map((country, i) => <option key={i}>{country.name}</option>)}
        </datalist>
      </div>
    </>
  )
}

export default CityandCountryInput
