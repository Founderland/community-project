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

const Question = ({ role }) => {
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
  const [answersList, setAnswersList] = useState([])
  const [newAnswer, setNewAnswer] = useState(defaultAnswer)
  const [result, setResult] = useState({
    success: null,
    show: false,
    error: null,
    message: null,
  })
  const [showPreview, setShowPreview] = useState(false)
  const mainDiv = useRef()

  useEffect(() => {
    if (id !== "new") {
      const questionURL = `/api/form/${role}/question/${id}`
      axios
        .get(questionURL, config)
        .then((res) => {
          console.log(role)
          if (res.data) {
            setQuestionInfo({ ...res.data })
            setAnswersList(res.data.answers)
          } else {
            setResult({ error: 1, show: true, message: "Question not found" })
            setTimeout(() => {
              setResult({ ...result, show: false })
              history.push("/admin/forms")
            }, 3000)
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
    if (role !== "founder") {
      delete newQuestion.rank
      newQuestion.answers.forEach((i) => delete i.points && delete i.ideal)
    }
    axios({
      method: id !== "new" ? "PUT" : "POST",
      baseURL: `/api/form/${role}`,
      url: id !== "new" ? "/edit" : "/add",
      data: newQuestion,
    })
      .then((result) => {
        setResult({
          success: 1,
          show: true,
          message: "Question saved.. redirecting",
        })
        setTimeout(() => {
          history.push("/admin/forms/")
          role === "founder"
            ? setSelectedTab(0)
            : role === "investor"
            ? setSelectedTab(1)
            : setSelectedTab(2)
        }, 3000)
      })
      .catch((e) => {
        setResult({
          error: 1,
          show: true,
          message: "Sorry, something went wrong while saving..",
        })
        setTimeout(() => {
          setResult({ show: false })
        }, 5000)
      })
  }

  const handleDelete = () => {
    mainDiv.current.scrollIntoView()
    axios
      .delete(`/api/form/${role}/delete/${questionInfo._id}`)
      .then((result) => {
        setResult({
          show: true,
          success: 1,
          message: "Question deleted.. redirecting",
        })
        setTimeout(() => {
          history.push("/admin/forms")
          role === "founder"
            ? setSelectedTab(0)
            : role === "investor"
            ? setSelectedTab(1)
            : setSelectedTab(2)
        }, 2000)
      })
      .catch((e) => {
        setResult({
          error: 1,
          show: true,
          message: "Sorry, something went wrong while deleting..",
        })
        setTimeout(() => {
          setResult({ show: false })
        }, 5000)
      })
  }

  return (
    <div
      ref={mainDiv}
      className="relative py-1 bg-white w-full lg:w-5/6 px-4 mx-auto mt-6 flex justify-center"
    >
      <SubmitResponse result={result} />
      <div className="w-full flex flex-col justify-center items-center bg-white p-4 shadow-md ">
        <h1 className="font-bold p-3 text-xl text-mono">
          {id !== "new" ? "Edit" : "Add new"} Question
        </h1>
        <div className=" w-full md:px-5">
          <div className="w-full mt-4 mb-3 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Question
            </label>
            <textarea
              type="text"
              id="newQuestion"
              name="newQuestion"
              className="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border py-3 px-4 mb-3 shadow-md"
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
          <div className="md:flex w-full px-3">
            <div className="w-full md:w-3/4 mb-3 px-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Category
              </label>
              <div className="w-full">
                <ListOption
                  options={categories}
                  format={"w-full"}
                  choice={questionInfo.category}
                  setChoice={(value) => {
                    setQuestionInfo({
                      ...questionInfo,
                      category: value,
                    })
                  }}
                />
              </div>
            </div>
            <div className=" w-full md:w-1/4 mb-3 px-2">
              <label
                HtmlFor="newQuestion"
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
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
          <div className="md:flex w-full px-3">
            {role === "founder" && (
              <div className="w-full md:w-3/4 mb-3 px-2">
                <label
                  HtmlFor="rank"
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                >
                  Rank
                </label>
                <ListOption
                  options={ranks}
                  format={" w-full"}
                  choice={questionInfo.rank}
                  setChoice={(value) => {
                    setQuestionInfo({
                      ...questionInfo,
                      rank: value,
                    })
                  }}
                />
              </div>
            )}
            <div className=" w-full md:w-1/4 mb-3 px-2">
              <label
                HtmlFor="newQuestion"
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >
                Type of answer
              </label>
              <ListOption
                options={types}
                format={" w-full "}
                choice={questionInfo.type}
                setChoice={(value) => {
                  setQuestionInfo({
                    ...questionInfo,
                    type: value,
                  })
                }}
              />
            </div>
            <div className=" w-full md:w-1/4 mb-3 px-2 flex items-center justify-center flex-col">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Mandatory
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

          {questionInfo.type !== "open" && (
            <div className=" py-5 flex flex-col flex-wrap  xl:flex-nowrap lg:flex-row items-center justify-between">
              <AnswerSection
                answersList={answersList}
                setAnswersList={setAnswersList}
                setNewAnswer={setNewAnswer}
                newAnswer={newAnswer}
                handleNewAnswer={handleNewAnswer}
                memberType={role}
              />
            </div>
          )}
          <div className="px-4 py-2 flex flex-col-reverse sm:flex-row items-center justify-around">
            <button
              type="button"
              className="flex justify-center items-center px-8 py-2 w-full shadow-lg sm:w-1/5 bg-fblue text-white transition duration-200 hover:bg-flime hover:text-black mb-4"
              onClick={() => setShowPreview(true)}
            >
              Preview
              {<EyeIcon className="w-6 h-6 ml-2" />}
            </button>
            <button
              type="button"
              className="flex justify-center items-center px-8 py-2 w-full shadow-lg sm:w-1/5 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className={
                id !== "new"
                  ? `flex justify-center items-center px-8 py-2 w-full shadow-lg sm:w-1/5 bg-gray-700 transition duration-200 hover:bg-fred text-white mb-4`
                  : "hidden"
              }
              onClick={handleDelete}
            >
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
          memberType={role}
        />
      )}
    </div>
  )
}

export default Question
