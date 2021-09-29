import Question from './Question'
import smallLogo from '../../assets/images/smallLogo.svg'
import Thankyou from './Thankyou'
import { useHistory } from 'react-router-dom'
import arrow from '../../assets/images/arrow.svg'
import { useState, useContext } from 'react'
import { AnswersContext } from '../../contexts/AnswersProvider'

const FormPage = (props) => {
    const { submitHandler } = useContext(AnswersContext)

    const history = useHistory()

    const submit = () => {
        submitHandler(true)

        const timer = setTimeout(() => {
            let path = `/thankyou`
            history.push(path)
        }, 2000)
        return () => clearTimeout(timer)
    }

    const previous = () => {
        submitHandler(false)
        props.previousStep()
    }

    const { questions, isFirst, isLast } = props
    return (
        <div>
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
                            <Question key={i} {...question} />
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
                            onClick={isLast ? submit : props.nextStep}
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
