const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const config = {
  user: "user_new",
  password: "1234",
  server: "localhost",
  database: "newproject",
  options: {
    encrypt: false,
  },
};

// Connect to the database
sql.connect(config, (err) => {
  if (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
  console.log("Connected to SQL Server successfully!");
});

// Fetch all students
app.get("/students", (req, res) => {
  const query = `SELECT Id, Name,Dob, Email, Cgpa FROM studentInfo`;

  new sql.Request().query(query, (err, result) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).send("Failed to fetch students.");
    }
    res.send(result.recordset);
  });
});

// Add a new student
app.post("/students", (req, res) => {
  const { id, name, dob, email, cgpa } = req.body;

  const query = `INSERT INTO studentInfo (Id, Name, Dob, Email, Cgpa) VALUES (${id}, '${name}', '${dob}', '${email}', ${cgpa})`;

  new sql.Request().query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Failed to add student.");
    }
    res.status(201).send({ message: "Student added successfully!" });
  });
});

// Update a student
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, dob, email, cgpa } = req.body;

  const query = `UPDATE studentInfo SET Name = '${name}', Dob = '${dob}', Email = '${email}', Cgpa = ${cgpa} WHERE Id = ${id}`;

  new sql.Request().query(query, (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      return res.status(500).send("Failed to update student.");
    }
    res.send({ message: "Student updated successfully!" });
  });
});

// Delete a student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM studentInfo WHERE Id = ${id}`;

  new sql.Request().query(query, (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      return res.status(500).send("Failed to delete student.");
    }
    res.send({ message: "Student deleted successfully!" });
  });
});

//Fetch all staff
app.get("/staff", (req, res) => {
  const { s_id, s_pass } = req.body;

  const query = `SELECT S_id,S_pass FROM staffInfo`;

  new sql.Request().query(query, (err, result) => {
    if (err) {
      console.error("Error fetching staff details:", err);
      return res.status(500).send("Failed to fetch staff details.");
    }
    res.send(result.recordset);
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
