import { createContext, useState, useEffect } from 'react'

// creating a context and exporting it
export const AnswersContext = createContext(null)

function AnswersProvider({ children }) {
    const [answers, setAnswers] = useState([])
    const [submit, setSubmit] = useState(false)
    const [next, setNext] = useState(false)

    const answerHandler = (inputValue) => {
        answers[inputValue.id] = inputValue.value
        setAnswers({ ...answers })
    }

    const submitHandler = (value) => {
        setSubmit(value)
    }
    const nextHandler = (value) => {
        setNext(value)
    }

    useEffect(() => {
        console.log(answers)
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
            }}
        >
            {children}
        </AnswersContext.Provider>
    )
}

export default AnswersProvider
