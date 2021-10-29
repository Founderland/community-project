import { useState } from "react"

const Tags = ({ tags, setTags }) => {
  const [tag, setTag] = useState("")
  const regex = /^[\w-]+$/
  const onPaste = (value) => {
    const result = value
      .replace(/[^\w,;\s]+/g, ",")
      .replace(/\s+/g, "-")
      .replace(/[,;]{2,}/g, ",")
    return result.split(/,+/)
  }
  return (
    <div className="flex">
      <div className="relative flex-grow-0">
        <input
          className="appearance-none outline-none block  bg-grey-lighter text-grey-darker focus:ring-2 ring-fblue border border-grey-lighter rounded py-3 px-4 mb-3"
          type="text"
          onChange={(e) => {
            setTag(e.target.value)
          }}
          placeholder="Add a tag"
          value={tag}
        />
        <div className="absolute bg-white border px-2 py-1">
          test autocomplete
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
