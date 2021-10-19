import { useState, useEffect } from "react"
import Cells from "./Cells"
import Pagination from "./Pagination"

const styles = {
  new: "bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs",
  pending: "bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs",
  reviewed: "bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs",
  founder:
    "bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs",
  investor: "bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs",
  ally: "bg-flime bg-opacity-50 py-1 px-3 rounded-full text-xs",
  sadmin: "bg-fred bg-opacity-50 py-1 px-3 rounded-full text-xs",
  admin: "bg-fblue bg-opacity-50 py-1 px-3 rounded-full text-xs",
  user: "bg-fpink bg-opacity-50 py-1 px-3 rounded-full text-xs",
}

const ListWidget = ({
  title,
  data,
  showing,
  colSize,
  cellAlignment,
  button1,
  button2,
  setShowList,
}) => {
  const [offset, setOffset] = useState(0)
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [perPage] = useState(showing)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const slice = data.data.slice(offset * perPage, offset * perPage + perPage)
    setDataToDisplay(slice)
    setPageCount(Math.ceil(data.data.length / perPage))

    return () => {
      setDataToDisplay([])
    }
  }, [data, offset, perPage])

  return (
    <div className="w-full px-2 ">
      <p className="text-mono">{title}</p>
      <div className="bg-white shadow-md my-4 overflow-auto">
        <table className="min-w-max w-full table-auto">
          {colSize && colSize}
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {data.header.map((header) => (
                <th key={header.title} className={`py-3 px-4 ${header.style}`}>
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light text-lg">
            {dataToDisplay?.length ? (
              dataToDisplay.map((item) => (
                <Cells
                  data={data}
                  item={item}
                  styles={styles}
                  cellAlignment={cellAlignment}
                  button1={button1}
                  button2={button2 || null}
                  setShowList={setShowList}
                />
              ))
            ) : (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td
                  colSpan={data.header.length}
                  className="py-3 px-5 text-left"
                >
                  <div className="flex items-center">
                    <span className="font-medium">
                      There are no {title} to display
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {data.data.length > perPage && (
          <div className="border-b min-w-max w-full border-gray-200">
            <div className="flex items-center justify-center">
              <Pagination
                setPage={setOffset}
                currentPage={offset}
                pageCount={pageCount}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListWidget
