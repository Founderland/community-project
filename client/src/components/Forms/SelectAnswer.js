import React, { useEffect, useRef, useState, useCallback } from "react"
// import { AnswersContext } from "../../contexts/AnswersProvider"

export default function SelectAnswer({
  answers,
  selectedAnswer,
  selectValidation,
}) {
  const [showList, setShowList] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")
  const panelResultElement = useRef()
  const selectButton = useRef()

  // const { next } = useContext(AnswersContext)

  const handleClickOutside = useCallback((event) => {
    const myHTMLWrapper = panelResultElement.current
    const searchElement = selectButton.current
    if (
      myHTMLWrapper &&
      searchElement &&
      !myHTMLWrapper.contains(event.target) &&
      !searchElement.contains(event.target)
    ) {
      setShowList(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  const itemClicked = (item, index) => {
    setSelectedItem(item.answer)
    setShowList(!showList)
    selectedAnswer(item.answer, item._id, item.points)
  }

  const listItem = (item, index) => (
    <li
      key={item + index}
      id="listbox-item-0"
      role="option"
      aria-selected
      onClick={() => itemClicked(item, index)}
      className=" text-sm md:text-base 2xl:text-xl text-gray-900 cursor-default hover:bg-fblue hover:text-white select-none relative py-2 pl-3 pr-9 border-gray-300 border-b"
    >
      <div className="flex items-center ">
        <span className="ml-3 block  text-sm md:text-base 2xl:text-xl  break-word">
          {item.answer}
        </span>
      </div>
    </li>
  )
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-11/12 md:w-4/5">
        <button
          type="button"
          ref={selectButton}
          onClick={() => setShowList(!showList)}
          className={
            "z-40 relative w-full bg-white border-2 pl-2 pr-10 py-2 md:py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-fblue focus:border-fblue text-base md:text-base 2xl:text-xl " +
            (selectValidation ? "border-gray" : "border-fred")
          }
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate text-base md:text-base 2xl:text-xl">
              {selectedItem ? selectedItem : "Select Item"}
            </span>
          </span>

          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {showList && (
          <div
            ref={panelResultElement}
            className="absolute w-full z-50 bg-white shadow-lg"
          >
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className=" max-h-56 py-1 text-xs ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm md:text-md xl:text-lg"
            >
              {answers.map((item, index) => listItem(item, index))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-11/12 md:w-4/5">
        {selectedItem === "Other" && (
          <input
            type="text"
            className="mt-4 flex-1 text-sm md:text-base 2xl:text-xl appearance-none border border-gray-300 w-11/12 md:w-4/5 px-2 py-2 md:py-4 md:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-fblue-light focus:border-transparent"
            name="firstname"
            placeholder="Type your answer... "
            id={answers[0]._id}
          />
        )}
      </div>
    </div>
  )
}
