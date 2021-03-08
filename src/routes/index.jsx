import { Redirect, Route, Router, Switch } from "react-router-dom";
import React from 'react'
import ProtectedRoute from "./protectedRoute";
import Game from "../components/Game";
import RedirectRoute from "./redirectRoute";
import Home from "../components/Home";
import { createBrowserHistory } from "history";
import LevelSelect from "../components/Home/selectLevel";

const history = createBrowserHistory()

function AppRoutes(){
  return (
      <Router history = {history}>
         <Switch>
             <Route
              path="/"
              render={(props) => (
                <Redirect
                  {...props}
                  to={{ pathname: "/game", state: { from: props.location } }}
                ></Redirect>
              )}
              exact
             >
            </Route>
             <ProtectedRoute path = {'/game'} component = {Game}/>
             <RedirectRoute  path = {'/home'} component = {Home}/>
             <RedirectRoute  path = {'/level'} component = {LevelSelect}/>
         </Switch>
      </Router>
  )
}


export default AppRoutes