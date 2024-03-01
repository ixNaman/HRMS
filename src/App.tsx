import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Login from "../src/Components/Navbar/Login";
import { AuthState } from "./Actions/authTypes";

function App() {
  // Create Redux store

  // Use useSelector to get the isAuthenticated status from the Redux store
  const isAuthenticated = useSelector(
    (state: { auth: AuthState }) => state.auth.isAuthenticated
  );

  return (
    <>
      {" "}
      {isAuthenticated ? (
        <div>
          <Navbar />
          <Sidebar />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
