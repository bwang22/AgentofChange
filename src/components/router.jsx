import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./signup";
import ProfileView from "./profileView";
import Header from "./header";


const Routes = props => (
  <Router basename="/">
    <div className="container-fluid">
      <Header />
      <Route path="/findProfileId/:id" component={ProfileView} />
      <Route exact path="/" component={Signup} />
    </div>
  </Router>
);

export default Routes;
