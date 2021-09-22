import { BrowserRouter as Router, Route } from "react-router-dom";
import ApplicantsDispatcher from "./components/ApplicantsDispatcher";
import Form from "./components/Form";
import Thankyou from "./components/Thankyou";
import Admin from './components/Admin'

function App() {
  return (
    <Router>
          <Route
            exact
            path="/join-our-community"
            component={ApplicantsDispatcher}
          />
          <Route
            exact
            path="/thankyou"
            component={Thankyou}
          />
          <Route exact path="/form/:memberType" component={Form} />
          <Route
            exact
            path="/admin"
            component={Admin}
          />
    </Router>
  );
}

export default App;
