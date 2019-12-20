import React, { Component } from "react";
import { Layout, Result, Button } from "antd";
import { Link } from "react-router-dom";
const { Footer } = Layout;

export default class PurchasedResult extends Component {
  render() {
    return (
      <div>
        <Result
          status="success"
          title="จ่ายเงินสำเร็จ"
          subTitle="เลขที่คำสั่งจ่ายยา: 2017182818828182881 ได้รับการชำระเงินเรียบร้อย"
          extra={[
            <Link to="/nursepatient">
              <Button type="primary" key="patient">
                กลับหน้าทะเบียนผู้ป่วย
              </Button>
            </Link>,
            <Link to="/nursedrug">
                <Button key="drug">กลับหน้าจ่ายยา</Button>
            </Link>
            
          ]}
        />
      </div>
    );
  }
}
