import { PlusIcon } from "@heroicons/react/outline"

const ApplicationComments = ({ data, styles }) => {
  //ADD NEW COMMENT
  const addComment = () => {}

  return (
    <>
      <hr className={`mt-6 border-b-1 ${styles[data.data.role].border}`} />
      <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Reviewer comments
      </h6>
      <div>bubble chat comments</div>
      {/* list of comments */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <div className="relative w-full mb-3">
            (Avatar)
            <textarea
              type="text"
              className=" border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white  text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              rows="4"
            >
              Text
            </textarea>
            <button
              onClick={() => {
                addComment()
              }}
              className="absolute bottom-1 right-1 flex px-4 md:px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
            >
              <PlusIcon className="w-5 h-5" />
              <p className="text-mono text-sm hidden md:block">
                add new comment
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicationComments
