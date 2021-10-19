import Menu from "./Menu"
import Content from "./Content"
import Header from "./Header"
import { Switch, Route, useRouteMatch } from "react-router"

const Main = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:view/:category?/:id?`}>
        <div>
          <div className="flex h-screen font-roboto">
            <Menu />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <Content />
            </div>
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default Main
