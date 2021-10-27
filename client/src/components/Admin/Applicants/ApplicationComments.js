import { PlusIcon } from "@heroicons/react/outline"
import { useContext, useRef, useState } from "react"
import AdminContext from "../../../contexts/Admin"
import Comment from "./Comment"

const ApplicationComments = ({ data, styles }) => {
  const { user } = useContext(AdminContext)
  const [commentText, setCommentText] = useState("")
  const lastComment = useRef(null)

  const [commentsArray, setCommentsArray] = useState([
    {
      id: "6177245615f7fb6abc05be34",
      firstName: "Salvo",
      lastName: "Patti",
      role: "sadmin",
      avatar: "bg-gradient-to-t from-red-300 to-red-500 bg-cover",
      timeStamp: 1635342473000,
      comment: "New comment new comment new comment new comment new comment",
    },
    {
      userId: "snsnsks",
      firstName: "Victor",
      lastName: "Isidoro",
      role: "admin",
      avatar: "bg-gradient-to-t from-sky-300 to-sky-500 bg-cover",
      timeStamp: 1635256073000,
      comment: "I'm not sure about this founder",
    },
    {
      userId: "snsnsks",
      firstName: "Sasmitha",
      lastName: "Nagesh",
      role: "user",
      avatar: "bg-gradient-to-t from-yellow-300 to-yellow-500 bg-cover",
      timeStamp: 1634737673000,
      comment: "I approve this founder",
    },
  ])

  //ADD NEW COMMENT
  const addComment = (user) => {
    const newComment = {
      ...user,
      timeStamp: Date.now(),
      comment: commentText,
    }
    commentsArray.push(newComment)
    setCommentsArray([...commentsArray])
    setTimeout(() => {
      lastComment.current.scrollIntoView({ behavior: "smooth" })
    }, 0)
  }

  return (
    <>
      <hr className={`mt-6 border-b-1 ${styles[data.data.role].border}`} />
      <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
        Reviewer comments
      </h6>
      <div className='w-full flex flex-col items-center justify-start h-60 overflow-y-auto'>
        {/* comments */}
        {commentsArray.map((comment) => (
          <Comment {...comment} forwardedRef={lastComment} />
        ))}
        {/* <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            messagesEnd.current = el
          }}></div> */}
      </div>
      <div className='flex flex-wrap'>
        <div className='w-full  pr-4'>
          <div className='relative w-full mb-3'>
            {/* (Avatar) */}
            <textarea
              type='text'
              className=' border-0 px-3 py-5 placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
              rows='4'
              placeholder='Write a comment'
              onChange={(e) => setCommentText(e.target.value)}></textarea>
            <button
              onClick={() => {
                addComment(user)
              }}
              className='absolute bottom-1 right-1 flex px-4 md:px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white'>
              <PlusIcon className='w-5 h-5' />
              <p className='text-mono text-sm hidden md:block'>
                add new comment
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicationComments
