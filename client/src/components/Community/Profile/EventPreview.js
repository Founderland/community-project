import moment from "moment"
import { useHistory, useLocation, useParams } from "react-router"

const EventPreview = ({ event }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const local = pathname.split("/")[1]
  return (
    <div
      className="cursor-pointer flex shadow w-full mt-2 hover:shadow-xl "
      onClick={() => {
        history.push(
          `/${local}/events/${local === "admin" ? "id" : "view"}/` + event._id
        )
      }}
    >
      <div className="w-20 bg-fblue py-4 px-4 block h-full">
        <div className="flex-none text-center tracking-wide">
          <div className="text-white font-bold text-4xl ">
            {moment(event.dateStart).format("DD")}
          </div>
          <div className="text-white font-normal text-2xl">
            {moment(event.dateStart).format("MMM")}
          </div>
        </div>
      </div>
      <div className="flex-none flex-grow bg-white tracking-wide">
        <div className="flex flex-col text-left">
          <div className="text-gray-700 font-medium text-xs text-left pt-2 px-2">
            {moment(event.dateStart).format("HH:mm")}
          </div>
        </div>
        <div className="font-semibold text-gray-800 text-sm text-left pt-2 px-2">
          {event.title}
        </div>

        <div className="text-gray-600 font-medium text-xs pt-1 text-left pt-2 px-2">
          {event.type === "online"
            ? "online"
            : event.location + " - " + event.city}
        </div>
      </div>
      <div className="hidden 2xl:block flex flex-col justify-center items-center flex-none w-30 bg-white px-2 ">
        <span className="flex w-full space-x-2 items-center tracking-wider text-gray-600 bg-gray-200 py-2 px-2 text-sm rounded leading-loose mx-auto font-semibold mt-2">
          <p className="flex items-center justify-center text-xs w-6 h-6 rounded-full bg-flime">
            {event.going.length}
          </p>
          <p className="text-xs ">Going</p>
        </span>
        <span className="flex w-full space-x-2 items-center tracking-wider text-gray-600 bg-gray-200 py-2 px-2 text-sm rounded leading-loose mx-auto font-semibold mt-2">
          <p className="flex items-center justify-center text-xs w-6 h-6 rounded-full bg-flime">
            {event.interested.length}
          </p>
          <p className="text-xs ">Interested</p>
        </span>
      </div>
    </div>
  )
}

export default EventPreview
