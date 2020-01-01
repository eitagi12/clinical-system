import React, { Component } from "react";
import { Col, Layout, Row, Menu, Button } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

export default class Admin extends Component {
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
                    หน้าหลัก
                  </Menu.Item>
                  <Menu.Item key="2" style={{ fontSize: "20px" }}>
                    จัดการผู้ใช้งาน <Link to="/manageuser"></Link>
                  </Menu.Item>
                  <Menu.Item key="3" style={{ fontSize: "20px" }}>
                    จัดการยา <Link to="/managedrug"></Link>
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
                  <Row >
                    <Col>
                    
                    </Col>
                    <Col>
                    
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
