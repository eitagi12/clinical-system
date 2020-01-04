import React from "react";
import { Layout } from "antd";
import { Switch, withRouter } from "react-router-dom";
import PrivateRoute from "./Component/routes/PrivateRoutes";
import jwtDecode from "jwt-decode";
import NavBar from "./Component/navbar/NavBar";

import "./App.css";

const { Content, Header } = Layout;

class App extends React.Component {
  logout = () => {
    localStorage.removeItem("Access_TOKEN");
    this.props.history.push("/login");
  };

  login = () => {
    localStorage.setItem("Access_TOKEN");
  };

  getUser = () => {
    const token = localStorage.getItem("Access_TOKEN");
    if (!token) {
      return {
        role: 'admin'
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
        <Layout>
          <Header>
            <NavBar logout={this.logout} />
          </Header>
          <Content>
            <Switch>
              <PrivateRoute role={user.role} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
