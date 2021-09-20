import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Thankyou from './components/Thankyou';

function App() {
  return (
    <Router>
    
      <>
        <div className="flex justify-around w-full shadow-xl py-2 absolute fixed">
          <Link className="py-2 px-2 text-mono font-bold bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-xs text-black hover:text-white" to="/join-our-community">Join Our Community</Link>
          <Link className="py-2 px-2 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black" to="/social">Sign In</Link>
          <Link className="py-2 px-2 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black" to="/thankyou">Thank you</Link>   
        </div>
         <div className="flex h-screen justify-center items-center w-full overflow-auto">
          <p className="text-2xl">hey</p>
        </div> 
        </>
        <Switch>
        <Route exact path="/thankyou">
            <Thankyou />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
