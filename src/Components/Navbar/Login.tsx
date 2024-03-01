import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Innovatech_bg from '../../assets/Innovatech-bg.jpg'


interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  

  const onFinish = (values: any) => {
    
    // Retrieve stored username and password from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (values.username === storedUsername && values.password === storedPassword) {
      console.log('Login successful!');
      setError(null);
      // If login is successful, trigger the onLoginSuccess callback
      onLoginSuccess();
    } else {
      console.log('Login failed!');
      setError('Invalid username or password');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
<div className='h-screen flex items-center justify-center' style={{ backgroundImage: `url(${Innovatech_bg})`, backgroundSize: 'cover' , height:"100vh", width:"auto"}}>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          height:"38vh"
        
        }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className='text-black '>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;
