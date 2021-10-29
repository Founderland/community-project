import { useState } from "react"

const Tags = ({ tags, setTags }) => {
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
  const regex = /^[\w-]+$/
  const addTag = (value) => {
    setTags([...tags, value])
    setTag("")
  }
  const handleInput = (value) => {
    setTag(value)
    console.log(value)
    if (value) {
      setShowSuggestions(true)
      const list = defaultSuggestions.filter((tag) => tag.includes(value))
      list.unshift(value)
      setSuggestions(list)
    } else {
      setShowSuggestions(false)
    }
  }
  const handleSelect = (value) => {
    console.log(value)
  }
  return (
    <div className="flex">
      <div className="relative flex-grow-0">
        <input
          className=" appearance-none outline-none block  bg-grey-lighter text-grey-darker focus:ring-2 ring-fblue border border-grey-lighter rounded py-3 px-4 mb-3"
          type="text"
          onChange={(e) => {
            handleInput(e.target.value)
          }}
          placeholder="Add a tag"
          value={tag}
        />
        <div
          className={`absolute top-12  bg-white border px-1 ${
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
      <div className="flex-grow p-3 flex flex-wrap justify-start space-x-2">
        {tags.map((tag) => (
          <p className="bg-gray-200 text-gray-600 py-1 px-2 text-xs text-center w-max h-6">
            {tag}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Tags
