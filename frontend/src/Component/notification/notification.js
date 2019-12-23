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



 export  {successLoginNotification,failLoginNotification,successCreatePatientNotification}