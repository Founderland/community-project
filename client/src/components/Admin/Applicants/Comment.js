import { TrashIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import { useContext } from "react"

const Comment = ({
  _id: commentId,
  text,
  user,
  timeStamp,
  forwardedRef,
  deleteComment,
  applicationStatus,
}) => {
  const { user: currentUser } = useContext(AdminContext)

  const getCommentDate = (unixTimestamp) => {
    const today = new Date(Date.now()).toLocaleDateString("de-DE")
    const commentDate = new Date(unixTimestamp).toLocaleDateString("de-DE")
    const commentTime = new Date(unixTimestamp).toLocaleTimeString("de-DE", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
    return today === commentDate
      ? "@ " + commentTime
      : "on " + commentDate + " " + commentTime
  }

  const avatarInitials = (user) => {
    let initials =
      user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
    return initials
  }

  return (
    <div
      ref={forwardedRef}
      className="w-full flex items-center px-1 bg-gray-50 border-b-2 border-fblue-200 rounded shadow my-1"
    >
      <div className="min-w-min hidden sm:flex flex-col items-center self-start mt-1 md:mt-2">
        <span
          className={`ml-2 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center text-mono text-xs md:text-base lg:text-xl tracking-wide rounded-full border-2 border-white-400 ${user.avatar}`}
        >
          {avatarInitials(user)}
        </span>
      </div>
      <div className=" w-full py-1 px-2 mr-4">
        <div className="text-gray-600 font-semibold flex space-x-1 text-xs md:text-sm md:space-x-2 items-center">
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <p>{getCommentDate(timeStamp)}</p>
        </div>
        <p className="text-gray-700 py-1 pl-2 text-sm 2xl:text-base text-justify">
          {text}
        </p>
        <div className="text-right mr-2">
          {user._id === currentUser.id && applicationStatus !== "approved" && (
            <button
              onClick={() => deleteComment(commentId)}
              className="ml-auto hover:text-fred"
            >
              <TrashIcon className="w-5 h-5 " />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
