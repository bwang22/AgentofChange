import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./signup";


const Routes = props => (
  <Router basename="/">
    <div className="container-fluid">
      <Route exact path="/" render={() => <Signup />} />
    </div>
  </Router>
);

export default Routes;
