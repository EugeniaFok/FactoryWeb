import React  from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

import './App.css';
import PAGES from './RoutePages';
import Menu from './Menu';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Switch>          
          {PAGES.map(({ title, href, component }) =>
            <Route path={href} component={component}/>
          )}
          <Redirect from='/' to='/home'/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
