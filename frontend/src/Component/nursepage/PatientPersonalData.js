import React, { Component } from "react";
import { Row, Col, Layout, Menu, List, Button, Input } from "antd";
import { Link } from "react-router-dom";
import Axios from "../../config/axios.setup";
const { Footer } = Layout;




export default class DrugAndFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      firstName:"",
      lastName:"",
        
    };
  }

  // componentDidMount () {
  //   Axios.get("http://localhost:8080/getpatients").then(result => {
  //     this.setState({
  //       data: result.data
  //     });
  //   });
  // }

 handleSearch = e =>{
  Axios.get("http://localhost:8080/getpatients", {
    firstname: this.state.firstName,
    lastname: this.state.lastName
    }).than(result =>{
      console.log(result)
      // Axios.get("http://localhost:8080/getpatients").then(result => {
      // this.setState({
      //   data: result.data
      // });
    // })
    }).catch(err => {
      console.error(err);
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
                    ทะเบียนผู้ป่วย
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
              <Row>
                <div className="searchDiv">
                  <Row style={{ marginTop: "10px" }}>
                    <Col span={4}></Col>
                    <Col span={16}>
                      <Row>
                        <h1>ค้นหาประวัติผู้ป่วย</h1>
                      <Col span={10}>
                      <Input placeholder="โปรดกรอกชื่อ"
                      onChange={e =>
                        this.setState({ firstName: e.target.value })
                      }
                    />
                      </Col>
                      <Col span={10}>
                      <Input placeholder="โปรดกรอกนามสกุล"
                      onChange={e =>
                        this.setState({ lastName: e.target.value })
                      }
                    />
                      </Col>
                      <Col span={4}>
                      <Button type="primary" onClick={this.handleSearch} >ค้นหา</Button>
                      </Col>
                      </Row>
                      
                    </Col>
                    <Col span={4} style={{ marginTop: "10px" }}>
                      <Link to="/createpatient">
                        <Button>เพิ่มประวัติผู้ป่วย</Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Row>

              <Row type="flex" align="middle" style={{ margin: "20px" }}>
                <Col span={6} style={{ margin: "10px" }}>
                  <div className="patientListBox">
                    <List
                      size="large"
                      header={<h1>รายชื่อผู้ป่วย</h1>}
                      bordered
                      dataSource={this.state.data}
                      renderItem={item => <List.Item>{item}</List.Item>}
                    />
                  </div>
                </Col>
                <Col span={17} style={{ margin: "10px" }}>
                  <div className="inputBox">
                    <List
                      size="large"
                      header={<h1>รายละเอียดป่วย</h1>}
                      bordered
                      // dataSource={data}
                      // renderItem={item => <List.Item>{item}</List.Item>}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Footer>
                    สงวนลิขสิทธิ์ © 2562 บริษัท นัทฮัฟเฟิลพัพ (ประเทศไทย) จำกัด
                  </Footer>
                </Col>
              </Row>
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
