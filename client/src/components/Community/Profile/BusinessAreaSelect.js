import { PlusCircleIcon } from "@heroicons/react/outline"
import { useState, useRef } from "react"
import ListOption from "../../Admin/Widgets/ListOption"

let defaultBusinessAreas = [
  { name: "Select the business area", value: "Select the business area" },
  { name: "SaaS/Enterprise Software", value: "SaaS/Enterprise Software" },
  {
    name: "Mobility",
    value: "Mobility",
  },
  {
    name: "Sustainability/Impact investment",
    value: "Sustainability/Impact investment",
  },
  { name: "HealthTech", value: "HealthTech" },
  {
    name: "DTC",
    value: "DTC",
  },
  { name: "E-comm/Marketplaces", value: "E-comm/Marketplaces" },
  { name: "IoT", value: "IoT" },
  {
    name: "FoodTech",
    value: "FoodTech",
  },
  { name: "Gaming/Entertainment", value: "Gaming/Entertainment" },
  { name: "Engineering/DeepTech/AI", value: "Engineering/DeepTech/AI" },
  {
    name: "FinTech",
    value: "FinTech",
  },
  { name: "EdTech", value: "EdTech" },
  { name: "Other", value: "Other" },
]

const formatValue = (value) => {
  const newValue = value.trimStart()
  return newValue.replace(value[0], value[0]?.toUpperCase())
}

const BusinessAreaSelect = ({ profile, setProfile }) => {
  const [businessAreas, setbusinessAreas] = useState([...defaultBusinessAreas])
  const inputRef = useRef(null)

  // check if the value entered by the user is included in the object list
  const isSelectionIncluded = (object) => {
    return Object.values(object).some(
      (item) => item.name === profile.businessArea
    )
  }

  const addNewField = (inputRef) => {
    setbusinessAreas([
      ...businessAreas,
      {
        name: formatValue(inputRef.current.value),
        value: formatValue(inputRef.current.value),
      },
    ])
    setProfile({
      ...profile,
      businessArea: formatValue(inputRef.current.value),
    })
  }

  return (
    <div className="relative">
      <ListOption
        options={businessAreas}
        required={true}
        color={" bg-sky-50 "}
        choice={
          isSelectionIncluded(businessAreas)
            ? profile.businessArea || "Select your business area"
            : "Other"
        }
        setChoice={(value) => {
          setProfile({
            ...profile,
            businessArea: value,
          })
        }}
      />
      <div
        className={
          profile.businessArea === "Other" ||
          !isSelectionIncluded(businessAreas)
            ? "w-full py-2 absolute "
            : "hidden"
        }
      >
        {(profile.businessArea === "Other" ||
          !isSelectionIncluded(businessAreas)) && (
          <input
            ref={inputRef}
            type="text"
            // placeholder='Enter your business area'
            defaultValue={
              isSelectionIncluded(businessAreas) ? null : profile.businessArea
            }
            className="w-full text-sm appearance-none bg-grey-50 text-grey-500 border p-2 outline-none absolute "
            onChange={""}
          />
        )}
        <button
          type="button"
          className=" absolute right-0 top-2 p-2 "
          onClick={() => addNewField(inputRef)}
        >
          <PlusCircleIcon className="w-6 h-6 hover:text-flime-900" />
        </button>
      </div>
    </div>
  )
}

export default BusinessAreaSelect
