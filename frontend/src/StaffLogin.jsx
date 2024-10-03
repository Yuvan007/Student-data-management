import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom"; // For redirection

function StaffLogin({ onLoginSuccess }) {
  const [s_id, setS_id] = useState("");
  const [s_pass, setS_pass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:3000/staff")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch staff.");
        }
        return res.json();
      })
      .then((staffs) => {
        const staff = staffs.find(
          (s) => s.S_id === s_id && s.S_pass === s_pass
        );
        if (staff) {
          onLoginSuccess("staff-login");
          navigate("/staff");
        } else {
          setErrorMessage("Invalid username or password");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred while logging in.");
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <h2>Staff Login</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Id"
          value={s_id}
          onChange={(e) => setS_id(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={s_pass}
          onChange={(e) => setS_pass(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p className="error">{errorMessage}</p>
      </div>
      <p>
        <a href="/student-login">Student Login</a>
      </p>
    </div>
  );
}

export default StaffLogin;
