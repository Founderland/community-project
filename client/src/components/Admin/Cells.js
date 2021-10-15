import { useContext, useEffect } from "react"
import AdminContext from "../../contexts/Admin"

const Cells = ({
  data,
  item,
  styles,
  cellAlignment,
  button1,
  button2,
  setShowList,
}) => {
  const { setSelectedItem } = useContext(AdminContext)

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-100'>
      {data.header.map((header) => {
        if (header.key !== "-") {
          if (Array.isArray(item[header.key])) {
            return (
              <td className={`py-3 px-5 ${header.style}`}>
                <div className={`flex items-center px-2 ${cellAlignment}`}>
                  <span className=''>array</span>
                </div>
              </td>
            )
          } else {
            return (
              <td className={` ${header.style}`}>
                <div className={`flex items-center px-2 ${cellAlignment}`}>
                  <span
                    className={
                      styles[item[header.key]?.toLowerCase()]
                        ? styles[item[header.key]?.toLowerCase()]
                        : ""
                    }>
                    {item[header.key]}
                  </span>
                </div>
              </td>
            )
          }
        } else {
          return (
            <td className='py-3 px-3 text-center'>
              <div className='flex justify-center'>
                <button
                  onClick={() => {
                    setSelectedItem(item)
                    setShowList()
                  }}
                  className='w-6 flex item-center justify-center transform transition duration-100 hover:text-fblue hover:scale-125'>
                  {button1}
                </button>
                <button
                  className={
                    button2
                      ? `w-6 flex item-center justify-center transform transition duration-100 hover:text-fblue hover:scale-125`
                      : "hidden"
                  }>
                  {button2}
                </button>
              </div>
            </td>
          )
        }
      })}
    </tr>
  )
}

export default Cells
