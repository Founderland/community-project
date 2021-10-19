import { EmojiSadIcon } from "@heroicons/react/outline"
import { useState, useEffect } from "react"
import RowsWidget from "./RowsWidget"
import Pagination from "./Pagination"

const ListWidget = ({ title, data, styles, showing, colSize, link }) => {
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
          {colSize}
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
                <RowsWidget
                  headers={data.header}
                  item={item}
                  styles={styles}
                  link={link}
                />
              ))
            ) : (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td
                  colSpan={data.header.length}
                  className="py-3 px-5 text-left"
                >
                  <div className="flex items-center">
                    <span className="font-medium flex space-x-4 items-center">
                      <EmojiSadIcon className="h-6 w-6" />
                      <p>Nothing to display</p>
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
