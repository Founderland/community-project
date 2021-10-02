import { createContext, useState, useEffect } from 'react'

// creating a context and exporting it
export const AnswersContext = createContext(null)

function AnswersProvider({ children }) {
    const [answers, setAnswers] = useState([])
    const [submit, setSubmit] = useState(false)
    const [next, setNext] = useState(false)
    const [pageNumber, setPageNumber] = useState('')
    const [pageValidate, setPageValidate] = useState(false)
    const [pageValidateItems, setPageValidateItems] = useState([])

    // const [isValid, setIsValid] = useState(false)

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
    const pageHandler = (value) => {
        setPageNumber(value)
    }
    // To check the validation of questions in a page
    const questionPageHandler = (value) => {
        pageValidateItems.push(value)
        setPageValidateItems([...pageValidateItems])
    }

    const clearValidationHandler = () => {
        setPageValidateItems([])
    }

    useEffect(() => {
        console.log(answers)
    }, [answers])

    useEffect(() => {
        let finalValidation = false
        console.log('pageValidatArraz', pageValidateItems)
        if (pageValidateItems.length > 0) {
            pageValidateItems.forEach((item, index) => {
                if (index === 0) {
                    finalValidation = item
                } else {
                    finalValidation = finalValidation && item
                }
            })
            console.log('final', finalValidation)
            setPageValidate(finalValidation)
        } else {
            setPageValidate(finalValidation)
        }
    }, [pageValidateItems, next])

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
                pageHandler: pageHandler,
                pageNumber: pageNumber,
                questionPageHandler: questionPageHandler,
                pageValidate: pageValidate,
                clearValidationHandler: clearValidationHandler,
            }}
        >
            {children}
        </AnswersContext.Provider>
    )
}

export default AnswersProvider
