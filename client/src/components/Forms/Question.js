import SelectAnswer from './SelectAnswer'
import { AnswersContext } from '../../contexts/AnswersProvider'

import { useContext, useEffect, useState } from 'react'

const Question = ({
  _id,
  question,
  type,
  category,
  answers,
  selectedAnswer,
  selectValidation,
  questionPreview,
}) => {
  const [answerData, setAnswerData] = useState({})

  const { submit, answerHandler } = useContext(AnswersContext)

  useEffect(() => {
    if (submit) {
      answerHandler(answerData)
    }
  }, [submit])

  const selectedDisplay = (answer) => {
    selectedAnswer(answer)
    setAnswerData({ id: _id, value: answer })
  }
  return (
    <div className="p-2 text-grotesk text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl mt-1 xl:mt-5">
      <label className=" ">{question}</label>
      <div className="">
        {type === 'open' || type === 'email' ? (
          <input
            required={!questionPreview ? true : false}
            type={type === 'open' ? 'text' : 'email'}
            className="flex-1 md:text-lg xl:text-xl appearance-none border border-gray-300 w-11/12 md:w-3/5 mt-1 xl:mt-3 px-2 py-1 md:py-2 md:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fblue-light focus:border-transparent"
            name="firstname"
            placeholder="Your answer"
            id={answers[0]?._id}
            onChange={(e) =>
              setAnswerData({
                id: _id,
                value: e.target.value,
              })
            }
          />
        ) : (
          <SelectAnswer
            questionPreview={questionPreview}
            answers={answers}
            selectedAnswer={selectedDisplay}
            selectValidation={selectValidation}
          />
        )}
      </div>
    </div>
  )
}
export default Question
