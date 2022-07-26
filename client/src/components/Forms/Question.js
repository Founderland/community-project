import SelectAnswer from "./SelectAnswer"
import { AnswersContext } from "../../contexts/AnswersProvider"

import { useContext, useEffect, useState } from "react"

const Question = ({
  _id,
  question,
  type,
  category,
  rank,
  answers,
  mandatory,
  selectedAnswer,
  selectValidation,
  questionPreview,
}) => {
  const [answerData, setAnswerData] = useState({
    id: _id,
    question: question,
    rank: rank,
    category: category,
    value: [],
    answer_id: "",
    score: "",
  })
  const [checkBoxValues, setCheckBoxValues] = useState([])

  const { submit, answerHandler } = useContext(AnswersContext)

  useEffect(() => {
    if (submit) {
      answerHandler(answerData)
    }
  }, [submit])

  const selectedDisplay = (answer, id, score) => {
    selectedAnswer(answer)
    setAnswerData({
      id: _id,
      question: question,
      rank: rank,
      category: category,
      value: answer,
      answer_id: id,
      score: score,
    })
  }

  const handleCheck = (item) => {
    let scoreSum = Number(answerData.score)
    //search for the selected checkbox value index
    const selectedIndex = checkBoxValues.findIndex((el) => el === item.answer)
    //selectedIndex > 0 means the option was already there (so it's being deselected)
    if (selectedIndex === -1) {
      //add the answer to the array + sum its points
      checkBoxValues.push(item.answer)
      scoreSum += Number(item.points)
    } else {
      //removes it from the array and subtract  points
      checkBoxValues.splice(selectedIndex, 1)
      scoreSum -= Number(item.points)
    }
    if (scoreSum < 0) scoreSum = 0
    setCheckBoxValues([...checkBoxValues])
    //updates the answer values
    setAnswerData({
      id: _id,
      question: question,
      rank: rank,
      category: category,
      value: [...checkBoxValues],
      answer_id: item[0]?._id,
      score: scoreSum,
    })
  }

  return (
    <div className="p-2 text-grotesk mt-1 xl:mt-5">
      <label className="text-sm md:text-base lg:text-lg xl:text-xl  py-3 text-justify">
        {question}
      </label>
      <div className="mt-4">
        {type === "open" || question === "Email" ? (
          <input
            required={questionPreview ? false : mandatory}
            type={question === "Email" ? "email" : "text"}
            className="flex-1 text-sm md:text-base 2xl:text-xl appearance-none border border-gray-300 w-11/12 md:w-4/5 px-2 py-2 md:py-4 md:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-fblue-light focus:border-transparent"
            name="firstname"
            placeholder="Your answer"
            id={answers[0]?._id}
            onChange={(e) =>
              setAnswerData({
                id: _id,
                question: question,
                rank: rank,
                category: category,
                value: e.target.value ? e.target.value : "",
                answer_id: answers[0]?._id,
                score: "",
              })
            }
          />
        ) : type === "multiple" ? (
          <div className=" flex flex-col">
            {answers.map((item, index) => (
              <div key={item.answer}>
                <input
                  type="checkbox"
                  id="scales"
                  name="scales"
                  required={
                    questionPreview
                      ? false
                      : mandatory && !checkBoxValues.length
                      ? true
                      : false
                  }
                  onChange={() => handleCheck(item)}
                />

                <label className="text-sm md:text-base 2xl:text-xl ml-4">
                  {item.answer}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <SelectAnswer
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
