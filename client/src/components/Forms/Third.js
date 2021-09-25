import Question from './Question'
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

export default Third