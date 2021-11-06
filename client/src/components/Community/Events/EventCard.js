import {
  ChevronRightIcon,
  SpeakerphoneIcon,
  XCircleIcon,
} from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import moment from "moment"

const styles = {
  online: "bg-flime-200 text-black border-flime-900 border p-1 px-2 text-xs",
  public: "bg-fblue-100 text-white border-fblue-900 border p-1 px-2 text-xs",
  private: "bg-fred-100 text-black border-fred-900 border p-1 px-2 text-xs",
}

const EventCard = ({ event }) => {
  return (
    <Link
      className=" flex items-center justify-center my-3 mx-2"
      to={`/community/events/id/${event._id}`}
    >
      <div className="max-w-sm group cursor-pointer flex flex-col bg-white shadow-lg hover:shadow-xl">
        <div className="flex w-full relative ">
          <img
            className="w-full h-40 bg-top bg-cover"
            src={event.eventCover?.url}
            alt="cover"
          />
          {event.isCanceled && (
            <div className="w-full h-full bg-white bg-opacity-40 tracking-wider absolute flex space-x-2 text-hanson">
              <XCircleIcon className="ml-2 w-10 h-10 text-red-600" />
              <p className="mt-2 w-full text-lg text-red-600">
                Event Cancelled
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col justify-between px-6 py-3">
          <div className="w-full flex justify-between">
            <p className="text-sm font-semibold text-red-400">
              {moment(event.dateStart).format("DD/M/YYYY HH:mm")}
            </p>
            <p className={styles[event.type]}>{event.type}</p>
          </div>

          <p className="font-black text-mono text-lg tracking-wide w-80 truncate break-words">
            {event.title}
          </p>

          <div className="w-80 my-2 text-sm text-gray-500 font-normal max-h-10 block overflow-ellipsis overflow-hidden break-words text-justify">
            {event.description}
          </div>

          <div className="w-full flex items-center justify-between mt-2">
            <div className="flex items-center">
              <SpeakerphoneIcon className="w-4 h-4 text-gray-700 mr-2" />

              <p className="text-gray-700 font-normal text-sm text-grotesk">
                {event.member.firstName} {event.member.lastName}
              </p>
            </div>
            <ChevronRightIcon className="w-6 h-6 group-hover:text-fblue" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
