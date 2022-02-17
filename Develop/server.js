const express = require('express')
const mysql = require('mysql2')
const inquirer = require ('inquirer')
 require('dotenv').config()
 const PORT = process.env.PORT || 3001
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
console.log(process.env.DB_USER)
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

const getChoice = () => {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option:",
        choices: ["View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role"],
      },
    ])
    
  }


  //getChoice()

  
  



// Query database
db.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
});

app.get('/api/departments',(req,res) =>{
  console.log(`New ${req.method} request received`)
  const sql = `SELECT * FROM department`
  db.query(sql, function (err, results) {
      console.log(results);
      res.json(results)
    });  
})

app.get('/api/role',(req,res) =>{
  console.log(`New ${req.method} request received`)
  const sql = `SELECT * FROM role`
  db.query(sql, function (err, results) {
      console.log(results);
      res.json(results)
    });  
})

app.post('/api/add-department',(req,res) =>{
  console.log(`New ${req.method} request received`)
  const sql = `INSERT INTO department (name) VALUES (?)`;
  const value = [req.body.name];  
  db.query(sql,value,(err,result)=>{
    if(err){
      res.status(400).json({error:err.message})
      return;
    }
    res.json({
      message:'success',
      data:req.body
    })
    console.log(`${req.body.name} added to the database!`)
  })
})

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


