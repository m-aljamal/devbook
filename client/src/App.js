import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
