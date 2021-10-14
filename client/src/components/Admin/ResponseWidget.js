import { PencilAltIcon, EyeIcon } from "@heroicons/react/outline"
import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import Cells from "./Cells"
import ResponseCells from "./ResponseCells"

const styles = {
  new: "bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs",
  pending: "bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs",
  reviewed: "bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs",
  founder: "bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs",
  investor: "bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs",
  ally: "bg-flime bg-opacity-50 py-1 px-3 rounded-full text-xs",
  sadmin: "bg-fred bg-opacity-50 py-1 px-3 rounded-full text-xs",
  admin: "bg-fblue bg-opacity-50 py-1 px-3 rounded-full text-xs",
  user: "bg-fpink bg-opacity-50 py-1 px-3 rounded-full text-xs",
}

const ResponseWidget = ({ title, data, showing, colSize, cellAlignment }) => {
  const [offset, setOffset] = useState(0)
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [perPage] = useState(showing)
  const [pageCount, setPageCount] = useState(0)
  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(selectedPage)
  }

  useEffect(() => {
    const slice = data.data.slice(offset * perPage, offset * perPage + perPage)
    setDataToDisplay(slice)
    console.log(slice)
    setPageCount(Math.ceil(data.data.length / perPage))

    return () => {
      setDataToDisplay([])
    }
  }, [data, offset])

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
                <ResponseCells
                  data={data}
                  item={item}
                  styles={styles}
                  cellAlignment={cellAlignment}
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
              <ReactPaginate
                previousLabel={"<"}
                previousClassName={
                  "w-8 mr-1 flex justify-center items-center cursor-pointer text-lg"
                }
                previousLinkClassName={"outline-none hover:text-fblue"}
                nextLabel={">"}
                nextClassName={
                  "w-8 mr-1 flex justify-center items-center cursor-pointer text-lg"
                }
                nextLinkClassName={"outline-none hover:text-fblue"}
                breakLabel={"..."}
                breakClassName={
                  "w-8 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-transparent"
                }
                disabledClassName={"text-gray-100"}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={4}
                onPageChange={handlePageClick}
                containerClassName={
                  "my-1 flex py-1 list-none outline-none text-mono"
                }
                pageClassName={
                  "w-8 px-1 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-100 ease-in border-t-2 border-transparent hover:border-fred"
                }
                pageLinkClassName={"outline-none"}
                activeClassName={
                  "w-8 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-100 ease-in border-t-2 border-fblue"
                }
                activeLinkClassName={"outline-none"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResponseWidget
