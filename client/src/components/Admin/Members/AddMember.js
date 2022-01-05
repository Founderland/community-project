import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router"
import AdminContext from "../../../contexts/Admin"
import ListOption from "../Widgets/ListOption"
import EmailNotification from "../Widgets/EmailNotification"
import Banner from "../Widgets/Banner"
import { Switch } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"

let businessAreas = [
  { name: "Select the business area", value: "Select the business area" },
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
]

const addMemberURL = "/api/users/community/add"

const AddMember = ({ role }) => {
  const history = useHistory()

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    role: role,
    city: "",
    country: "",
    companyName: "",
    businessArea: "Select the business area",
    connect: false,
    template: "approved",
    subject: "Welcome to Founderland!",
    body: "",
    signOff: "",
  })
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState({ show: false })
  const [countryList, setCountryList] = useState([])
  const [cityList, setCityList] = useState([])
  const [selectedCountry, setSelectedCounty] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [required, setRequired] = useState(false)

  const { config, reload, setReload } = useContext(AdminContext)

  const configuration = {
    headers: {
      "X-CSCAPI-KEY": process.env.REACT_APP_COUNTRIES,
      "Content-Type": "application/json",
    },
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const save = async () => {
    setSaving(true)
    if (data.email && checkEmail()) {
      if (data.firstName.length > 1 && data.lastName.length > 1) {
        try {
          if (
            data.connect &&
            data.template === "generic" &&
            (data.subject === "" || data.body === "" || data.signOff === "")
          )
            await Promise.reject(new Error("missing email fields"))
          const response = await axios.post(addMemberURL, data, config)
          if (response.data.success) {
            setSaving(false)
            setBanner({
              success: 1,
              show: true,
              message: "Member saved! Redirecting..",
            })
            setTimeout(() => {
              setBanner((prev) => ({ ...prev, show: false }))
              setReload(reload + 1)
              history.goBack()
            }, 2000)
          }
        } catch (err) {
          console.log(err)
          if (err?.response?.status === 403) {
            setSaving(false)
            setBanner({
              error: 1,
              show: true,
              message: err.response.data.message,
            })
            setTimeout(() => {
              setBanner((prev) => ({ ...prev, show: false }))
            }, 4000)
          } else if (err.message === "missing email fields") {
            setSaving(false)
            setRequired(true)
            setBanner({
              error: 1,
              show: true,
              message: "All fields for the custom email are required",
            })
            setTimeout(() => {
              setBanner((prev) => ({ ...prev, show: false }))
              setRequired(false)
            }, 4000)
          } else {
            setSaving(false)
            setBanner({
              error: 1,
              show: true,
              message: "Sorry, something went wrong",
            })
            setTimeout(() => {
              setBanner((prev) => ({ ...prev, show: false }))
            }, 4000)
          }
        }
      } else {
        setSaving(false)
        setBanner({
          error: 1,
          show: true,
          message: "Full name is required",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
      }
    } else {
      setSaving(false)
      setBanner({
        error: 1,
        show: true,
        message: "A valid email is required",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    }
  }

  const setBusinessArea = (value) => {
    setData((prev) => ({ ...prev, businessArea: value }))
  }
  const setTemplate = (template, subject) => {
    setData((prev) => ({ ...prev, template: template, subject: subject }))
  }
  const setEmail = (target, value) => {
    setData((prev) => ({ ...prev, [target]: value }))
  }
  const checkEmail = () => {
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(data.email)
  }

  // Country and city

  // get all the cities
  useEffect(() => {
    axios
      .get(`https://api.countrystatecity.in/v1/countries`, configuration)
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
          configuration
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
    if (selectedCity && data.city) {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${data.city},${selectedCountry?.iso2}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER}`
        )
        .then(({ data: [location] }) => {
          setData({
            ...data,
            geoLocation: { lat: location?.lat, lon: location?.lon },
          })
        })
        .catch((e) => console.log(e))
    }
  }, [data.city, selectedCity])

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
    <div className='bg-white pt-6 pb-4 flex flex-col items-center justify-center w-full mx-auto'>
      <div className='w-full flex items-center justify-center z-20'>
        <Banner message={banner} />
      </div>
      <div className='w-full uppercase font-bold tracking-wider text-xl flex items-center justify-center mb-4'>
        Add new {role}
      </div>
      <div className='md:flex w-full px-3'>
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            First Name
          </label>
          <input
            className={`${
              data.firstName === ""
                ? ""
                : data.firstName.length <= 1
                ? "border-l-4 border-fred"
                : "border-l-4 border-flime"
            } appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3`}
            type='text'
            onChange={(e) =>
              setData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            value={data.firstName}
            autoComplete='off'
          />
        </div>
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            Last Name
          </label>
          <input
            className={`${
              data.lastName === ""
                ? ""
                : data.lastName.length <= 1
                ? "border-l-4 border-fred"
                : "border-l-4 border-flime"
            } appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3`}
            type='text'
            onChange={(e) =>
              setData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            value={data.lastName}
            autoComplete='off'
          />
        </div>
      </div>
      <div className='md:flex w-full px-3'>
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            Title
          </label>
          <input
            className='appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3'
            type='text'
            onChange={(e) => {
              setData((prev) => ({ ...prev, title: e.target.value }))
            }}
            value={data.title}
          />
        </div>
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            Email
          </label>
          <input
            className={`${
              data.email === ""
                ? ""
                : !checkEmail()
                ? "border-l-4 border-fred"
                : "border-l-4 border-flime"
            } appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 outline-none`}
            type='text'
            onChange={(e) => {
              setData((prev) => ({ ...prev, email: e.target.value }))
            }}
            value={data.email}
            autoComplete='email'
          />
        </div>
      </div>
      <div className='md:flex w-full px-3'>
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            Country
          </label>
          <input
            className={
              checkCountry() +
              " appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
            }
            type='text'
            list='countries'
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                country: formatValue(e.target.value),
              }))
            }}
            value={data.country}
          />
          <datalist id='countries'>
            {countryList.length > 0 &&
              countryList
                .filter((country) => country.name.startsWith(data.country))
                .splice(0, 10)
                .map((country, i) => <option key={i}>{country.name}</option>)}
          </datalist>
        </div>

        {/* City */}
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            City
          </label>
          <input
            className={
              checkCity() +
              " appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
            }
            type='text'
            list='cities'
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                city: formatValue(e.target.value),
              }))
            }}
            value={data.city}
          />
          <datalist id='cities'>
            {cityList.length > 0 &&
              cityList
                .filter((city) => city.name.startsWith(data.city))
                .splice(0, 10)
                .map((city, i) => <option key={i}>{city.name}</option>)}
          </datalist>
        </div>
      </div>
      <div className='md:flex w-full px-3'>
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            Company Name
          </label>
          <input
            className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3'
            type='text'
            onChange={(e) => {
              setData((prev) => ({ ...prev, companyName: e.target.value }))
            }}
            value={data.companyName}
          />
        </div>
        <div className='w-full md:w-1/2 mb-2 px-2'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
            Sector
          </label>
          <div className='w-full'>
            <ListOption
              options={businessAreas}
              choice={data.businessArea}
              setChoice={setBusinessArea}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center w-full px-3'>
        <div className='w-full md:w-1/4 mb-2 px-2'>
          <Switch.Group
            as='div'
            className='flex md:flex-col mt-2 justify-center items-center py-2'>
            <Switch.Label className='mt-2 uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
              Send Email
            </Switch.Label>
            <Switch
              as='button'
              checked={data.connect}
              onChange={() =>
                setData((prev) => ({ ...prev, connect: !data.connect }))
              }
              className={`${
                data.connect ? "bg-flime-600" : "bg-gray-200"
              } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline ml-4 md:ml-0`}>
              {({ checked }) => (
                <span
                  className={`${
                    checked ? "translate-x-5" : "translate-x-0"
                  } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}>
                  <CheckIcon className={checked ? "" : "hidden"} />
                </span>
              )}
            </Switch>
          </Switch.Group>
        </div>
      </div>
      {data.connect && (
        <EmailNotification
          firstName={data.firstName}
          lastName={data.lastName}
          template={data.template}
          setTemplate={setTemplate}
          setEmail={setEmail}
          subject={data.subject}
          body={data.body}
          signOff={data.signOff}
          required={required}
        />
      )}
      <div className='w-full px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around '>
        <button
          className='px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4'
          onClick={() => {
            history.goBack()
          }}>
          Cancel
        </button>
        <button
          className='px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4'
          onClick={save}>
          {saving ? (
            <div className='flex justify-center'>
              <div
                style={{ borderTopColor: "transparent" }}
                className='w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin'></div>
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  )
}

export default AddMember
