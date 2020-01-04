import React, { Component } from "react";
import * as allRoutes from "./index";
import rolesConfig from "../../config/roles";
import { Route, withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

class PrivateRoutes extends Component {
  state = {
    allowedRoutes: [],
    redirectRoutes: []
  };

  componentWillMount() {
    let role = this.props.role;
    console.log(this.state.redirectRoutes);
    if (role) {
      this.setState({
        allowedRoutes: rolesConfig[role].routes,
        redirectRoutes: rolesConfig[role].redirect
      });
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        {this.state.allowedRoutes &&
          this.state.allowedRoutes.map(route => (
            <Route
              exact
              path={route.url}
              component={allRoutes[route.component]}
              key={route.url}
            />
          ))}
        {this.state.redirectRoutes &&
          this.state.redirectRoutes.map(url => <Redirect to={url} />)}
      </div>
    );
  }
}

export default withRouter(PrivateRoutes);
