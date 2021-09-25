import StepWizard from "react-step-wizard";
import axios from "axios";
import { useEffect, useState } from "react";
import First from './Forms/First'
import Second from './Forms/Second'
import Third from './Forms/Third'
import ActiveDot from "./Forms/ActiveDot";
// const dumyData = [
//   {
//     _id: "614af929a47c96b7a3decf1e",
//     category: "About You",
//     question: "Name",
//     rank: "Not Important - just for info/further context",
//     type: "open",
//     answers: [
//       {
//         answer: "open",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614af929a47c96b7a3decf1f",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "614af997a47c96b7a3decf21",
//     category: "About You",
//     question: "Title/Position",
//     rank: "Not Important - just for info/further context",
//     type: "open",
//     answers: [
//       {
//         answer: "open",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614af997a47c96b7a3decf22",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "614af9aaa47c96b7a3decf24",
//     category: "About You",
//     question: "Contact Information",
//     rank: "Not Important - just for info/further context",
//     type: "open",
//     answers: [
//       {
//         answer: "open",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614af9aaa47c96b7a3decf25",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "614afa73a47c96b7a3decf27",
//     category: "About You",
//     question:
//       "Do you identify as a woman who has faced obstacles tied to your ethnicity/race and gender in your entrepreneurial journey?",
//     rank: "Very Important - variable is scrutinized",
//     type: "choice",
//     answers: [
//       {
//         answer: "Yes",
//         ideal: "yes",
//         points: 50,
//         notes: "",
//         _id: "614afa73a47c96b7a3decf28",
//       },
//       {
//         answer: "No",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614afa73a47c96b7a3decf29",
//       },
//       {
//         answer: "open",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614afa73a47c96b7a3decf2a",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "614afc27a47c96b7a3decf2c",
//     category: "About Your Business",
//     question: "Where is your Business registered (based)?",
//     rank: "Vital - Deal Maker or Breaker",
//     type: "choice",
//     answers: [
//       {
//         answer: "Continental Europe",
//         ideal: "yes",
//         points: 50,
//         notes: "",
//         _id: "614afc27a47c96b7a3decf2d",
//       },
//       {
//         answer: "United Kingdom",
//         ideal: "yes",
//         points: 50,
//         notes: "",
//         _id: "614afc27a47c96b7a3decf2e",
//       },
//       {
//         answer:
//           "Not in Europe or the UK but planning on relocating to that area",
//         ideal: "yes",
//         points: 200,
//         notes: "",
//         _id: "614afc27a47c96b7a3decf2f",
//       },
//       {
//         answer: "Not in Europe or the UK",
//         ideal: "no",
//         points: 0,
//         notes: "",
//         _id: "614afc27a47c96b7a3decf30",
//       },
//     ],
//     __v: 0,
//   },
// ];
const Form = ({ match }) => {
  // console.log(match);
  // memberType is grabbed from the parameter specified on the ApplicantsDispatcher Link and can be either : founder, investor, ally or newsletter.
  // const { memberType } = match.params;
  const [questions, setQuestions] = useState([]);
  const [activeStep, setactiveStep] = useState(1)

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/form/founders/questions")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  questions && console.log(questions);

  const aboutYouQuestions = questions.filter(
    (item) => item.category === "About You"
  );
  const aboutYourBusiness = questions.filter(
    (item) => item.category === "About Your Business"
  );

  
  const WizardNav = ({ activeStep }) => (
    <div className=" hidden md:flex h-screen justify-center items-center bg-fblue z-10 md:w-1/3">
    <ul>
        {activeStep === 1 ? <div className="flex items-center"><ActiveDot /><li>About you</li></div> : <li>About you</li>}
        {activeStep === 2 ? <div className="flex items-center"><ActiveDot /><li>About Your Business</li></div> : <li>About Your Business</li>}
        {activeStep === 3 ? <div className="flex items-center"><ActiveDot /><li>Tell Us more</li></div> : <li>Tell Us more</li>}
    </ul>
  </div>
  )


  return (
    <div className=" m-0 flex flex-row-reverse w-screen items-end h-screen overflow-hidden">
      {questions && (
        <>
          <StepWizard onStepChange={(res)=>setactiveStep(res.activeStep)} isHashEnabled className="h-screen md:w-2/3">
            <First hashKey={"FirstStep"} questions={aboutYouQuestions} />
            <Second hashKey={"SecondStep"} questions={aboutYourBusiness} />
            <Third questions={aboutYourBusiness} />
          </StepWizard>
        </>
      )}
      <WizardNav activeStep={activeStep}/>
    </div>
  );

  // <div>THIS IS THE {memberType} FORM</div>;
};

export default Form;
