import Answers from './Answers'

const Question = ({ _id, question, type, category, answers }) => {
    return (
        <div className="p-2 text-grotesk text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl mt-1 xl:mt-5">
            <label className=" ">{question}</label>
            <Answers type={type} answers={answers} questionId={_id} />
        </div>
    )
}
export default Question
