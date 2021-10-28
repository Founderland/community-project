import { TrashIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import { useContext, useRef, useState } from "react"
import axios from "axios"

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
    return today === commentDate ? commentTime : commentDate + " " + commentTime
  }

  const avatarInitials = (user) => {
    let initials =
      user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
    return initials
  }

  const getRoleStyle = (role) => {
    const roleStyles = {
      sadmin: "text-green-700 bg-green-100 border border-green-300 ",
      admin:
        "text-fblue-700 bg-fblue-100 border border-fblue-300 bg-opacity-30",
      user: "text-fpink-700 bg-fpink-100 border border-fpink-300 bg-opacity-30",
    }
    return roleStyles[role]
  }

  return (
    <div
      ref={forwardedRef}
      className='w-full flex items-center px-1 bg-gray-50 border-b-2 border-fblue-200 rounded-xl shadow my-1'>
      <div className='min-w-min flex flex-col items-center'>
        <span
          className={`ml-2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-mono text-lg lg:text-xl tracking-wide rounded-full border-2 border-white ${user.avatar}`}>
          {avatarInitials(user)}
        </span>
      </div>
      <div className=' w-full py-1 px-2 mr-4'>
        <div className='flex items-center'>
          <h3 className='font-bold text-sm'>
            {user.firstName} {user.lastName}
          </h3>
          <span
            className={
              "text-xs px-1 py-0.5 mx-2 flex justify-center items-center w-min m-1 font-medium rounded-full " +
              getRoleStyle(user.role)
            }>
            {user.role}
          </span>
          {user._id === currentUser.id && applicationStatus !== "approved" && (
            <button
              onClick={() => deleteComment(commentId)}
              className='ml-auto hover:text-fred'>
              <TrashIcon className='w-6 h-6 ' />
            </button>
          )}
        </div>
        <span className='text-lg'>{text}</span>
        <div className='text-xs text-right mr-2 md:mr-0'>
          {getCommentDate(timeStamp)}
        </div>
      </div>
    </div>
  )
}

export default Comment
