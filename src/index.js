import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/router";
import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const entry = document.getElementById("main");
  window.axios = axios;
  ReactDOM.render(<Routes />, entry);
});
document.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: 'This is a natural disaster alert',
    icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
  });
});
