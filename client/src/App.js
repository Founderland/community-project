import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom"
import ApplicantsDispatcher from "./components/ApplicantsDispatcher"
import Form from "./components/Form"
import Thankyou from "./components/Forms/Thankyou"
import AnswersProvider from "./contexts/AnswersProvider"
import Admin from "./components/Admin/Admin"
import Community from "./components/Community/Community"
import SignUp from "./components/Community/SignUp/SignUp"
import CommunityProvider from "./contexts/CommunityProvider"
import Verify from "./components/Verify"
import NewsLetter from "./components/Forms/NewsLetter"

function App() {
  return (
    <Router>
      <Switch>
        <CommunityProvider>
          <AnswersProvider>
            <Route
              exact
              path="/join-our-community"
              component={ApplicantsDispatcher}
            />
            <Route exact path="/newsletter" component={NewsLetter} />
            <Route exact path="/form/:memberType" component={Form} />
            <Route exact path="/thankyou" component={Thankyou} />
            <Route exact path="/verify/:token" component={Verify} />
            <Route exact path="/signup/:token" component={SignUp} />
            <Route path="/admin" component={Admin} />
            <Route path="/community" component={Community} />
            <Route exact path="/">
              <Redirect to="/community" />
            </Route>
          </AnswersProvider>
        </CommunityProvider>
      </Switch>
    </Router>
  )
}

export default App
