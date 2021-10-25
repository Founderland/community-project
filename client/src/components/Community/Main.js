import Menu from "./Menu"
import Content from "./Content"
import Header from "./Header"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import ResourcesList from "./Resources/ResourcesList";
import Newsfeed from "./Newsfeed";
import Events from "./Events"
import HomePage from "./HomePage";
import Inbox from './Inbox'
import CommunityDashboard from "./CommunityDashboard"

const Main = () => {
  const { path } = useRouteMatch()
  return (
    <div className="w-full h-screen">
          

      <Router>
      <Header />
        <Switch>

      {/* <Content />
        <Menu /> */}
          {/* <Route path="/community/newsfeed">
            <Newsfeed />
          </Route> */}
          <Route path="/community/community">
            <CommunityDashboard />
          </Route>
          <Route path="/community/events">
            <Events />
          </Route>
          <Route path={path+"/resources/:categoryPath"}>
            <ResourcesList />
          </Route>
          <Route path={path+"/resources"}>
            <ResourcesList />
          </Route>

          <Route path={path+"/inbox"}>
            <Inbox />
          </Route>
          <Route path="/">
          <Newsfeed />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default Main
