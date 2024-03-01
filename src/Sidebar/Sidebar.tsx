import * as React from "react";
import { Layout, Menu } from "antd";
import {MenuOutlined, CloseOutlined,HomeOutlined,CheckSquareOutlined,CarryOutOutlined,FileOutlined,CalendarOutlined,BookOutlined,BarChartOutlined} from "@ant-design/icons";
import "./Sidebar.css";

interface SidebarState {
  collapsed: boolean;
  mode: "vertical" | "inline" | "horizontal"; // Removed `undefined` from the type
}

class Sidebar extends React.Component<unknown, SidebarState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      collapsed: false,
      mode: "inline", // Set mode to "inline" initially
    };
  }

  public render(): JSX.Element {
    return (
    <div >
      <Layout.Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.toggle}
        style={{ height: '100vh' }}
        trigger=" "
      >
        <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={["1"]} style={{height: "100vh"}}>
          <Menu.Item key="0" onClick={this.toggle}>
            <span>
              {this.state.collapsed ? (
                <MenuOutlined />
              ) : (
                <CloseOutlined />
              )}
              <span className="nav-text" style={{color:"White" , fontWeight:"bolder"}}> Hello , Naman</span>
            </span>
          </Menu.Item>

          {/* Home Button */}
          <Menu.Item key="1">
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Menu.Item>

          {/* Other Menu Items */}
          <Menu.Item key="2">
            <CheckSquareOutlined />
            <span className="nav-text">Employees</span>
          </Menu.Item>
          <Menu.Item key="3">
            <CarryOutOutlined  />
            <span className="nav-text">Leave Management </span>
          </Menu.Item>
          <Menu.Item key="4">
            <FileOutlined />
            <span className="nav-text"> Onboarding </span>
          </Menu.Item>
          <Menu.Item key="5">
            <CalendarOutlined   />
            <span className="nav-text">Attendance Tracking </span>
          </Menu.Item>
          <Menu.Item key="6">
            <BookOutlined  />
            <span className="nav-text">Task Management </span>
          </Menu.Item>
          <Menu.Item key="7">
            <BarChartOutlined  />
            <span className="nav-text">Performance Review </span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      </div>
    );
  }

  private toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: this.state.collapsed ? "inline" : "vertical", 
    });
  };
}

export default Sidebar;
