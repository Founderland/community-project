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
    value: "",
    answer_id: "",
    score: "",
  })
  const [checkBoxValues, setCheckBoxValues] = useState([])
  const [checkboxAnswer, setCheckboxAnswer] = useState([])
  
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
  const [checked, setChecked] = useState(false);
 
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <div className="p-2 text-grotesk text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl mt-1 xl:mt-5">
      <label className=" ">{question}</label>
      <div className="">
        {type === "open" || question === "Email" ? (
          <input
            required={questionPreview ? false : mandatory}
            type={question === "Email" ? "email" : "text"}
            className="flex-1 md:text-lg xl:text-xl appearance-none border border-gray-300 w-11/12 md:w-3/5 mt-1 xl:mt-3 px-2 py-1 md:py-2 md:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fblue-light focus:border-transparent"
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
        ) : (type === "multiple" ?
          <div className=" flex flex-col">
     
              {answers.map((item,index) => (
                <div>
                  <input type="checkbox" id="scales" name="scales"
                   required={questionPreview ? false : mandatory}
                    onChange={(e) => {
                      checkBoxValues[index] = checkBoxValues[index] ? "" : item.answer;
                      setCheckBoxValues([...checkBoxValues])
                    
                      setAnswerData({
                        id: _id,
                        question: question,
                        rank: rank,
                        category: category,
                        value: [...checkBoxValues],
                        answer_id: item[0]?._id,
                        score: "",
                      })
                }
                  } />    


                <label className=" ml-4">{item.answer}</label> 
          
              
                  </div>
                  ))}
              </div>  :
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
