import React, { Component } from "react";
import { Col, Layout, Row, Menu, Button, List, Card, Input } from "antd";
import { Link } from "react-router-dom";
import Axios from "../../config/axios.setup";

const { Footer } = Layout;
const { TextArea } = Input;

export default class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waittingPatientData: [],
      conclusionPatientData: []
    };
  }


  fetchData = () => {
    Axios.post("http://localhost:8080/getcheckupcase").then(result => {
      this.setState({
        waittingPatientData: result.data
      });
      console.log(this.state.waittingPatientData);
    });
  };

  componentDidMount() {
    this.fetchData()
    var intervalId = setInterval(this.fetchData, 5000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  handleShowConPatient = id => {
    console.log("errrrrrrrrrrrrr");
    Axios.get(`/getPatientDetail/${id}`).then(result => {
      this.setState({ conclusionPatientData: result.data });
      console.log(result.data);
    });
  };

  render() {
    return (
      <div>
        <div>
          <Row>
            <Col className="leftBar" span={3}>
              <Menu
                onClick={this.handleClick}
                style={{ width: "auto" }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                <Menu.ItemGroup key="g2">
                  <Menu.Item key="1" style={{ fontSize: "20px" }}>
                    ห้องตรวจ
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
                  <Row style={{ margin: "20px 20px" }}>
                    <Col span={6} style={{ margin: "10px" }}>
                      <div>
                        <List
                          size="large"
                          header={<h1>รายชื่อผู้ป่วยรอตรวจ</h1>}
                          bordered
                          dataSource={this.state.waittingPatientData}
                          renderItem={item => (
                            <Row>
                              <List.Item>
                                <Col span={10}>{item.firstname}</Col>
                                <Col span={10}>{item.lastname}</Col>
                                <Col span={4}>
                                  <Button
                                    onClick={() =>
                                      this.handleShowConPatient(item.id)
                                    }
                                  >
                                    <i className="fas fa-arrow-right"></i>
                                  </Button>
                                </Col>
                              </List.Item>
                            </Row>
                          )}
                        />
                      </div>
                    </Col>
                    <Col span={17} style={{ margin: "10px" }}>
                      <div>
                        <Card>
                          <h1>ผลการตรวจรักษา</h1>
                          {this.state.conclusionPatientData.map(x => (
                            <Row
                              style={{ fontWeight: "bold", fontSize: "15px" }}
                            >
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
                                  <Col span={12}>
                                    <span>โรคประจำตัว</span>{" "}
                                    {x.congenital_disease}
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
                                <Row>
                                  <Col span={24}>
                                    <span>วินัยฉัยโรค</span>
                                    <TextArea rows={4} />
                                  </Col>
                                </Row>
                                <hr />

                                <Row>
                                <Col span={24}>
                                  <span>รายการจ่ายยา</span>
                                  <TextArea rows={4} />
                                </Col>
                                </Row>

                              </Col>
                            </Row>
                          ))}
                        </Card>
                      </div>
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
                  <Link to="/login">
                    <Button>กลับหน้าเข้าสู่ระบบ</Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
