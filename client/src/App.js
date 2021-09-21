import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ApplicantsDispatcher from "./components/ApplicantsDispatcher";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Thankyou from "./components/Thankyou";

function App() {
  return (
    <Router>
      <div className="flex  flex-col justify-center ">
        {/* <Navbar /> */}
        <div className="flex h-screen justify-center items-center w-full ">
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
        </div>
        {/* <div className="bg-white h-1/6 text-red">ssssss</div> */}
      </div>
    </Router>
  );
}

export default App;
