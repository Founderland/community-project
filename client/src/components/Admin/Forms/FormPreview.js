import { XCircleIcon } from "@heroicons/react/outline"
import Form from "../../Form"

const FormPreview = ({ setShowPreview, memberType, questionPreview }) => {
  return (
    <div
      className="fixed h-full w-full bg-white top-0 left-0 z-50 overflow-hidden
        "
    >
      <div
        onClick={() => setShowPreview(false)}
        className="flex justify-start items-center bg-flime cursor-pointer "
      >
        <XCircleIcon className="w-8 h-8  mx-4 " />

        <h3 className="text-grotesk p-1 font-bold ">Close Preview</h3>
      </div>
      <div className="  h-full flex justify-center items-center">
        <Form memberType={memberType} questionPreview={questionPreview} />
      </div>
    </div>
  )
}

export default FormPreview
