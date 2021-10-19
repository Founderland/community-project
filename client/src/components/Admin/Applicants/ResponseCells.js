import { EyeIcon, PencilAltIcon } from "@heroicons/react/outline"
import { useContext } from "react"
import { AnswersContext } from "../../../contexts/AnswersProvider"

const ResponseCells = ({ data, item, styles, cellAlignment }) => {
  const { buttonClicked, viewIdHandler } = useContext(AnswersContext)

  const clickHandler = () => {
    buttonClicked(true)
    viewIdHandler(item)
  }

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        {data.header.map((header) => {
          if (header.key !== "-") {
            if (Array.isArray(item[header.key])) {
              return (
                <td className={`py-3 px-5 ${header.style}`}>
                  <div className={`flex items-center px-2 ${cellAlignment}`}>
                    <span className="">array</span>
                  </div>
                </td>
              )
            } else {
              return (
                <td className={` ${header.style}`}>
                  <div className={`flex items-center px-2 ${cellAlignment}`}>
                    {/* {console.log(item[header.key])} */}
                    <span
                      className={
                        typeof item[header.key] == "string" &&
                        (styles[item[header.key]?.toLowerCase()]
                          ? styles[item[header.key]?.toLowerCase()]
                          : "")
                      }
                    >
                      {item[header.key]}
                    </span>
                  </div>
                </td>
              )
            }
          } else {
            return (
              <td className="py-3 px-3 text-center">
                <div className="flex justify-center">
                  <button
                    onClick={clickHandler}
                    className="w-6 flex item-center justify-center transform transition duration-100 hover:text-fblue hover:scale-125"
                  >
                    <PencilAltIcon className="w-4" />
                  </button>
                  <button className="w-6 flex item-center justify-center transform transition duration-100 hover:text-fblue hover:scale-125">
                    <EyeIcon className="w-4" />
                  </button>
                </div>
              </td>
            )
          }
        })}
      </tr>
    </>
  )
}

export default ResponseCells
