import React, { useState, useEffect } from "react";
import { Card, Modal, Button, Input, Select, Space, Collapse } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Meta from "antd/es/card/Meta";

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  assignedTo: string;
  status: "inProgress" | "completed";
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status: "inProgress" | "done";
}

interface User {
  id: string;
  name: string;
  role: string;
}

// interface Props {
//   currentUser: User;
// }

const ProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    name: "",
    description: "",
    tasks: [],
    assignedTo: "",
    status: "inProgress",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  useEffect(() => {
    // Load projects from local storage on component mount
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(storedProjects);

    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployees(storedEmployees);
  }, []);

  const [updatedProject, setUpdatedProject] = useState<Project>({
    id: 0,
    name: "",
    description: "",
    tasks: [],
    assignedTo: "",
    status: "inProgress",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      assignedTo: value,
    }));
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateProject = () => {
    const updatedProjects = [
      ...projects,
      { ...newProject, id: projects.length + 1 },
    ];
    setProjects(updatedProjects);
    setNewProject({
      id: 0,
      name: "",
      description: "",
      tasks: [],
      assignedTo: "",
      status: "inProgress",
    });
    setIsModalVisible(false);
    // Save projects to local storage
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const deleteProject = (projectId: number) => {
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
    // Save updated projects to local storage
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };
  const updateProject = (project: Project) => {
    setSelectedProject(project);
    setIsUpdateModalVisible(true);
    // You can set initial values for the update modal here if needed
  };
  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProject((prevProject) => ({
      ...prevProject,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateSelectChange = (value: string) => {
    setUpdatedProject((prevProject) => ({
      ...prevProject,
      assignedTo: value,
    }));
  };

  const handleUpdateProject = () => {
    const updatedProjects = projects.map((p) =>
      p.id === selectedProject?.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    setIsUpdateModalVisible(false);
    // Save updated projects to local storage
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <Space>
          <Input
            placeholder="Search projects"
            className="w-48"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button type="primary" ghost onClick={showModal}>
            <EditOutlined /> Create Project
          </Button>
        </Space>
      </div>
      <div className="flex-row shadow-2xl">
        <Collapse accordion>
          {filteredProjects.map((project) => (
            <Collapse.Panel
              header={<div className="text-black">{project.name}</div>}
              key={project.id.toString()}
              className="bg-gradient-to-r from-blue-300 to-gray-200"
              extra={
                <Space>
                  <Button
                    onClick={() => updateProject(project)}
                    type="default"
                    className="text-green-900"
                  >
                    <EditOutlined />
                    Update
                  </Button>
                  <Button
                    onClick={() => deleteProject(project.id)}
                    danger
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </Space>
              }
            >
              <Card size="default" className="border-2 border-black" >
                <Meta title={`Status: ${project.status}`} />
                <Meta title={`Assigned To: ${project.assignedTo}`} />
                <Meta title={`Description: ${project.description}`} />
                {project.tasks.map((task) => (
                  <Card key={task.id}>
                    <Meta title={`Task: ${task.title}`} />
                    <Meta title={`Status: ${task.status}`} />
                    <Meta title={`Assigned To: ${task.assignedTo}`} />
                    <Meta title={`Description: ${task.description}`} />
                  </Card>
                ))}
              </Card>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>

      <Modal
        title="Create Project"
        open={isModalVisible}
        onOk={handleCreateProject}
        onCancel={handleModalCancel}
      >
        <div>
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <Input
            type="text"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Assigned To:</label>
          <Select
            style={{ width: "100%" }}
            value={newProject.assignedTo}
            onChange={handleSelectChange}
          >
            {employees.map((employee) => (
              <Select.Option key={employee.companyId} value={employee.name}>
                {employee.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* Additional input fields as needed */}
      </Modal>

      <Modal
        title="Update Project"
        open={isUpdateModalVisible}
        onOk={handleUpdateProject}
        onCancel={handleUpdateModalCancel}
      >
        <div>
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={updatedProject.name}
            onChange={handleUpdateInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <Input
            type="text"
            name="description"
            value={updatedProject.description}
            onChange={handleUpdateInputChange}
          />
        </div>
        <div>
          <label>Assigned To:</label>
          <Select
            style={{ width: "100%" }}
            value={updatedProject.assignedTo}
            onChange={handleUpdateSelectChange}
          >
            {employees.map((employee) => (
              <Select.Option key={employee.companyId} value={employee.name}>
                {employee.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* Similar input fields as in TaskManagementSystem */}
      </Modal>
    </div>
  );
};


export default ProjectManagement;
