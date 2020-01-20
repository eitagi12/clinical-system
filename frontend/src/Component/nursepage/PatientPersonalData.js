import React, { Component } from "react";
import Axios from "../../config/axios.setup";
import { Row, Col, Layout, Menu, List, Button, Input, Card, Form } from "antd";
import { Link } from "react-router-dom";
import {
  patientNotfoundNotification,
  successfoundNotification,
  duplicatePatientNotification,
  sendPatientfoundNotification
} from "../notification/notification.js";

const { Footer } = Layout;

class PatientPersonalData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientData: [],
      spacificData: [],
      firstName: "",
      lastName: "",
      weight: "",
      height: "",
      temperature: "",
      pressure: ""
    };
  }

  // componentDidMount () {
  //   Axios.get("http://localhost:8080/getpatients").then(result => {
  //     this.setState({
  //       data: result.data
  //     });
  //   });
  // }

  handleShowPatientDetail = id => {
    console.log("errrrrrrrrrrrrr");
    Axios.get(`/patientDetail/${id}`).then(result => {
      this.setState({ spacificData: result.data });
      console.log(result.data);
    });
  };

  isDuplicatePatient(patientId) {
    for (let item of this.state.patientData) {
      if (item.id === patientId) {
        return true;
      }
    }
    return false;
  }

  handleSearch = () => {
    Axios.post("/getpatients", {
      firstname: this.state.firstName,
      lastname: this.state.lastName
    })
      .then(result => {
        const resultFirstname = result.data[0].firstname;
        const resultLastname = result.data[0].lastname;
        const resultId = result.data[0].id;

        if (resultFirstname !== "" && resultLastname !== "") {
          if (this.isDuplicatePatient(resultId)) {
            duplicatePatientNotification();
          } else {
            this.setState(state => ({
              patientData: [...state.patientData, ...result.data]
              // patientData: state.patientData.concat(result.data)
            }));
            // console.log(this.state.patientData);
            successfoundNotification();
            // localStorage.setItem(result.data)
          }
        }
      })
      .catch(err => {
        console.error("User not found");
        patientNotfoundNotification();
      });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        let payload = {
          firstname: this.state.spacificData[0].firstname,
          lastname: this.state.spacificData[0].lastname,
          congenital_disease: this.state.spacificData[0].congenital_disease,
          allergic_medicine: this.state.spacificData[0].allergic_medicine,
          blood_type: this.state.spacificData[0].blood_type,
          weight: value.weight,
          height: value.height,
          temperature: value.temperature,
          pressure: value.pressure
        };
        console.log(payload);
        Axios.post("/createcheckupcase", payload)
          .then(result => {
            console.log(result.data);
            this.props.form.resetFields();
            sendPatientfoundNotification();
          })
          .catch(err => {
            console.error(err);
          });
      }
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
              <Row>
                <Col span={24}>
                  <Menu
                    onClick={this.handleClick}
                    style={{ width: "auto" }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                  >
                    <Menu.ItemGroup key="g2">
                      <Menu.Item key="1" style={{ fontSize: "20px" }}>
                        ทะเบียนผู้ป่วย
                      </Menu.Item>
                      <Menu.Item key="2" style={{ fontSize: "20px" }}>
                        จ่ายยา/การเงิน<Link to="/nursedrug"></Link>
                      </Menu.Item>
                    </Menu.ItemGroup>
                  </Menu>
                </Col>
              </Row>
            </Col>

            <Col className="content" span={18}>
              <Row>
                <Col span={24}>
                  <img
                    src="/images/header.jpg"
                    alt="hello"
                    width="100%"
                    height="200px"
                  ></img>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row style={{ marginTop: "10px" }}>
                    <Col span={4}></Col>
                    <Col span={16}>
                      <Row>
                        <h1>ค้นหาประวัติผู้ป่วย</h1>
                        <Col span={10}>
                          <Input
                            placeholder="โปรดกรอกชื่อ"
                            onChange={e =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </Col>
                        <Col span={10}>
                          <Input
                            placeholder="โปรดกรอกนามสกุล"
                            onChange={e =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <Button type="primary" onClick={this.handleSearch}>
                            ค้นหา
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                      <Link to="/createpatient">
                        <Button>เพิ่มประวัติผู้ป่วย</Button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row type="flex" style={{ margin: "20px" }}>
                <Col span={6} style={{ margin: "10px" }}>
                  
                    <List
                      size="large"
                      header={<h1>ผลการค้นหา</h1>}
                      bordered
                      dataSource={this.state.patientData}
                      renderItem={item => (
                        <Row>
                          <List.Item>
                            <Col span={10}>{item.firstname}</Col>
                            <Col span={10}>{item.lastname}</Col>
                            <Col span={4}>
                              <Button
                                onClick={() =>
                                  this.handleShowPatientDetail(item.id)
                                }
                              >
                                <i className="fas fa-arrow-right"></i>
                              </Button>
                            </Col>
                          </List.Item>
                        </Row>
                      )}
                    />
                  
                </Col>
                <Col span={17} style={{ margin: "10px" }}>
                  <div className="inputBox">
                    <Card bordered={false} style={{ width: "100%" }}>
                      <h1>รายละเอียดผู้ป่วย</h1>
                      {this.state.spacificData.map(x => (
                        <Row style={{ fontWeight: "bold", fontSize: "20px" }}>
                          <Col>
                            <Row>
                              <Col span={8}>
                                <span>ชื่อ</span> {x.firstname}
                              </Col>
                              <Col span={8}>
                                <span>นามสกุล</span> {x.lastname}
                              </Col>
                              <Col span={8}>
                                <span>เลขประจำตัวผู้ป่วย</span> {x.id}
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col>
                                <span>ที่อยู่</span>
                                <br /> {x.address}
                              </Col>
                            </Row>

                            <Row>
                              <Col span={12}>
                                <span>เบอร์โทร</span> {x.phone_number}
                              </Col>
                              <Col span={12}>
                                <span>เบอร์โทรฉุกเฉิน</span>{" "}
                                {x.phone_number_emergency}
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col span={12}>
                                <span>โรคประจำตัว</span> {x.congenital_disease}
                              </Col>
                              <Col span={12}>
                                <span>แพ้ยา</span> {x.allergic_medicine}
                              </Col>
                            </Row>
                            <Row>
                              <Col span={12}>
                                <span>หมู่เลือด</span> {x.blood_type}
                              </Col>
                            </Row>
                            <hr />

                            <Form onSubmit={this.submitForm} style={{ fontSize: "20px" }}>
                              <Row>
                                <Col span={12}>
                                  <Row>
                                    <Col span={5}>
                                      <span>น้ำหนัก</span>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item>
                                        {getFieldDecorator("weight", {
                                          rules: [
                                            {
                                              required: true,
                                              message: "โปรดกรอกน้ำหนัก"
                                            }
                                          ]
                                        })(
                                          <Input placeholder="โปรดกรอกน้ำหนัก" />
                                        )}
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col span={12}>
                                  <Row>
                                    <Col span={5}>
                                      <span>ส่วนสูง</span>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item>
                                        {getFieldDecorator("height", {
                                          rules: [
                                            {
                                              required: true,
                                              message: "โปรดกรอกส่วนสูง"
                                            }
                                          ]
                                        })(
                                          <Input placeholder="โปรดกรอกส่วนสูง" />
                                        )}
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>

                              <Row>
                                <Col span={12}>
                                  <Row style={{ marginTop: "10px" }}>
                                    <Col span={5}>
                                      <span>อุณหภูมิ</span>
                                    </Col>
                                    <Col span={12}>
                                      {" "}
                                      <Form.Item>
                                        {getFieldDecorator("temperature", {
                                          rules: [
                                            {
                                              required: true,
                                              message: "โปรดกรอกอุณหภูมิ"
                                            }
                                          ]
                                        })(
                                          <Input placeholder="โปรดกรอกอุณหภูมิ" />
                                        )}
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col span={12}>
                                  <Row style={{ marginTop: "10px" }}>
                                    <Col span={5}>
                                      <span>ความดัน</span>
                                    </Col>
                                    <Col span={12}>
                                      {" "}
                                      <Form.Item>
                                        {getFieldDecorator("pressure", {
                                          rules: [
                                            {
                                              required: true,
                                              message: "โปรดกรอกความดัน"
                                            }
                                          ]
                                        })(
                                          <Input placeholder="โปรดกรอกความดัน" />
                                        )}
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col style={{ textAlign: "center" }}>
                                  <Button htmlType="submit">
                                    ส่งเข้าห้องตรวจ
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          </Col>
                        </Row>
                      ))}
                    </Card>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Footer style={{ position: 'fixed', bottom:'0px', width:'100%'}}>
                    สงวนลิขสิทธิ์ © 2562 บริษัท นัทฮัฟเฟิลพัพ (ประเทศไทย) จำกัด
                  </Footer>
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

export default Form.create()(PatientPersonalData);
