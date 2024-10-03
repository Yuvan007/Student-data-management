import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StaffPage from "./StaffPage";
import StaffLogin from "./StaffLogin";
import StudentPage from "./StudentPage";
import StudentLogin from "./StudentLogin";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(""); // staff or student

  // Handle login and set role
  const handleLoginSuccess = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<StaffLogin onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/student-login"
          element={<StudentLogin onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/staff"
          element={
            isAuthenticated ? (
              <StaffPage />
            ) : (
              <StaffLogin onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/student"
          element={
            isAuthenticated && role === "student" ? (
              <StudentPage />
            ) : (
              <StudentLogin onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route path="/" element={<StudentLogin />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
