import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Loading from "../Widgets/Loading"
import MapDisplay from "./MapDisplay"
import AdminContext from "../../../contexts/Admin"
import { EmojiSadIcon } from "@heroicons/react/outline"
import axios from "axios"
import moment from "moment"

const events = [
  {
    _id: "61717b06b088de36430653a1",
    title: "Fundraiser",
    photo: null,
    description: "Fundraiser for Climate",
    dateStart: new Date("2021-11-02T10:00:00.000Z"),
    dateEnd: new Date("2021-11-04T12:00:00.000Z"),
    address: "Geschwister-Scholl-Straße",
    city: "Berlin",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "public",
    link: "",
    tags: ["#fundraiser", "#climate-change"],
    annouce: false,
    zoom: 18,
    location: "Library",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Victor",
      lastName: "Isidoro",
    },
    interested: [],
    going: [],
    canceled: false,
  },
  {
    _id: "61717b06b088de36430653a2",
    title: "Conference",
    photo: null,
    description: "Conference on Food Shortage",
    dateStart: new Date("2021-11-02T10:00:00.000Z"),
    dateEnd: new Date("2021-11-04T12:00:00.000Z"),
    address: "",
    city: "",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "online",
    link: "https://www.techonthenet.com/js/string_match.php",
    tags: ["#food", "#speaker", "#online"],
    annouce: false,
    zoom: 18,
    location: "",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Sasmitha",
      lastName: "Kumar",
    },
    interested: [],
    going: [],
    canceled: false,
  },
  {
    _id: "61717b06b088de36430653a3",
    title: "Conference",
    photo: null,
    description: "Conference on Food Shortage",
    dateStart: new Date("2021-11-04T10:00:00.000Z"),
    dateEnd: new Date("2021-11-04T12:00:00.000Z"),
    address: "",
    city: "",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "online",
    link: "https://www.techonthenet.com/js/string_match.php",
    tags: ["#food", "#speaker", "#online"],
    annouce: false,
    zoom: 18,
    location: "",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Sasmitha",
      lastName: "Kumar",
    },
    interested: [],
    going: [],
    canceled: false,
  },
  {
    _id: "61717b06b088de36430653a4",
    title: "Conference",
    photo: null,
    description: "Conference on Food Shortage",
    dateStart: new Date("2021-11-06T10:00:00.000Z"),
    dateEnd: new Date("2021-11-07T12:00:00.000Z"),
    address: "",
    city: "",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "online",
    link: "https://www.techonthenet.com/js/string_match.php",
    tags: ["#health", "#speaker", "#online"],
    annouce: false,
    zoom: 18,
    location: "",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Sasmitha",
      lastName: "Kumar",
    },
    interested: [],
    going: [],
    canceled: false,
  },
  {
    _id: "61717b06b088de36430653a5",
    title: "Conference",
    photo: null,
    description: "Conference on Food Shortage",
    dateStart: new Date("2021-11-07T10:00:00.000Z"),
    dateEnd: new Date("2021-11-07T12:00:00.000Z"),
    address: "",
    city: "",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "online",
    link: "https://www.techonthenet.com/js/string_match.php",
    tags: ["#food", "#speaker", "#online"],
    annouce: false,
    zoom: 18,
    location: "",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Sasmitha",
      lastName: "Kumar",
    },
    interested: [],
    going: [],
    canceled: false,
  },
  {
    _id: "61717b06b088de36430653a6",
    title: "Conference",
    photo: null,
    description: "Conference on Food Shortage",
    dateStart: new Date("2021-11-06T10:00:00.000Z"),
    dateEnd: new Date("2021-11-06T12:00:00.000Z"),
    address: "",
    city: "",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "online",
    link: "https://www.techonthenet.com/js/string_match.php",
    tags: ["#food", "#speaker", "#online"],
    annouce: false,
    zoom: 18,
    location: "",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Sasmitha",
      lastName: "Kumar",
    },
    interested: [],
    going: [],
    canceled: false,
  },
  {
    _id: "61717b06b088de36430653a7",
    title: "Conference",
    photo: null,
    description: "Conference on Food Shortage",
    dateStart: new Date("2021-11-08T10:00:00.000Z"),
    dateEnd: new Date("2021-11-08T12:00:00.000Z"),
    address: "",
    city: "",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "online",
    link: "https://www.techonthenet.com/js/string_match.php",
    tags: ["#food", "#speaker", "#online"],
    annouce: false,
    zoom: 18,
    location: "",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Sasmitha",
      lastName: "Kumar",
    },
    interested: [],
    going: [],
    canceled: false,
  },
  {
    _id: "61717b06b088de36430653a8",
    title: "Halloween",
    photo: null,
    description: "Conference on Food Shortage",
    dateStart: new Date("2021-10-31T10:00:00.000Z"),
    dateEnd: new Date("2021-11-01T12:00:00.000Z"),
    address: "",
    city: "",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "online",
    link: "https://www.techonthenet.com/js/string_match.php",
    tags: ["#food", "#speaker", "#online"],
    annouce: false,
    zoom: 18,
    location: "",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Sasmitha",
      lastName: "Kumar",
    },
    interested: [],
    going: [],
    canceled: false,
  },
  {
    _id: "61717b06b088de36430653a9",
    title: "Conference",
    photo: null,
    description: "Conference on Food Shortage",
    dateStart: new Date("2021-11-02T10:00:00.000Z"),
    dateEnd: new Date("2021-11-04T12:00:00.000Z"),
    address: "",
    city: "",
    geoLocation: {
      lat: 52.5205888,
      lng: 13.3912322,
    },
    type: "online",
    link: "https://www.techonthenet.com/js/string_match.php",
    tags: ["#food", "#speaker", "#online"],
    annouce: false,
    zoom: 18,
    location: "",
    host: {
      _id: "61717b06b088de36430653a1",
      firstName: "Sasmitha",
      lastName: "Kumar",
    },
    interested: [],
    going: [],
    canceled: false,
  },
]

const styles = {
  online: "bg-flime-200 text-black border-flime-900 border p-1 px-2 text-sm",
  public: "bg-fblue-100 text-white border-fblue-900 border p-1 px-2 text-sm",
  private: "bg-fred-100 text-black border-fred-900 border p-1 px-2 text-sm",
}
const eventUrl = "/api/events/"

const Event = () => {
  const { id } = useParams()
  const { config, reload, setReload } = useContext(AdminContext)

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  //GET DATA FROM DB WITH APPLICATIONID FROM URL
  useEffect(() => {
    axios
      .get(eventUrl + id, config)
      .then((res) => {
        if (res.data) {
          setData({ ...data, ...res.data })
          setLoading(false)
        } else {
          setError("No event found with this ID")
          setLoading(false)
        }
      })
      .catch((err) => {
        if (err?.response.status === 404) {
          const [dummyEvent] = events.filter((event) => event._id === id)
          console.log(dummyEvent)
          setData(dummyEvent)
          // setError("No event found with this ID")
          setLoading(false)
        }
        console.log(err)
      })
  }, [id])
  const [event] = events.filter((event) => event._id === id)
  console.log(data.dateStart, data.dateEnd)
  return (
    <>
      <section className="h-full py-1 bg-white w-full lg:w-5/6 px-4 mx-auto mt-6">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="flex space-x-2">
            <EmojiSadIcon className="h-6 w-6 text-black" /> <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg border-0">
              <img
                className="w-full h-96 bg-bottom bg-cover"
                src={
                  event.photo?.url
                    ? event.photo.url
                    : `https://www.si.com/.image/t_share/MTY4MTkyMjczODM4OTc0ODQ5/cfp-trophy-deitschjpg.jpg`
                }
                alt="cover"
              />
              <div className="flex w-full justify-between">
                <div className="flex flex-grow p-4 text-mono">
                  <p className="text-2xl tracking-wider self-center font-bold uppercase">
                    {data.title}
                  </p>
                  <div className="flex space-x-2 ml-4 self-end text-grotesk">
                    <p className="text-xs self-end">Hosted by</p>
                    <p className="text-xs uppercase self-end">
                      {data.host.firstName} {data.host.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow-0 items-center p-4">
                  <p className={styles[event.type]}>{event.type}</p>
                </div>
              </div>
              <div className="w-full px-4 pt-2 grid md:grid-cols-5 sm:grid-cols-2 text-xs justify-center items-center">
                <div className="mb-2">
                  <p className="text-xs text-grotesk">From</p>
                  <div class="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                    <div class="block rounded-t overflow-hidden  text-center ">
                      <div class="bg-fblue text-white py-1">
                        {moment(data.dateStart).format("MMMM")}
                      </div>
                      <div class="pt-1 border-l border-r border-white bg-white">
                        <span class="text-5xl font-bold leading-tight">
                          {moment(data.dateStart).format("DD")}
                        </span>
                      </div>
                      <div class="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                        <span class="text-sm">
                          {moment(data.dateStart).format("dddd")}
                        </span>
                      </div>
                      <div class="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white mt-1">
                        <span class="text-xs leading-normal">
                          {moment(data.dateStart).format("HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <p className=" text-xs text-grotesk">To</p>
                  <div class="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                    <div class="block rounded-t overflow-hidden text-center ">
                      <div class="bg-fred text-white py-1">
                        {moment(data.dateEnd).format("MMMM")}
                      </div>
                      <div class="pt-1 border-l border-r border-white bg-white">
                        <span class="text-5xl font-bold leading-tight">
                          {moment(data.dateEnd).format("DD")}
                        </span>
                      </div>
                      <div class="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                        <span class="text-sm">
                          {moment(data.dateEnd).format("dddd")}
                        </span>
                      </div>
                      <div class="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white mt-1">
                        <span class="text-xs leading-normal">
                          {moment(data.dateEnd).format("HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2"></div>
                <div className="h-full mb-2 col-span-2 py-2 px-4">
                  <MapDisplay location={data.geoLocation} zoom={data.zoom} />
                </div>
              </div>
              <hr className={`mt-6 border-b-1 border-fblue`} />
              <div className="w-full flex flex-col px-4 py-2">
                <h6 className="text-gray-400 text-sm mt-3 mb-4 font-bold uppercase">
                  About
                </h6>
                <div className="px-3 bg-white text-xl w-full ease-linear transition-all duration-150">
                  {data.description}
                </div>
                <h6 className="text-gray-400 text-sm mt-3 mb-4 font-bold uppercase">
                  Attendees
                </h6>
                <div className="px-3 bg-white text-lg w-full ease-linear transition-all duration-150">
                  {data.going.length
                    ? data.going.map((attendee) => attendee._id)
                    : "No confirmations yet"}
                </div>
              </div>
              <footer className="flex p-4 mt-2 justify-center items-center">
                <button class="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-fred-300 transition duration-200 hover:bg-fred-800 text-white mb-4">
                  Cancel Event
                </button>
              </footer>
            </div>
          </>
        )}
      </section>
    </>
  )
}
export default Event
