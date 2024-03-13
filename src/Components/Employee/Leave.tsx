import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Typography, Card } from "antd";
import { useSelector } from "react-redux";
import { AuthState } from "../../Actions/authTypes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;
const { Option } = Select;

const LeaveForm = () => {
  const [form] = Form.useForm();
  const username = useSelector(
    (state: { auth: AuthState }) => state.auth.username
  );
  const [leaveId, setLeaveId] = useState(1);

  useEffect(() => {
    // Retrieve the last used leaveId from local storage
    const lastLeaveId = parseInt(localStorage.getItem("lastLeaveId") || "1", 10);
    setLeaveId(lastLeaveId);
  }, []);

  const storedLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");

  const handleFormSubmit = (status) => {
    const formData = form.getFieldsValue();

    const leaveData = {
      username,
      leaveId,
      status,
      ...formData,
    };

    setLeaveId(leaveId + 1);

    const existingLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    const updatedLeaves = [...existingLeaves, leaveData];

    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));
    localStorage.setItem("lastLeaveId", leaveId + 1); // Update last used leaveId
    form.resetFields();
    toast.success('Leave application submitted successfully!');
  };

  const validateNumber = (_, value) => {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue) || intValue <= 0) {
      return Promise.reject(
        new Error("Please enter a valid number greater than 0")
      );
    }
    return Promise.resolve();
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <Card>
          <Title level={3}>Apply for leave</Title>
          <Form
            form={form}
            initialValues={{}}
            onFinish={() => handleFormSubmit("pending")}
            layout="vertical"
          >
  <Form.Item
              name="employee"
              label="Employee"
              rules={[{ required: true, message: "Please select an employee" }]}
            >
              <Select placeholder="--- Select Employee ---">
                <Option value={username}>{username}</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[
                { required: true, message: "Please select a leave type" },
              ]}
            >
              <Select placeholder="--- Select Type ---">
                <Option value="Casual Leave">Casual Leave</Option>
                <Option value="Earned Leave">Earned Leave</Option>
                <Option value="Leave Without Pay">Leave Without Pay</Option>
                <Option value="Marriage Leave">Marriage Leave</Option>
                <Option value="Optional Holiday">Optional Holiday</Option>
                <Option value="Sick Leave">Sick Leave</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
            <Form.Item
              name="noOfDays"
              label="Number of days"
              rules={[
                { required: true, message: "Please enter the number of days" },
                { validator: validateNumber },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                { required: true, message: "Please select a start date" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true, message: "Please select an end date" }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name="reason"
              label="Reason"
              rules={[{ required: true, message: "Please enter a reason" }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" ghost htmlType="submit">
                Apply
              </Button>
            </Form.Item>          </Form>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default LeaveForm;
