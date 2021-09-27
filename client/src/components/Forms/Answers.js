const Answers = ({ type, answers, questionId }) => {
   return (
     <div className="">
       {type === "open" ? (
         <input
           type="text"
           className="flex-1 appearance-none border border-gray-300 w-3/5 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fblue-light focus:border-transparent"
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

{/* <div class=" relative ">
    <label for="name-with-label" class="text-gray-700">
        Email
    </label>
    <input type="text" id="name-with-label" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="email" placeholder="Your name"/>
    </div> */}