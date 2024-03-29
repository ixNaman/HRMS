import React, { useState, useEffect } from "react";
import { Space } from "antd";
import moment from "moment";
import {
  Card,
  Select,
  Modal,
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  message,
} from "antd";
import Meta from "antd/es/card/Meta";
import { UserAddOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AuthState } from "../../Actions/authTypes";

const { Option } = Select;

type Props = {};

interface Employee {
  id: number;
  name: string;
  lastName: string;
  email: string;
  position: string;
  age: number;
  birthdate: string;
  skills: string[];
  companyId: string;
  password: string;
  project: Project;
  phoneNumber: string;
  role: string;
  department: string;
  dateOfJoining: string;
  address: string;
  reportingTo: string;
  photo:string;
}

interface Userinfo {
  username: string;
  password: string;
  role: string;
}

interface Project {
  id: number;
  name: string;
  status: string;
}

const EmployeeManagement = (props: Props) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState<
    number | null
  >(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const userRole = useSelector((state: { auth: AuthState }) => state.auth.role);

  useEffect(() => {
    // Load employees from local storage on component mount
    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployees(storedEmployees);
    setFilteredEmployees(storedEmployees);
  }, []);

  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;

      const newEmployee: Employee = {
        id: newId,
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        position: values.position,
        age: values.age,
        birthdate: values.birthdate,
        skills: values.skills,
        companyId: values.companyId,
        password: values.password,
        phoneNumber: values.phoneNumber,
        role: values.role,
        project: { id: 1, name: "Project 1", status: "Active" },
        department: values.department,
        dateOfJoining: values.dateOfJoining,
        address: values.address,
        reportingTo: values.reportingTo,
        photo:values.photo,
      };

      setEmployees([...employees, newEmployee]);
      setFilteredEmployees([...employees, newEmployee]);

      const storedEmployees = JSON.parse(
        localStorage.getItem("employees") || "[]"
      );
      storedEmployees.push(newEmployee);
      localStorage.setItem("employees", JSON.stringify(storedEmployees));

      const storedUserCredentials = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      storedUserCredentials.push({
        username: values.companyId,
        password: values.password,
        role: values.role,
      });
      localStorage.setItem("users", JSON.stringify(storedUserCredentials));

      message.success("Employee added successfully!");
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onChange = (value: string) => {};

  const onSearch = (value: string) => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  function updateEmployee(employee: Employee): void {
    setSelectedEmployee(employee);
    const index = employees.findIndex(
      (e) => e.companyId === employee.companyId
    );
    setSelectedEmployeeIndex(index);
    form.setFieldsValue({
      name: employee.name,
      lastName: employee.lastName,
      age: employee.age,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      birthdate: employee.birthdate, // Assuming birthdate is a valid date string
      skills: employee.skills, // Assuming skills is an array
      position: employee.position,
      role: employee.role,
      department: employee.department,
      dateOfJoining: employee.dateOfJoining,
      address: employee.address,
      reportingTo: employee.reportingTo,
      photo:employee.photo,
    });
    setIsUpdateModalVisible(true);
  }
  const handleUpdateOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (selectedEmployee && selectedEmployeeIndex !== null) {
          const updatedEmployee = {
            ...selectedEmployee,
            name: values.name,
            lastName: values.lastName,
            position: values.position,
            email: values.email,
            age: values.age,
            birthdate: moment(values.birthdate).format("YYYY-MM-DD"),
            skills: values.skills,
            companyId: values.companyId,
            password: values.password,
            phoneNumber: values.phoneNumber,
            role: values.role,
            department: values.department,
            dateOfJoining: values.dateOfJoining,
            address: values.address,
            reportingTo: values.reportingTo,
            photo:values.photo,
          };

          const updatedEmployees = [...employees];
          updatedEmployees[selectedEmployeeIndex] = updatedEmployee;

          setEmployees(updatedEmployees);
          setFilteredEmployees(updatedEmployees);

          const storedEmployees = JSON.parse(
            localStorage.getItem("employees") || "[]"
          );
          storedEmployees[selectedEmployeeIndex] = updatedEmployee;
          localStorage.setItem("employees", JSON.stringify(storedEmployees));

          // Update user role in local storage
          const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
          const updatedUsers = storedUsers.map((user) => {
            if (user.username === updatedEmployee.name) {
              return { ...user, role: values.role };
            }
            return user;
          });
          localStorage.setItem("users", JSON.stringify(updatedUsers));

          message.success("Employee updated successfully!");
          form.resetFields();
          setIsUpdateModalVisible(false);
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleUpdateCancel = () => {
    form.resetFields();
    setIsUpdateModalVisible(false);
  };

  function removeEmployee(companyId: string): void {
    // Implement your logic for removing an employee
    const updatedEmployees = employees.filter(
      (employee) => employee.companyId !== companyId
    );
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);

    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    const updatedStoredEmployees = storedEmployees.filter(
      (employee: Employee) => employee.companyId !== companyId
    );
    localStorage.setItem("employees", JSON.stringify(updatedStoredEmployees));

    const storedUsers = localStorage.getItem("users");
    let loginDetails: Userinfo[] = JSON.parse(storedUsers || "[]");

    const updatedUsers = loginDetails.filter(
      (loginDetail: Userinfo) => loginDetail.username !== companyId
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    message.success("Employee removed successfully!");
  }

  function ViewProfile(id: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="">
        <div className="flex justify-center items-center">
          <Select
            style={{ width: 300 }}
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
          >
            {filteredEmployees.map((employee) => (
              <Select.Option key={employee.companyId} value={employee.name}>
                {employee.name}
              </Select.Option>
            ))}
          </Select>
          {userRole === "Admin" && (
            <Button
              type="primary"
              ghost
              onClick={showModal}
              className="ml-4 text-black box"
            >
              {" "}
              <UserAddOutlined /> Add Employee
            </Button>
          )}
        </div>
      </div>
      <div>
        {filteredEmployees.map((employee) => (
          <Card
            key={`employee-${employee.id}`}
            style={{ margin: "0.5rem" }}
            className="bg-gradient-to-r from-cyan-200  to-gray-200"
          >
            <div className="flex flex-row justify-between items-center ">
              <div>
                <Meta
                  title={employee.name}
                  description={`Position: ${employee.position} - Project: ${employee.project.name}`}
                />
                <p>Phone Number: {employee.phoneNumber}</p>
                <p>Birthdate: {employee.birthdate}</p>
              </div>
              <div className="flex justify-between">
                <Space>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => ViewProfile(employee.id)}
                  >
                    View profile
                  </Button>
                  {userRole === "Admin" && (
                    <>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => updateEmployee(employee)}
                      >
                        Update
                      </Button>
                      <Button
                        danger
                        onClick={() => removeEmployee(employee.companyId)}
                        className="ml-2"
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </Space>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Modal
        title="Update Employee"
        open={isUpdateModalVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
        okButtonProps={{ type: "default" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="name"
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please enter the age" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Birthdate"
            name="birthdate"
            rules={[{ required: true, message: "Please select the birthdate" }]}
          >
            <input type="date" />
          </Form.Item>
          <Form.Item
            label="Skills"
            name="skills"
            rules={[{ required: true, message: "Please enter the skills" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please enter the position" }]}
          >
            <Radio.Group>
              <Radio value="Software Developer">Software Developer</Radio>
              <Radio value="Project Manager">Project Manager</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please enter the role" }]}
          >
            <Radio.Group>
              <Radio value="Admin">Admin</Radio>
              <Radio value="Manager">Manager</Radio>
              <Radio value="Employee">Employee</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please enter the department" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Joining"
            name="dateOfJoining"
            rules={[
              { required: true, message: "Please select the date of joining" },
            ]}
          >
            <input type="date" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Reporting To"
            name="reportingTo"
            rules={[
              { required: true, message: "Please enter the reporting to" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company ID"
            name="companyId"
            rules={[{ required: true, message: "Please enter the Company ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter the password" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Employee"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ type: "default" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="name"
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please enter the age" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Birthdate"
            name="birthdate"
            rules={[{ required: true, message: "Please select the birthdate" }]}
          >
            <input type="date" />
          </Form.Item>
          <Form.Item
            label="Skills"
            name="skills"
            rules={[{ required: true, message: "Please enter the skills" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please enter the position" }]}
          >
            <Radio.Group>
              <Radio value="Software Developer">Software Developer</Radio>
              <Radio value="Project Manager">Project Manager</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please enter the role" }]}
          >
            <Radio.Group>
              <Radio value="Admin">Admin</Radio>
              <Radio value="Manager">Manager</Radio>
              <Radio value="Employee">Employee</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please enter the department" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Joining"
            name="dateOfJoining"
            rules={[
              { required: true, message: "Please select the date of joining" },
            ]}
          >
            <input type="date" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Reporting To"
            name="reportingTo"
            rules={[
              { required: true, message: "Please enter the reporting to" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company ID"
            name="companyId"
            rules={[{ required: true, message: "Please enter the Company ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter the password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleOk}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EmployeeManagement;
