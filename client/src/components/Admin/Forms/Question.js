import { useContext, useEffect, useRef, useState, useMemo } from "react"
import { useHistory, useParams } from "react-router"
import axios from "axios"
import AnswerSection from "./AnswerSection"
import FormPreview from "./FormPreview"
import { EyeIcon, TrashIcon } from "@heroicons/react/outline"
import ListOption from "../Widgets/ListOption"
import AdminContext from "../../../contexts/Admin"
import SubmitResponse from "./SubmitResponse"

const defaultQuestion = {
  category: "About You",
  question: "",
  type: "open",
  rank: "Not Important - just for info/further context",
  answers: [],
  categoryPage: 1,
  mandatory: true,
}
const defaultAnswer = {
  answer: "",
  points: 0,
  ideal: false,
}
const categories = [
  { name: "About You", value: "About You" },
  {
    name: "About Your Business",
    value: "About Your Business",
  },
  { name: "Tell Us More", value: "Tell Us More" },
]
const ranks = [
  {
    name: "Not Important - just for info/further context",
    value: "Not Important - just for info/further context",
  },
  {
    name: "Vital - Deal Maker or Breaker",
    value: "Vital - Deal Maker or Breaker",
  },
  {
    name: "Very Important - variable is scrutinized",
    value: "Very Important - variable is scrutinized",
  },
  {
    name: "Moderately Important - potentially a determining factor",
    value: "Moderately Important - potentially a determining factor",
  },
]
const types = [
  {
    name: "Open",
    value: "open",
  },
  {
    name: "Single Choice",
    value: "choice",
  },
  {
    name: "Multiple Selection",
    value: "multiple",
  },
]

const Question = ({ task }) => {
  const { id } = useParams()
  const history = useHistory()
  const { token, setSelectedTab } = useContext(AdminContext)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  const [questionInfo, setQuestionInfo] = useState(defaultQuestion)
  const [answersList, setAnswersList] = useState(defaultQuestion.answers || [])
  const [newAnswer, setNewAnswer] = useState(defaultAnswer)
  const [isSuccessful, setIsSuccessfull] = useState(false)
  const [isError, setIsError] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [message, setMessage] = useState("")
  const mainDiv = useRef()

  useEffect(() => {
    if (id !== "new") {
      const questionURL = `/api/form/${task}/question/${id}`
      axios
        .get(questionURL, config)
        .then((res) => {
          console.log(res)
          if (res.data) {
            setQuestionInfo({ ...res.data })
            setAnswersList([res.data.answers])
          } else {
            setIsError()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [id])

  const handleNewAnswer = () => {
    setAnswersList((pre) =>
      pre.length > 0 ? [...pre, newAnswer] : [newAnswer]
    )
    // restoring default values
    setNewAnswer(defaultAnswer)
  }

  const handleSubmit = () => {
    mainDiv.current.scrollIntoView()
    let newQuestion = { ...questionInfo, answers: answersList }
    // Deleting unnecessary fields for non founders
    if (task !== "founder") {
      delete newQuestion.rank
      newQuestion.answers.forEach((i) => delete i.points && delete i.ideal)
    }
    axios({
      method: id !== "new" ? "PUT" : "POST",
      baseURL: `/api/form/${task}`,
      url: id !== "new" ? "/edit" : "/add",
      data: newQuestion,
    })
      .then((result) => {
        setIsSuccessfull(true)
        setMessage(result.data.message)
        setTimeout(() => {
          task === "founder"
            ? setSelectedTab(0)
            : task === "investor"
            ? setSelectedTab(1)
            : setSelectedTab(2)
          history.push("forms/")
        }, 3000)
      })
      .catch((e) => {
        setMessage(e.response.data.message)
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 5000)
      })

    if (id === "new") {
      // restoring default values
      setQuestionInfo(defaultQuestion)
      // emptying answers list
      setAnswersList([])
    }
  }

  const handleDelete = () => {
    mainDiv.current.scrollIntoView()

    axios
      .delete(`/api/form/${task}/delete/${questionInfo._id}`)
      .then((result) => {
        setIsSuccessfull(true)
        setMessage(result.data.message)
        setTimeout(() => {
          task === "founder"
            ? setSelectedTab(0)
            : task === "investor"
            ? setSelectedTab(1)
            : setSelectedTab(2)
          history.push("/admin/forms")
        }, 2000)
      })
      .catch((e) => {
        setMessage(e.response.data.message)
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 5000)
      })
  }

  // useEffect(() => {
  //   return () => question && setSelectedItem(null)
  // }, [memberType, question, setSelectedItem])

  return (
    <div
      ref={mainDiv}
      className=" h-screen w-full flex flex-col justify-start items-stretch text-xl shadow-xl py-4"
    >
      <div className="flex flex-col justify-center items-center bg-white p-4  ">
        <SubmitResponse
          isSuccessful={isSuccessful}
          isError={isError}
          message={message}
        />
        <h1 className="font-bold p-3">
          {id !== "new" ? "Edit" : "Add new"} Question
        </h1>
        <div className="h-screen w-full md:px-5">
          <div className=" py-5 flex flex-col items-between justify-between lg:flex-row xl:justify-start lg:items-center ">
            <label
              HtmlFor="newQuestion"
              className=" w-full  font-bold lg:w-1/6  mb-5 lg:m-0 "
            >
              Question
            </label>
            <textarea
              type="text"
              id="newQuestion"
              name="newQuestion"
              className="p-3 align-middle outline-none resize-none shadow-md w-full lg:w-5/6   "
              placeholder="New question"
              value={questionInfo.question}
              onChange={(e) => {
                const value = e.target.value.trimStart()
                setQuestionInfo({
                  ...questionInfo,
                  question: value.replace(value[0], value[0]?.toUpperCase()),
                })
              }}
            />
          </div>
          <div className="flex flex-col items-start lg:flex-wrap lg:flex-row lg:justify-start lg:justify-between lg:items-center ">
            <div className="w-full flex justify-between xl:justify-start xl:w-full">
              <div className=" w-2/3 lg:w-1/2 xl:w-4/5  py-5  flex flex-col items-between justify-between lg:flex-row lg:justify-between lg:items-center xl:justify-start">
                <label
                  HtmlFor="newQuestion"
                  className=" w-full font-bold lg:w-1/3 xl:w-1/4 mb-5  lg:mb-0"
                >
                  Category
                </label>
                <ListOption
                  options={categories}
                  format={"lg:w-2/3 xl:w-3/4"}
                  choice={questionInfo.category}
                  setChoice={(value) => {
                    setQuestionInfo({
                      ...questionInfo,
                      category: value,
                    })
                  }}
                />
              </div>
              <div className="  w-1/4 lg:w-1/4 xl:w-1/3  py-5  flex flex-col items-between justify-between lg:flex-row xl:justify-center lg:items-center">
                <label
                  HtmlFor="newQuestion"
                  className=" w-full  font-bold lg:w-3/4 xl:w-3/6 mb-5 lg:mb-0  xl:mx-2 lg:text-center"
                >
                  Category Page
                </label>
                <ListOption
                  options={[
                    { name: "1", value: 1 },
                    { name: "2", value: 2 },
                    { name: "3", value: 3 },
                    { name: "4", value: 4 },
                    { name: "5", value: 5 },
                  ]}
                  format={"w-full"}
                  choice={questionInfo.categoryPage}
                  setChoice={(value) =>
                    setQuestionInfo({
                      ...questionInfo,
                      categoryPage: Number(value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full   py-5  flex flex-col items-between lg:flex-row lg:items-center justify-start ">
              {/* Hiding Rank for non founder memebers */}
              {task === "founder" && (
                <>
                  <label
                    HtmlFor="rank"
                    className="font-bold lg:w-1/6  mb-5 lg:mb-0  "
                  >
                    Rank
                  </label>
                  <ListOption
                    options={ranks}
                    format={" w-full lg:w-3/6 "}
                    choice={questionInfo.rank}
                    setChoice={(value) => {
                      setQuestionInfo({
                        ...questionInfo,
                        rank: value,
                      })
                    }}
                  />
                </>
              )}
            </div>
            <div className="w-full   py-5  flex flex-row  items-start lg:items-center justify-between lg:flex-row xl:justify-start ">
              <div className="flex flex-col lg:flex-row lg:items-center xl:justify-start w-2/4">
                <label
                  HtmlFor="newQuestion"
                  className="font-bold lg:w-1/3  mb-5   lg:mb-0 "
                >
                  Type of answer
                </label>
                <ListOption
                  options={types}
                  format={" w-full lg:w-2/3  "}
                  choice={questionInfo.type}
                  setChoice={(value) => {
                    setQuestionInfo({
                      ...questionInfo,
                      type: value,
                    })
                  }}
                />
              </div>
              <div className="flex flex-col lg:flex-row justify-start md:justify-evenly xl:justify-center items-center w-2/4 ">
                <label className=" font-bold text-center mb-9 lg:w-2/6 lg:mb-0 lg:ml-5">
                  Mandatory{" "}
                </label>
                <input
                  type="checkbox"
                  className=" lg:w-1/6 w-5 h-5 "
                  checked={questionInfo.mandatory}
                  onChange={() =>
                    setQuestionInfo({
                      ...questionInfo,
                      mandatory: !questionInfo.mandatory,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className=" py-5 flex flex-col flex-wrap  xl:flex-nowrap lg:flex-row items-center justify-between">
            {questionInfo.type !== "open" && (
              <AnswerSection
                answersList={answersList}
                setAnswersList={setAnswersList}
                setNewAnswer={setNewAnswer}
                newAnswer={newAnswer}
                handleNewAnswer={handleNewAnswer}
                memberType={task}
              />
            )}
          </div>
          <div className=" flex flex-row w-full flex-wrap items-center justify-around mt-5">
            <button
              type="button"
              className=" flex justify-center items-center w-1/2 md:w-1/4 xl:w-1/6 items-center font-bold  p-4 bg-flime text-fblue  transition-colors ease-in-out duration-500 hover:bg-fblue  hover:text-white  "
              onClick={() => setShowPreview(true)}
            >
              Preview
              {<EyeIcon className="w-6 h-6 ml-2" />}
            </button>
            <button
              type="button"
              className="p-4 w-1/2 md:w-1/4 xl:w-1/6 bg-fblue text-white font-bold   transition-colors ease-in-out duration-500 hover:bg-flime  hover:text-fblue "
              onClick={handleSubmit}
            >
              {" "}
              Submit
            </button>
            <button
              type="button"
              className={
                id !== "new"
                  ? `flex justify-center items-center p-4 w-1/2 md:w-1/4 xl:w-1/6 bg-black text-white font-bold  transition-colors ease-in-out duration-500 hover:bg-fred-dark mt-10 md:mt-0 `
                  : "hidden"
              }
              onClick={handleDelete}
            >
              {" "}
              Delete
              {<TrashIcon className="w-6 h-6 ml-2" />}
            </button>
          </div>
        </div>
      </div>
      {showPreview && (
        <FormPreview
          questionPreview={{ ...questionInfo, answers: answersList }}
          setShowPreview={setShowPreview}
          memberType={task}
        />
      )}
    </div>
  )
}

export default Question
