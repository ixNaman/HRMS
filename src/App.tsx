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

function App() {
  const isAuthenticated = useSelector(
    (state: { auth: AuthState }) => state.auth.isAuthenticated
  );

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
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/TaskManagement" element={<TaskManagement />} />
                <Route
                  path="/AttendanceTracking"
                  element={<AttendanceTracking />}
                />
                <Route path="/Home" element={<AdminDashboard />} />
                <Route
                  path="/EmployeeManagement"
                  element={<EmployeeManagement />}
                />
                <Route path="/CalendarEvents" element={<CalendarEvents />} />

                {/* Add more routes as needed */}
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Login />
        // <Routes>
        //   <Route path="/l" element={<Login/>}/>
        // </Routes>
      )}
    </>
  );
}

export default App;
