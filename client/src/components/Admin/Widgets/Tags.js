import { XIcon } from "@heroicons/react/outline"
import { useState } from "react"

const Tags = ({ tags, pushTag, popTag }) => {
  const defaultSuggestions = [
    "health",
    "food",
    "education",
    "finance",
    "sport",
    "conference",
    "fundraiser",
    "masterclass",
  ]

  const [tag, setTag] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState(defaultSuggestions)
  const handleInput = (value) => {
    setTag(value)
    if (value) {
      setShowSuggestions(true)
      const regex = new RegExp("^" + value, "g")
      const list = defaultSuggestions.filter((tag) => tag.match(regex))
      if (!list.includes(value)) list.unshift(value)
      setSuggestions(list)
    } else {
      setShowSuggestions(false)
    }
  }
  const handleSelect = (value) => {
    pushTag(value)
    setTag("")
    setShowSuggestions(false)
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex items-center relative flex-grow-0">
        <input
          className="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker focus:ring-2 ring-fblue border border-grey-lighter py-3 px-4 mb-3"
          type="text"
          onChange={(e) => {
            handleInput(e.target.value)
          }}
          placeholder="Add a tag"
          value={tag}
        />
        <div
          className={`absolute top-12 z-20 bg-white border px-1 ${
            showSuggestions ? "" : "hidden"
          }`}
        >
          {suggestions.map((tag) => (
            <div
              className="w-full p-1"
              onClick={(e) => {
                handleSelect(tag)
              }}
            >
              <p className="p-1 text-sm">{tag}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow p-1 flex flex-wrap ">
        {tags.map((tag) => (
          <div
            className="flex items-center space-x-2 w-max h-6 bg-gray-200 text-gray-600 py-1 pl-2 pr-1 m-1 text-center"
            onClick={() => popTag(tag)}
          >
            <p className=" text-xs">{tag}</p>
            <XIcon className="text-black font-bold h-3" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tags
