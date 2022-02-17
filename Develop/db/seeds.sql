INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Sales"),
       ("Legal");
       

INSERT INTO role (title,salary,department_id)
VALUES ("Software engineer","200000",2),
       ("Sales lead","120000",3),
       ("Account manager","150000",2),
       ("Lawyer","110000",4);
       

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES (1,"Matt","Reed",4,1),
       (2,"Scott","Thompson",4,2),
       (3,"Ted","Forrest",2,3);
     
       