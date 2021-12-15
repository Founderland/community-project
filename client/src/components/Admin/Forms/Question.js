import { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router"
import axios from "axios"
import AnswerSection from "./AnswerSection"
import FormPreview from "./FormPreview"
import { EyeIcon, TrashIcon } from "@heroicons/react/outline"
import ListOption from "../Widgets/ListOption"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"

const defaultQuestion = {
  category: "About You",
  question: "",
  type: "open",
  rank: "info",
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
    name: "Just for Info",
    value: "info",
  },
  {
    name: "Deal Maker or Breaker",
    value: "vital",
  },
  {
    name: "Scrutinized",
    value: "important",
  },
  {
    name: "Potentially a determining factor",
    value: "moderate",
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
  const { config, setSelectedTab, user, token } = useContext(AdminContext)
  const [totalCategories, setTotalCategories] = useState([0, 0, 0])
  const [totalPages, setTotalPages] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ])
  const [questionInfo, setQuestionInfo] = useState(defaultQuestion)
  const [answersList, setAnswersList] = useState([])
  const [newAnswer, setNewAnswer] = useState(defaultAnswer)
  const [banner, setBanner] = useState({ show: false })
  const [showPreview, setShowPreview] = useState(false)
  const mainDiv = useRef()

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionURL = `/api/form/${role}/question/${id}`
      try {
        const result = await axios.get(questionURL, config)
        if (result.data) {
          setQuestionInfo({ ...result.data })
          setAnswersList(result.data.answers)
        } else {
          setBanner({ error: 1, show: true, message: "Question not found" })
          setTimeout(() => {
            setBanner((prev) => ({ ...prev, show: false }))
            history.push("/admin/forms")
          }, 2000)
        }
      } catch (err) {
        setBanner({
          error: 1,
          show: true,
          message: err.message,
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
      }
    }
    const fetchCategories = async () => {
      try {
        const result = await axios.get(`/api/form/${role}/questions`, config)
        let updateTotal = []
        let updatePages = []
        categories.forEach((category, index) => {
          let filteredData = result.data.filter(
            (item) => item.category === category.value
          )
          const totalCategory = filteredData.length
          let pages = []
          for (let i = 1; i <= 5; i++) {
            pages.push(
              filteredData.filter((item) => item.categoryPage === i).length
            )
          }
          updatePages.push(pages)
          updateTotal.push(totalCategory)
        })
        setTotalCategories(updateTotal)
        setTotalPages(updatePages)
      } catch (e) {
        setBanner({
          error: 1,
          show: true,
          message: e.message,
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
      }
    }
    if (id !== "new") {
      fetchQuestion()
    }
    fetchCategories()
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
    if (questionInfo.question !== "") {
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
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setBanner({
            success: 1,
            show: true,
            message: "Question saved! Redirecting..",
          })
          setTimeout(() => {
            history.push("/admin/forms/")
            role === "founder"
              ? setSelectedTab(0)
              : role === "investor"
              ? setSelectedTab(1)
              : setSelectedTab(2)
          }, 2000)
        })
        .catch((e) => {
          setBanner({
            error: 1,
            show: true,
            message: "Sorry, something went wrong while saving..",
          })
          setTimeout(() => {
            setBanner((prev) => ({ ...prev, show: false }))
          }, 4000)
        })
    } else {
      setBanner({
        error: 1,
        show: true,
        message: "Question field is required",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    }
  }

  const handleDelete = () => {
    mainDiv.current.scrollIntoView()
    axios
      .delete(`/api/form/${role}/delete/${questionInfo._id}`, config)
      .then((res) => {
        setBanner({
          show: true,
          success: 1,
          message: "Question deleted.! Redirecting..",
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
        setBanner({
          error: 1,
          show: true,
          message: "Sorry, something went wrong while deleting..",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
      })
  }

  const checkForIdentityQuestion = (question) => {
    return (
      question === "First name" ||
      question === "Last name" ||
      question === "Email"
    )
  }

  console.log(categories.map((e) => e.value).indexOf(questionInfo.category))

  return (
    <>
      {checkForIdentityQuestion(questionInfo.question) && (
        <div className="bg-white opacity-50 h-full w-full absolute z-10 cursor-not-allowed"></div>
      )}
      <Banner message={banner} />
      <div
        ref={mainDiv}
        className="relative self-center flex flex-col w-full xl:w-5/6 2xl:w-4/6 pb-6 shadow-lg border-0"
      >
        <h1 className="w-full text-center font-bold p-4 text-xl text-mono">
          {checkForIdentityQuestion(questionInfo.question)
            ? "This question can't be edited"
            : id !== "new"
            ? "Edit "
            : "Add new "}
          {!checkForIdentityQuestion(questionInfo.question) &&
            `Question for ${role} applicants`}
        </h1>
        <div className=" w-full md:px-5">
          <div className="w-full mt-4 mb-3 px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Question
            </label>
            <textarea
              type="text"
              disabled={checkForIdentityQuestion(questionInfo.question)}
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
                  extra={totalCategories}
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
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
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
                extra={
                  totalPages[
                    categories
                      .map((e) => e.value)
                      .indexOf(questionInfo.category)
                  ]
                }
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
                  format={"w-full"}
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
          <div className="px-4 py-2 flex flex-col-reverse sm:flex-row items-center justify-around ">
            <button
              type="button"
              className="flex z-20 justify-center items-center px-8 py-2 w-full shadow-lg sm:w-1/5 bg-fblue text-white transition duration-200 hover:bg-flime hover:text-black mb-4"
              onClick={() => setShowPreview(true)}
            >
              Preview
              {<EyeIcon className="w-6 h-6 ml-2" />}
            </button>
            {user.role.includes("admin") && (
              <>
                <button
                  disabled={checkForIdentityQuestion(questionInfo.question)}
                  type="button"
                  className="flex justify-center items-center px-8 py-2 w-full shadow-lg sm:w-1/5 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  disabled={checkForIdentityQuestion(questionInfo.question)}
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
              </>
            )}
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
    </>
  )
}

export default Question
