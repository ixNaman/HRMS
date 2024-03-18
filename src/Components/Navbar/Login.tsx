import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Innovatech_bg from "./qwerty.png";
import { useDispatch } from "react-redux";
import { login } from "../../Actions/authActions";
import Innovatechs from "./Innovatechs.png";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  // const existingUsers = localStorage.getItem("users");
  
  // // Parse existing user data or initialize an empty array
  // const usersArray = existingUsers ? JSON.parse(existingUsers) : [];
  
  // // New user to be added
  // const newUser = {
  //   username: "Naman",
  //   password: "Naman",
  //   role: "Admin" // Adjust the role as needed
  // };
  
  // // Add the new user to the array
  // usersArray.push(newUser);
  
  // // Convert the array to a JSON string
  // const updatedUsersString = JSON.stringify(usersArray);
  
  // // Store the updated string in localStorage with the key "users"
  // localStorage.setItem("users", updatedUsersString);

  const onFinish = (values: any) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    console.log(storedUsers)
    const user = storedUsers.find(
      (u: any) =>
        u.username === values.username && u.password === values.password
    );

    if (user) {
      console.log("Login successful!");
      setError(null);
      dispatch(login(user.role, user.username));
      console.log(user.role);
      console.log(user.username);
      if(user.role==="Admin"){
      navigate("/AdminDashboard");
      } else{
        navigate("/EmployeeDashboard")
      } // Use the navigate function to redirect

      // If login is successful, trigger the onLoginSuccess callback
    } else {
      console.log("Login failed!");
      setError("Invalid username or password");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="animate-vote">
    <div className="flex h-screen  ">
      {/* Background Image */}
      <div
        className="flex-1 bg-cover"
        style={{
          backgroundImage: `url(${Innovatech_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
        }}
      ></div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center ">
        <Form
          name="basic"
          className="bg-cyan-200 bg-opacity-100 p-7 rounded shadow-md flex flex-col w-96 "
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.5)", // Border color with transparency
            boxShadow: "0 0 80px rgba(0, 255, 255, 0.3)", // Box shadow for a 3D effect
          }}
        >
          <img src={Innovatechs} alt="Logo" className="mb-4" />
          <h2 className="text-2xl mb-4 text-center">
            Welcome to Innovatechs! 👋🏻
          </h2>
          <p className="text-center mb-4">Please sign-in to your account </p>

          <Form.Item
            name="username"
            className="w-full"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              className="border-red-600"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              className="w-95 py-2  rounded focus:outline-none focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 text-white rounded py-2 "
              onClick={onFinish}
            >
              <div className="animate-bounce">Sign In</div>
            </Button>
          </Form.Item>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <div className="text-center mt-4">
            <a href="#">Forgot Password?</a>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default Login;
