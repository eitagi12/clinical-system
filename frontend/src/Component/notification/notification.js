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
      description: 'โปรดตรวจสอบชื่อผู้ใช้งานและรหัสผ่าน',
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

  const sendPatientfoundNotification = (message) => {
    notification.open({
      message: 'ส่งผู้ป่วยเข้าห้องตรวจเรียบร้อย',
      icon: <Icon type="check" style={{ color: '#108ee9' }} />,
    });
  };

  const duplicatePatientNotification = (message) => {
    notification.open({
      message: 'มีชื่อผู้ป่วยนี้ในรายชื่อแล้ว',
      icon: <Icon type="close" style={{ color: '#dc4d4d' }} />,
    });
  };

  const confirmDoctorNotification = (message) => {
    notification.open({
      message: 'ยืนยันการตรวจสำเร็จ',
      icon: <Icon type="check" style={{ color: '#108ee9' }} />,
    });
  };

  const confirmCreateUserNotification = (message) => {
    notification.open({
      message: 'สมัครผู้ใช้งานสำเร็จ',
      icon: <Icon type="check" style={{ color: '#108ee9' }} />,
    });
  };


 export  {confirmCreateUserNotification ,successLoginNotification,failLoginNotification,successCreatePatientNotification,patientNotfoundNotification,successfoundNotification,duplicatePatientNotification,confirmDoctorNotification,sendPatientfoundNotification}