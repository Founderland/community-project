import axios from "axios"
import { useState, useContext, useEffect } from "react"
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker"
import { useHistory } from "react-router"
import AdminContext from "../../../contexts/Admin"
import ListOption from "../Widgets/ListOption"
import Banner from "../Widgets/Banner"
import { SearchIcon } from "@heroicons/react/outline"
import Places from "./Places"
import MapDisplay from "./MapDisplay"
import Tags from "../Widgets/Tags"
import Dropzone from "../Widgets/DropZone"
import { Image } from "cloudinary-react"

let types = [
  { name: "Online", value: "online" },
  { name: "Private", value: "private" },
  { name: "Public", value: "public" },
]

const addEventUrl = "/api/events/add"
const updateEventUrl = "/api/events/update/"

const AddEvent = ({ event, edit, setEdit }) => {
  const history = useHistory()
  const [data, setData] = useState({
    member: "61814cbf5f7dd7305e7615f5",
    title: "",
    eventCover: null,
    description: "",
    dateStart: new Date(Date.now()),
    dateEnd: new Date(Date.now() + 1000),
    address: "",
    city: "",
    geoLocation: { lat: 52.51621460823984, lng: 13.378192013711518 },
    type: "online",
    link: "",
    location: "",
    tags: [],
    annouce: false,
    zoom: 16,
  })
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState({ show: false })
  const [required, setRequired] = useState(false)
  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    message: "",
  })
  const { config, reload, setReload } = useContext(AdminContext)

  //EDIT
  useEffect(() => {
    if (edit) {
      setData((prev) => ({
        ...prev,
        ...event,
      }))
    }
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      if (!data.title.length && !data.description.length)
        await Promise.reject(new Error("missing_fields_title_Description"))
      if (data.type === "online" && !isLink(data.link))
        await Promise.reject(new Error("invalid_url"))
      if (!data.eventCover?.public_id)
        await Promise.reject(new Error("missing_fields_cover"))
      if (data.type !== "online" && !data.city)
        await Promise.reject(new Error("missing_fields_city"))
      let newEvent = null
      if (edit) {
        newEvent = await axios.put(updateEventUrl + data._id, data, config)
      } else {
        newEvent = await axios.post(addEventUrl, data, config)
      }
      if (newEvent.data.success && !edit) {
        setSaving(false)
        setBanner({
          success: 1,
          show: true,
          message: "Event saved! Redirecting...",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
          setReload(reload + 1)
          history.goBack()
        }, 2000)
      } else {
        setEdit(false)
        setReload(reload + 1)
      }
    } catch (e) {
      if (e?.message.includes("missing_fields")) {
        setSaving(false)
        setRequired(true)
        setBanner({
          error: 1,
          show: true,
          message: "Please fill in all required fields! " + e.message,
        })
      } else if (e?.message === "invalid_url") {
        setSaving(false)
        setBanner({
          error: 1,
          show: true,
          message: "Invalid link provided!",
        })
      }
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
        setRequired(false)
      }, 4000)
    }
  }

  const setLocationValues = (where, value) => {
    setData((prev) => ({ ...prev, [where]: value }))
  }
  const setType = (value) => {
    setData((prev) => ({ ...prev, type: value }))
  }
  const setDate = (value) => {
    console.log(value)
    console.log(Date.now())
    if (value)
      setData((prev) => ({ ...prev, dateStart: value[0], dateEnd: value[1] }))
    else setData((prev) => ({ ...prev, dateStart: null, dateEnd: null }))
  }
  const pushTag = (value) => {
    const convertedValue =
      "#" +
      value
        .replace(/[^\w,;\s]+/g, "")
        .replace(/\s+/g, "-")
        .replace(/[,;]{2,}/g, "")
        .toLowerCase()
    if (!data.tags.includes(convertedValue)) {
      setData((prev) => ({ ...prev, tags: [...data.tags, convertedValue] }))
    }
  }
  const popTag = (value) => {
    const newTags = [...data.tags].filter((tag) => tag !== value)
    setData((prev) => ({ ...prev, tags: newTags }))
  }
  const isLink = (link) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(
      link
    )
  }
  console.log(data)
  return (
    <div className="bg-white px-4 md:px-8 pt-6 pb-4 flex flex-col w-full xl:w-5/6">
      <div className="w-full flex items-center justify-center z-20">
        <Banner message={banner} />
      </div>
      <div className="w-full uppercase font-bold tracking-wider text-xl flex items-center justify-center mb-4">
        Add new event
      </div>
      {data.eventCover?.public_id && (
        <div className=" w-full px-3">
          <label
            className={`block uppercase tracking-wide text-xs font-bold mb-2 ${
              required ? "text-red-600 animate-pulse" : ""
            }`}
          >
            cover
          </label>
          <Image
            cloudName="founderland"
            publicId={data.eventCover.public_id}
            className="w-full px-8 pb-8 pt-2"
          ></Image>
        </div>
      )}
      <div className="md:flex w-full px-3">
        <div className="w-full md:w-1/2 mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
            Title
          </label>
          <input
            className={`${
              data.title === ""
                ? ""
                : data.title.length <= 1
                ? "border-l-4 border-fred"
                : "border-l-4 border-flime"
            } appearance-none outline-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
              required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
            }`}
            type="text"
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            value={data.title}
            autoComplete="off"
          />
        </div>

        <div className=" w-full md:w-1/2 mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
            Date
          </label>
          <DateTimeRangePicker
            className="text-sm appearance-none outline-none outline-none block w-full bg-grey-lighter border py-0.5 px-1 mb-3"
            onChange={setDate}
            value={[data.dateStart, data.dateEnd]}
            disableClock={true}
            clearIcon={null}
            rangeDivider={" to "}
            format={"dd-MM-y H:mm"}
          />
        </div>
      </div>
      <div className="md:flex w-full px-3">
        <div className="w-full mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
            Description
          </label>
          <textarea
            className={`appearance-none outline-none block w-full bg-grey-lighter border py-3 px-4 mb-3 ${
              required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
            }`}
            type="text"
            onChange={(e) => {
              setData((prev) => ({ ...prev, description: e.target.value }))
            }}
            value={data.description}
          />
        </div>
      </div>
      <div className="md:flex w-full px-3 mb-2">
        <div className="w-full md:w-1/2 mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
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
          {data.type === "online" && (
            <>
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Link
              </label>
              <div className="w-full">
                <input
                  className={`${
                    data.link === ""
                      ? ""
                      : !isLink(data.link)
                      ? "border-l-4 border-fred"
                      : "border-l-4 border-flime"
                  } appearance-none outline-none block w-full bg-grey-lighter focus:ring-2 ring-fblue border border-grey-lighter py-3 px-4 mb-3 ${
                    required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                  }`}
                  type="text"
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, link: e.target.value }))
                  }}
                  value={data.link}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {data.type !== "online" && (
        <div className="w-full grid sm:grid-cols-2 px-3">
          <div className="grid grid-cols-1">
            <div className="mb-2 px-2">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Location
              </label>
              <input
                className={`appearance-none outline-none block w-full bg-grey-lighter border border-grey-lighter py-3 px-4 mb-3 ${
                  required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                }`}
                type="text"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, location: e.target.value }))
                }}
                value={data.location}
              />
            </div>
            <div className="relative mb-2 px-2">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Address
              </label>
              <Places
                setLocationValues={setLocationValues}
                address={data.address}
              />
              <SearchIcon className="w-6 h-6 absolute left-6 bottom-6" />
            </div>
            <div className="mb-2 px-2">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                City
              </label>
              <input
                className={`appearance-none outline-none block w-full bg-grey-lighter border border-grey-lighter py-3 px-4 mb-3 ${
                  required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                }`}
                type="text"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, city: e.target.value }))
                }}
                value={data.city}
              />
            </div>
          </div>
          <div className="hidden sm:block px-3 mb-2">
            <MapDisplay location={data.geoLocation} zoom={data.zoom} />
          </div>
        </div>
      )}
      <div className="md:flex w-full px-3">
        <div className="w-full md:w-1/2 mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
            Cover Photo
          </label>
          <Dropzone
            classes={`appearance-none outline-none outline-none block w-full border-2 border-gray-300 border-black border-dotted  py-3 px-4 mb-3 ${
              required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
            }`}
            data={data}
            setData={setData}
            type="eventCover"
            fodler="Events"
            setUploadStatus={setUploadStatus}
            uploadStatus={uploadStatus}
          />
        </div>
        <div className="w-full md:w-1/2 mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
            Tags
          </label>
          <div className="">
            <Tags tags={data.tags} pushTag={pushTag} popTag={popTag} />
          </div>
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
    </div>
  )
}

export default AddEvent
