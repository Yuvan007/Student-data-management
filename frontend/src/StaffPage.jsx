import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate} from "react-router-dom";

function StaffPage() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [editId, setEditId] = useState(null);
  let navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/students");
      setUsers(res.data);
      setFilterUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = users.filter(
      (user) =>
        user.Name.toLowerCase().includes(searchText) ||
        user.Email.toLowerCase().includes(searchText) ||
        user.Id.toString().includes(searchText)
    );
    setFilterUsers(filteredUsers);
  };

  const handleAddOrUpdate = async () => {
    try {
      const studentData = {
        id: parseInt(id),
        name,
        dob,
        email,
        cgpa: parseFloat(cgpa),
      };

      if (editId) {
        await axios.put(
          `http://localhost:3000/students/${editId}`,
          studentData
        );
        setEditId(null);
      } else {
        await axios.post("http://localhost:3000/students", studentData);
      }

      resetForm();
      getAllUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const resetForm = () => {
    setId("");
    setName("");
    setDob("");
    setEmail("");
    setCgpa("");
  };

  const handleEdit = (user) => {
    setId(user.Id);
    setName(user.Name);
    setDob(user.Dob ? new Date(user.Dob).toISOString().split("T")[0] : "");
    setEmail(user.Email);
    setCgpa(user.Cgpa);
    setEditId(user.Id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
        <h3>Staff Page</h3>
        <div className="input-search">
          <input
            className="search-bar"
            type="search"
            placeholder="Search Id, Name or Email..."
            onChange={handleSearch}
          />
        </div>
        <div className="addcolumn">
          <input
            type="text"
            placeholder="Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            step="0.01"
          />
          <button className="btn green" onClick={handleAddOrUpdate}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Id</th>
              <th>Name</th>
              <th>Dob</th>
              <th>Email</th>
              <th>CGPA</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers.map((user, index) => (
              <tr key={user.Id}>
                <td>{index + 1}</td>
                <td>{user.Id}</td>
                <td>{user.Name}</td>
                <td>{new Date(user.Dob).toLocaleDateString("en-GB")}</td>
                <td>{user.Email}</td>
                <td>{user.Cgpa}</td>
                <td>
                  <button className="btn blue" onClick={() => handleEdit(user)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn red"
                    onClick={() => handleDelete(user.Id)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffPage;
