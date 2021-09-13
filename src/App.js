import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import Login from "./components/login/Login";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SaveBrand from "./components/savebrand/SaveBrand";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/savebrand" component={SaveBrand} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
