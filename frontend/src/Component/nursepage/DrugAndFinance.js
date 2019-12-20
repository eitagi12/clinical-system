import React, { Component } from "react";
import { Row, Col, Layout, Menu, List, Descriptions, Button} from "antd";
import { Link } from "react-router-dom";
const { Footer } = Layout;

export default class DrugAndFinance extends Component {
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
                <Col span={5} style={{ margin: "10px",marginLeft: "18px"}}>
                  <List
                    size="large"
                    header={<h1>ผู้ป่วยรอรับยา</h1>}
                    bordered
                  />
                </Col>
                <Col span={18} style={{ margin: "10px" }}>
                  <Descriptions  layout="vertical" bordered>

                    <Descriptions.Item label="ชื่อผู้ป่วย">
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
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <Row>
                <Col span={9}></Col>
                <Col span={9}></Col>
                <Col span={4} style={{margin:"10px"}}><Link to ="/purchased"><Button type="primary">ยืนยันการชำระเงิน</Button></Link></Col>
                
              </Row>

              <Footer>
                สงวนลิขสิทธิ์ © 2562 บริษัท นัทฮัฟเฟิลพัพ (ประเทศไทย) จำกัด
              </Footer>
            </Col>

            <Col className="rightBar" span={3}>
            <Row style={{display:'flex', justifyContent:'center', margin:'10px'}}>
                <Col><Link to="/login"><Button>กลับหน้าเข้าสู่ระบบ</Button></Link></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
