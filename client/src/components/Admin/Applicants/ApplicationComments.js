import { ChevronDoubleDownIcon, PlusIcon } from "@heroicons/react/outline"
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"
import Comment from "./Comment"

const ApplicationComments = ({
  data,
  styles,
  config,
  id: applicationId,
  commentsArray,
  setCommentsArray,
}) => {
  const { user } = useContext(AdminContext)
  const [newCommentText, setNewCommentText] = useState("")
  const [refreshCommList, setRefreshCommList] = useState(false)
  const lastComment = useRef(null)
  const [banner, setBanner] = useState({ show: false })

  // const [commentsArray, setCommentsArray] = useState([])

  const triggerBanner = (message, num) => {
    setBanner({
      success: num,
      show: true,
      message: message,
    })
    setTimeout(() => {
      setBanner((prev) => ({ ...prev, show: false }))
    }, 4000)
  }

  const scrollDown = () => {
    setTimeout(() => {
      lastComment.current.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  const changeToReviewed = () => {
    if (data.data.status === "new" && !data.data.comments.length) {
      axios
        .put(
          `/api/applicants/response/review`,
          { status: "pending", applicationId: applicationId },
          config
        )
        .then((res) =>
          triggerBanner(" Application status updated to: Reviewed ", 1)
        )
        .catch((e) => console.log(e))
    }
  }

  useEffect(() => {
    if (data.data.comments) {
      axios
        .get(`/api/applicants/response/comments/${applicationId}`, config)
        .then((res) => {
          setCommentsArray([...res.data.comments])
        })
        .catch((e) => console.log(e))
    }
  }, [data.data.comments, applicationId, refreshCommList])

  const addComment = (user) => {
    const newComment = {
      user: user.id,
      timeStamp: Date.now(),
      text: newCommentText,
    }
    axios
      .put(
        `/api/applicants/response/newcomment`,
        { id: applicationId, newComment },
        config
      )
      .then((res) => {
        setRefreshCommList(!refreshCommList)
        triggerBanner(res.data.message, 1)
        scrollDown()
        console.log(data.data.status)

        changeToReviewed()
      })
      .catch((e) => {
        console.log(e.response, "running")
        triggerBanner(
          e.response.data.message || "Sorry something went wrong",
          0
        )
      })
    setNewCommentText("")
  }

  const deleteComment = (commentId) => {
    axios
      .delete(`/api/applicants/response/${applicationId}/${commentId}`, config)
      .then((res) => {
        setRefreshCommList(!refreshCommList)
        triggerBanner(res.data.message, 1)
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="px-4">
      <hr
        className={`mt-6 border-b-1 border-${styles[data.data.role].border}`}
      />
      <div className="w-full flex  justify-center items-center">
        <Banner message={banner} />
      </div>
      <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Reviewer comments
      </h6>
      <div className="relative">
        <div
          className={
            commentsArray.length > 3
              ? "h-60 overflow-y-auto  "
              : "h-auto" + " w-full flex flex-col items-center justify-center "
          }
        >
          {commentsArray.length > 3 && (
            <ChevronDoubleDownIcon
              onClick={() => scrollDown()}
              className="w-8 h-8 absolute right-0 bottom-0 hover:text-flime hover:bg-black bg-white bg-opacity-60"
            />
          )}
          {/* comments */}
          {commentsArray.length ? (
            commentsArray.map((comment) => (
              <Comment
                key={comment.timeStamp}
                {...comment}
                forwardedRef={lastComment}
                config={config}
                deleteComment={deleteComment}
                applicationStatus={data.data.status}
              />
            ))
          ) : (
            <span className=" p-4">There are no comment yet</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full ">
          <div
            className={
              data.data.status === "approved"
                ? "hidden"
                : "relative w-full mb-3"
            }
          >
            <textarea
              type="text"
              className=" border-0 px-3 py-5 placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              rows="4"
              placeholder="Write a comment"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            ></textarea>
            <button
              onClick={() => {
                addComment(user)
              }}
              className="absolute bottom-1 right-1 flex px-4 md:px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
            >
              <PlusIcon className="w-5 h-5" />
              <p className="text-mono text-sm hidden md:block">
                add new comment
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationComments
