import React, { useState } from "react";
import { AuthState } from "../../Actions/authTypes";
import { useSelector } from "react-redux";
import { Card, Row, Col, Typography, Button, Modal, message } from "antd";

const { Title, Text } = Typography;

const EmployeeTasks = () => {
  const username = useSelector(
    (state: { auth: AuthState }) => state.auth.username
  );

  const [storedTasks, setStoredTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (taskId) => {
    setSelectedTask(taskId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const updatedTasks = storedTasks.map((task) =>
      task.id === selectedTask ? { ...task, status: "completed" } : task
    );

    setStoredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsModalVisible(false);
    message.success("Task marked as completed!");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const userTasks = storedTasks
    .filter((task) => task.AssignedTo === username);

  console.log("User tasks:", userTasks);

  return (
    <div className="">
      <Row justify="center" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>Your Tasks, {username}:</Title>
        </Col>
      </Row>
      <div className="ml-8 ">
      <Row gutter={[16, 16]} >
        {userTasks.map((task) => (
          <Col key={task.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={`Title: ${task.title}`} style={{ height: "100%" }}>
              <Text>{task.description}</Text>
              <br />
              <Text >Status: {task.status || "No status"}</Text>
              <br />
              {task.status !== "completed" && (
                <Button
                  type="primary" ghost
                  onClick={() => showModal(task.id)}
                  style={{ marginTop: 8 }}
                >
                  Mark as Completed
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      </div>
      <Modal
        title="Confirm Task Completion"
        open={isModalVisible}
        onOk={handleOk}
        okType="default"
        onCancel={handleCancel}
      >
        <p>Are you sure you want to mark this task as completed?</p>
      </Modal>
    </div>
  );
};

export default EmployeeTasks;
