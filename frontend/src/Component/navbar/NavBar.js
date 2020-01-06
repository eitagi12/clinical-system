import React, { Component } from "react";
import { Col, Menu, Button } from "antd";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <Col className="leftBar" span={3}>
        <Link onClick={() => this.props.logout()}>
          <Button>กลับหน้าเข้าสู่ระบบ</Button>
        </Link>
        <Menu
          onClick={this.handleClick}
          style={{ width: "auto" }}
          defaultSelectedKeys={["2"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.ItemGroup key="g2">
            <Menu.Item key="1" style={{ fontSize: "20px" }}>
              หน้าหลัก<Link to="/admin"></Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ fontSize: "20px" }}>
              จัดการผู้ใช้งาน
            </Menu.Item>
            <Menu.Item key="3" style={{ fontSize: "20px" }}>
              จัดการยา <Link to="/managedrug"></Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Col>
    );
  }
}
