import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/router";

document.addEventListener("DOMContentLoaded", () => {
  const entry = document.getElementById("main");
  ReactDOM.render(<Routes />, entry);
});
