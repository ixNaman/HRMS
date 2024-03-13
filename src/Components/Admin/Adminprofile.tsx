import React, { useState } from "react";
import { Card, Form, Input, Button, notification, Upload, Avatar } from "antd";
import { UserOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AuthState } from "../../Actions/authTypes";

interface AdminProfile {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  profilePhoto: string;
}

const { Dragger } = Upload;

const AdminProfilePage: React.FC = () => {
  const userRole = useSelector(
    (state: { auth: AuthState }) => state.auth.role
  );
  if (userRole != "Admin") {
    return (
      <><h1>you don't have authorised access</h1>
      </>
    );
  }
  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    id: 1,
    username: "admin",
    email: "admin@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, City",
    profilePhoto: "", // You can provide a default URL or use a placeholder
  });

  const onFinish = (values: any) => {
    // Update admin profile with the form values
    setAdminProfile((prevProfile) => ({
      ...prevProfile,
      username: values.username,
      email: values.email,
      phone: values.phone,
      address: values.address,
      // You might handle the profile photo upload separately
      // For now, we're just storing the file name or URL
      profilePhoto: values.profilePhoto ? values.profilePhoto : "",
    }));

    // Display success notification
    notification.success({
      message: "Profile Updated",
      description: "Admin profile has been successfully updated.",
    });
  };

  const beforeUpload = (file: File) => {
    // Implement any validation logic for the file
    // For simplicity, we're allowing all file types
    return true;
  };

  const customRequest = ({ file, onSuccess }: any) => {
    // Simulate an asynchronous upload process
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      // Read the uploaded file as base64
      const reader = new FileReader();
      setTimeout(() => {
        console.log(reader.result);
      }, 2000);
      console.log(reader.result, "r");
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        console.log(base64String, "base64");
      };
      reader.onload = (event) => {
        setAdminProfile((prevProfile) => ({
          ...prevProfile,
          profilePhoto: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <Card title="Admin Profile">
      <Form
        initialValues={adminProfile}
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            { pattern: /^\d{3}-\d{3}-\d{4}$/, message: "Invalid phone number" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Profile Photo"
          name="profilePhoto"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[{ required: true, message: "Please upload a profile photo" }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            onChange={handleChange}
            showUploadList={false} // Hide the file list
          >
            <Avatar
              size={100}
              src={adminProfile.profilePhoto} // Display the uploaded image or placeholder
              icon={<UserOutlined />}
            />
            <div style={{ marginTop: 8 }}>
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" ghost htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminProfilePage;
