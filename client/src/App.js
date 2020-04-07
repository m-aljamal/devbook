import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from './components/profile/Profile'
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
