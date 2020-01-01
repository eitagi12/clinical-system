import { notification, Icon } from 'antd'
import React from 'react'

const successLoginNotification = () => {
    notification.open({
      message: 'เข้าสู่ระบสำเร็จ',
      description:
        'ยินดีต้อนรับเข้าสู่ระบบ',
      icon: <Icon type="check" style={{ color: '#108ee9' }} />,
    });
  };

  const failLoginNotification = (message) => {
    notification.open({
      message: 'เข้าสู่ระบบผิดพลาด',
      description: 'โปรดตรวจสอบนามแฝงและรหัสผ่าน',
      icon: <Icon type="close" style={{ color: '#dc4d4d' }} />,
    });
  };

  const successCreatePatientNotification = () => {
    notification.open({
      message: 'ลงทะเบียนผู้ป่วยสำเร็จ',
      icon: <Icon type="check" style={{ color: '#108ee9' }} />,
    });
  };

  const successfoundNotification = () => {
    notification.open({
      message: 'เพิ่มผู้ป่วยลงในรายชื่อผู้ป่วยสำเร็จ',
      icon: <Icon type="check" style={{ color: '#108ee9' }} />,
    });
  };

  const patientNotfoundNotification = (message) => {
    notification.open({
      message: 'หาข้อมูลผู้ป่วยไม่พบ',
      description: 'โปรดตรวจสอบชื่อและนามสกุลผู้ป่วย',
      icon: <Icon type="close" style={{ color: '#dc4d4d' }} />,
    });
  };

  const duplicatePatientNotification = (message) => {
    notification.open({
      message: 'มีชื่อผู้ป่วยนี้ในรายชื่อแล้ว',
      icon: <Icon type="close" style={{ color: '#dc4d4d' }} />,
    });
  };


 export  {successLoginNotification,failLoginNotification,successCreatePatientNotification,patientNotfoundNotification,successfoundNotification,duplicatePatientNotification}