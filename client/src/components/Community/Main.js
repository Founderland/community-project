import Header from "./Header"
import Menu from "./Menu"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ResourcesList from "./Resources/ResourcesList"
import Events from "./Events"
import Profile from "./Profile/Profile"
import MapDisplay from "./Directory/MapDisplay"

const Main = () => {
  return (
    <div className="w-full h-screen">
      <Router>
        <Header />
        <Switch>
          <Route path={"/directory"}>
            <MapDisplay />
          </Route>
          <Route path={"/events"}>
            <Events />
          </Route>
          <Route path={"/resources/:categoryPath"}>
            <ResourcesList />
          </Route>
          <Route path={"/resources"}>
            <ResourcesList />
          </Route>
          <Route path={"/profile/:id"}>
            <Profile />
          </Route>
        </Switch>
        <Menu />
      </Router>
    </div>
  )
}

export default Main
