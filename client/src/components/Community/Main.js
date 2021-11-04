import Header from "./Header"
import Menu from "./Menu"
import Content from "./Content"
import { Switch, Route, useRouteMatch } from "react-router-dom"

const Main = () => {
  const { path } = useRouteMatch()
  console.log(path)
  return (
    <Switch>
      <Route exact path={`${path}/:view?/:category?/:id?/`}>
        <div className="w-full h-screen">
          <Header />
          <Content />
          <Menu />
        </div>
      </Route>
    </Switch>
  )
}

export default Main
