import Question from './Question'
import smallLogo from '../../assets/images/smallLogo.svg'
import { useHistory } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { AnswersContext } from '../../contexts/AnswersProvider'
import gif from '../../assets/images/loadingGif.gif'

const FormPage = (props) => {
    const { questions, isFirst, isLast, uniquePageNumber } = props
    const [submitBtnClicked, setsubmitBtnClicked] = useState(false)
    const {
        submitHandler,
        nextHandler,
        pageHandler,
        pageValidate,
        next,
        submit,
        clearValidationHandler,
    } = useContext(AnswersContext)
    const [gify, setGify] = useState(false)

    const history = useHistory()

    const submitBtn = () => {
        nextBtn()
        setsubmitBtnClicked(true)
    }

    const previous = () => {
        submitHandler(false)
        props.previousStep()
    }
    const nextBtn = () => {
        nextHandler(true)
        console.log(uniquePageNumber)
        pageHandler(uniquePageNumber)
    }

    useEffect(() => {
        if (pageValidate) {
            console.log('submit', submit)
            submitBtnClicked && submitHandler(true)
            if (!submit) {
                props.nextStep()
            }
        }
        if (submit) {
            setGify(true)
            const timer = setTimeout(() => {
                let path = `/thankyou`
                history.push(path)
                setGify(false)
            }, 1500)
            return () => {
                clearTimeout(timer)
            }
        }
        clearValidationHandler()
    }, [pageValidate, next, submit])

    return (
        <div>
            {/* 
                    Loading gif  */}
            {gify && (
                <div classname="absolute w-screen h-screen">
                    <img src={gif} alt="gif" />
                </div>
            )}
            <div className="max-h-screen w-screen md:w-full flex justify-center flex-col overflow-y-scroll md:overflow-hidden ">
                <div className=" flex flex-col justify-between  p-10 h-screen">
                    <div className="flex  justify-between md:justify-end mb-7">
                        <div className="md:hidden mt-3">
                            {' '}
                            <img
                                src={smallLogo}
                                alt="logo"
                                className="w-20 pr-5"
                            />{' '}
                        </div>

                        <div className=" ">
                            {/* md:max-w-xs md:pl-24 */}
                            <h2 className=" hidden md:flex md:mt-5 text-mono font-semibold md:text-xl lg:text-xl xl:text-2xl md:tracking-wider">
                                DISRUPTING THE PIPELINE FOR INVESTORS{' '}
                            </h2>
                        </div>
                    </div>
                    <div>
                        {questions.map((question, i) => (
                            <Question
                                key={i}
                                {...question}
                                uniquePageNumber={uniquePageNumber}
                            />
                        ))}
                    </div>
                    <div className="p-10 ">
                        {!isFirst && (
                            <button
                                type="button"
                                className="py-2 px-4 xl:py-4 float-left bg-fblue opacity-80 hover:bg-fblue-dark focus:ring-fblue focus:ring-offset-white text-white text-mono w-2/5 md:w-1/3 xl:w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                onClick={previous}
                            >
                                Prev
                            </button>
                        )}
                        <button
                            type="button"
                            className={
                                'py-2 px-4  xl:py-4 float-right focus:ring-offset-white text-white text-mono w-2/5 md:w-1/3 xl:w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
                                (isLast
                                    ? ' bg-black  hover:bg-black focus:ring-black'
                                    : 'bg-fblue hover:bg-fblue-dark focus:ring-fblue')
                            }
                            onClick={isLast ? submitBtn : nextBtn}
                        >
                            {isLast ? 'Submit' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPage
