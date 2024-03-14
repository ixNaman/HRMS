import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Card, Row, Col, Statistic } from "antd";
import "chart.js/auto";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../../Actions/authTypes";

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

const AdminDashboard: React.FC = () => {
  const userRole = useSelector(
    (state: { auth: AuthState }) => state.auth.role
  );
  if (userRole != "Admin") {
    return (
      <><h1>you don't have authorised access</h1>
      </>
    );
  }
  const [attendanceData, setAttendanceData] = useState<number[]>([]);

  useEffect(() => {
    // Retrieve attendance data from local storage
    const storedAttendance = JSON.parse(localStorage.getItem("attendance") || "{}");

    // Extract the attendance counts for each day
    const attendanceCounts = Object.values(storedAttendance).map((attendances: any) => Object.keys(attendances).length);

    // Update state with retrieved data
    setAttendanceData(attendanceCounts);
  }, []);
  const storedAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");

  const storedLeaves=JSON.parse(localStorage.getItem("leaves"||"[]"))
  const chartData = {
    labels: ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"],
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(255, 159, 64, 0.9)",
          "rgba(255, 205, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(153, 102, 255, 0.9)",
          "rgba(201, 203, 207, 0.9)",
        ],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56],
        label: "Project Completion",
      },
    ],
  };
  const attendancePercentages = attendanceData.map(count => (count / attendanceData.reduce((a, b) => a + b, 0)) * 100);

  const AttData = {
    labels: Object.keys(storedAttendance),
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(255, 159, 64, 0.9)",
          "rgba(255, 205, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(54, 162, 235, 0.9)",
        ],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: attendancePercentages,
        label: "Attendance Records",
      },
    ],
  };

  const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");

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
    <div className="flex-wrap justify-around">
      <Row gutter={16} className="mt-4 ">
        <Col span={6}>
          <Card
            className="ml-6 transform   transition duration-500 hover:scale-125"
            size="small"
            style={{ backgroundColor: "#6CC788", width: "200px" }}
          >
            <Statistic
              title="Active Projects"
              value={projects.filter((p) => p.status === "Active").length}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="transform   transition duration-500 hover:scale-125"
            size="small"
            style={{ backgroundColor: "#D9534F", width: "200px" }}
          >
            <Statistic
              title="Inactive Projects"
              value={projects.filter((p) => p.status === "Inactive").length}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Link to="/EmployeeManagement">
          <Card
            className="transform   transition duration-500 hover:scale-125"
            size="small"
            style={{ backgroundColor: "#5BC0DE", width: "200px" }}
          >
            <Statistic  title="Total Employees" value={storedEmployees.length} />
          </Card>
          </Link>
        </Col>
        <Col span={6}>
        <Link to="/LeaveManagement">

          <Card
            className="transform   transition duration-500 hover:scale-125"
            size="small"
            style={{ backgroundColor: "#F0AD4E", width: "200px" }}
          >
            <Statistic
              title="On Leave"
              value={storedLeaves.length}
            />
          </Card>
          </Link>
        </Col>
      </Row>

      {/* Bar Chart */}
      <div className="flex flex-row mt-3">
        <Card className="bg-gradient-to-t from-blue-200 to-gray-200 ">
          <div
            className="mt-8"
            style={{
              display: "block",
              boxSizing: "border-box",
              height: "244px",
              width: "488px",
            }}
          >
            <Bar data={chartData} />
          </div>
        </Card>
        <Card className="bg-gradient-to-t from-blue-200 to-transparent">
          <div
            className="mt-8 ml-28"
            style={{
              display: "block",
              boxSizing: "border-box",
              height: "244px",
              width: "488px",
            }}
          >
            <Pie data={AttData} />
            <p className="ml-14">Attendance Chart</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
