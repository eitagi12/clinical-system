import React, { Component } from "react";
import { Col,Layout, Row, Menu } from "antd";

const { Footer } = Layout;

export default class Doctor extends Component {
  
  render() {
    return (
<div>
      <div >
        <Row >
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
                    ห้องตรวจ
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu>
          </Col>

          <Col className="content" span={18}>
            <div className="header">
              <img
                src="/images/header.jpg"
                alt="hello"
                width="100%"
                height="200px"
              ></img>
            </div>

          <h1>อันนี้เป็นหน้าของหมอนะ</h1>
            <Footer>สงวนลิขสิทธิ์ © 2562 บริษัท นัทฮัฟเฟิลพัพ (ประเทศไทย) จำกัด</Footer>
          </Col>

          <Col className="rightBar" span={3}>
            
          </Col>
        </Row>
      </div>
    </div>
    );
  }
}








        
