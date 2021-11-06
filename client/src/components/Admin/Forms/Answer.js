import {
  CheckCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline"
import { useState, useRef } from "react"

const style = {
  disabledDiv: "group hover:bg-gray-300",
  disabledInput: "bg-gray-200 group-hover:bg-gray-300 placeholder-gray-500",
  enabledDiv: "bg-blue-200 ",
  enabledInput: "bg-blue-200 placeholder-gray-500",
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
  const answerInput = useRef()
  return (
    <div
      className={`flex flex-col xl:flex-row text-center justify-between items-center w-full bg-gray-200 py-3 px-5 ${
        disabled ? style.disabledDiv : style.enabledDiv
      }`}
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <label className="lg:mx-3 md:1/4 font-bold">Answer</label>
        <input
          type="text"
          className={`w-full p-2  ${
            disabled ? style.disabledInput : style.enabledInput
          }`}
          defaultValue={updated.answer}
          disabled={disabled}
          ref={answerInput}
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
      </div>
      <div
        className={`w-full flex flex-wrap md:flex-nowrap items-center  ${
          memberType !== "founder"
            ? "justify-center lg:justify-end"
            : "justify-between "
        }`}
      >
        <label
          className={`my-2 lg:mx-3 font-bold ' ${
            memberType !== "founder" && "hidden"
          }`}
        >
          Score:
        </label>
        <input
          type="number"
          className={`w-1/4 lg:w-1/4 my-2  ${
            memberType !== "founder" && "hidden"
          } ${disabled ? style.disabledInput : style.enabledInput}`}
          disabled={disabled}
          defaultValue={updated.points}
          onChange={(e) => {
            setUpdated({
              ...updated,
              points: Number(e.target.value),
            })
          }}
        />
        <label
          className={`my-2 lg:mx-3 ${memberType !== "founder" && "hidden"}`}
        >
          Ideal
        </label>
        <input
          type="checkbox"
          className={`w-1/4 lg:w-1/4 xl:w-1/6 w-5 h-5 my-2  ${
            memberType !== "founder" && "hidden"
          } ${disabled ? style.disabledInput : style.enabledInput}`}
          disabled={disabled}
          defaultChecked={updated.ideal}
          onChange={() => {
            setUpdated({
              ...updated,
              ideal: !updated.ideal,
            })
          }}
        />
        {/* </div>
      <div> */}
        <button
          className={` font-3xl w-1/3 md:w-auto mx-2 p-3  ${
            !disabled && "hidden"
          }`}
          onClick={() => {
            setDisabled(!disabled)
            setTimeout(() => {
              answerInput.current.focus()
            }, 0)
          }}
        >
          <PencilAltIcon className="h-8 w-8 m-auto" />
        </button>
        <button
          className={` w-1/3 md:w-auto mx-2 p-3 ${
            disabled ? style.disabledInput + " hidden" : style.enabledInput
          } `}
          onClick={() => {
            handleAnswerChange(i, updated)
            setDisabled(!disabled)
          }}
        >
          {" "}
          <CheckCircleIcon className="h-8 w-8 m-auto " />
        </button>

        <button
          className={`w-1/3 md:w-auto  mx-2 p-3 ${
            disabled ? style.disabledInput : style.enabledInput
          }`}
          onClick={() => handleDelete(i)}
        >
          <TrashIcon className="h-8 w-8 m-auto" />
        </button>
      </div>
    </div>
  )
}

export default Answer
