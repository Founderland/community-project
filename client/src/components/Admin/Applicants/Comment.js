import { TrashIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import { useContext, useRef, useState } from "react"
const Comment = ({
  id,
  comment,
  firstName,
  lastName,
  role,
  avatar,
  timeStamp,
  forwardedRef,
}) => {
  const { user } = useContext(AdminContext)

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

  const avatarInitials = (first, last) => {
    let initials = first[0].toUpperCase() + last[0].toUpperCase()
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
      className='w-full flex items-center p-2 bg-gray-50 border-b-2 border-fblue-200'>
      <div className='min-w-min flex flex-col items-center'>
        <span
          className={`w-16 h-16 flex items-center justify-center text-mono text-lg lg:text-2xl tracking-wide rounded-full border-2 border-white ${avatar}`}>
          {avatarInitials(firstName, lastName)}
        </span>
        {/* <span
                className={
                  "-mt-3 text-xs p-0.5  px-2  flex justify-center items-center w-min m-1 font-medium py-1 px-2 rounded-full " +
                  getRoleStyle(role)
                }>
                {role}
              </span> */}
      </div>
      <div className=' w-full p-4 mr-4 ml-2 '>
        <div className='flex items-center'>
          <h1 className='font-bold'>
            {firstName} {lastName}
          </h1>
          <span
            className={
              "text-xs px-1 py-0.5 mx-2 flex justify-center items-center w-min m-1 font-medium  rounded-full " +
              getRoleStyle(role)
            }>
            {role}
          </span>
          {user.id === id && (
            <button className='ml-auto hover:text-fred'>
              <TrashIcon className='w-6 h-6 ' />
            </button>
          )}
        </div>
        <span className='text-sm'>{comment}</span>
        <div className='text-xs text-right'>{getCommentDate(timeStamp)}</div>
      </div>
    </div>
  )
}

export default Comment
