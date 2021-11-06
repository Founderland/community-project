import { useParams } from "react-router-dom"
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

import {
  EmojiSadIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/outline"
import axios from "axios"
import moment from "moment"
import AddEvent from "./AddEvent"
const avatarInitials = (first, last) => {
  let initials = first[0].toUpperCase() + last[0].toUpperCase()
  return initials
}

const styles = {
  online: "bg-flime-200 text-black border-flime-900 border p-1 px-2 text-sm",
  public: "bg-fblue-100 text-white border-fblue-900 border p-1 px-2 text-sm",
  private: "bg-fred-100 text-black border-fred-900 border p-1 px-2 text-sm",
}
const eventUrl = "/api/events/"
const attendenceUrl = "/api/events/attendance"

const Event = () => {
  const { id } = useParams()
  const { config, reload, setReload, setCCModal, setCModal, user } =
    useContext(UserContext)
  const [data, setData] = useState({})
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [interested, setInterested] = useState(false)
  const [banner, setBanner] = useState({ show: false })
  const [going, setGoing] = useState(false)
  //GET DATA FROM DB WITH APPLICATIONID FROM URL
  useEffect(() => {
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
    <section className="relative flex flex-col items-center justify-center w-full lg:w-5/6 px-4 mx-auto">
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
          <div className="relative flex flex-col w-full xl:w-5/6 mb-2 shadow-lg border-0">
            <img
              className="w-full h-1/3 sm:h-80 lg:h-96 bg-bottom bg-cover"
              src={data.eventCover?.url}
              alt="cover"
            />
            {data.isCanceled && (
              <>
                {" "}
                <XCircleIcon className="sm:h-32 sm:w-32 sm:mt-4 sm:ml-4 mt-2 ml-2 h-20 w-20 text-red-500 absolute" />
                <p className="absolute top-10 left-28 font-bold text-red-600 text-lg sm:hidden text-hanson">
                  Event Canceled
                </p>
              </>
            )}
            <div className="flex w-full justify-between">
              <div className="flex flex-grow p-4 text-mono">
                <p className="text-2xl tracking-wider self-center font-bold uppercase">
                  {data.title}
                </p>
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
                {data.isCanceled && (
                  <div className="hidden sm:flex items-center space-x-2 ml-4 self-end text-grotesk">
                    <XCircleIcon className="w-8 h-8 text-red-600" />
                    <p className="w-full text-lg text-red-600">
                      Event Cancelled
                    </p>
                  </div>
                )}
              </div>
              <div className="hidden sm:flex sm:flex-grow-0 justify-center sm:justify-start items-center p-4">
                <p className={styles[data.type]}>{data.type}</p>
              </div>
            </div>
            <div className="w-full px-4 pt-2 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 text-xs justify-center items-center">
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
              <div className="p-2 hidden lg:block"></div>
              {data.type !== "online" && (
                <div className="h-full mb-2 col-span-2 py-2 px-4 hidden md:block">
                  <MapDisplay location={data.geoLocation} zoom={data.zoom} />
                </div>
              )}
              {data.type === "online" && (
                <div className="h-full mb-2 col-span-2 py-2 hidden md:block">
                  <LinkPreview url={data.link} />
                </div>
              )}
            </div>
            <hr className={`mt-6 border-b-1 border-gray-400`} />
            <div className="w-full flex flex-col px-4 py-2">
              <h6 className="text-gray-400 text-sm mt-3 mb-4 font-bold uppercase">
                About
              </h6>
              <div className="px-3 bg-white text-lg text-mono w-full ease-linear transition-all duration-150">
                {data.description}
              </div>
              <Banner message={banner} />

              <h6 className="flex space-x-4 items-center text-gray-400 text-sm mt-8 mb-4 font-bold uppercase">
                <p>Going</p>
                {going ? (
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
                    <div className="w-full flex items-center px-4 overflow-x-auto">
                      {data.going.map((attendee) => (
                        <div
                          className={`-ml-2 inline-block h-8 w-8 rounded-full text-white border-2 border-white object-cover object-center`}
                        >
                          {attendee.photo?.public_id ? (
                            <img
                              src={attendee.photo?.url}
                              className="rounded-full"
                              alt="user profile"
                            />
                          ) : (
                            avatarInitials(
                              attendee.firstName,
                              attendee.lastName
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  "No confirmations yet"
                )}
              </div>
              <h6 className="flex space-x-4 items-center text-gray-400 text-sm mt-3 mb-4 font-bold uppercase">
                <p>Interested</p>
                {interested ? (
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
                    <div className="w-full flex items-center px-4 overflow-x-auto">
                      {data.interested.map((attendee) => (
                        <div
                          className={`-ml-2 inline-block h-8 w-8 rounded-full text-white border-2 border-white object-cover object-center`}
                        >
                          {attendee.photo?.public_id ? (
                            <img
                              src={attendee.photo?.url}
                              className="rounded-full"
                              alt="user profile"
                            />
                          ) : (
                            avatarInitials(
                              attendee.firstName,
                              attendee.lastName
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  "No confirmations yet"
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
                        {data.address}
                      </p>
                    </>
                  )}
                  <p className="text-gray-400 text-xs mt-2 font-bold mb-1 uppercase">
                    City
                  </p>
                  <p className="text-sm mt-2 font-bold mb-1 uppercase text-mono">
                    {data.city}
                    {edit && "edit"}
                  </p>
                </div>
              )}
              <div className="flex mt-2 pt-2 px-3 bg-white text-mono text-base w-full ease-linear transition-all duration-150 items-center">
                <p className="text-xs">Event Tags:</p>
                {data.tags.length
                  ? data.tags.map((tag) => (
                      <div
                        key={tag}
                        className="bg-gray-200 text-gray-600  group flex items-center space-x-2 w-max h-6 py-1 px-2 m-1 text-center cursor-"
                      >
                        <p className=" text-xs">{tag}</p>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <footer className="flex p-4 mt-2 justify-center items-center">
              {!data.isCanceled && user.id === data.member._id && (
                <button
                  class="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-fred-300 transition duration-200 hover:bg-fred-800 text-white mb-4"
                  onClick={() => {
                    setCModal(true)
                  }}
                >
                  Cancel Event
                </button>
              )}
            </footer>
          </div>
          {!edit && user.id === data.member._id && (
            <div className="w-full px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
              <button
                className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
                onClick={() => {
                  setEdit(true)
                }}
              >
                Edit
              </button>
              {user.id === data.member._id ? (
                <button
                  className="flex justify-center items-center px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4"
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
            </div>
          )}
        </>
      )}
    </section>
  )
}
export default Event
