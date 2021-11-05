import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Loading from "../Widgets/Loading"
import MapDisplay from "./MapDisplay"
import AdminContext from "../../../contexts/Admin"
import { EmojiSadIcon, TrashIcon } from "@heroicons/react/outline"
import axios from "axios"
import moment from "moment"

const styles = {
  online: "bg-flime-200 text-black border-flime-900 border p-1 px-2 text-sm",
  public: "bg-fblue-100 text-white border-fblue-900 border p-1 px-2 text-sm",
  private: "bg-fred-100 text-black border-fred-900 border p-1 px-2 text-sm",
}
const eventUrl = "/api/events/id/"

const Event = () => {
  const { id } = useParams()
  const { config, reload, setCCModal, user } = useContext(AdminContext)
  const [data, setData] = useState({})
  const [edit, setEdit] = useState(false)
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
        console.log(err)
      })
  }, [id])
  return (
    <section className="h-full py-1 bg-white flex flex-col justify-center w-full lg:w-5/6 px-4 mx-auto mt-6">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="flex space-x-2">
          <EmojiSadIcon className="h-6 w-6 text-black" /> <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="self-center flex flex-col w-full xl:w-5/6 mb-6 shadow-lg border-0">
            <img
              className="w-full h-1/3 sm:h-80 lg:h-96 bg-bottom bg-cover"
              src={
                data.photo?.url
                  ? data.photo.url
                  : `https://www.si.com/.image/t_share/MTY4MTkyMjczODM4OTc0ODQ5/cfp-trophy-deitschjpg.jpg`
              }
              alt="cover"
            />
            <div className="flex w-full justify-between">
              <div className="flex flex-grow p-4 text-mono">
                <p className="text-2xl tracking-wider self-center font-bold uppercase">
                  {data.title}
                </p>
                <div className="flex flex-col sm:flex-row space-x-2 ml-4 self-end text-grotesk">
                  <p className="w-full text-xs self-end">Hosted by</p>
                  <p className="text-xs uppercase self-end">
                    {data.host.firstName} {data.host.lastName}
                  </p>
                </div>
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
              <div className="h-full mb-2 col-span-2 py-2 px-4 hidden md:block">
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
      <div className="px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
        <button
          className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
          onClick={() => {
            setEdit(true)
          }}
        >
          Edit
        </button>
        {user.role.includes("admin") ? (
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
    </section>
  )
}
export default Event
