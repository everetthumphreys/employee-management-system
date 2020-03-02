INSERT INTO departments(name) VALUES("marketing");
INSERT INTO departments(name) VALUES("sales");
INSERT INTO departments(name) VALUES("support");

INSERT INTO roles(title, salary, department_id) VALUES("Manager", 70000.00, 1);
INSERT INTO roles(title, salary, department_id) VALUES("Intern", 20000.00, 2);
INSERT INTO roles(title, salary, department_id) VALUES("Employee", 50000.00, 3);

INSERT INTO employees (first_name, last_name, role_id) VALUES("Everett","Humphreys", 3);
INSERT INTO employees (first_name, last_name, role_id) VALUES("Shy","Wilde", 2);
INSERT INTO employees (first_name, last_name, role_id) VALUES("Leonidas","Humphreys", 1);