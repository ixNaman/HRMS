// TaskManagementSystem.tsx

import React, { useState, useEffect } from "react";
import { Card, Modal, Button, Input, Select, Space, Collapse } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

interface Task {
  id: number;
  title: string;
  description: string;
  AssignedTo: string;
  status: "inProgress" | "done";
}

interface User {
  id: string;
  name: string;
  role: string;
}

interface Props {
  currentUser: User;
}

const TaskManagementSystem: React.FC<Props> = ({ currentUser }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    AssignedTo: "",
    status: "inProgress",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);


  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);

    const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(storedEmployees);
  }, []);
  console.log(employees)
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      AssignedTo: value,
    }));
  };

  const handleCreateTask = () => {
    const updatedTasks = [...tasks, { ...newTask, id: tasks.length + 1 }];
    setTasks(updatedTasks);
    setNewTask({
      id: 0,
      title: "",
      description: "",
      AssignedTo: "",
      status: "inProgress",
    });
    setIsModalVisible(false);
    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const updateTask = (task: Task) => {
    setSelectedTask(task);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask?.id ? newTask : task
    );
    setTasks(updatedTasks);
    setIsUpdateModalVisible(false);
    // Save updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    // Save updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <Space>
          <Input
            placeholder="Search tasks"
            className="w-48"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button type="primary" ghost onClick={showModal}>
            <EditOutlined /> Create Task
          </Button>
        </Space>
      </div>
      <div className="flex-row shadow-2xl  ">
        <Collapse accordion>
          {filteredTasks.map((task) => (
            <Collapse.Panel
              header= {<div className="text-white">{task.title}</div>}
              key={task.id.toString()}
              style={{backgroundColor:"#213d67"}}
              extra={
                <Space>
                  <Button onClick={() => updateTask(task)} type="default" className="text-blue-200" >
                    <EditOutlined />
                    Update
                  </Button>
                  <Button
                    onClick={() => deleteTask(task.id)}
                    danger
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </Space>
              }
            >
              <p>Status: {task.status}</p>
              <p>Assigned To: {task.AssignedTo}</p>
              <p>Description: {task.description}</p>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>

      <Modal
        title="Create Task"
        open={isModalVisible}
        onOk={handleCreateTask}
        okText="Submit"
        okType="text"
        onCancel={handleModalCancel}
      >
        <div>
          <label>Title:</label>
          <Input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <Input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Assigned To:</label>
          <Select
            style={{ width: "100%" }}
            value={newTask.AssignedTo}
            onChange={handleSelectChange}
          >
           {employees.map((employee) => (
              <Select.Option key={employee.companyId} value={employee.name}>
                {employee.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>

      <Modal
        title="Update Task"
        open={isUpdateModalVisible}
        onOk={handleUpdateTask}
        okText="Submit"
        okType="text"
        onCancel={handleUpdateModalCancel}
      >
        <div>
          <label>Title:</label>
          <Input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <Input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Assigned To:</label>
          <Select
            style={{ width: "100%" }}
            value={newTask.AssignedTo}
            onChange={handleSelectChange}
          >
            {employees.map((employee) => (
              <Select.Option key={employee.companyId} value={employee.name}>
                {employee.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Status:</label>
          <Select
            style={{ width: "100%" }}
            value={newTask.status}
            onChange={(value) =>
              setNewTask((prevTask) => ({ ...prevTask, status: value }))
            }
          >
            <Select.Option value="inProgress">In Progress</Select.Option>
            <Select.Option value="done">Done</Select.Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default TaskManagementSystem;
