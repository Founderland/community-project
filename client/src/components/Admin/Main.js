import Menu from "./Menu"
import Content from "./Content"
import Header from "./Header"
import { Switch, Route, useRouteMatch } from "react-router"

const Main = () => {
  const { path } = useRouteMatch()
  return (
    <Route exact path={`${path}/:view/:category?/:id?/`}>
      <div className="flex h-screen">
        <Menu />
        <div className="w-full flex flex-col overflow-hidden">
          <Header />
          <Content />
        </div>
      </div>
    </Route>
  )
}

export default Main
