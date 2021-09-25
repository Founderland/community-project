import Question from './Question'

const First = (props) => {
   // const update = (e) => {
   //   props.update(e.target.name, e.target.value);
   // };
 
   const { questions } = props;
 
   return (
     <div className="h-screen w-full flex flex-col md:items-center ">

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
         <div className=" hidden md:flex justify-end p-10 ">
           <button className="p-5 bg-fblue w-2/6" onClick={props.nextStep}>
             Next
           </button>
         </div>
       </div>
       <div className="flex justify-center md:hidden">
         <button className="p-5 bg-fblue w-screen" onClick={props.nextStep}>
           Next
         </button>
       </div>
       {/* <Stats step={1} {...props} /> */}
     </div>
   );
};
 
export default First