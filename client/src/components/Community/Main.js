import Header from "./Header"
import Menu from "./Menu"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ResourcesList from "./Resources/ResourcesList"
import Events from "./Events"

import MapDisplay from "./Directory/MapDisplay"

const Main = () => {
  return (
    <div className="w-full h-screen">
      <Router>
        <Header />
        <Switch>
          <Route exact path={"/"}>
            <MapDisplay />
          </Route>
          <Route path={"/events"}>
            <Events />
          </Route>
          <Route path="/resources/:categoryPath">
            <ResourcesList />
          </Route>
          <Route path="/resources">
            <ResourcesList />
          </Route>
        </Switch>
        <Menu />
      </Router>
    </div>
  )
}

export default Main
