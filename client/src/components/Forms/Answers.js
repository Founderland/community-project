const Answers = ({ type, answers, questionId }) => {
   return (
     <div className="">
       {type === "open" ? (
         <input
           type="text"
           className="p-2 my-2"
           name="firstname"
           placeholder="Your answer"
           id={answers[0]._id}
           onChange={(e) => console.log(e.target.id, e.target.value, questionId)}
         />
       ) : (
         <>
           {answers.map((answer) => (
             <div className="flex m-2 ">
               <input
                 type="radio"
                 className="m-2"
                 id={answer._id}
                 name="fav_language"
                 value={answer.answer}
               />
               {answer.answer !== "open" && (
                 <>
                   <label for="html"> {answer.answer}</label>
                 </>
               )}
               {answer.answer === "open" && (
                 <input
                   type="text"
                   id={answer._id}
                   className="p-1"
                   name={answer.answer}
                   placeholder="open"
                   onChange={(e) => console.log(e.target.id)}
                 />
               )}
             </div>
           ))}
         </>
       )}
     </div>
   );
};
 
export default Answers