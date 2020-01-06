import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col, Layout } from "antd";
import "./login.css";
import Axios from "../../config/axios.setup";
import {
  successLoginNotification,
  failLoginNotification
} from "../../Component/notification/notification";
const { Footer } = Layout;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const role = this.state.role;
    Axios.post("http://localhost:8080/loginUser", { username, password, role })
      .then(result => {
        if (result.data.role === "nurse") {
          console.log(result);
          successLoginNotification();
          console.log(result.data);
          localStorage.setItem("Access_TOKEN", result.data.token);
          this.props.history.push("/nursepatient")
          window.location.reload(true);
        } else if (result.data.role === "doctor") {
          console.log(result);
          successLoginNotification();
          console.log(result.data);
          localStorage.setItem("Access_TOKEN", result.data.token);
          this.props.history.push("/doctor")
          window.location.reload(true);
        } else if (result.data.role === "admin") {
          console.log(result);
          successLoginNotification();
          console.log(result.data);
          localStorage.setItem("Access_TOKEN", result.data.token);
          this.props.history.push("/manageuser")
          window.location.reload(true);
        }else {
          this.props.history.push("/login")
          window.location.reload(true);
        }
      })
      .catch(err => {
        console.error(err);
        failLoginNotification(err.response.data.message);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div>
          <Row>
            <Col className="leftBar" span={3}></Col>

            <Col className="content" span={18}>
              <div className="header">
                <img
                  src="/images/header.jpg"
                  alt="hello"
                  width="100%"
                  height="200px"
                ></img>
              </div>

              <div className="loginBox">
                <h1>เข้าสู่ระบบ</h1>
                <div
                  className="divLogin"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                >
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      {getFieldDecorator("username", {
                        rules: [
                          { required: true, message: "โปรดใส่ชื่อผู้ใช้งานของคุณ!" }
                        ]
                      })(
                        <Input
                          onChange={e =>
                            this.setState({ username: e.target.value })
                          }
                          prefix={
                            <Icon
                              type="user"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="ชื่อผู้ใช้งาน"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("password", {
                        rules: [
                          { required: true, message: "โปรดใส่รหัสผ่านของคุณ!" }
                        ]
                      })(
                        <Input
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="password"
                          placeholder="รหัสผ่าน"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        เข้าใช้งาน
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <Footer style={{ position: 'fixed', bottom:'0px', width:'100%'}}>
                    สงวนลิขสิทธิ์ © 2562 บริษัท นัทฮัฟเฟิลพัพ (ประเทศไทย) จำกัด
                  </Footer>
            </Col>

            <Col className="rightBar" span={3}></Col>
          </Row>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);
export default WrappedNormalLoginForm;
