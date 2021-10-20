import { BrowserRouter as Router, Route } from "react-router-dom"
import ApplicantsDispatcher from "./components/ApplicantsDispatcher"
import Form from "./components/Form"
import Thankyou from "./components/Forms/Thankyou"
import AnswersProvider from "./contexts/AnswersProvider"
import Homepage from "./components/Homepage.js"
import Admin from "./components/Admin/Admin"
// import FounderResponse from "./components/Forms/FounderResponse"
// import ResponseList from "./components/Admin/Applicant Response/ResponseList"
import Community from "./components/Community/Community"
import SignUp from "./components/Community/SignUp"
import ResourcesList from "./components/Community/Resources/ResourcesList"
import CommunityProvider from "./contexts/CommunityProvider"

// import AddQuestionForm from './components/Admin/AddQuestionForm'

function App() {
  return (
    <AnswersProvider>
      <CommunityProvider>
      <Router>
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/join-our-community"
          component={ApplicantsDispatcher}
        />
        <Route exact path="/community" component={Community} />
        <Route exact path="/signup/:token" component={SignUp} />
        <Route exact path="/form/:memberType" component={Form} />
        <Route exact path="/thankyou" component={Thankyou} />
        <Route path="/admin" component={Admin} />
        <Route exact path="/community/resources" component={ResourcesList} />
        <Route exact path="/community/resources/:categoryPath" component={ResourcesList} />
        {/* <Route exact path="/foundersrespone" component={FounderResponse} /> */}
        {/* <Route exact path="/foundersrespone" component={ResponseList} /> */}
        {/* <Route exact path="/admin/:memberType/addQuestion" component={AddQuestionForm } /> */}
      </Router>
      </CommunityProvider>
    </AnswersProvider>
  )
}

export default App
