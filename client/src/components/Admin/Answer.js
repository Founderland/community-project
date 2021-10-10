import {
  CheckCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { useRef, useState } from 'react'

// element.classList.remove('bg-gray-200')
//         element.classList.add('bg-blue-200')

//         refArray.current[i].classList.add('bg-blue-200')
//         refArray.current[i].classList.remove('group', 'hover:bg-gray-300')
//       } else {
//         element.classList.add('bg-gray-200')
//         element.classList.remove('bg-blue-200')

//         refArray.current[i].classList.remove('bg-blue-200')
//         refArray.current[i].classList.add('group', 'hover:bg-gray-300')

const style = {
  disabledDiv: 'group hover:bg-gray-300',
  disabledInput: 'bg-gray-200 group-hover:bg-gray-300',
  enabledDiv: 'bg-blue-200',
  enabledInput: 'bg-blue-200',
}

const Answer = ({
  memberType,
  answer,
  handleDelete,
  handleAnswerChange,
  i,
}) => {
  const [disabled, setDisabled] = useState(true)
  const [updated, setUpdated] = useState({ ...answer })

  console.log(updated, 'updated')

  return (
    <div
      className={`block text-center md:flex  justify-between items-center w-full bg-gray-200 p-2 ${
        disabled ? style.disabledDiv : style.enabledDiv
      }`}
    >
      <input
        type="text"
        className={`w-full md:w-3/4  ${
          disabled ? style.disabledInput : style.enabledInput
        }`}
        placeholder={updated.answer}
        disabled={disabled}
        onChange={(e) => {
          const value = e.target.value
            .trimStart()
            .replace(e.target.value[0], e.target.value[0]?.toUpperCase())
          setUpdated({
            ...updated,
            answer: value,
          })
        }}
      />
      <input
        type="number"
        className={`w-1/2 md:w-1/4  ${memberType !== 'founder' && 'hidden'} ${
          disabled ? style.disabledInput : style.enabledInput
        }`}
        disabled={disabled}
        placeholder={`Score:${updated.points}`}
        onChange={(e) => {
          setUpdated({
            ...updated,
            points: Number(e.target.value),
          })
        }}
      />

      <input
        type="checkbox"
        className={`w-1/2 md:w-1/4 w-5 h-5  ${
          memberType !== 'founder' && 'hidden'
        }${disabled ? style.disabledInput : style.enabledInput}`}
        disabled={disabled}
        defaultChecked={updated.ideal}
        onChange={() => {
          setUpdated({
            ...updated,
            ideal: !updated.ideal,
          })
        }}
      />
      <button
        className={` font-3xl w-1/3 md:w-auto m-2 p-3  ${
          !disabled && 'hidden'
        }`}
        onClick={() => setDisabled(!disabled)}
      >
        <PencilAltIcon className="h-8 w-8 m-auto" />
      </button>
      <button
        className={`bg-gray-200 font-3xl w-1/3 md:w-auto  ${
          disabled ? style.disabledInput + ' hidden' : style.enabledInput
        } m-2 p-3 group-hover:bg-gray-300`}
        onClick={() => {
          handleAnswerChange(i, updated)
          setDisabled(!disabled)
        }}
      >
        {' '}
        <CheckCircleIcon className="h-8 w-8 m-auto " />
      </button>

      <button
        className={`w-1/3 md:w-auto  m-2 p-3 ${
          disabled ? style.disabledInput : style.enabledInput
        }`}
        onClick={() => handleDelete(updated, i)}
      >
        <TrashIcon className="h-8 w-8 m-auto" />
      </button>
    </div>
  )
}

export default Answer
