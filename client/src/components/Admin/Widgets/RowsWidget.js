import { EyeIcon } from "@heroicons/react/outline"
import { Link, useParams } from "react-router-dom"

const RowsWidget = ({ headers, item, styles, cellAlignment, link }) => {
  const { view } = useParams()
  console.log(link)
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {headers.map((header) => {
        if (header.key !== "-") {
          if (Array.isArray(item[header.key])) {
            return (
              <td className={`py-3 px-5 ${header.style}`}>
                <div className={`flex items-center px-2 ${header.style}`}>
                  <span className="">array</span>
                </div>
              </td>
            )
          } else {
            return (
              <td>
                <div className={`px-2 ${header.style}`}>
                  <span
                    className={
                      styles[item[header.key]?.toLowerCase()]
                        ? styles[item[header.key]?.toLowerCase()]
                        : ""
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
                <Link
                  to={link ? link + item._id : `${view}/id/${item._id}`}
                  className="w-6 flex item-center justify-center transform transition duration-100 hover:text-fblue hover:scale-125"
                >
                  <EyeIcon />
                </Link>
              </div>
            </td>
          )
        }
      })}
    </tr>
  )
}

export default RowsWidget
