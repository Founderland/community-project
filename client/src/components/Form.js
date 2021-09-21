const Form = ({ match }) => {
  // console.log(match);

  // memberType is grabbed from the parameter specified on the ApplicantsDispatcher Link and can be either : founder, investor, ally or newsletter.

  const { memberType } = match.params;

  return <div>THIS IS THE {memberType} FORM</div>;
};

export default Form;
