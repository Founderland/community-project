import { BrowserRouter as Router, Route } from "react-router-dom"
import ApplicantsDispatcher from "./components/ApplicantsDispatcher"
import Form from "./components/Form"
import Thankyou from "./components/Forms/Thankyou"
import AnswersProvider from "./contexts/AnswersProvider"
import Homepage from "./components/Homepage.js"
import Admin from "./components/Admin/Admin"
import FounderResponse from "./components/Forms/FounderResponse"
import QuestionDetails from "./components/Admin/QuestionDetails"

function App() {
  return (
    <AnswersProvider>
      <Router>
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/join-our-community"
          component={ApplicantsDispatcher}
        />
        <Route exact path="/form/:memberType" component={Form} />
        <Route exact path="/thankyou" component={Thankyou} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/foundersrespone" component={FounderResponse} />
        <Route exact path="/question" component={QuestionDetails} />
      </Router>
    </AnswersProvider>
  )
}

export default App
