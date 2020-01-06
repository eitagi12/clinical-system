import React from "react";

import { Switch, withRouter } from "react-router-dom";
import PrivateRoute from "./Component/routes/PrivateRoutes";
import jwtDecode from "jwt-decode";

import "./App.css";

class App extends React.Component {
  getUser = () => {
    const token = localStorage.getItem("Access_TOKEN");
    if (!token) {
      return {
        role: "guest"
      };
    }
    let user = jwtDecode(token);
    return user;
  };

  render() {
    let user = this.getUser();
    console.log(user);
    return (
      <div>
        <Switch>
          <PrivateRoute role={user.role} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
