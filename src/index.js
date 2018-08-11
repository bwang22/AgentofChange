import React from "react";
import ReactDOM from "react-dom";

document.addEventListener("DOMContentLoaded", () => {
  const entry = document.getElementById("main");
  ReactDOM.render(<Component />, entry);
});

const Component = (props) => {
  return <div> Reacting </div>
};
