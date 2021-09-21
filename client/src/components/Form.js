import StepWizard from "react-step-wizard";
const dumyData = [
  {
    question: "blabla",
    type: "open",
    category: "about_you",
  },
  {
    question: "blabla",
    type: "multiple",
    answers: ["yes", "no", "other"],
    category: "tell_us_more",
  },
  {
    question: "blabla",
    type: "open",
    category: "tell_us_more",
  },
  {
    question: "blabla",
    type: "open",
    category: "about_you",
  },
  {
    question: "blabla",
    type: "open",
    category: "about_your_business",
  },
  {
    question: "blabla",
    type: "multiple",
    answers: ["yes", "no", "maybe"],
    category: "about_your_business",
  },
];

const Question = ({ question, type, category, answers }) => {
  return (
    <div>
      <label>{question}</label>
      <br />
      <label> </label>
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
                id="html"
                name="fav_language"
                value={answer}
              />
              <label for="html"> {answer}</label>
              {answer !== "other" && <br />}
              {answer === "other" && (
                <input
                  type="text"
                  className="form-control"
                  name={answer}
                  placeholder="First Name"
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
  console.log(props);
  return (
    <div className="h-full w-full flex justify-center flex-col">
      <h3 className="text-center ">Welcome to {questions[0].category}</h3>
      <h2>Current Step {props.currentStep}</h2>
      <div className="bg-gray-200 p-5">
        {questions.map((question) => (
          <Question {...question} />
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
  console.log(props);

  return (
    <div>
      <div className="h-full w-full flex justify-center flex-col">
        <h3 className="text-center ">Welcome to {questions[0].category}</h3>
        <h2>Current Step {props.currentStep}</h2>
        <div className="bg-gray-200 p-5">
          {questions.map((question) => (
            <Question {...question} />
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
    (item) => item.category === "about_you"
  );
  const tellUsMore = dumyData.filter(
    (item) => item.category === "tell_us_more"
  );
  const aboutYourBusiness = dumyData.filter(
    (item) => item.category === "about_your_business"
  );

  return (
    <StepWizard isHashEnabled>
      <First hashKey={"FirstStep"} questions={tellUsMore} />
      <Second hashKey={"SecondStep"} questions={aboutYouQuestions} />
      <Third questions={aboutYourBusiness} />
    </StepWizard>
  );

  // <div>THIS IS THE {memberType} FORM</div>;
};

export default Form;
