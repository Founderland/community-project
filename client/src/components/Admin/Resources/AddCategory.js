import axios from "axios"
import { useState, useContext } from "react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { Popover } from "@headlessui/react"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"
import icons from "../../../assets/icons/Icons"

const addCategoryUrl = "/api/resources/addcategory"
const symbolColor = ["fblue", "fred", "fpink", "flime"]

const AddCategory = ({ data }) => {
  const [category, setCategory] = useState({
    categoryName: "",
    categoryKey: "",
    categoryIcon: "affirmative",
    categoryColor: "fblue",
  })
  const [saving, setSaving] = useState(false)

  const [banner, setBanner] = useState({ show: false })
  const { setCModal, config, reload, setReload } = useContext(AdminContext)

  const save = async () => {
    setSaving(true)
    if (!isValidName(category.categoryName)) {
      setSaving(false)
      setBanner({
        error: 1,
        show: true,
        message: `Category name can only contains letters and spaces!`,
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 2000)
    } else {
      try {
        const createCategory = await axios.post(
          addCategoryUrl,
          category,
          config
        )
        if (createCategory.data.success) {
          setSaving(false)
          setBanner({
            success: 1,
            show: true,
            message: `Category added!`,
          })
          setTimeout(() => {
            setReload(reload + 1)
            setCModal(false)
            setBanner((prev) => ({ ...prev, show: false }))
          }, 2000)
        } else {
          throw new Error("Sorry, something went wrong while saving")
        }
      } catch (e) {
        setSaving(false)
        if (e?.response?.status === 403) {
          setBanner({
            error: 1,
            show: true,
            message: "Category already exists",
          })
        } else {
          setBanner({
            error: 1,
            show: true,
            message: e.message,
          })
        }
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
      }
    }
  }
  const isValidName = (name) => {
    return /^[^#_!@#$%^&*(),.?":{}|<>]*$/.test(name) && name !== ""
  }
  return (
    <div className="bg-white px-8 pt-8 pb-4 flex rounded flex-col w-full shadow-lg">
      <div className="w-full flex justify-center items-center">
        <Banner message={banner} />
      </div>
      <div className="flex flex-col justify-center w-full px-3">
        <div className="w-full mb-2 px-2 flex flex-col justify-center items-center">
          <label className="block uppercase tracking-wide text-grey-darker text-md font-bold mb-2">
            Add category
          </label>
          <div className="flex justify-center">
            <div className="px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="categoryIcon"
              >
                Icon
              </label>
              <div
                className={`relative w-40 h-40 md:w-52 md:h-52 rounded-2xl p-2 mb-3 border-2 border-gray-100 transition duration-200 group-hover:border-fblue`}
              >
                <div
                  className={`rounded-full w-36 h-36 md:w-48 md:h-48  flex justify-center items-center`}
                >
                  <p className="text-6xl md:text-8xl text-mono">
                    {icons[category.categoryIcon](
                      `w-36 h-36 md:w-48 md:h-48 text-${category.categoryColor} fill-current`,
                      `${
                        category.categoryColor === "flime"
                          ? "text-black"
                          : "text-white"
                      } fill-current`
                    )}
                  </p>
                </div>
                <Popover className=" group">
                  <Popover.Button className="absolute -bottom-2 outline-none right-0 bg-flime p-1 h-8 w-8 text-center rounded-full cursor-pointer transition duration-200 group-hover:bg-fblue group-hover:text-white">
                    <ChevronDownIcon className="h-6 w-6" />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-20 -bottom-30 right-3 md:right-2 rounded shadow-lg bg-white w-24 h-24 p-2 flex flex-wrap justify-between ">
                    {symbolColor.map((color) => (
                      <span
                        key={color}
                        className={`w-8 h-8 cursor-pointer rounded-full border-2 hover:border-blue-600 bg-${color} ${
                          color === category.categoryColor
                            ? "border-green-600"
                            : "border-white"
                        }`}
                        onClick={(e) =>
                          setCategory((prev) => ({
                            ...prev,
                            categoryColor: color,
                          }))
                        }
                      ></span>
                    ))}
                  </Popover.Panel>
                </Popover>
                <Popover className=" group">
                  <Popover.Button className="absolute -bottom-2 outline-none right-10 bg-flime p-1 h-8 w-8 text-center rounded-full cursor-pointer transition duration-200 group-hover:bg-fblue group-hover:text-white">
                    <ChevronDownIcon className="h-6 w-6" />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-20 -bottom-30 right-8 md:right-10 rounded shadow-xl bg-white w-40 min-h-min p-2 flex flex-wrap justify-center ">
                    {Object.keys(icons).map((icon) => (
                      <span
                        key={icon}
                        className={`w-7 h-7 border-2 hover:border-blue-600 ${
                          icon === category.categoryIcon
                            ? "border-green-600"
                            : "border-white"
                        }`}
                        onClick={(e) =>
                          setCategory((prev) => ({
                            ...prev,
                            categoryIcon: icon,
                          }))
                        }
                      >
                        {icons[icon](
                          `cursor-pointer w-6 h-6 text-black fill-current`,
                          "text-white fill-current"
                        )}
                      </span>
                    ))}
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="categoryName"
            >
              Name
            </label>
            <input
              className={`${
                category.categoryName === ""
                  ? ""
                  : !isValidName(category.categoryName)
                  ? "border-l-4 border-fred"
                  : "border-l-4 border-flime"
              } appearance-none outline-none block w-full border border-grey-lighter py-3 px-4 mb-3`}
              id="categoryName"
              type="text"
              autoComplete="off"
              value={category.categoryName}
              onChange={(e) =>
                setCategory((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                  categoryKey: e.target.value.split(" ").join("").toLowerCase(),
                }))
              }
            />
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
        <button
          className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4"
          onClick={() => {
            setCModal(false)
          }}
        >
          Cancel
        </button>
        <button
          className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
          onClick={save}
        >
          {saving ? (
            <div className="flex justify-center">
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
              ></div>
            </div>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  )
}

export default AddCategory
