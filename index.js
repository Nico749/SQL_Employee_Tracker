//const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

require('dotenv').config()

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  },
  console.log("Connected!")
);

//initial menu
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
          "Delete role",
          "Delete department",
          "Delete employee",
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
        case "Delete role":
          deleteRole()
          break
        case "Delete department":
          deleteDepartment()
          break
        case "Delete employee":
          deleteEmployee()
          break
        case "Exit":
          return db.end()
      }

    });
};

//query to retrieve all the existing departments
const getDepartments = () => {
  const sql = `SELECT * FROM department`
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err)
    }
    console.table(results)
    getChoice()
  })

}

//query to retrieve all the existing roles
const getRole = () => {
  const sql = `SELECT * FROM role`
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err)
    }
    console.table(results)
    getChoice()
  })

}

//query to retrieve all the existing employees
const getEmployee = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id`
  db.query(sql, function (err, results) {
    if (err) {
      console.log(err)
    }
    console.table(results)
    getChoice()
  })
}

//query to add a new department to the db
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
        //getDepartments()
        getChoice()
      })
    }
    )
}

//query to add a new role
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
        //getRole()
        getChoice()
      })
    }
    )
}

//query to add a new employee
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
        //getEmployee()
        getChoice()
      })
    }
    )
}

//query to update the role of an existing employee
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
        //getRole()
        getChoice()
      })
    }
    )
}

//delete an existing role
const deleteRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        message: "Name:",
      },
    ])
    .then((res) => {
      const sql = `DELETE FROM role WHERE title = ?`;
      const value = [res.title];
      db.query(sql, value, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(`${res.title} role deleted!`)
        //getRole()
        getChoice()
      })
    }
    )
}

//delete an existing department
const deleteDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Name:",
      },
    ])
    .then((res) => {
      const sql = `DELETE FROM department WHERE name = ?`;
      const value = [res.name];
      db.query(sql, value, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(`${res.name} department deleted!`)
        //getDepartments()
        getChoice()
      })
    }
    )
}

//delete an existing employee
const deleteEmployee = () => {
  inquirer
    .prompt([
      {
        name: "last_name",
        message: "Last name of the employee you want to delete:",
      },
    ])
    .then((res) => {
      const sql = `DELETE FROM employee WHERE last_name = ?`;
      const value = [res.last_name];
      db.query(sql, value, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(`${res.last_name} deleted from database!`)
        //getEmployee()
        getChoice()
      })
    }
    )
}

//start the application
getChoice()





