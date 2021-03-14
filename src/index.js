import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAIONWZRo0WMQf9z_dT85Z_ZQbIY3fz2so",
  authDomain: "notelog-96783.firebaseapp.com",
  projectId: "notelog-96783",
  storageBucket: "notelog-96783.appspot.com",
  messagingSenderId: "1071396361608",
  appId: "1:1071396361608:web:a7e73323b346ac4bf2563d",
  measurementId: "G-4XBZW6XS5Z",
});
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
