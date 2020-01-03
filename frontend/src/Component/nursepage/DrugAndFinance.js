import React, { Component } from "react";
import { Row, Col, Layout, Menu, List, Button, Card } from "antd";
import { Link } from "react-router-dom";
import Axios from "../../config/axios.setup";
const { Footer } = Layout;

export default class DrugAndFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waittingFinance: [],
      conclusionFinanceData: [],
      currentInvoicesId: null,
      totalPrice: 0
    };
  }
  fetchData = () => {
    Axios.post("http://localhost:8080/getinvoices").then(result => {
      this.setState({
        waittingFinance: result.data
      });
      console.log(this.state.waittingFinance);
    });
  };

  componentDidMount() {
    this.fetchData();
    var intervalId = setInterval(this.fetchData, 5000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  handleShowInvoicePatient = id => {
    console.log("errrrrrrrrrrrrr");
    console.log(id);
    Axios.post("http://localhost:8080/getinvoicedetail", {
      invoiceId: id
    }).then(result => {
      this.setState(state => ({
        conclusionFinanceData: result.data
      }));
      this.setState(state => ({
        totalPrice: this.calculateTotalAmount(result.data[0].medicines)
      }));
      console.log(result.data);
    });
  };

  calculateTotalAmount(medicinesList) {
    let total = 0;
    medicinesList.map(medicines => {
      total += medicines.price * medicines.medicinesInvoice.amount;
    });
    return total;
  }

  render() {
    return (
      <div>
        <div>
          <Row>
            <Col className="leftBar" span={3}>
              <Menu
                onClick={this.handleClick}
                style={{ width: "auto" }}
                defaultSelectedKeys={["2"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                <Menu.ItemGroup key="g2">
                  <Menu.Item key="1" style={{ fontSize: "20px" }}>
                    ทะเบียนผู้ป่วย<Link to="/nursepatient"></Link>
                  </Menu.Item>
                  <Menu.Item key="2" style={{ fontSize: "20px" }}>
                    จ่ายยา/การเงิน
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu>
            </Col>

            <Col className="content" span={18}>
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
              <Row style={{ marginTop: "10px" }}>
                <Col span={4}></Col>
                <Col span={16}>
                  <h1>จ่ายยาและการเงิน</h1>
                </Col>
                <Col span={4}></Col>
              </Row>

              <Row>
                <Col span={5} style={{ margin: "10px", marginLeft: "18px" }}>
                  <List
                    size="large"
                    header={<h1>ผู้ป่วยรอรับยา</h1>}
                    bordered
                    dataSource={this.state.waittingFinance}
                    renderItem={item => (
                      <Row>
                        <List.Item>
                          <Col span={10}>{item.firstname}</Col>
                          <Col span={10}>{item.lastname}</Col>
                          <Col span={4}>
                            <Button
                              onClick={() =>
                                this.handleShowInvoicePatient(item.id)
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
                <Col span={18} style={{ margin: "10px" }}>
                  <Card>
                    <Row style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {this.state.conclusionFinanceData[0] && (
                        <Col>
                          <Row>
                            <Col span={24}>
                              <h1>รายการจ่ายยา</h1>
                            </Col>
                          </Row>

                          <Row>
                            <Col span={10}>
                              <span>ชื่อ</span>{" "}
                              {this.state.conclusionFinanceData[0].firstname ||
                                ""}
                            </Col>
                            <Col span={10}>
                              <span>นามสกุล</span>{" "}
                              {this.state.conclusionFinanceData[0].lastname ||
                                ""}
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col>
                              <h3>รายการจ่ายยา</h3>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={6}>ชื่อยา</Col>
                            <Col span={6}>จำนวน</Col>
                            <Col span={6}>ราคาต่อหน่วย</Col>
                            <Col span={6}>ยอดรวม</Col>
                          </Row>

                          {this.state.conclusionFinanceData[0].medicines.map(
                            x => (
                              <Row
                                style={{ fontWeight: "bold", fontSize: "15px" }}
                              >
                                <Col span={6}>{x.name}</Col>
                                <Col span={6}>{x.medicinesInvoice.amount}</Col>
                                <Col span={6}>{x.price}</Col>
                                <Col span={6}>
                                  {x.medicinesInvoice.amount * x.price}
                                </Col>
                              </Row>
                            )
                          )}
                          <hr />
                          <Row style={{ marginTop: "10px" }}>
                            <Col span={13}>
                              <span></span>
                            </Col>
                            <Col span={3}>ยอดรวมสุทธิิ</Col>
                            <Col span={3} style={{ textAlign: "center" }}>
                              <span>{this.state.totalPrice}</span>
                            </Col>
                            <Col span={3}>
                              <span>บาท</span>
                            </Col>
                          </Row>
                        </Col>
                      )}
                    </Row>
                    {/* <Descriptions.Item label="ชื่อผู้ป่วย">
                      นายเมธา
                    </Descriptions.Item>
                    <Descriptions.Item label="นามสกุลผู้ป่วย" span={2}>
                      บ้าไปแล้ว
                    </Descriptions.Item>

                    <Descriptions.Item label="แพทย์ผู้ตรวจ">
                      นายนัท สุดยอดหมอขั้นเทพ
                    </Descriptions.Item>
                    <Descriptions.Item label="เลขที่">
                      21145
                    </Descriptions.Item>
                    <Descriptions.Item label="วันที่รับการรักษา">
                      20/12/2562
                    </Descriptions.Item>


                    
                    <Descriptions.Item label="รายการ">
                          พาราเซตตามอล<br/>
                          พาราเซตตามอล<br/>
                          พาราเซตตามอล<br/>
                          พาราเซตตามอล<br/>
                          
                    </Descriptions.Item>
                    <Descriptions.Item label="จำนวน">
                    5<br/>
                    2<br/>
                    1<br/>
                    2<br/>
                    </Descriptions.Item>
                    <Descriptions.Item label="จำนวนเงิน">
                      50<br/>
                      20<br/>
                      10<br/>
                      20<br/>
                    </Descriptions.Item>
                    <Descriptions.Item label="จำนวนเงิน">
                      รวมทั้งสิ้น
                    </Descriptions.Item>
                    <Descriptions.Item label="100" span={2}>
                      100 บาทถ้วน
                    </Descriptions.Item> */}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={9}></Col>
                <Col span={9}></Col>
                <Col span={4} style={{ margin: "10px" }}>
                  <Link to="/purchased">
                    <Button type="primary">ยืนยันการชำระเงิน</Button>
                  </Link>
                </Col>
              </Row>

              <Footer>
                สงวนลิขสิทธิ์ © 2562 บริษัท นัทฮัฟเฟิลพัพ (ประเทศไทย) จำกัด
              </Footer>
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
