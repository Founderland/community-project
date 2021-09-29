import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApplicantsDispatcher from './components/ApplicantsDispatcher'
import Form from './components/Form'
import Thankyou from './components/Forms/Thankyou'
import AnswersProvider from './contexts/AnswersProvider'
import Admin from './components/Admin/Admin'

function App() {
    return (
        <AnswersProvider>
            <Router>
                <Route
                    exact
                    path="/join-our-community"
                    component={ApplicantsDispatcher}
                />
                <Route exact path="/form/:memberType" component={Form} />
                <Route exact path="/thankyou" component={Thankyou} />
                <Route exact path="/admin" component={Admin} />
            </Router>
        </AnswersProvider>
    )
}

export default App
