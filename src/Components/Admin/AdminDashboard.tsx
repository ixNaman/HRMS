@ -0,0 +1,92 @@
import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "antd";
import "chart.js/auto";

interface Project {
  id: number;
  name: string;
  status: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  project: Project;
}

const { Meta } = Card;

const AdminDashboard: React.FC = () => {
  const chartData = {
    labels: ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"],
    datasets: [
      {
        label: "Project Completion",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const generateProjects = (): Project[] =>
    Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      name: `Project ${index + 1}`,
      status: Math.random() > 0.5 ? "Active" : "Inactive",
    }));

  const generateEmployees = (projects: Project[]): Employee[] =>
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Employee ${index + 1}`,
      position: "Software Developer",
      project: projects[Math.floor(Math.random() * projects.length)],
    }));

  const projects = generateProjects();
  const employees = generateEmployees(projects);

  return (
    <div>
      <div className="mb-4">
        <h2>Project Completion Chart</h2>
        <Bar data={chartData} />
      </div>
      

      <div className="mb-4">
        <h2>Project Details</h2>
        <div style={{ display: "flex" }}>
          {projects.map((project) => (
            <Card key={`project-${project.id}`} style={{ margin: "0.5rem" }}>
              <Meta title={project.name} description={`Status: ${project.status}`} />
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2>Employee Details</h2>
        <div className="flex-wrap">
          {employees.map((employee) => (
            <Card key={`employee-${employee.id}`} style={{ margin: "0.5rem" }}>
              <Meta
                title={employee.name}
                description={`Position: ${employee.position} - Project: ${employee.project.name}`}
              />
            </Card>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
