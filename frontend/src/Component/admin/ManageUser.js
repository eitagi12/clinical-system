import React, { Component } from "react";
import {
  Col,
  Layout,
  Row,
  Menu,
  Button,
  Card,
  Form,
  Input,
  Icon,
  DatePicker,
  Select,
  List
} from "antd";
import { Link } from "react-router-dom";
import Axios from "../../config/axios.setup";
import { confirmCreateUserNotification } from "../../Component/notification/notification";

const { Footer } = Layout;

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      birthDay: "",
      role: ""
    };
  }

  fetchData = () => {
    Axios.post("http://localhost:8080/getuser").then(result => {
      this.setState({
        allUser: result.data
      });
      console.log(this.state.waittingPatientData);
    });
  };

  componentDidMount() {
    this.fetchData();
    var intervalId = setInterval(this.fetchData, 5000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        let payload = {
          username: value.username,
          password: value.password,
          firstname: value.firstName,
          lastname: value.lastName,
          birthday: this.state.birthDay,
          address: value.address,
          phone_number: value.phoneNumber,
          role: this.state.role
        };
        Axios.post("/registerUser", payload)
          .then(result => {
            console.log(result.data);
            confirmCreateUserNotification();
            this.props.form.resetFields();
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  };

  handleDeleteUser = id => {
    Axios.delete(`/deleteuser/${id}`).then(result => {   
    }) 
  };
  

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div>
          <Row>
            <Col className="content" span={18}>
              <Row>
                <Col>
                  <Row>
                    <div className="header">
                      <img
                        src="/images/header.jpg"
                        alt="hello"
                        width="100%"
                        height="200px"
                      ></img>
                    </div>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Card>
                        <List
                          size="large"
                          header={<h1>รายชื่อผู้ใช้งาน</h1>}
                          bordered
                          dataSource={this.state.allUser}
                          renderItem={item => (
                            <Row>
                              <List.Item>
                                <Col span={2}>{item.id}</Col>
                                <Col span={7}>{item.firstname}</Col>
                                <Col span={7}>{item.lastname}</Col>
                                <Col span={5}>{item.role}</Col>
                                <Col span={3}>
                                  <Button
                                    onClick={() =>
                                      this.handleDeleteUser(item.id)
                                    }
                                  >
                                    X
                                  </Button>
                                </Col>
                              </List.Item>
                            </Row>
                          )}
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Form onSubmit={this.handleSubmit}>
                        <Row>
                          <h1 style={{ margin: "20px" }}>สมัครผู้ใช้งาน</h1>
                        </Row>
                        {/* -----กรอกนามแฝง----- */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>ชื่อผู้ใช้งาน : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("username", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่ชื่อผู้ใช้งานของคุณ!"
                                  }
                                ]
                              })(
                                <Input
                                  prefix={
                                    <Icon
                                      type="user"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="โปรดใส่ชื่อผู้ใช้งาน"
                                />
                              )}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* -----กรอกรหัสผ่าน-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>รหัสผ่าน : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("password", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่รหัสผ่านของคุณ!"
                                  }
                                ]
                              })(
                                <Input
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  type="password"
                                  placeholder="โปรดใส่รหัสผ่าน"
                                />
                              )}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* -----ชื่อจริง-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>ชื่อ : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("firstName", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่ชื่อของคุณ!"
                                  }
                                ]
                              })(<Input placeholder="โปรดใส่ชื่อ" />)}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                        {/* -----นามสกุล-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>นามสกุล : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("lastName", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่นามสกุลของคุณ!"
                                  }
                                ]
                              })(<Input placeholder="โปรดใส่นามสกุล" />)}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                        {/* -----วันเกิด-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>วันเกิด : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              <DatePicker
                                onChange={(date, dateString) =>
                                  this.setState({ birthDay: dateString })
                                }
                                placeholder="วันที่"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                        {/* -----ที่อยู่-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>ที่อยู่ : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("address", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่ที่อยู่ของคุณ!"
                                  }
                                ]
                              })(<Input placeholder="โปรดใส่ที่อยู่" />)}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                        {/* -----เบอร์โทรศัพท์-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>เบอร์โทรศัพท์ : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("phoneNumber", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่เบอร์โทรศัพท์ของคุณ!"
                                  }
                                ]
                              })(<Input placeholder="โปรดใส่เบอร์โทรศัพท์" />)}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                        {/* -----หน้าที่-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>หน้าที่: </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              <Select
                                onChange={value =>
                                  this.setState({ role: `${value}` })
                                }
                                style={{ width: 120 }}
                                placeholder="โปรดเลือก"
                              >
                                <Select.Option value="nurse">
                                  พยาบาล
                                </Select.Option>
                                <Select.Option value="doctor">
                                  หมอ
                                </Select.Option>
                                <Select.Option value="admin">
                                  แอดมิน
                                </Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                        {/* -----------Submit----------- */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col span={24} style={{ textAlign: "center" }}>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                ยืนยัน
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Footer>
                      สงวนลิขสิทธิ์ © 2562 บริษัท นัทฮัฟเฟิลพัพ (ประเทศไทย)
                      จำกัด
                    </Footer>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col className="rightBar" span={3}>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px"
                }}
              >
                <Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Form.create()(ManageUser);
