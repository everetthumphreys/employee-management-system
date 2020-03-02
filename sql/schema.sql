DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
    id integer auto_increment,
    name varchar(30),
    primary key(id)
);

USE employeeDB;

DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
    id integer auto_increment,
    title varchar(30),
    salary decimal(10,2),
    department_id integer,
    primary key(id),
    foreign key(department_id) REFERENCES departments(id)
);

USE employeeDB;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
    id integer auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id integer,
    primary key(id),
    foreign key(role_id) REFERENCES roles(id)
    );