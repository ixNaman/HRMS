import * as React from "react";
import { Layout, Menu } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  CheckSquareOutlined,
  CarryOutOutlined,
  FileOutlined,
  CalendarOutlined,
  BookOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../Actions/authTypes";

interface SidebarState {
  collapsed: boolean;
  mode: "vertical" | "inline" | "horizontal"; // Removed `undefined` from the type
}

const Sidebar: React.FC = () => {
  const [state, setState] = React.useState<SidebarState>({
    collapsed: false,
    mode: "inline",
  });
  

  const userRole = useSelector((state: { auth: AuthState }) => state.auth.role);
  const user = useSelector((state: { auth: AuthState }) => state.auth.username);
  console.log(user,"qwerty")
  console.log(userRole,"sadfghjk")


  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
      mode: state.collapsed ? "inline" : "vertical",
    });
  };
  return (
    <div>
      <Layout.Sider
        collapsible
        collapsed={state.collapsed}
        onCollapse={toggle}
        style={{ height: "100vh" }}
        trigger=" "
      >
        <Menu
          theme="dark"
          mode={state.mode}
          defaultSelectedKeys={[state.currentSelectedKey]}
          style={{ height: "100vh" }}
        >
          <Menu.Item key="0" onClick={toggle}>
            <span>
              {state.collapsed ? <MenuOutlined /> : <CloseOutlined />}
              <span
                className="nav-text"
                style={{ color: "White", fontWeight: "bolder" }}
              >
               
                Hello, {user}
              </span>
            </span>
          </Menu.Item>

        
          {userRole === "Admin" && (
            <>
              <Menu.Item key="1">
                <HomeOutlined />
                <Link to="/Home"></Link>
                <span className="nav-text"> Home</span>
              </Menu.Item>
              <Menu.Item key="2">
                <CheckSquareOutlined />
                <Link to="/EmployeeManagement"></Link>
                <span className="nav-text"> Employees</span>
              </Menu.Item>
              <Menu.Item key="3">
                <CarryOutOutlined />
                <Link to="/LeaveManagement"></Link>

                <span className="nav-text">Leave Management </span>
              </Menu.Item>
              <Menu.Item key="4">
                <CalendarOutlined />
                <Link to="/AttendanceTracking"></Link>
                <span className="nav-text"> Attendance Tracking </span>
              </Menu.Item>
              <Menu.Item key="5">
                <BookOutlined />
                <Link to="/TaskManagement"></Link>
                <span className="nav-text"> Task Management </span>
              </Menu.Item>
              <Menu.Item key="6">
                <BarChartOutlined />
                <span className="nav-text">Performance Review </span>
              </Menu.Item>
            </>
          )}
          {userRole === "Employee" && (
            <>
              <Menu.Item key="1">
                <HomeOutlined />
                <Link to="/EmployeeDashboard"></Link>
                <span className="nav-text"> Home</span>
              </Menu.Item>
              <Menu.Item key="2">
                <CheckSquareOutlined />
                <Link to="/EmployeeManagement"></Link>
                <span className="nav-text"> Employees</span>
              </Menu.Item>
              <Menu.Item key="3">
                <CarryOutOutlined />
                <Link to="/LeaveForm"></Link>
                <span className="nav-text">Leave </span>
              </Menu.Item>
              <Menu.Item key="4">
                <CalendarOutlined />
                <Link to="/EmployeeAttendance"></Link>
                <span className="nav-text"> Attendance Tracking </span>
              </Menu.Item>
              <Menu.Item key="5">
                <BookOutlined />
                <Link to="/EmployeeTasks"></Link>
                <span className="nav-text"> Task Management </span>
              </Menu.Item>
              <Menu.Item key="6">
                <BarChartOutlined />
                <span className="nav-text">Performance Review </span>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Layout.Sider>
    </div>
  );
};

export default Sidebar;
