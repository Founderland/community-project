import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline"
const Pagination = ({ pageCount, currentPage, setPage }) => {
  //max 5 pages
  const getPagination = () => {
    const pageLimit = pageCount > 5 ? 5 : pageCount
    //create an array of numbers to display page buttons, max of 5 with start on current page
    let start = Math.floor(currentPage / pageLimit) * pageLimit
    return new Array(pageLimit)
      .fill()
      .map((item, i) => (start + 1 + i <= pageCount ? start + 1 + i : null))
  }
  const previous = currentPage + 1 === 1 ? false : true
  const handlePrevious = () => {
    if (currentPage + 1 !== 1) setPage(currentPage - 1)
  }
  const next = currentPage + 1 === pageCount ? false : true
  const handleNext = () => {
    if (currentPage + 1 !== pageCount) setPage(currentPage + 1)
  }

  //STYLES
  return (
    <div className="flex flex-col items-center my-4">
      <div className="flex text-gray-700">
        <button
          onClick={() => setPage(0)}
          className={`h-8 w-8 mr-1 flex justify-center items-center ${
            previous
              ? "hover:text-fred cursor-pointer"
              : "text-gray-100 cursor-not-allowed"
          }`}
        >
          <ChevronDoubleLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => handlePrevious()}
          className={`h-8 w-8 mr-1 flex justify-center items-center ${
            previous
              ? "hover:text-fred cursor-pointer"
              : "text-gray-100 cursor-not-allowed"
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex h-8 font-medium ">
          {getPagination().map((item) => {
            return item === null ? (
              <span className="w-10 text-lg text-grotesk justify-center items-center ">
                {" "}
              </span>
            ) : (
              <button
                onClick={() => setPage(item - 1)}
                className={`w-10 text-lg text-grotesk justify-center items-center cursor-pointer transition duration-150 ease-in border-t-2 hover:text-fred ${
                  currentPage + 1 === item
                    ? "border-fred flex"
                    : "border-transparent md:flex hidden  "
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => handleNext()}
          className={`h-8 w-8 mr-1 flex justify-center items-center ${
            next
              ? "hover:text-fred cursor-pointer"
              : "text-gray-100 cursor-not-allowed"
          }`}
        >
          <ChevronRightIcon className="w-5 h-5 " />
        </button>
        <button
          onClick={() => setPage(pageCount - 1)}
          className={`h-8 w-8 mr-1 flex justify-center items-center ${
            next
              ? "hover:text-fred cursor-pointer"
              : "text-gray-100 cursor-not-allowed"
          }`}
        >
          <ChevronDoubleRightIcon className="w-5 h-5 " />
        </button>
      </div>
    </div>
  )
}

export default Pagination
