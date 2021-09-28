import Answers from './Answers'

const Question = ({ _id, question, type, category, answers }) => {
   return (
     <div className="p-2 text-grotesk text-sm md:text-md lg:text-lg xl:text-xl mt-1">
       <label  className=" " for="">{question}</label>
       <Answers type={type} answers={answers} questionId={_id}/>
     </div>
   );
 };
export default Question 