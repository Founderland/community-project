import Question from './Question'

const Second = (props) => {
   // const validate = () => {98
   //     if (confirm('Are you sure you want to go back?')) { // eslint-disable-line
   //         props.previousStep();
   //     }
   // };
 
   const { questions } = props;
   return (
     <div>
       <div className="h-screen w-full flex justify-center flex-col">
  
            <div className=" flex flex-col justify-between bg-gray-200 p-10  h-full">
            <h3 className="text-center hidden md:flex ">
           Welcome to {questions[0]?.category}
         </h3>
         <h2 className="text-center hidden md:flex ">
           Current Step {props.currentStep}
         </h2>
           <div>
             {questions.map((question, i) => (
               <Question key={i} {...question} />
             ))}
           </div>
           <div className="flex md:flex justify-around p-10 ">
             <button className="p-5 bg-fblue w-1/2 md:w-1/3" onClick={props.previousStep}>
               Prev
             </button>
             <button className="p-5 bg-fblue w-1/2 md:w-1/3" onClick={props.nextStep}>
               Next
             </button>
           </div>
         </div>
       </div>
     </div>
   );
};
 
export default Second