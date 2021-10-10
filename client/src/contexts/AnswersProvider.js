import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

// creating a context and exporting it
export const AnswersContext = createContext(null)

function AnswersProvider({ children }) {
    const [answers, setAnswers] = useState([])
    const [submit, setSubmit] = useState(false)
    const [next, setNext] = useState(false)
    const [prev, setPrev] = useState(false)

    const answerHandler = (inputValue) => {
        answers[inputValue.id] = inputValue.value
         const id = inputValue.id
        const answer = inputValue.value
        const answer_id=inputValue.answer_id
        const object = { question_id: `${id}`,answer_id: `${answer_id}`,answer_value: `${answer}` }
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

    useEffect(() => {
  
        console.log(answers)
        if (submit && answers.length > 0) {
            //    axios({
            //     url:'/api/form/founder/response',
            //     method: 'post',
            //     data: answerValue
            //   })

         axios.post("http://localhost:3001/api/form/founder/response", JSON.stringify(answers))
            
        .then((result) => {
        console.log(result)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    }, [answers,submit])


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
                prevHandler:prevHandler
            }}
        >
            {children}
        </AnswersContext.Provider>
    )
}

export default AnswersProvider
