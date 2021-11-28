import { useHistory, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Loading from "../../Admin/Widgets/Loading"
import MapDisplay from "../../Admin/Events/MapDisplay"
import UserContext from "../../../contexts/User"
import LinkPreview from "../../Admin/Resources/LinkPreview"
import ConfirmModal from "..//Widgets/ConfirmModal"
import ConfirmDelete from "./ConfirmDelete"
import ConfirmCancel from "./ConfirmCancel"
import ComponentModal from "../Widgets/ComponentModal"
import Banner from "../../Admin/Widgets/Banner"
import AddToCalendar from "../Widgets/AddToCalendar"
import {
  EmojiSadIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline"
import axios from "axios"
import moment from "moment"
import AddEvent from "./AddEvent"
import { CommunityContext } from "../../../contexts/CommunityProvider"

const styles = {
  online: "bg-flime-200 text-black border-flime-900 border p-1 px-2 text-xs",
  public: "bg-fblue-200 text-white border-fblue-900 border p-1 px-2 text-xs",
  private: "bg-fred-200 text-black border-fred-900 border p-1 px-2 text-xs",
}
const eventUrl = "/api/events/"
const attendenceUrl = "/api/events/attendance"

const Event = () => {
  const { id } = useParams()
  const history = useHistory()
  const { config, reload, setReload, setCCModal, setCModal, user } =
    useContext(UserContext)

  const [data, setData] = useState({})
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [interested, setInterested] = useState(false)
  const [banner, setBanner] = useState({ show: false })
  const [going, setGoing] = useState(false)
  const { scrollUp } = useContext(CommunityContext)

  //GET DATA FROM DB WITH APPLICATIONID FROM URL
  useEffect(() => {
    scrollUp()
    axios
      .get(eventUrl + id, config)
      .then((res) => {
        if (res.data.data) {
          setData(res.data.data)
          const memberInterested = res.data.data.interested.filter(
            (interested) => interested._id === user.id
          )
          if (memberInterested.length) setInterested(true)
          const memberGoing = res.data.data.going.filter(
            (going) => going._id === user.id
          )
          if (memberGoing.length) setGoing(true)
          setLoading(false)
        } else {
          setError("No event found with this ID")
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id, reload])
  const handleAttendance = async (task) => {
    let updateData
    if (task === "going") {
      updateData = {
        id: data._id,
        going: !going,
        interested: false,
        member: user.id,
      }
    } else {
      updateData = {
        id: data._id,
        going: false,
        interested: !interested,
        member: user.id,
      }
    }
    try {
      const updateAttendance = await axios.put(
        attendenceUrl,
        updateData,
        config
      )
      if (updateAttendance) {
        if (task === "going") {
          setGoing(!going)
          setInterested(false)
        } else {
          setGoing(false)
          setInterested(!interested)
        }
        setReload(reload + 1)
      } else {
        await Promise.reject(new Error("not_updated"))
      }
    } catch (e) {
      setBanner({
        error: 1,
        show: true,
        message: "Sorry, couldn't update attendance...",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    }
  }
  return (
    <div className="h-full w-full lg:w-5/6 md:px-4 mx-auto overflow-auto">
      <ConfirmModal>
        <ConfirmDelete data={data} />
      </ConfirmModal>
      <ComponentModal>
        <ConfirmCancel data={data} />
      </ComponentModal>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="flex space-x-2">
          <EmojiSadIcon className="h-6 w-6 text-black" /> <p>{error}</p>
        </div>
      ) : edit ? (
        <AddEvent event={data} edit={edit} setEdit={setEdit} />
      ) : (
        <>
          <div className="relative self-center flex flex-col w-full xl:w-5/6 2xl:w-4/6 mb-6 shadow-lg border-0">
            <div
              className="relative w-full h-40 sm:h-64 lg:h-72 xl:h-80 bg-top bg-cover"
              style={{
                backgroundImage: `url(${data.eventCover?.url}`,
              }}
            >
              {data.isCanceled && (
                <div className="absolute w-full h-full bg-white bg-opacity-30 ">
                  <div className="absolute bottom-0 flex items-center justify-end space-x-2">
                    <XCircleIcon className="sm:h-28 sm:w-28 h-16 w-16 text-red-600" />
                    <p className="hidden mt-2 text-hanson tracking-wider sm:block text-lg xl:text-xl 2xl:text-2xl text-red-600">
                      Event Cancelled
                    </p>
                  </div>
                </div>
              )}
              <AddToCalendar event={data} />
              <button
                onClick={() => history.goBack()}
                className="flex items-center shadow-2xl space-x-2 px-2 py-1 m-2 bg-flime text-black text-sm text-mono transition ease-in duration-200 hover:bg-fblue hover:text-white"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                <p className="text-mono text-sm">Back</p>
              </button>
              <div className="absolute mr-4 justify-end bottom-0 right-0 w-full mb-4 flex">
                <p className={`${styles[data.type]} shadow-2xl`}>{data.type}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row px-4 pt-2  w-full justify-between">
              <div className="w-full mb-2 mx-auto">
                <p className="text-xl xl:text-2xl 2xl:text-3xl text-mono tracking-wider self-center font-bold uppercase">
                  {data.title}
                </p>
              </div>
              <div className="flex justify-end w-full colspan-1 mb-2 mx-auto">
                <img
                  src={data.member.photo?.url}
                  className="h-10 w-10 ml-4 rounded-full mr-2 object-cover"
                  alt="user profile"
                />
                <div className="space-x-2  self-end text-grotesk">
                  <p className="w-full text-xs self-end">Hosted by</p>
                  <p className="text-xs uppercase self-end">
                    {data.member.firstName} {data.member.lastName}
                  </p>
                </div>
              </div>
            </div>
            <div className=" w-full px-4 md:px-8 pt-2 flex space-x-6 flex-col md:flex-row text-xs justify-between items-center">
              <div className="flex flex-none w-full md:w-1/2 justify-center items-center space-x-6 mb-4">
                <div className="mb-2">
                  <p className="text-xs text-grotesk">From</p>
                  <div className="w-28 md:w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                    <div className="block rounded-t overflow-hidden  text-center ">
                      <div className="bg-fblue text-white py-1">
                        {moment(data.dateStart).format("MMMM")}
                      </div>
                      <div className="pt-1 border-l border-r border-white bg-white">
                        <span className="text-5xl font-bold leading-tight">
                          {moment(data.dateStart).format("DD")}
                        </span>
                      </div>
                      <div className="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                        <span className="text-sm">
                          {moment(data.dateStart).format("dddd")}
                        </span>
                      </div>
                      <div className="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white mt-1">
                        <span className="text-xs leading-normal">
                          {moment(data.dateStart).format("HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <p className=" text-xs text-grotesk">To</p>
                  <div className="w-28 md:w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                    <div className="block rounded-t overflow-hidden text-center ">
                      <div className="bg-fred text-white py-1">
                        {moment(data.dateEnd).format("MMMM")}
                      </div>
                      <div className="pt-1 border-l border-r border-white bg-white">
                        <span className="text-5xl font-bold leading-tight">
                          {moment(data.dateEnd).format("DD")}
                        </span>
                      </div>
                      <div className="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                        <span className="text-sm">
                          {moment(data.dateEnd).format("dddd")}
                        </span>
                      </div>
                      <div className="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white mt-1">
                        <span className="text-xs leading-normal">
                          {moment(data.dateEnd).format("HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-none h-28 md:h-48 w-full md:w-1/2 pr-6">
                {data.type !== "online" ? (
                  <MapDisplay location={data.geoLocation} zoom={data.zoom} />
                ) : (
                  <LinkPreview url={data.link} />
                )}
              </div>
            </div>
            <hr className={`mt-6 border-b-1 border-gray-400`} />
            <div className="w-full flex flex-col px-4 py-2">
              <h6 className="text-gray-400 text-sm mt-3 mb-4 font-bold uppercase">
                About
                {data.isCanceled && (
                  <p className="w-full text-lg text-red-600">Event Cancelled</p>
                )}
              </h6>
              <div className="px-3 bg-white text-base text-gray-800 text-grotesk w-full ease-linear transition-all duration-150">
                {data.description}
              </div>
              <Banner message={banner} />

              <h6 className="flex space-x-4 items-center text-gray-400 text-sm mt-8 mb-4 font-bold uppercase">
                <p>{new Date(data.dateEnd) > new Date() ? "Going" : "Went"}</p>
                {data.member._id === user.id ? (
                  ""
                ) : new Date(data.dateEnd) < new Date() ? (
                  ""
                ) : going ? (
                  <button
                    className="h-4 w-4"
                    onClick={() => {
                      handleAttendance("going")
                    }}
                  >
                    <XCircleIcon className="h-4 w-4 text-fred" />
                  </button>
                ) : (
                  <button
                    className="h-4 w-4"
                    onClick={() => {
                      handleAttendance("going")
                    }}
                  >
                    <PlusCircleIcon className="h-4 w-4 text-green-500" />
                  </button>
                )}
              </h6>
              <div className="px-3 bg-white text-base text-mono w-full ease-linear transition-all duration-150">
                {data.going.length ? (
                  <div className="w-full flex items-center space-x-2">
                    <p className="mr-2 text-lg text-grotesk">
                      {data.going.length}
                    </p>
                    <div className="flex items-center overflow-hidden pl-3 py-2">
                      {data.going.map((attendee) => (
                        <div
                          className={`-ml-2 inline-block h-8 w-8 rounded-full text-white border border-fblue object-cover object-center`}
                        >
                          <img
                            src={attendee.photo?.url}
                            className="w-full h-full rounded-full"
                            alt="user profile"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  "No confirmations"
                )}
              </div>
              <h6 className="flex space-x-4 items-center text-gray-400 text-sm mt-3 mb-4 font-bold uppercase">
                <p>Interested</p>
                {data.member._id === user.id ? (
                  ""
                ) : new Date(data.dateEnd) < new Date() ? (
                  ""
                ) : interested ? (
                  <button
                    className="h-4 w-4"
                    onClick={() => {
                      handleAttendance("interested")
                    }}
                  >
                    <XCircleIcon className="h-4 w-4 text-fred" />
                  </button>
                ) : (
                  <button
                    className="h-4 w-4"
                    onClick={() => {
                      handleAttendance("interested")
                    }}
                  >
                    <PlusCircleIcon className="h-4 w-4 text-green-500" />
                  </button>
                )}
              </h6>
              <div className="px-3 bg-white text-mono text-base w-full ease-linear transition-all duration-150">
                {data.interested.length ? (
                  <div className="w-full flex items-center space-x-2">
                    <p className="mr-2 text-lg text-grotesk">
                      {data.interested.length}
                    </p>
                    <div className="flex items-center overflow-hidden pl-3 py-2">
                      {data.interested.map((attendee) => (
                        <div
                          className={`-ml-2 inline-block h-8 w-8 rounded-full text-white border border-fblue object-cover object-center`}
                        >
                          <img
                            src={attendee.photo?.url}
                            className="w-full h-full rounded-full"
                            alt="user profile"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  "No confirmations"
                )}
              </div>
              {data.type !== "online" && (
                <div className="px-3 bg-white text-lg w-full border-t-2 border-b-2 border-gray-300 mt-2">
                  <p className="text-gray-400 text-xs mt-2 font-bold mb-1 uppercase">
                    Location
                  </p>
                  <p className="text-sm mt-2 font-bold mb-1 uppercase text-mono">
                    {data.location}
                  </p>
                  {data.address && (
                    <>
                      <p className="text-gray-400 text-xs mt-2 font-bold mb-1 uppercase">
                        Address
                      </p>
                      <p className="text-sm mt-2 font-bold mb-1 uppercase text-mono">
                        <a
                          href={`http://maps.google.com/?q=${
                            data.location + "," + data.address + "," + data.city
                          }`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-fblue"
                        >
                          {data.address}
                        </a>
                      </p>
                    </>
                  )}
                  <p className="text-gray-400 text-xs mt-2 font-bold mb-1 uppercase">
                    City
                  </p>
                  <p className="text-sm mt-2 font-bold mb-1 uppercase text-mono">
                    {data.city}
                  </p>
                </div>
              )}
              <div className=" mt-2 pt-2 px-3 bg-white text-mono text-base w-full ease-linear transition-all duration-150 items-center">
                <p className="text-xs">Event Tags:</p>
                <div className="flex items-center py-1 space-x-2 overflow-x-scroll scrollbar scrollbar-thin scrollbar-thumb-flime scrollbar-track-green-100">
                  {data.tags.length ? (
                    data.tags.map((tag) => (
                      <div
                        key={tag}
                        className={`bg-gray-200 text-gray-600 flex-none group py-1 px-2 text-center cursor-pointer`}
                      >
                        <p className="text-xs">{tag}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs ml-2">No tags</p>
                  )}
                </div>
              </div>
            </div>
            <footer className="w-full px-4 my-4 flex flex-col sm:flex-row items-center justify-around ">
              {!data.isCanceled &&
                user.id === data.member._id &&
                new Date(data.dateEnd) > new Date() && (
                  <button
                    className="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-fred-300 transition duration-200 hover:bg-fred-800 text-white mb-4"
                    onClick={() => {
                      setCModal(true)
                    }}
                  >
                    Cancel Event
                  </button>
                )}
              {!edit && user.id === data.member._id && !data.isCanceled && (
                <button
                  className="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
                  onClick={() => {
                    setEdit(true)
                  }}
                >
                  Edit
                </button>
              )}
              {user.id === data.member._id ? (
                <button
                  className="px-10 py-2 w-full shadow-lg sm:w-1/4 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4 flex justify-center items-center "
                  onClick={() => {
                    setCCModal(true)
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                  Delete
                </button>
              ) : (
                ""
              )}
            </footer>
          </div>
        </>
      )}
    </div>
  )
}
export default Event
