import Answers from './Answers'

const Question = ({ _id, question, type, category, answers }) => {
   return (
     <div className="p-2 text-grotesk text-md xl:text-xl mt-1">
       <label  className="pb-1" for="">{question}</label>
       <Answers type={type} answers={answers} questionId={_id} />
     </div>
   );
 };
export default Question 