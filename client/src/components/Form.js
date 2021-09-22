import StepWizard from "react-step-wizard";
import axios from "axios";

const dumyData = [
  {
    _id: "614af929a47c96b7a3decf1e",
    category: "About You",
    question: "Name",
    rank: "Not Important - just for info/further context",
    type: "open",
    answers: [
      {
        answer: "open",
        ideal: "yes",
        points: 0,
        notes: "",
        _id: "614af929a47c96b7a3decf1f",
      },
    ],
    __v: 0,
  },
  {
    _id: "614af997a47c96b7a3decf21",
    category: "About You",
    question: "Title/Position",
    rank: "Not Important - just for info/further context",
    type: "open",
    answers: [
      {
        answer: "open",
        ideal: "yes",
        points: 0,
        notes: "",
        _id: "614af997a47c96b7a3decf22",
      },
    ],
    __v: 0,
  },
  {
    _id: "614af9aaa47c96b7a3decf24",
    category: "About You",
    question: "Contact Information",
    rank: "Not Important - just for info/further context",
    type: "open",
    answers: [
      {
        answer: "open",
        ideal: "yes",
        points: 0,
        notes: "",
        _id: "614af9aaa47c96b7a3decf25",
      },
    ],
    __v: 0,
  },
  {
    _id: "614afa73a47c96b7a3decf27",
    category: "About You",
    question:
      "Do you identify as a woman who has faced obstacles tied to your ethnicity/race and gender in your entrepreneurial journey?",
    rank: "Very Important - variable is scrutinized",
    type: "choice",
    answers: [
      {
        answer: "Yes",
        ideal: "yes",
        points: 50,
        notes: "",
        _id: "614afa73a47c96b7a3decf28",
      },
      {
        answer: "No",
        ideal: "yes",
        points: 0,
        notes: "",
        _id: "614afa73a47c96b7a3decf29",
      },
      {
        answer: "open",
        ideal: "yes",
        points: 0,
        notes: "",
        _id: "614afa73a47c96b7a3decf2a",
      },
    ],
    __v: 0,
  },
  {
    _id: "614afc27a47c96b7a3decf2c",
    category: "About Your Business",
    question: "Where is your Business registered (based)?",
    rank: "Vital - Deal Maker or Breaker",
    type: "choice",
    answers: [
      {
        answer: "Continental Europe",
        ideal: "yes",
        points: 50,
        notes: "",
        _id: "614afc27a47c96b7a3decf2d",
      },
      {
        answer: "United Kingdom",
        ideal: "yes",
        points: 50,
        notes: "",
        _id: "614afc27a47c96b7a3decf2e",
      },
      {
        answer:
          "Not in Europe or the UK but planning on relocating to that area",
        ideal: "yes",
        points: 200,
        notes: "",
        _id: "614afc27a47c96b7a3decf2f",
      },
      {
        answer: "Not in Europe or the UK",
        ideal: "no",
        points: 0,
        notes: "",
        _id: "614afc27a47c96b7a3decf30",
      },
    ],
    __v: 0,
  },
];

const Question = ({ _id, question, type, category, answers }) => {
  console.log(answers);
  return (
    <div>
      <label>{question}</label>
      <br />
      <Answers type={type} answers={answers} />
    </div>
  );
};

const Answers = ({ type, answers }) => {
  return (
    <div>
      {type === "open" ? (
        <input
          type="text"
          className=""
          name="firstname"
          placeholder="First Name"
          // onChange={update}
        />
      ) : (
        <>
          {answers.map((answer) => (
            <>
              <input
                type="radio"
                id={answer._id}
                name="fav_language"
                value={answer.answer}
              />
              {answer.answer !== "open" && (
                <>
                  <label for="html"> {answer.answer}</label>
                  <br />
                </>
              )}
              {answer.answer === "open" && (
                <input
                  type="text"
                  id={answer._id}
                  className="form-control"
                  name={answer.answer}
                  placeholder="open"
                  // onChange={update}
                />
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};

const First = (props) => {
  // const update = (e) => {
  //   props.update(e.target.name, e.target.value);
  // };

  const { questions } = props;
  return (
    <div className="h-full w-full flex justify-center flex-col">
      <h3 className="text-center ">Welcome to {questions[0].category}</h3>
      <h2>Current Step {props.currentStep}</h2>
      <div className="bg-gray-200 p-5">
        {questions.map((question, i) => (
          <Question key={i} {...question} />
        ))}
      </div>
      {/* <Stats step={1} {...props} /> */}
      <button className="p-5 bg-fblue" onClick={props.nextStep}>
        Next
      </button>
    </div>
  );
};

const Second = (props) => {
  // const validate = () => {98
  //     if (confirm('Are you sure you want to go back?')) { // eslint-disable-line
  //         props.previousStep();
  //     }
  // };

  const { questions } = props;

  return (
    <div>
      <div className="h-full w-full flex justify-center flex-col">
        <h3 className="text-center ">Welcome to {questions[0].category}</h3>
        <h2>Current Step {props.currentStep}</h2>
        <div className="bg-gray-200 p-5">
          {questions.map((question, i) => (
            <Question key={i} {...question} />
          ))}
        </div>
        {/* <Stats step={1} {...props} /> */}
        <button className="p-5 bg-fblue" onClick={props.previousStep}>
          Prev
        </button>
        <button className="p-5 bg-fblue" onClick={props.nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

const Third = (props) => {
  // const validate = () => {
  //     if (confirm('Are you sure you want to go back?')) { // eslint-disable-line
  //         props.previousStep();
  //     }
  // };

  return (
    <div>
      {props.firstname && <h3>Hey {props.firstname}! 👋</h3>}
      I've added validation to the previous button.
      {/* <Stats step={2} {...props} previousStep={validate} /> */}
    </div>
  );
};

const Form = ({ match }) => {
  // console.log(match);
  // memberType is grabbed from the parameter specified on the ApplicantsDispatcher Link and can be either : founder, investor, ally or newsletter.
  // const { memberType } = match.params;

  const aboutYouQuestions = dumyData.filter(
    (item) => item.category === "About You"
  );
  const aboutYourBusiness = dumyData.filter(
    (item) => item.category === "About Your Business"
  );

  return (
    <StepWizard isHashEnabled>
      <First hashKey={"FirstStep"} questions={aboutYouQuestions} />
      <Second hashKey={"SecondStep"} questions={aboutYourBusiness} />
      <Third questions={aboutYourBusiness} />
    </StepWizard>
  );

  // <div>THIS IS THE {memberType} FORM</div>;
};

export default Form;
