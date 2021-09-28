import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ApplicantsDispatcher from "./components/ApplicantsDispatcher";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Thankyou from "./components/Forms/Thankyou";
import AnswersProvider from "./contexts/AnswersProvider";


function App() {
 
  return (
    <AnswersProvider >
     
    <Router>
      {/* <div className="flex  flex-col justify-center "> */}
      {/* <Navbar /> */}
      <Route
        exact
        path="/join-our-community"
        component={ApplicantsDispatcher}
      />
      <Route exact path="/form/:memberType" component={Form} />
      <Route exact path="/thankyou" component={Thankyou} />
      {/* </div> */}
      </Router>
      </AnswersProvider>
  );
}

export default App;
