import axios from "axios"
import { createContext, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

// creating a context and exporting it
export const AnswersContext = createContext(null)

function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState([])
  const [submit, setSubmit] = useState(false)
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(false)
  const [viewButton, setViewButton] = useState(false)
  const [viewId, setViewId] = useState({})
  const location = useLocation()
  const role = location.pathname.split("/form/")[1]
  let totalscore = 0
  const answerHandler = (inputValue) => {
    answers[inputValue.id] = inputValue.value
    const id = inputValue.id

    const answer = inputValue.value
    const answer_id = inputValue.answer_id
    const score = inputValue.score
    totalscore = totalscore + inputValue.score
    let object = {
      question_id: `${id}`,
      question: inputValue.question,
      rank: inputValue.rank,
      category: inputValue.category,
      answer_value: `${answer}`,
      score: `${score}`,
    }
    // adding answer_id only if it exists
    if (answer_id?.length > 0) {
      object = {
        ...object,
        answer_id: answer_id,
      }
    }
    answers.push(object)
    setAnswers([...answers])
  }

  const submitHandler = (value) => {
    setSubmit(value)
  }
  const nextHandler = (value) => {
    setNext(value)
  }
  const prevHandler = (value) => {
    setPrev(value)
  }
  // For view button in Cells file
  const buttonClicked = (value) => {
    setViewButton(value)
  }

  // For getting the particular item that is clicked
  const viewIdHandler = (value) => {
    setViewId(value)
  }

  useEffect(() => {
    if (answers.length > 0) {
      let total = 0
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].score !== "") {
          total += parseInt(answers[i].score)
        }
      }
      const responseData = {
        firstName: answers.filter(
          (answer) => answer.question.toLowerCase().trim() === "first name"
        )[0].answer_value,
        lastName: answers.filter(
          (answer) => answer.question.toLowerCase().trim() === "last name"
        )[0].answer_value,
        email: answers.filter(
          (answer) => answer.question.toLowerCase().trim().search("email") >= 0
        )[0].answer_value,
        totalScore: total,
        role: role,
        answerData: answers,
      }
      axios
        .post("/api/applicants/response", responseData)
        .then((result) => {
          setAnswers([])
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [answers])

  return (
    //  Providing the context
    <AnswersContext.Provider
      value={{
        answers: answers,
        answerHandler: answerHandler,
        submit: submit,
        submitHandler: submitHandler,
        nextHandler: nextHandler,
        next: next,
        prev: prev,
        prevHandler: prevHandler,
        buttonClicked: buttonClicked,
        viewButton: viewButton,
        viewIdHandler: viewIdHandler,
        viewId: viewId,
        setViewButton: setViewButton,
      }}
    >
      {children}
    </AnswersContext.Provider>
  )
}

export default AnswersProvider
