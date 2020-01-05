import React, { Component } from "react";
import {
  Col,
  Layout,
  Row,
  Menu,
  Button,
  List,
  Card,
  Input,
  Select,
  Form
} from "antd";
import Axios from "../../config/axios.setup";
import { confirmDoctorNotification } from "../notification/notification.js";

const { Footer } = Layout;
const { TextArea } = Input;
const { Option } = Select;

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waittingPatientData: [],
      conclusionPatientData: [],
      medicinesData: [],
      selectedMedicineData: [],
      nameMedicine: "",
      diagnose: "",
      amount: "",
      currentPatientId: null
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

  fetchMedicine = () => {
    Axios.post("http://localhost:8080/getmedicine").then(result => {
      this.setState({
        medicinesData: result.data
      });
      console.log(this.state.medicinesData);
    });
  };

  componentDidMount() {
    this.fetchData();
    this.fetchMedicine();
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
      this.setState({
        conclusionPatientData: result.data,
        currentPatientId: id
      });
      console.log(result.data);
    });
  };

  handleAddMedicine = () => {
    Axios.post("http://localhost:8080/getspacificmedicine", {
      name: this.state.nameMedicine
    })
      .then(result => {
        this.setState(state => ({
          selectedMedicineData: [...state.selectedMedicineData, ...result.data]
        }));
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleConfirmDoctor = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, data) => {
      if (!err) {
        console.log(data);
        let medicinesList = [];

        Object.keys(data).map(key => {
          medicinesList.push({
            id: key,
            amount: data[key]
          })
        })

        console.log(medicinesList);

        Axios.post("http://localhost:8080/createmedicineinvoice", {
          firstname: this.state.conclusionPatientData[0].firstname,
          lastname: this.state.conclusionPatientData[0].lastname,
          diagnose: this.state.diagnose,
          medicinesList: medicinesList
        })
          .then(result => {
            
            Axios.delete(
              `http://localhost:8080/deletepatientcase/${this.state.currentPatientId}`
            );
            this.props.form.resetFields();
            this.setState({
              conclusionPatientData: [],
              selectedMedicineData: [],
              currentPatientId: null
            });
            this.fetchData();
            
            console.log(result.data);
            console.log(this.state.selectedMedicineData);
            confirmDoctorNotification();
            
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };


  handleDeleteMedicine = item =>{
    const data = this.state.selectedMedicineData.filter(i => i.id !== item.id)
    console.log(this.state.selectedMedicineData)
    console.log(item);
    this.setState({
      selectedMedicineData: data
    })
  }

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
                                    <TextArea
                                      onChange={e =>
                                        this.setState({
                                          diagnose: e.target.value
                                        })
                                      }
                                      rows={4}
                                    />
                                  </Col>
                                </Row>
                                <hr />

                                <Row>
                                  <Col span={12}>
                                    <span>จ่ายยา</span>
                                    <Row>
                                      <Col span={16}>
                                        <Select
                                          defaultValue="ชื่อยา"
                                          style={{ width: "100%" }}
                                          onChange={value =>
                                            this.setState({
                                              nameMedicine: `${value}`
                                            })
                                          }
                                        >
                                          {this.state.medicinesData.map(x => (
                                            <Option value={x.name}>
                                              {x.name}
                                            </Option>
                                          ))}
                                        </Select>
                                      </Col>
                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                      <Button onClick={this.handleAddMedicine}>
                                        เพิ่มยา
                                      </Button>
                                    </Row>
                                  </Col>
                                  <Col span={12}>
                                    <Form onSubmit={this.handleConfirmDoctor}>
                                      <Row>
                                        <span>รายการยา</span>
                                        <List
                                          size="large"
                                          bordered
                                          dataSource={
                                            this.state.selectedMedicineData
                                          }
                                          renderItem={item => (
                                            <Row>
                                              <Form.Item>
                                                <List.Item>
                                                  <Col span={10}>
                                                    {item.name}
                                                  </Col>
                                                  <Col
                                                    span={10}
                                                    style={{
                                                      textAlign: "center"
                                                    }}
                                                  >
                                                    <span>จำนวน</span>
                                                    {getFieldDecorator(
                                                      "" + item.id,
                                                      {
                                                        rules: [
                                                          {
                                                            required: true,
                                                            message:
                                                              "โปรดใส่จำนวนยา"
                                                          }
                                                        ]
                                                      }
                                                    )(
                                                      <Input
                                                        style={{
                                                          width: "50%",
                                                          marginLeft: "10px"
                                                        }}
                                                      />
                                                    )}
                                                  </Col>
                                                  <Col span={4} onClick={this.handleDeleteMedicine.bind(this,item)} ><Button>X</Button></Col>
                                                </List.Item>
                                              </Form.Item>
                                            </Row>
                                          )}
                                        />
                                      </Row>
                                      <Row
                                        style={{
                                          textAlign: "center",
                                          marginTop: "10px"
                                        }}
                                      >
                                        <Button htmlType="submit">
                                          ยืนยันการตรวจ
                                        </Button>
                                      </Row>
                                    </Form>
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

export default Form.create()(Doctor);
