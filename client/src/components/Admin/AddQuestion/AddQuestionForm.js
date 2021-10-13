import { useContext, useState } from "react"
import axios from "axios"
import AnswerSection from "./AnswerSection"
import NewQuestionResponse from "../NewQuestionResponse"
import FormPreview from "./FormPreview"
import { useParams } from "react-router"
import { EyeIcon } from "@heroicons/react/outline"
import ListOption from "../ListOption"
import AdminContext from "../../../contexts/Admin"

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

const AddQuestionForm = ({ functionality }) => {
  const { selectedItem: question, memberType } = useContext(AdminContext)
  const answers = question?.answers || null

  const [questionInfo, setQuestionInfo] = useState(question || defaultQuestion)
  const [answersList, setAnswersList] = useState(answers || [])

  const [newAnswer, setNewAnswer] = useState(defaultAnswer)
  const [isSuccessful, setIsSuccessfull] = useState(false)
  const [isError, setIsError] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleNewAnswer = () => {
    setAnswersList((pre) =>
      pre.length > 0 ? [...pre, newAnswer] : [newAnswer]
    )
    // restoring default values
    setNewAnswer(defaultAnswer)
  }

  const handleSubmit = () => {
    let newQuestion = { ...questionInfo, answers: answersList }
    // Deleting unnecessary fields for non founders
    if (memberType !== "founder") {
      delete newQuestion.rank
      newQuestion.answers.forEach((i) => delete i.points && delete i.ideal)
    }

    axios({
      method: functionality === "edit" ? "PUT" : "POST",
      baseURL: `/api/form/${memberType}`,
      url: functionality === "edit" ? question._id : "add",
      data: newQuestion,
    })
      // .post(`/api/form/${memberType}/add`, newQuestion)
      .then((result) => {
        setIsSuccessfull(true)
        setTimeout(() => {
          setIsSuccessfull(false)
        }, 7000)
      })
      .catch((e) => {
        console.log(e)
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 7000)
      })

    // restoring default values
    setQuestionInfo(defaultQuestion)
    // emptying answers list
    setAnswersList([])
  }

  const setListOption = (value) => {
    setQuestionInfo({
      ...questionInfo,
      category: value,
    })
  }

  return (
    <div className=' h-screen w-full flex flex-col justify-start items-stretch text-xl shadow-xl py-4'>
      <div className='flex flex-col justify-center items-center bg-white p-4  '>
        <NewQuestionResponse isSuccessful={isSuccessful} isError={isError} />
        <h1 className='font-bold p-3'>
          {functionality === "edit" ? "Edit" : "Add new"} Question
        </h1>
        <div className='h-screen w-full md:px-5'>
          <div className=' py-5 flex flex-col items-between justify-between lg:flex-row xl:justify-start lg:items-center '>
            <label
              HtmlFor='newQuestion'
              className=' w-full  font-bold lg:w-1/6  mb-5 lg:m-0 '>
              Question
            </label>
            <textarea
              type='text'
              id='newQuestion'
              name='newQuestion'
              className='p-3 outline-none resize-none shadow-md w-full lg:w-5/6   '
              placeholder='New question'
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
          <div className='flex flex-col items-start lg:flex-wrap lg:flex-row lg:justify-start lg:justify-between lg:items-center '>
            <div className='w-full flex justify-between xl:justify-start xl:w-full'>
              <div className=' w-2/3 lg:w-1/2 xl:w-4/5  py-5  flex flex-col items-between justify-between lg:flex-row lg:justify-between lg:items-center xl:justify-start'>
                <label
                  HtmlFor='newQuestion'
                  className=' w-full font-bold lg:w-1/3 xl:w-1/4 mb-5  lg:mb-0'>
                  Category
                </label>
                {/* <ListOption
                  options={categories}
                  choice={questionInfo.category}
                  setChoice={setListOption}
                /> */}
              </div>
              <div className='  w-1/4 lg:w-1/4 xl:w-1/3  py-5  flex flex-col items-between justify-between lg:flex-row xl:justify-center lg:items-center'>
                <label
                  HtmlFor='newQuestion'
                  className=' w-full  font-bold lg:w-3/4 xl:w-3/6 mb-5 lg:mb-0  xl:mx-2 lg:text-center'>
                  Category Page
                </label>
                <select
                  id='category'
                  className='p-3 bg-white w-auto shadow-md w-full lg:w-1/3 xl:1/6  '
                  value={questionInfo.categoryPage}
                  onChange={(e) =>
                    setQuestionInfo({
                      ...questionInfo,
                      categoryPage: Number(e.target.value),
                    })
                  }>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
            </div>
            <div className='w-full   py-5  flex flex-col items-between lg:flex-row lg:items-center justify-between '>
              {/* Hiding Rank for non founder memebers */}
              {memberType === "founder" && (
                <>
                  <label
                    HtmlFor='rank'
                    className='font-bold lg:w-1/6  mb-5 lg:mb-0  '>
                    Rank
                  </label>

                  <select
                    id='rank'
                    className='p-3 w-auto bg-white shadow-md lg:w-5/6  '
                    value={questionInfo.rank}
                    onChange={(e) =>
                      setQuestionInfo({
                        ...questionInfo,
                        rank: e.target.value,
                      })
                    }>
                    <option value='Not Important - just for info/further context'>
                      Not Important - just for info/further context
                    </option>
                    <option value='Vital - Deal Maker or Breaker'>
                      Vital - Deal Maker or Breaker
                    </option>
                    <option value='Very Important - variable is scrutinized'>
                      {" "}
                      Very Important - variable is scrutinized{" "}
                    </option>
                    <option value='Moderately Important - potentially a determining factor'>
                      Moderately Important - potentially a determining factor{" "}
                    </option>
                  </select>
                </>
              )}
            </div>
            <div className='w-full   py-5  flex flex-row  items-start lg:items-center justify-between lg:flex-row xl:justify-start '>
              <div className='flex flex-col lg:flex-row lg:items-center xl:justify-between w-2/4'>
                <label
                  HtmlFor='newQuestion'
                  className='font-bold lg:w-1/3 xl:w-1/6 mb-5   lg:mb-0 '>
                  Type of answer
                </label>
                <select
                  id='answerType'
                  className='p-3  bg-white w-auto shadow-md lg:w-2/3 xl:w-4/6  '
                  value={questionInfo.type}
                  onChange={(e) =>
                    setQuestionInfo({
                      ...questionInfo,
                      type: e.target.value,
                    })
                  }>
                  <option value='open'>Open</option>
                  <option value='list'>Dropdown list</option>
                  <option value='choice'> Single Choice </option>
                  <option value='multiple'>Multiple selections </option>
                </select>
              </div>
              <div className='flex flex-col lg:flex-row justify-start md:justify-evenly xl:justify-center items-center w-2/4 '>
                <label className=' font-bold text-center mb-9 lg:w-2/6 lg:mb-0 lg:ml-5'>
                  Mandatory{" "}
                </label>
                <input
                  type='checkbox'
                  className=' lg:w-1/6 w-5 h-5 '
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
          <div className=' py-5 flex flex-col flex-wrap  xl:flex-nowrap lg:flex-row items-center justify-between'>
            {questionInfo.type !== "open" && (
              <AnswerSection
                answersList={answersList}
                setAnswersList={setAnswersList}
                setNewAnswer={setNewAnswer}
                newAnswer={newAnswer}
                handleNewAnswer={handleNewAnswer}
                memberType={memberType}
              />
            )}
          </div>
          <div className=' m-auto flex flex-row w-full lg:w-1/2 items-center justify-around'>
            <button
              type='button'
              className='flex p-4 bg-flime text-fblue   transition-colors ease-in-out duration-500 hover:bg-fblue  hover:text-white  '
              onClick={() => setShowPreview(true)}>
              Preview
              {<EyeIcon className='w-7 h-7 ml-2' />}
            </button>
            <button
              type='button'
              className='p-4 bg-fblue text-white font-bold   transition-colors ease-in-out duration-500 hover:bg-flime  hover:text-fblue '
              onClick={handleSubmit}>
              {" "}
              Submit
            </button>
          </div>
        </div>
      </div>
      {showPreview && (
        <FormPreview
          questionPreview={{ ...questionInfo, answers: answersList }}
          setShowPreview={setShowPreview}
          memberType={memberType}
        />
      )}
    </div>
  )
}

export default AddQuestionForm
