import {
  CheckCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { useEffect, useRef, useState } from 'react'

const AnswerList = ({ answersList, setAnswersList, memberType }) => {
  const refArray = useRef([])
  refArray.current = []
  const [updated, setUpdated] = useState({})

  useEffect(() => {
    refArray.current = refArray.current.slice(0, answersList.length)
  }, [answersList])

  const handleAnswerChange = (i) => {
    console.log(i)
    const updatedList = answersList.map((item, index) =>
      index === i ? { ...item, ...updated } : item
    )
    setAnswersList(updatedList)
    toggleEdit(i, true)
    // refArray.current[i].children[3].classList.remove('hidden')
    // refArray.current[i].children[4].classList.add('hidden')
    // refArray.current[i].classList.remove('bg-fblue-light')
    // refArray.current[i].classList.add('group', 'hover:bg-gray-300')
    setUpdated({})
  }

  const handleDelete = (i) => {
    const updatedList = answersList.filter((_, index) => index !== i)
    setAnswersList(updatedList)
  }
  //   const [disable, setDisable] = useState(true)

  function toggleEdit(i, boolean) {
    console.log(refArray.current[i].children)
    Array.from(refArray.current[i].children).forEach((element, index) => {
      if (index <= 2) {
        element.disabled = boolean
      }
      if (boolean === false) {
        element.classList.remove('bg-gray-200')
        element.classList.add('bg-blue-200')
        refArray.current[i].children[3].classList.add('hidden')
        refArray.current[i].children[4].classList.remove('hidden')
        refArray.current[i].classList.add('bg-blue-200')
        refArray.current[i].classList.remove('group', 'hover:bg-gray-300')
      } else {
        element.classList.add('bg-gray-200')
        element.classList.remove('bg-blue-200')
        refArray.current[i].children[3].classList.remove('hidden')
        refArray.current[i].children[4].classList.add('hidden')
        refArray.current[i].classList.remove('bg-blue-200')
        refArray.current[i].classList.add('group', 'hover:bg-gray-300')
      }
    })
  }

  const addToRef = (el) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el)
    }
  }
  console.log(answersList, 'updated')
  console.log(refArray.current, 'test1')
  return (
    <>
      {answersList?.map((answer, i) => {
        return (
          <div
            key={i}
            ref={addToRef}
            className="block text-center md:flex  justify-between items-center w-full bg-gray-200 p-2 group hover:bg-gray-300"
          >
            <input
              type="text"
              className="bg-gray-200 w-full md:w-3/4 group-hover:bg-gray-300"
              placeholder={answer.answer}
              disabled={true}
              onChange={(e) => {
                const value = e.target.value
                  .trimStart()
                  .replace(e.target.value[0], e.target.value[0]?.toUpperCase())
                setUpdated({
                  ...answer,
                  ...updated,
                  answer: value,
                })
              }}
            />
            <input
              type="number"
              className={`bg-gray-200 w-1/2 md:w-1/4 group-hover:bg-gray-300 ${
                memberType !== 'founder' && 'hidden'
              }`}
              disabled={true}
              placeholder={`Score:${answer.points}`}
              onChange={(e) => {
                setUpdated({
                  ...answer,
                  ...updated,
                  points: Number(e.target.value),
                })
              }}
            />
            {/* <label className=" text-grotesk text-center ">Ideal? </label> */}

            <input
              type="checkbox"
              className={`bg-gray-200 w-1/2 md:w-1/4 w-5 h-5  ${
                memberType !== 'founder' && 'hidden'
              }`}
              disabled={true}
              defaultChecked={answer.ideal}
              onChange={(e) => {
                setUpdated({
                  ...answer,
                  ...updated,
                  ideal: !answer.ideal,
                })
              }}
            />
            <button
              className={
                'bg-gray-200 font-3xl w-1/3 md:w-1/4 m-2 group-hover:bg-gray-300 '
              }
              onClick={() => toggleEdit(i, false)}
            >
              <PencilAltIcon className="h-8 w-8 m-auto" />
            </button>
            <button
              className={
                'bg-gray-200 font-3xl w-1/3 md:w-1/4 hidden m-2 group-hover:bg-gray-300'
              }
              onClick={() => {
                handleAnswerChange(i)
              }}
            >
              {' '}
              <CheckCircleIcon className="h-8 w-8 m-auto " />
            </button>
            <button
              className="bg-gray-200 w-1/3 md:w-1/4 m-2 group-hover:bg-gray-300"
              onClick={() => handleDelete(i)}
            >
              <TrashIcon className="h-8 w-8 m-auto" />
            </button>
          </div>
        )
      })}
    </>
  )
}

export default AnswerList
