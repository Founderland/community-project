import SelectAnswer from './SelectAnswer'
import { AnswersContext } from '../../contexts/AnswersProvider'

import { useContext, useEffect, useState } from 'react'

const Answers = ({ type, answers, questionId }) => {
    const [answerData, setAnswerData] = useState({})

    const { submit, answerHandler } = useContext(AnswersContext)

    useEffect(() => {
        if (submit) {
            answerHandler(answerData)
        }
    }, [submit])

    const selectedAnswer = (answer) => {
        console.log(answer)
    }

    return (
        <div className="">
            {type === 'open' ? (
                <input
                    type="text"
                    className="flex-1 appearance-none border border-gray-300 w-11/12 md:w-3/5 mt-1 xl:mt-3 px-2 py-1 md:py-2 md:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fblue-light focus:border-transparent"
                    name="firstname"
                    placeholder="Your answer"
                    id={answers[0]?._id}
                    onChange={(e) =>
                        setAnswerData({ id: questionId, value: e.target.value })
                    }
                />
            ) : (
                // <div class="relative inline-flex">
                //   <svg
                //     class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                //     xmlns="http://www.w3.org/2000/svg"
                //     viewBox="0 0 412 232"
                //   >
                //     <path
                //       d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                //       fill="#648299"
                //       fill-rule="nonzero"
                //     />
                //   </svg>
                //   <select class="border border-gray-300  text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-60 md:w-80">
                //     {answers.map((answer) => (
                //       <option className="text-xs md:text-md lg:text-lg ">{answer.answer}</option>
                //     ))}
                //   </select>
                // </div>

                <SelectAnswer
                    answers={answers}
                    selectedAnswer={selectedAnswer}
                />
            )}
        </div>
    )
}

export default Answers

// {
//   {answers.map((answer) => (
//              <div className="flex m-2 ">
//                <input
//                  type="radio"
//                  className="m-2"
//                  id={answer._id}
//                  name="fav_language"
//                  value={answer.answer}
//                />
//                {answer.answer !== "open" && (
//                  <>
//                    <label for="html"> {answer.answer}</label>
//                  </>
//                )}
//                {answer.answer === "open" && (
//                  <input
//                    type="text"
//                    id={answer._id}
//                    className="p-1"
//                    name={answer.answer}
//                    placeholder="open"
//                    onChange={(e) => console.log(e.target.id)}
//                  />
//                )}
//              </div>
//            ))}
// }

// {
//   /<div class=" relative ">
//     <label for="name-with-label" class="text-gray-700">
//         Email
//     </label>
//     <input type="text" id="name-with-label" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="email" placeholder="Your name"/>
//     </div>
// }
