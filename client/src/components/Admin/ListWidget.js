import { PencilAltIcon, EyeIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

const styles = {
  new: 'bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs',
  pending: 'bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs',
  reviewed: 'bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs',
  founder:
    'bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs',
  investor: 'bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs',
  ally: 'bg-flime bg-opacity-50 text-green-900 py-1 px-3 rounded-full text-xs',
  sadmin: 'border-fred',
  admin: 'border-fblue',
  user: 'border-fpink',
}

const ListWidget = ({ title, data }) => {
  const [offset, setOffset] = useState(0)
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [perPage] = useState(2)
  const [pageCount, setPageCount] = useState(0)
  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(selectedPage)
  }
  const getData = async () => {
    const slice = data.data.slice(offset * perPage, offset * perPage + perPage)
    console.log(slice)
    setDataToDisplay(slice)
    setPageCount(Math.ceil(data.data.length / perPage))
  }
  useEffect(() => {
    getData()
  }, [offset])
  return (
    <div className="w-full px-2">
      <p className="text-mono">{title}</p>
      <div className="bg-white shadow-md my-4">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {data.header.map((header) => (
                <th key={header.title} className={`py-3 px-6 ${header.style}`}>
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataToDisplay.length ? (
              dataToDisplay.map((item) => {
                const cells = data.header.map((header) => {
                  if (header.key !== '-') {
                    console.log(header.key)
                    if (Array.isArray(item[header.key])) {
                      return (
                        <td className="">
                          <div className={`py-3 px-6 ${header.style}`}>
                            <span className="">array</span>
                          </div>
                        </td>
                      )
                    } else {
                      return (
                        <td className={`py-3 px-6 ${header.style}`}>
                          <div className="flex items-center justify-center">
                            <span
                              className={
                                styles[item[header.key].toLowerCase()]
                                  ? styles[item[header.key].toLowerCase()]
                                  : 'text-mono'
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
                      <td className="py-3 px-6 text-center">
                        <div className="flex justify-center">
                          <button className="w-6 flex item-center justify-center transform transition duration-100 hover:text-fblue hover:scale-125">
                            <PencilAltIcon className="w-4" />
                          </button>
                          <button className="w-6 flex item-center justify-center transform transition duration-100 hover:text-fblue hover:scale-125">
                            <EyeIcon className="w-4" />
                          </button>
                        </div>
                      </td>
                    )
                  }
                })
                return (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    {cells}
                  </tr>
                )
              })
            ) : (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td
                  colspan={data.header.length}
                  className="py-3 px-6 text-left"
                >
                  <div className="flex items-center">
                    <span className="font-medium">
                      There are no {title} to display
                    </span>
                  </div>
                </td>
              </tr>
            )}
            {data.data.length > perPage && (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td colspan={data.header.length}>
                  <div className="flex items-center justify-center">
                    <ReactPaginate
                      previousLabel={'<'}
                      previousClassName={
                        'w-8 mr-1 flex justify-center items-center cursor-pointer text-lg'
                      }
                      previousLinkClassName={'outline-none hover:text-fblue'}
                      nextLabel={'>'}
                      nextClassName={
                        'w-8 mr-1 flex justify-center items-center cursor-pointer text-lg'
                      }
                      nextLinkClassName={'outline-none hover:text-fblue'}
                      breakLabel={'...'}
                      breakClassName={
                        'w-8 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-transparent'
                      }
                      disabledClassName={'text-gray-100'}
                      pageCount={pageCount}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={4}
                      onPageChange={handlePageClick}
                      containerClassName={
                        'my-1 flex py-1 list-none outline-none text-mono'
                      }
                      pageClassName={
                        'w-8 px-1 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-100 ease-in border-t-2 border-transparent hover:border-fred'
                      }
                      pageLinkClassName={'outline-none'}
                      activeClassName={
                        'w-8 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-100 ease-in border-t-2 border-fblue'
                      }
                      activeLinkClassName={'outline-none'}
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListWidget
