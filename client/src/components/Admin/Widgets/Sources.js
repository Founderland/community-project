import { PlusCircleIcon, XIcon } from "@heroicons/react/outline"
import { useState } from "react"

const Sources = ({ sources, pushSource, popSource, isLink }) => {
  const [source, setSource] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const handleInput = (value) => {
    setSource(value)
    if (value) {
      setShowSuggestions(true)
      const list = [value]
      setSuggestions(list)
    } else {
      setShowSuggestions(false)
    }
  }
  const handleSelect = (value) => {
    pushSource(value)
    setSource("")
    setShowSuggestions(false)
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center relative w-1/2">
        <input
          type="text"
          onChange={(e) => {
            handleInput(e.target.value)
          }}
          placeholder="Add a source"
          value={source}
          className={`${
            source === ""
              ? ""
              : !isLink(source)
              ? "border-l-4 border-fred"
              : "border-l-4 border-flime"
          } appearance-none outline-none block w-full bg-grey-lighter border border-grey-lighter py-3 px-4 mb-3`}
        />
        <div
          className={`absolute top-12 z-20 bg-white border px-1 ${
            showSuggestions && isLink(source) ? "" : "hidden"
          }`}
        >
          {suggestions.map((source) => (
            <div
              className="group w-full p-1 flex items-center space-x-2 hover:text-green-500 cursor-pointer"
              onClick={(e) => {
                handleSelect(source)
              }}
            >
              <p className="p-1 text-sm">{source}</p>
              <PlusCircleIcon className="h-4 group-hover:text-green-500" />
            </div>
          ))}
        </div>
      </div>
      <div className=" p-1 flex flex-wrap ">
        {sources.map((source) => (
          <div
            className=" group flex items-center space-x-2 w-max h-6 bg-gray-200 text-gray-600 py-1 pl-2 pr-1 m-1 text-center cursor-pointer"
            onClick={() => popSource(source)}
          >
            <p className=" text-xs">{source}</p>
            <XIcon className="group-hover:text-red-500 text-black font-bold h-3" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sources
