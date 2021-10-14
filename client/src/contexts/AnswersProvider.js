import axios from "axios"
import { createContext, useState, useEffect } from "react"

// creating a context and exporting it
export const AnswersContext = createContext(null)

function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState([])
  const [submit, setSubmit] = useState(false)
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(false)
  const [viewButton, setViewButton] = useState(false)
  const[viewId,setViewId]=useState({})

  let totalscore = 0
  const answerHandler = (inputValue) => {
    answers[inputValue.id] = inputValue.value
    const id = inputValue.id

    const answer = inputValue.value
    const answer_id = inputValue.answer_id
    const score = inputValue.score
    totalscore = totalscore + inputValue.score
    const object = {
      question_id: `${id}`,
      question: inputValue.question,
      rank: inputValue.rank,
      category:inputValue.category,
      answer_id: `${answer_id}`,
      answer_value: `${answer}`,
      score: `${score}`,
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
          console.log(answers[i].score)
          total += parseInt(answers[i].score)
        }
      }
      // const total=answers.map(item=>parseInt(item.score)).reduce((prev,curr)=>prev+curr,0)
      console.log("total", total)
      axios
        .post("/api/form/founder/response", {
          applicantName: answers[0].answer_value,
          totalScore: total,
          answerData: answers,
        })
        //axios.post("/api/form/founder/response", { data: JSON.stringify(answers) })
        .then((result) => {
          console.log(result)
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
        viewId:viewId  
      }}
    >
      {children}
    </AnswersContext.Provider>
  )
}

export default AnswersProvider
