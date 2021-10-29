import axios from "axios"
import { useState, useContext } from "react"
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker"
import { useHistory } from "react-router"
import AdminContext from "../../../contexts/Admin"
import ListOption from "../Widgets/ListOption"
import Banner from "../Widgets/Banner"
import { Switch } from "@headlessui/react"
import { CheckIcon, SearchIcon } from "@heroicons/react/outline"
import Places from "./Places"
import MapDisplay from "./MapDisplay"
import Tags from "../Widgets/Tags"

let types = [
  { name: "Online", value: "online" },
  { name: "Private", value: "private" },
  { name: "Public", value: "public" },
]
const AddEvent = ({ role }) => {
  const history = useHistory()
  const [data, setData] = useState({
    title: "",
    photo: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    address: "",
    city: "",
    geoLocation: { lat: 52.51621460823984, lng: 13.378192013711518 },
    type: "online",
    link: "",
    tags: ["#fintech", "#fundraiser", "#restricted"],
    annouce: "",
  })
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState({})
  const { token, reload, setReload } = useContext(AdminContext)

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const save = async () => {
    setSaving(true)
    if (data.title && data.description) {
    } else {
      setSaving(false)
      setBanner({
        error: 1,
        show: true,
        message: "Please fill in all required fields!",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 3000)
    }
  }

  const setType = (value) => {
    setData((prev) => ({ ...prev, type: value }))
  }
  const setAddress = (value) => {
    setData((prev) => ({ ...prev, address: value }))
  }
  const setCity = (value) => {
    setData((prev) => ({ ...prev, city: value }))
  }
  const setMarker = (lat, lng) => {
    setData((prev) => ({ ...prev, geoLocation: { lat, lng } }))
  }
  const setLocation = (value) => {
    setData((prev) => ({ ...prev, location: value }))
  }
  const setDate = (value) => {
    if (value)
      setData((prev) => ({ ...prev, dateStart: value[0], dateEnd: value[1] }))
    else setData((prev) => ({ ...prev, dateStart: null, dateEnd: null }))
  }
  const isLink = () => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(
      data.link
    )
  }

  return (
    <div className="bg-white px-4 md:px-8 pt-6 pb-4 flex rounded flex-col w-full xl:w-5/6">
      <div className="w-full flex items-center justify-center z-20">
        <Banner message={banner} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full uppercase font-bold tracking-wider text-xl flex items-center justify-center mb-4">
          Add new event
        </div>
        <div className="md:flex w-full px-3">
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Title
            </label>
            <input
              className={`${
                data.title === ""
                  ? ""
                  : data.title.length <= 1
                  ? "border-l-4 border-fred"
                  : "border-l-4 border-flime"
              } appearance-none outline-none outline-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3`}
              type="text"
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
              value={data.title}
              autoComplete="off"
            />
          </div>

          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Date
            </label>
            <DateTimeRangePicker
              className="w-1/2 p-2"
              onChange={setDate}
              value={[data.dateStart, data.dateEnd]}
            />
          </div>
        </div>
        <div className="md:flex w-full px-3">
          <div className="w-full mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Description
            </label>
            <textarea
              className="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
              type="text"
              onChange={(e) => {
                setData((prev) => ({ ...prev, description: e.target.value }))
              }}
              value={data.description}
            />
          </div>
        </div>
        <div className="md:flex w-full px-3">
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Type
            </label>
            <div className="w-full">
              <ListOption
                options={types}
                choice={data.type}
                setChoice={setType}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Link
            </label>
            <div className="w-full">
              <input
                className={`${
                  data.link === ""
                    ? ""
                    : !isLink()
                    ? "border-l-4 border-fred"
                    : "border-l-4 border-flime"
                } appearance-none outline-none block w-full bg-grey-lighter text-grey-darker focus:ring-2 ring-fblue border border-grey-lighter rounded py-3 px-4 mb-3`}
                type="text"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, link: e.target.value }))
                }}
                value={data.link}
              />
            </div>
          </div>
        </div>
        <div className="w-full grid sm:grid-cols-2 px-3">
          <div className="grid grid-cols-1">
            <div className="mb-2 px-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Location
              </label>
              <input
                className="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                type="text"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, location: e.target.value }))
                }}
                value={data.location}
              />
            </div>
            <div className="relative mb-2 px-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Address
              </label>
              <Places
                setLocation={setLocation}
                setAddress={setAddress}
                setCity={setCity}
                address={data.address}
                setMarker={setMarker}
              />
              <SearchIcon className="w-6 h-6 absolute left-6 bottom-6" />
            </div>
            <div className="mb-2 px-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                City
              </label>
              <input
                className="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                type="text"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, city: e.target.value }))
                }}
                value={data.city}
              />
            </div>
          </div>
          <div className="hidden sm:block px-3 mb-2">
            <MapDisplay location={data.geoLocation} />
          </div>
        </div>
        <div className="md:flex w-full px-3">
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Photo
            </label>
            <input
              className={`appearance-none outline-none outline-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3`}
              type="text"
              placeholder="Drag and drop box for photo"
              autoComplete="off"
            />
          </div>
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Tags
            </label>
            <div className="">
              <Tags tags={data.tags} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full px-3">
          <div className="w-full md:w-1/4 mb-2 px-2">
            <Switch.Group
              as="div"
              className="flex md:flex-col mt-2 justify-center items-center py-2"
            >
              <Switch.Label className="mt-2 uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Publish in Newsfeed
              </Switch.Label>
              <Switch
                as="button"
                checked={data.announce}
                onChange={() =>
                  setData((prev) => ({ ...prev, announce: !data.announce }))
                }
                className={`${
                  data.announce ? "bg-flime-600" : "bg-gray-200"
                } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline ml-4 md:ml-0`}
              >
                {({ checked }) => (
                  <span
                    className={`${
                      checked ? "translate-x-5" : "translate-x-0"
                    } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                  >
                    <CheckIcon className={checked ? "" : "hidden"} />
                  </span>
                )}
              </Switch>
            </Switch.Group>
          </div>
        </div>

        <div className="px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
          <button
            className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4"
            onClick={() => {
              history.goBack()
            }}
          >
            Cancel
          </button>
          <button
            className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
            onClick={save}
          >
            {saving ? (
              <div className="flex justify-center">
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
                ></div>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEvent
