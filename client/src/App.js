import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import ApplicantsDispatcher from "./components/ApplicantsDispatcher"
import Form from "./components/Form"
import Thankyou from "./components/Forms/Thankyou"
import AnswersProvider from "./contexts/AnswersProvider"
import Admin from "./components/Admin/Admin"
import Community from "./components/Community/Community"
import SignUp from "./components/Community/SignUp/SignUp"
import CommunityProvider from "./contexts/CommunityProvider"
import Verify from "./components/Verify"
import NewsLetters from "./components/Forms/NewsLetters"

function App() {
  return (
    <Router>
      <AnswersProvider>
        <Route
          exact
          path="/join-our-community"
          component={ApplicantsDispatcher}
        />
          <Route exact path="/newsletter" component={NewsLetters} />
        <Route exact path="/form/:memberType" component={Form} />
        <Route exact path="/thankyou" component={Thankyou} />
      </AnswersProvider>

      <Route path="/admin" component={Admin} />
      <Route exact path="/signup/:token" component={SignUp} />
      <Route exact path="/verify/:token" component={Verify} />

      <CommunityProvider>
        <Route path="/" component={Community} />
      </CommunityProvider>
    </Router>
  )
}

export default App
