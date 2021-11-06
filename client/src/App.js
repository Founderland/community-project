import { BrowserRouter as Router, Route } from "react-router-dom"
import ApplicantsDispatcher from "./components/ApplicantsDispatcher"
import Form from "./components/Form"
import Thankyou from "./components/Forms/Thankyou"
import AnswersProvider from "./contexts/AnswersProvider"
import Admin from "./components/Admin/Admin"
import Community from "./components/Community/Community"
import SignUp from "./components/Community/SignUp/SignUp"
import CommunityProvider from "./contexts/CommunityProvider"
import Verify from "./components/Verify"
import NewsLetter from "./components/Forms/NewsLetters"

function App() {
  return (
    <Router>
      <AnswersProvider>
        <Route
          exact
          path='/join-our-community'
          component={ApplicantsDispatcher}
        />
        <Route exact path='/newsletter' component={NewsLetter} />
        <Route exact path='/form/:memberType' component={Form} />
        <Route exact path='/thankyou' component={Thankyou} />
        <Route path='/admin' component={Admin} />
      </AnswersProvider>

      <Route exact path='/signup/:token' component={SignUp} />
      <Route exact path='/verify/:token' component={Verify} />

      <CommunityProvider>
        <Route path='/community' component={Community} />
      </CommunityProvider>
    </Router>
  )
}

export default App
