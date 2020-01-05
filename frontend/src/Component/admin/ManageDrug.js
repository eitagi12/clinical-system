import React, { Component } from "react";
import { Col, Layout, Row, Menu, Button, Card, List, Input, Form } from "antd";
import { Link } from "react-router-dom";
import Axios from "../../config/axios.setup";
import { confirmCreateMedicinesNotification } from "../../Component/notification/notification";

const { Footer } = Layout;

class ManageDrug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMedicine: []
    };
  }

  fetchData = () => {
    Axios.post("http://localhost:8080/getmedicine").then(result => {
      this.setState({
        allMedicine: result.data
      });
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
          name: value.name,
          type: value.type,
          price: value.price
          
        };
        Axios.post("/createmedicine", payload)
          .then(result => {
            console.log(result.data);
            confirmCreateMedicinesNotification();
            this.props.form.resetFields();
            this.fetchData();
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  };

  handleDeleteUser = id => {
    Axios.delete(`/deletemedicine/${id}`).then(result => {})
    .then(result => {
    
      this.fetchData();
    }).catch(err => {
      console.error(err);
    });
  };


  handleLogout = () => {
    localStorage.removeItem("Access_TOKEN");
    this.props.history.push("/login");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div>
          <Row>
            <Col className="leftBar" span={3}>
              <Menu
                onClick={this.handleClick}
                style={{ width: "auto" }}
                defaultSelectedKeys={["3"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                <Menu.ItemGroup key="g2">
                  <Menu.Item key="2" style={{ fontSize: "20px" }}>
                    จัดการผู้ใช้งาน <Link to="/manageuser"></Link>
                  </Menu.Item>
                  <Menu.Item key="3" style={{ fontSize: "20px" }}>
                    จัดการยา
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu>
            </Col>

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
                          header={<h1>รายชื่อยา</h1>}
                          bordered
                          dataSource={this.state.allMedicine}
                          renderItem={item => (
                            <Row>
                              <List.Item>
                                <Col span={10}>{item.name}</Col>

                                <Col span={10}>
                                  <Row>
                                    <Col span={8}>ราคา</Col>
                                    <Col span={8}>{item.price}</Col>
                                    <Col span={8}>บาท</Col>
                                  </Row>
                                </Col>
                                  <Col span={4} style={{textAlign:"center"}}>
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
                    {/* ------------------------------------------------- */}
                    <Col span={12}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                          <h1 style={{ margin: "20px" }}>เพิ่มรายการยา</h1>
                        </Row>
                        {/* -----ชื่อยา-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>ชื่อยา : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("name", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่ชื่อยา!"
                                  }
                                ]
                              })(<Input placeholder="โปรดใส่ชื่อยา" />)}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                        {/* -----ประเภท-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>ประเภท : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("type", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่ประเภทยา!"
                                  }
                                ]
                              })(<Input placeholder="โปรดใส่ประเภทยา" />)}
                            </Form.Item>
                          </Col>
                        </Row>
                        {/* ---------------------- */}
                        {/* -----ราคา-----  */}
                        <Row style={{ fontSize: "20px" }}>
                          <Col
                            span={7}
                            style={{ marginLeft: "10px", textAlign: "right" }}
                          >
                            <span>ราคา : </span>
                          </Col>
                          <Col span={12} style={{ marginLeft: "10px" }}>
                            <Form.Item>
                              {getFieldDecorator("price", {
                                rules: [
                                  {
                                    required: true,
                                    message: "โปรดใส่ราคาของยา!"
                                  }
                                ]
                              })(<Input placeholder="โปรดใส่ราคาของยา" />)}
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
                    {/* -------------------------- */}
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
                  <Button onClick={this.handleLogout}>
                    กลับหน้าเข้าสู่ระบบ
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Form.create()(ManageDrug)