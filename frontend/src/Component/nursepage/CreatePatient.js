import React, { Component } from "react";
import { Row, Col, Menu, Input, Button, DatePicker, Select, Form } from "antd";
import { Link } from "react-router-dom";
import Axios from "../../config/axios.setup";
import { successCreatePatientNotification } from "../notification/notification.js"



  // function handleChange(value) {
  //   console.log(`${value}`);
  // }

export default class CreatePatient extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      birthDay: "",
      address: "",
      phoneNumber: "",
      phoneNumberEmergency: "",
      congenital: "",
      medicineAllergic: "",
      bloodType:'',
    };
  }

  
  handleSubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:8080/createpatients", {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      birthday : this.state.birthDay,
      address: this.state.address,
      phone_number: this.state.phoneNumber,
      phone_number_emergency: this.state.phoneNumberEmergency,
      congenital_disease: this.state.congenital,
      allergic_medicine: this.state.medicineAllergic,
      blood_type : this.state.bloodType,
    })
      .then(result => {
        console.log(result.data);
        successCreatePatientNotification()
      })
      .catch(err => {
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
                
                style={{ width: "auto" }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                <Menu.ItemGroup key="g2">
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

              <Form onSubmit={this.handleSubmit}>
                <Row style={{ marginTop: "10px" }}>
                  <Row>
                    <h1>โปรดกรอกข้อมูลผู้ป่วย</h1>
                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    ชื่อ
                    <Form.Item>
                      <Input
                      onChange={e =>
                        this.setState({ firstName: e.target.value })
                      }
                    />
                    </Form.Item>
                    
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    นามสกุล
                    <Form.Item><Input
                      onChange={e =>
                        this.setState({ lastName: e.target.value })
                      }
                    /></Form.Item>
                    
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col span={12}>
                   วันเกิด
                    <Form.Item><DatePicker  onChange={(date,dateString) => this.setState({birthDay: dateString})}  placeholder="วันที่" /></Form.Item>
                    </Col>
                    
                    <Col span={12} style={{ justifyContent: 'right'}}>
                    หมู่เลือด
                    <Form.Item><Select
                    onChange={(value) => this.setState({ bloodType:`${value}`})}
                      style={{ width: 120 }}
                      placeholder="โปรดเลือก"
                    >
                      <Select.Option value="O">O</Select.Option>
                      <Select.Option value="A">A</Select.Option>
                      <Select.Option value="B">B</Select.Option>
                      <Select.Option value="AB">AB</Select.Option>                      
              
                    </Select></Form.Item>
                    
                  </Col>
                    
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    ที่อยู่
                    <Form.Item><Input
                      onChange={e => this.setState({ address: e.target.value })}
                    /></Form.Item>
                    
                  </Row>

                    <Row>
                      <Col span={10}>
                      เบอร์โทร
                    <Form.Item><Input
                      onChange={e =>
                        this.setState({ phoneNumber: e.target.value })
                      }
                    /></Form.Item>
                      </Col>
                      <Col span={10} style={{ marginLeft: "5%" }}>
                      เบอร์โทรฉุกเฉิน
                    <Form.Item><Input
                      onChange={e =>
                        this.setState({ phoneNumberEmergency: e.target.value })
                      }
                    /></Form.Item>
                      </Col>
                    </Row>
                  <Row style={{ marginTop: "5px" }}>
                    โรคประจำตัว
                    <Form.Item><Input
                      onChange={e =>
                        this.setState({ congenital: e.target.value })
                      }
                    /></Form.Item>
                    
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    แพ้ยา
                    <Form.Item>
                      <Input
                      onChange={e =>
                        this.setState({ medicineAllergic: e.target.value })
                      }
                    />
                    </Form.Item>
                    
                  </Row>
                  
                  <Row style={{ marginTop: "5px" }}>
                    <Col span={12}>
                      <Row type="flex" justify="center">
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          ยืนยัน
                        </Button>
                      </Form.Item>
                        
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row type="flex" justify="center">
                        <Link to="/nursepatient">
                          <Button type="primary">กลับหน้าหลัก</Button>
                        </Link>
                      </Row>
                    </Col>
                  </Row>
                </Row>
                </Form>
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
