import { useState } from 'react'
import axios from 'axios'
import AddNewAnswer from './AddNewAnswer'
import NewQuestionResponse from './NewQuestionResponse'
import FormPreview from './FormPreview'
import { useParams } from 'react-router'

const AddQuestionForm = () => {
    const { memberType } = useParams()

    console.log(memberType)

    const [questionInfo, setQuestionInfo] = useState({
        category: 'About You',
        question: '',
        type: 'open',
        rank: 'Not Important - just for info/further context',
        answers: [],
        categoryPage: 1,
    })

    const [answersList, setAnswersList] = useState([])
    const [newAnswer, setNewAnswer] = useState({
        answer: '',
        points: 0,
        ideal: false,
    })
    const [isSuccessful, setIsSuccessfull] = useState(false)
    const [isError, setIsError] = useState(false)
    const [showPreview, setShowPreview] = useState(false)

    const handleNewAnswer = (e) => {
        setAnswersList((pre) =>
            pre.length > 0 ? [...pre, newAnswer] : [newAnswer]
        )
        // restoring default values
        setNewAnswer({
            answer: ' ',
            points: 0,
            ideal: false,
        })
    }

    const handleSubmit = () => {
        let newQuestion = { ...questionInfo, answers: answersList }
        // Deleting unnecessary fields for non founders
        if (memberType !== 'founder') {
            delete newQuestion.rank
            newQuestion.answers.forEach(
                (i) => delete i.points && delete i.ideal
            )
        }
        console.log(newQuestion)
        axios
            .post(
                `http://localhost:3001/api/form/${memberType}/add`,
                newQuestion
            )
            .then((result) => {
                console.log(result)
                setIsSuccessfull(true)
                setTimeout(() => {
                    setIsSuccessfull(false)
                }, 7000)
            })
            .catch((e) => {
                console.log(e)
                setIsError(true)
                setTimeout(() => {
                    setIsError(false)
                }, 7000)
            })

        // restoring default values
        setQuestionInfo({
            category: 'About You',
            question: '',
            type: 'open',
            rank: 'Not Important - just for info/further context',
            answers: [],
            categoryPage: 1,
        })
        // emptying answers list
        setAnswersList([])
    }

    return (
        <div className=" h-full w-screen flex flex-col justify-evenly items-stretch text-xl m-4 shadow-xl ">
            <div className=" flex flex-col justify-center items-center bg-white py-4 rounded-lg">
                <NewQuestionResponse
                    isSuccessful={isSuccessful}
                    isError={isError}
                />
                <h1 className="text-grotesk font-bold p-3">
                    Add new Questions
                </h1>
                <div className="h-full w-5/6 ">
                    <div className="  text-mono py-5  flex flex-col items-between justify-between lg:flex-row xl:justify-start lg:items-center ">
                        <label
                            HtmlFor="newQuestion"
                            className=" w-full font-bold text-grotesk lg:w-1/6 xl:w-64 mb-5 lg:m-0 "
                        >
                            Question
                        </label>
                        <input
                            type="text"
                            id="newQuestion"
                            name="newQuestion"
                            className="p-3  shadow-md w-full lg:w-5/6 xl:w-full rounded-lg"
                            placeholder="New question"
                            value={questionInfo.question}
                            onChange={(e) =>
                                setQuestionInfo({
                                    ...questionInfo,
                                    question: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col items-start lg:flex-wrap lg:flex-row lg:justify-start lg:justify-between lg:items-center ">
                        <div className="w-full flex justify-between xl:justify-start xl:w-full">
                            <div className=" w-2/3 lg:w-1/2 xl:w-4/5 text-mono py-5  flex flex-col items-between justify-between lg:flex-row lg:justify-between lg:items-center xl:justify-start">
                                <label
                                    HtmlFor="newQuestion"
                                    className=" w-full text-grotesk font-bold lg:w-1/3 xl:w-1/4 mb-5  lg:mb-0"
                                >
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="p-3 border-solid border-gray-300 w-auto shadow-md w-full lg:w-2/3 xl:w-4/5 rounded-lg"
                                    value={questionInfo.category}
                                    onChange={(e) =>
                                        setQuestionInfo({
                                            ...questionInfo,
                                            category: e.target.value,
                                        })
                                    }
                                >
                                    <option value="About You">About you</option>
                                    <option value="About Your Business">
                                        About Your Business
                                    </option>
                                    <option value="Tell us more">
                                        Tell us more
                                    </option>
                                </select>
                            </div>
                            <div className="  w-1/5 lg:w-1/4 xl:w-1/3 text-mono py-5  flex flex-col items-between justify-between lg:flex-row xl:justify-center lg:items-center">
                                <label
                                    HtmlFor="newQuestion"
                                    className=" w-full  text-grotesk font-bold lg:w-3/4 xl:w-3/6 mb-5 lg:mb-0  xl:mx-2 lg:text-center"
                                >
                                    Category Page
                                </label>
                                <select
                                    id="category"
                                    className="p-3 border-solid border-gray-300 w-auto shadow-md w-full lg:w-1/3 xl:1/6 rounded-lg"
                                    value={questionInfo.categoryPage}
                                    onChange={(e) =>
                                        setQuestionInfo({
                                            ...questionInfo,
                                            categoryPage: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full  text-mono py-5  flex flex-col items-between lg:flex-row lg:items-center justify-between ">
                            {/* Hiding Rank for non founder memebers */}
                            {memberType === 'founder' && (
                                <>
                                    <label
                                        HtmlFor="rank"
                                        className=" lg:w-1/6  mb-5   lg:mb-0  "
                                    >
                                        Rank
                                    </label>

                                    <select
                                        id="rank"
                                        className="p-3  border-solid border-gray-300 w-auto shadow-md lg:w-5/6 rounded-lg"
                                        value={questionInfo.rank}
                                        onChange={(e) =>
                                            setQuestionInfo({
                                                ...questionInfo,
                                                rank: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Not Important - just for info/further context">
                                            Not Important - just for
                                            info/further context
                                        </option>
                                        <option value="Vital - Deal Maker or Breaker">
                                            Vital - Deal Maker or Breaker
                                        </option>
                                        <option value="Very Important - variable is scrutinized">
                                            {' '}
                                            Very Important - variable is
                                            scrutinized{' '}
                                        </option>
                                        <option value="Moderately Important - potentially a determining factor">
                                            Moderately Important - potentially a
                                            determining factor{' '}
                                        </option>
                                    </select>
                                </>
                            )}
                        </div>
                        <div className="w-full lg:w-1/2 xl:w-full  text-mono py-5  flex flex-col items-between justify-between lg:flex-row xl:justify-start xl:items-center">
                            <label
                                HtmlFor="newQuestion"
                                className=" lg:w-1/3 xl:w-1/6 mb-5   lg:mb-0 "
                            >
                                Type of answer
                            </label>
                            <select
                                id="answerType"
                                className="p-3  border-solid border-gray-300 w-auto shadow-md lg:w-2/3 xl:w-3/6 rounded-lg"
                                value={questionInfo.type}
                                onChange={(e) =>
                                    setQuestionInfo({
                                        ...questionInfo,
                                        type: e.target.value,
                                    })
                                }
                            >
                                <option value="open">Open</option>
                                <option value="list">Dropdown list</option>
                                <option value="choice"> Single Choice </option>
                                <option value="multiple">
                                    Multiple selections{' '}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="text-mono py-5 flex flex-col flex-wrap  xl:flex-nowrap lg:flex-row items-center justify-between">
                        {questionInfo.type !== 'open' && (
                            <AddNewAnswer
                                setNewAnswer={setNewAnswer}
                                newAnswer={newAnswer}
                                handleNewAnswer={handleNewAnswer}
                                memberType={memberType}
                            />
                        )}
                    </div>
                    <div className=" flex flex-row w-full items-center justify-center">
                        <button
                            type="button"
                            className="hidden md:flex p-4 bg-white text-fblue rounded-lg "
                            onClick={() => setShowPreview(true)}
                        >
                            {' '}
                            Preview
                        </button>
                        <button
                            type="button"
                            className="p-4 bg-fblue text-white text-grotesk font-bold rounded-lg "
                            onClick={handleSubmit}
                        >
                            {' '}
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            {showPreview && (
                <FormPreview
                    questionInfo={questionInfo}
                    answersList={answersList}
                    setShowPreview={setShowPreview}
                />
            )}
        </div>
    )
}

export default AddQuestionForm
