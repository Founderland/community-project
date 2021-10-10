import { XCircleIcon } from '@heroicons/react/outline'
import Form from '../Form'

const FormPreview = ({
  questionInfo,
  answersList,
  setShowPreview,
  memberType,
  questionPreview,
}) => {
  return (
    <div
      className="fixed h-full w-full bg-white 
        "
    >
      <div
        onClick={() => setShowPreview(false)}
        className="flex justify-start items-center bg-fblue-dark cursor-pointer "
      >
        <XCircleIcon className="w-8 h-8 text-white mx-4 " />

        <h3 className="text-grotesk p-1 text-white">Close Preview</h3>
      </div>
      <div className="  h-full flex justify-center items-center">
        <Form memberType={memberType} questionPreview={questionPreview} />
      </div>
    </div>
  )
}

export default FormPreview
