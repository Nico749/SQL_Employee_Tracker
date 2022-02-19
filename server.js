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
      switch (res.choice) {
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
          addDepartment()
          break
        case "Add a role":
          addRole()
          break
        case "Add an employee":
          addEmployee()
          break
        case "Update an employee role":
          updateRole()
          break
        case "Exit":
          break

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


const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department_name",
        message: "Department name:",
      },
    ])
    .then((res) => {
      //console.log(res.department_name)
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const value = res.department_name;
      db.query(sql, value, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(`${res.department_name} added to the database!`)
      })
    }
    )}



//post request to add a new role
const addRole = () => {
  inquirer
  .prompt([
    {
      name: "role_title",
      message: "Role title:",
    },
    {
      name: "role_salary",
      message: "Role salary:",
    },
    {
      name: "department_id",
      message: "Department id:",
    },
  ])
  .then((res) => {
  const sql = `INSERT INTO role (title,salary,department_id) VALUES (?,?,?)`;
  const value = [res.role_title, res.role_salary, res.department_id];  
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(`${res.role_title} added to the database!`)
  })
}
  )}

//post request to add a new employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "Name:",
      },
      {
        name: "last_name",
        message: "Last name:",
      },
      {
        name: "role_id",
        message: "Role id:",
      },
      {
        name: "manager_id",
        message: "Manager id:",
      },
    ])
    .then((res) => {
      const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
      const value = [res.first_name, res.last_name, res.role_id, res.manager_id];
      db.query(sql, value, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(`${res.first_name} ${res.last_name} added to the database!`)
      })
    }
    )
}

//put request to update the role of an existing employee
const updateRole = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "Name:",
      },
      {
        name: "new_role",
        message: "New role id:",
      },

    ])
    .then((res) => {
      const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
      const value = [res.new_role, res.first_name];
      db.query(sql, value, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(`${res.first_name} new role updated to the database!`)
      })
    }
    )
}


getChoice()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


