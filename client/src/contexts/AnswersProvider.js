import { createContext, useState, useEffect } from 'react'
export const AnswersContext = createContext(null)

function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState([])
  const [submit, setSubmit] = useState(false)

  const answerHandler = (inputValue) => {
    answers[inputValue.id] = inputValue.value
    setAnswers({ ...answers })
  }

  useEffect(() => {
    // console.log(answers)
  }, [answers])

  const submitHandler = () => {
    setSubmit(true)
  }

  const previousHandler = () => {
    setSubmit(false)
  }

  return (
    <AnswersContext.Provider
      value={{
        answers: answers,
        answerHandler: answerHandler,
        submit: submit,
        submitHandler: submitHandler,
        previousHandler: previousHandler,
      }}
    >
      {children}
    </AnswersContext.Provider>
  )
}

export default AnswersProvider
