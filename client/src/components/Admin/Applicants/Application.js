import {
  ArrowLeftIcon,
  PlusIcon,
  CheckCircleIcon,
  PencilAltIcon,
} from "@heroicons/react/outline"

const Submission = () => {
  const approveApplicant = async (e) => {
    try {
      const approved = await axios.put(
        `api/founder/response/Approved/${viewId._id}`
      )
    } catch (e) {
      console.log(e)
    }
  }
  const [disabled, setDisabled] = useState(true)

  const answerInput = useRef()
  const rejectApplicant = async () => {
    try {
      const rejected = await axios.put(
        `api/founder/response/Rejected/${viewId._id}`
      )
    } catch (e) {
      console.log(e)
    }
  }

  const editScore = async () => {
    try {
      const edit = await axios.put(
        `api/founder/response/${viewId._id}/${score}`
      )
    } catch (e) {
      console.log(e)
    }
    alert("Score is updated")
    setDisabled(!disabled)
  }
  const [score, setScore] = useState(viewId.totalScore)

  return (
    <div>
      <div className="flex justify-between text-grotesk items-center mx-2">
        <div className="flex  justify-center items-center ml-5 w-5/12">
          <div className="flex items-center">
            <div className="text-md lg:text-xl font-semibold">TOTAL SCORE</div>
            <div className=" ">
              <input
                defaultValue={viewId.totalScore}
                disabled={disabled}
                type="number"
                ref={answerInput}
                onChange={(e) => setScore(e.target.value)}
                className={
                  "ml-3 w-10/12 flex justify-center text-center font-semibold text-base bg-flime border border-black text-md lg:text-xl rounded-full p-3 text-black mb-3 focus:border-fred"
                }
              />
            </div>
          </div>

          {/* Score Editing Section */}
          <div>
            <button
              className={`font-3xl w-1/3 md:w-auto  mx-2 p-3 ${
                !disabled && "hidden"
              }`}
              onClick={() => {
                setDisabled(!disabled)
                setTimeout(() => {
                  answerInput.current.focus()
                }, 0)
              }}
            >
              <PencilAltIcon className="h-8 w-8 m-auto" />
            </button>

            <button
              className={` w-1/3 md:w-auto mx-2 p-3 ${
                disabled ? style.disabledInput + " hidden" : style.enabledInput
              } `}
              onClick={editScore}
            >
              <CheckCircleIcon className="h-8 w-8 m-auto " />
            </button>
          </div>
        </div>
        {/* End  Score Editing Section */}

        <div
          className={
            applicantType === "new" || applicantType === "pending"
              ? "w-full flex flex-col md:flex-row  justify-center"
              : "hidden"
          }
        >
          <button
            class="bg-flime-500 hover:bg-flime-700 text-black font-bold py-2 px-4 rounded text-xl mt-5 mr-3 mb-10"
            onClick={approveApplicant}
          >
            Approve
          </button>
          <button
            class="bg-fred-400 hover:bg-fred-800 text-white font-bold py-2 px-4 rounded text-xl mt-5 mr-3 mb-10"
            onClick={rejectApplicant}
          >
            Reject
          </button>
        </div>
        <div
          onClick={() => buttonClicked(!viewButton)}
          className=" flex justify-center items-center space-around text-lg  mb-3 w-4/12 lg:w-2/12  md:w-auto py-3 px-3 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-3 " />
          Back
        </div>
      </div>
      <DisplayResponse data={answerData} />
    </div>
  )
}

export default Submission
