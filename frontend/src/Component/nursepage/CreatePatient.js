import React, { Component } from "react";
import { Row, Col, Menu, Input, Button } from "antd";
import { Link } from "react-router-dom";


export default class CreatePatient extends Component {
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
                <Menu.ItemGroup key="g2" >
                  <Menu.Item key="1" style={{ fontSize: "20px" }}>
                    ทะเบียนผู้ป่วย<Link to="/nursepatient"></Link>
                  </Menu.Item>
                  <Menu.Item key="2" style={{ fontSize: "20px" }}>
                    จ่ายยา/การเงิน<Link to="/nursedrug"></Link>
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
              <Col span={8}></Col>

              <Col span={8}>
                <Row style={{ marginTop: "10px" }}>
                  <Row>
                    <h1>โปรดกรอกข้อมูลผู้ป่วย</h1>
                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    ชื่อ
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    นามสกุล
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    วันเกิด
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    ที่อยู่
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    เบอร์โทร
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    เบอร์โทรฉุกเฉิน
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    โรคประจำตัว
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    แพ้ยา
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    หมู่เลือด
                    <Input />
                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    <Col span={12}>
                      <Row type="flex" justify="center">
                        <Button type="primary">ยืนยัน</Button>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row type="flex" justify="center">
                      <Link to="/nursepatient"><Button type="primary">กลับหน้าหลัก</Button></Link>
                      </Row>
                    </Col>
                  </Row>
                </Row>
              </Col>

              <Col span={8}></Col>
              
            </Col>

            <Col className="rightBar" span={3}></Col>
          </Row>
        </div>
      </div>
    );
  }
}
