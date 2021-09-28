import { PencilAltIcon, EyeIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

const styles = {
    new: 'bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs',
    pending: 'bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs',
    reviewed: 'bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs',
    founder:
        'bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs',
    investor:
        'bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs',
    ally: 'bg-flime bg-opacity-50 text-green-900 py-1 px-3 rounded-full text-xs',
    admin: 'border-fblue',
    user: 'border-fpink',
}

const ListWidget = ({ title, data }) => {
    const [offset, setOffset] = useState(0)
    const [dataToDisplay, setDataToDisplay] = useState([])
    const [perPage] = useState(10)
    const [pageCount, setPageCount] = useState(0)
    const handlePageClick = (e) => {
        const selectedPage = e.selected
        setOffset(selectedPage)
    }
    const getData = async () => {
        const slice = data.data.slice(
            offset * perPage,
            offset * perPage + perPage
        )
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
                                <th className={`py-3 px-6 ${header.style}`}>
                                    {header.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {dataToDisplay.length ? (
                            dataToDisplay.map((item) => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span
                                                className={
                                                    styles[
                                                        item.role.toLowerCase()
                                                    ]
                                                }
                                            >
                                                {item.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center">
                                            <span>{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center sm:block hidden">
                                        {item.reviews.length ? (
                                            <div className="flex items-center justify-center">
                                                {item.reviews.map((review) => (
                                                    <img
                                                        className={`w-6 h-6 -ml-1 rounded-full border ${
                                                            styles[review.role]
                                                        } transform transition duration-150 hover:scale-150`}
                                                        src={review.avatar_url}
                                                        alt={review.name}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <span
                                            className={
                                                styles[
                                                    item.status.toLowerCase()
                                                ]
                                            }
                                        >
                                            {item.status}
                                        </span>
                                    </td>
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
                                </tr>
                            ))
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
                                            nextLabel={'>'}
                                            breakLabel={'...'}
                                            breakClassName={'px-1'}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={4}
                                            onPageChange={handlePageClick}
                                            containerClassName={
                                                'my-1 flex py-2 list-none outline-none'
                                            }
                                            subContainerClassName={
                                                'pages pagination'
                                            }
                                            pageClassName={'px-2'}
                                            pageLinkClassName={'outline-none'}
                                            activeClassName={
                                                'text-fblue font-bold outline-none appearance-none'
                                            }
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
