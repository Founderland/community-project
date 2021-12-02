import {
  EmojiSadIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/outline"
import { useState, useEffect, useContext } from "react"
import RowsWidget from "./RowsWidget"
import Pagination from "./Pagination"
import AdminContext from "../../../contexts/Admin"
import { useParams } from "react-router"

const ListWidget = ({
  title,
  data,
  styles,
  showing,
  colSize,
  link,
  filter,
  setFilter,
}) => {
  const [offset, setOffset] = useState(0)
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [perPage] = useState(showing)
  const [pageCount, setPageCount] = useState(0)
  const { view } = useParams()
  const { selectedTab } = useContext(AdminContext)
  useEffect(() => {
    let newFilter = [...filter]
    newFilter.forEach((item) => (item.show = false))
    setFilter(newFilter)
  }, [selectedTab])
  useEffect(() => {
    const slice = data.data.slice(offset * perPage, offset * perPage + perPage)
    setDataToDisplay(slice)
    setPageCount(Math.ceil(data?.data.length / perPage))
    return () => {
      setDataToDisplay([])
    }
  }, [data, offset])

  return (
    <div className="relative h-full flex-none flex flex-col w-full overflow-hidden px-2 pb-12">
      <p className="text-mono">{title}</p>
      <div className="sticky z-20 bg-white w-full text-mono flex space-x-2 pl-2 py-2 items-center">
        {filter.filter((filter) => filter.search !== "").length > 0 && (
          <SearchIcon className="flex-none h-4 w-4 md:h-6 md:w-6 text-gray-800" />
        )}
        {filter?.map((item, index) =>
          item.search.length ? (
            <div
              key={item.key}
              className={`bg-green-700 text-flime group flex items-center space-x-2 w-max h-6 py-1 px-2 m-1 text-center cursor-pointer`}
              onClick={() => {
                let newFilter = [...filter]
                newFilter[index].search = ""
                newFilter.forEach((item) => (item.show = false))
                setFilter(newFilter)
              }}
            >
              <p className="uppercase text-xs">
                {item.key}
                {item.type === "text" ? ":" : ">="}
              </p>
              <p className=" text-xs">{item.search}</p>
              <XIcon className="group-hover:text-red-500 text-black font-bold h-3" />
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <div className="bg-white shadow-md my-4 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-fblue">
        <table className="min-w-max w-full table-auto">
          {colSize}
          <thead>
            <tr className=" bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {data.header?.map((header, index) => (
                <th
                  key={header.title + index}
                  className={`py-2 ${header.style}`}
                >
                  <div className="flex relative items-center justify-center space-x-4">
                    <p>{header.title}</p>
                    {view !== "dashboard" &&
                      header.key !== "-" &&
                      !header.key?.includes("On") && (
                        <>
                          <button
                            className={`group p-1`}
                            onClick={() => {
                              let newFilter = [...filter]
                              newFilter.forEach((item) =>
                                item.key === header.key
                                  ? (item.show = !item.show)
                                  : (item.show = false)
                              )
                              setFilter(newFilter)
                            }}
                          >
                            <FilterIcon className="h-4 w-4 group-hover:text-fblue" />
                          </button>
                          <div
                            className={`absolute z-20 top-6 shadow-xl p-1 ${
                              filter[index]?.show ? "block" : "hidden"
                            } bg-white`}
                          >
                            <input
                              type="text"
                              className="w-20 border border-gray-400 p-1"
                              onChange={(e) => {
                                let newFilter = [...filter]
                                newFilter[index].search = e.target.value
                                setFilter(newFilter)
                              }}
                              value={filter[index]?.search}
                            />
                          </div>
                        </>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
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
                  colSpan={data.header?.length}
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
