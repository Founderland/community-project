import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AddQuestionForm from "./components/AddQuestionForm";
import ApplicantsDispatcher from "./components/ApplicantsDispatcher";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Thankyou from "./components/Thankyou";

function App() {
  return (
    <>
      <AddQuestionForm />
      <Router>
        {/* <div className="flex  flex-col justify-center "> */}
        {/* <Navbar /> */}
        <Route
          exact
          path="/join-our-community"
          component={ApplicantsDispatcher}
        />
        <Route exact path="/thankyou" component={Thankyou} />
        <Route exact path="/form/:memberType" component={Form} />
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;
