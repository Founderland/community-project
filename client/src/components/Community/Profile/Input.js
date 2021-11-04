import { PencilIcon } from "@heroicons/react/outline"

const Input = ({ value, label, disableEdit, profile, setProfile, format }) => {
  const formatValue = (value) => {
    const newValue = value.trimStart()
    return format
      ? newValue.replace(value[0], value[0]?.toUpperCase())
      : newValue
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
        className={`p-2 text-base ${disableEdit ? "bg-white " : "bg-sky-50"}`}
        value={profile[value]}
      />
    </>
  )
}

export default Input
