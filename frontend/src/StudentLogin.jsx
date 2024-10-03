import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function StudentLogin({ onLoginSuccess }) {
  const [id, setId] = useState("");
  const [dob, setDob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    fetch("http://localhost:3000/students")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch students.");
        }
        return res.json();
      })
      .then((students) => {
        const inputDob = new Date(dob).toISOString().split("T")[0];
        const student = students.find(
          (s) => s.Id === parseInt(id) && s.Dob.split("T")[0] === inputDob
        );

        if (student) {
          // On successful login, pass student details and navigate to student page
          onLoginSuccess("student");
          navigate("/student", { state: { student } });
        } else {
          setErrorMessage("Invalid Id or date of birth.");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <div className="login-form">
        <input
          type="number"
          placeholder="Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button className="submitbutton" onClick={handleStudentLogin}>
          Login
        </button>
        <p className="error">{errorMessage}</p>
      </div>
      <p>
        <a href="/">Staff Login</a>
      </p>
    </div>
  );
}

export default StudentLogin;
