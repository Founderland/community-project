import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApplicantsDispatcher from './components/ApplicantsDispatcher'
import Form from './components/Form'
import Thankyou from './components/Forms/Thankyou'
import AnswersProvider from './contexts/AnswersProvider'
import Homepage from './components/Homepage.js'
import Admin from './components/Admin/Admin'
import AddQuestionForm from './components/Admin/AddQuestionForm'
import AdminFoundersForm from './components/Admin/AdminFoundersForm'

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
        <Route
          exact
          path="/admin/:memberType/addQuestion"
          component={AddQuestionForm}
        />
        <Route exact path="/admin/foundersform" component={AdminFoundersForm} />
      </Router>
    </AnswersProvider>
  )
}

export default App
