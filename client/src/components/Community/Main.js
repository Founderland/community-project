import Header from "./Header"
import Menu from "./Menu"
import Content from "./Content"
import { Switch, Route } from "react-router-dom"

const Main = () => {
  return (
    <Switch>
      <Route exact path={`/community/:view?/:category?/:id?/`}>
        <div className="w-full h-screen overflow-none">
          <Header />
          <Content />
          <Menu />
        </div>
      </Route>
    </Switch>
  )
}

export default Main
