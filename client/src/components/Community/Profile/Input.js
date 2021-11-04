import { PencilIcon } from "@heroicons/react/outline"

const Input = ({
  value,
  label,
  disableEdit,
  profile,
  setProfile,
  format,
  isLink,
}) => {
  const formatValue = (value) => {
    const newValue = value.trimStart()
    return format
      ? newValue.replace(value[0], value[0]?.toUpperCase())
      : newValue
  }

  const getLinkstyle = (value) => {
    const isLink = (link) => {
      return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(
        link
      )
    }
    if (disableEdit) return null
    if (value) {
      return isLink(value)
        ? "border-l-4 border-flime"
        : "border-l-4 border-fred"
    } else {
      return "border-l-4 border-gray"
    }
  }

  return (
    <>
      <label className='p-2 uppercase text-xs font-bold text-gray-400 flex items-center  '>
        {label}
        {!disableEdit && <PencilIcon className='w-4 h-4 ml-2 text-black ' />}
      </label>

      <input
        disabled={disableEdit}
        onChange={(e) =>
          setProfile({
            ...profile,
            [value]: formatValue(e.target.value),
          })
        }
        className={`p-2 my-1 md:my-0 text-base outline-none ${
          isLink && getLinkstyle(profile[value])
        } ${disableEdit ? "bg-white " : "bg-sky-50"}`}
        value={profile[value]}
      />
    </>
  )
}

export default Input
