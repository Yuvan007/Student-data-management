import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function StudentPage() {
  const location = useLocation();
  const studentData = location.state?.student || {};
  let navigate = useNavigate();

  return (
    <div>
      <button
        className="btn back-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div className="container">
        <h3>Student Details</h3>
        {studentData && (
          <div className="student-info">
            <p>
              <strong>ID:</strong> {studentData.Id}
            </p>
            <p>
              <strong>Name:</strong> {studentData.Name}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(studentData.Dob).toLocaleDateString("en-US")}
            </p>
            <p>
              <strong>Email:</strong> {studentData.Email}
            </p>
            <p>
              <strong>CGPA:</strong> {studentData.Cgpa}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentPage;
