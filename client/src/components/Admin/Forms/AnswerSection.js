import AddAnswer from "./AddAnswer"
import AnswerList from "./AnswerList"

const AnswerSection = (props) => {
  return (
    <>
      <div className=" flex flex-col flex-wrap lg:flex-row shadow-inner bg-gray-100 border-round-xl w-full p-5 xl:px-2">
        <AddAnswer {...props} />
        <AnswerList {...props} />
      </div>
    </>
  )
}

export default AnswerSection
