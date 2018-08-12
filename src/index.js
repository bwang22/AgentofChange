import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/router";
import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const entry = document.getElementById("main");
  window.axios = axios;
  ReactDOM.render(<Routes />, entry);
});
