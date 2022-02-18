const express = require('express')
const mysql = require('mysql2')
const inquirer = require ('inquirer')
//const getChoice = require ('./trial')
//const { get } = require('express/lib/response')

require('dotenv').config()
 const PORT = process.env.PORT || 3001
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db =  mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  },
 console.log("Connected!")
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
          "Update an employee role",
          "Exit"],
      },
    ])
  .then((res) => {
      switch(res.choice) {
          case "View all departments":
              getDepartments()
             
          break
          case "View all roles":
              getRole()
            
          break
          case "View all employees":
              getEmployee()
              
          break
          case "Add a department":
              //addDepartment()
          break
          case "Add a role":
            
          break
          
          case "Add an employee":

          break

          case "Update an employee role":

          break

          case "Exit": 
            return
           
          default:
            return
        }
  
  });
}; 
  



//get request to retrieve all the existing departments
const getDepartments = () => {
  const sql = `SELECT * FROM department`
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err)
    }
    console.log(results)
  })
}

//get request to retrieve all the existing roles
const getRole = () => {
  const sql = `SELECT * FROM role`
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err)
    }
    console.log(results)
  })
}

//get request to retrieve all the existing employees
const getEmployee = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id`
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err)
    }
    console.log(results)
  })
}

//post requets to add a new department 
// app.post('/api/add-department',(req,res) =>{
//   console.log(`New ${req.method} request received`)
//   const sql = `INSERT INTO department (name) VALUES (?)`;
//   const value = [req.body.name];  
//   db.query(sql,value,(err,result)=>{
//     if(err){
//       res.status(400).json({error:err.message})
//       return;
//     }
//     res.json({
//       message:'success',
//       data:req.body
//     })
//     console.log(`${req.body.name} added to the database!`)
//   })
// })

// //post request to add a new role
// app.post('/api/add-role',(req,res) =>{
//   console.log(`New ${req.method} request received`)
//   const sql = `INSERT INTO role (title,salary,department_id) VALUES (?,?,?)`;
//   const value = [req.body.title, req.body.salary, req.body.department_id];  
//   db.query(sql,value,(err,result)=>{
//     if(err){
//       res.status(400).json({error:err.message})
//       return;
//     }
//     res.json({
//       message:'success',
//       data:req.body
//     })
//     console.log(`${req.body.title} added to the database!`)
//   })
// })

// //post request to add a new employee
// app.post('/api/add-employee',(req,res) =>{
//   console.log(`New ${req.method} request received`)
//   const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
//   const value = [req.body.first_name, req.body.last_name, req.body.role_id,req.body.manager_id];  
//   db.query(sql,value,(err,result)=>{
//     if(err){
//       res.status(400).json({error:err.message})
//       return;
//     }
//     res.json({
//       message:'success',
//       data:req.body
//     })
//     console.log(`${req.body.first_name} added to the database!`)
//   })
// })

// //put request to update the role of an existing employee
// app.put('/api/update-role',(req,res) =>{
//   console.log(`New ${req.method} request received`)
//   const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
//   const value = [req.body.role_id,req.body.first_name];  
//   db.query(sql,value,(err,result)=>{
//     if(err){
//       res.status(400).json({error:err.message})
//       return;
//     }
//     res.json({
//       message:'success',
//       data:req.body
//     })
//     console.log(`Updated role for ${req.body.first_name}!`)
//   })
// })

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });
getChoice()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


