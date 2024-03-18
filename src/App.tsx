import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Login from "../src/Components/Navbar/Login";
import { AuthState } from "./Actions/authTypes";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import TaskManagement from "./Components/Admin/TaskManagement";
import AttendanceTracking from "./Components/Admin/AttendanceTracking";
import EmployeeManagement from "./Components/Admin/EmployeeManagement";
import CalendarEvents from "./Components/Admin/CalendarEvents";
import AdminProfile from "./Components/Admin/Adminprofile";
import ProjectManagement from "./Components/Admin/ProjectManagement";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import EmployeeAttendance from "./Components/Employee/EmployeeAttendance";
import LeaveForm from "./Components/Employee/Leave";
import EmployeeTasks from "./Components/Employee/EmployeeTasks";
import LeaveManagement from "./Components/Admin/LeaveManagement";
import Profile from "./Components/Employee/Profile";

function App() {
  const isAuthenticated = useSelector(
    (state: { auth: AuthState }) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: { auth: AuthState }) => state.auth.role);

  return (
    <>
      {" "}
      {isAuthenticated ? (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <Routes>
                {userRole === "Admin" && (
                  <>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route
                      path="/AdminDashboard"
                      element={<AdminDashboard />}
                    />
                    <Route
                      path="/TaskManagement"
                      element={<TaskManagement />}
                    />
                    <Route
                      path="/AttendanceTracking"
                      element={<AttendanceTracking />}
                    />
                     <Route
                      path="/EmployeeManagement"
                      element={<EmployeeManagement />}
                    />
                    <Route
                      path="/CalendarEvents"
                      element={<CalendarEvents />}
                    />
                    <Route
                      path="/LeaveManagement"
                      element={<LeaveManagement />}
                    />
                    <Route path="/Profile" element={<Profile />} />
                    <Route
                      path="/ProjectManagement"
                      element={<ProjectManagement />}
                    />
                    <Route path="*" element={<AdminDashboard/>}/>
                  </>
                )}
                {userRole === "Employee" && (
                  <>
                    {/* <EmployeeDashboard/> */}
                    <Route
                      path="/EmployeeDashboard"
                      element={<EmployeeDashboard />}
                    />
                    <Route
                      path="/LeaveForm"
                      element={<LeaveForm  />}
                    />
                    <Route
                      path="/EmployeeManagement"
                      element={<EmployeeManagement />}
                    />
                    <Route
                      path="/EmployeeAttendance"
                      element={<EmployeeAttendance />}
                    />
                     <Route
                      path="/Profile"
                      element={<Profile />}
                    />
                    <Route
                    path="/EmployeeTasks" element={<EmployeeTasks/>}/>
                  </>
                )}
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/Home" element={<AdminDashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
export default App;
