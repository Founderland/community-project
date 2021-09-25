import Answers from './Answers'

const Question = ({ _id, question, type, category, answers }) => {
   return (
     <div className="p-2 ">
       <label for="">{question}</label>
       <Answers type={type} answers={answers} questionId={_id} />
     </div>
   );
 };
export default Question 