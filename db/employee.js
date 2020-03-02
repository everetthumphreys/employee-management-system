const mysql = require("mysql");
const ctable = require("console.table");
const util = require("util");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BFD#1yeah5",
    database: "employeeDB"
});

const promiseQuery = util.promisify(connection.query).bind(connection);

connection.connect();

const createEmployee = (first, last, roleId, managerId) => {
    if (managerId == undefined) {
        console.log("no manager provided");
        managerId = null;
    }

    promiseQuery(`INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES("${first}","${last}",${roleId},${managerId});`).then(results => {
        console.log("employees created");
    })
}

const getEmployee = empId => {
    let results = promiseQuery(`SELECT * FROM employees WHERE id = ${empId}`);
    return results;
}

const getAllEmployees = () => {
    let results = promiseQuery(`SELECT * FROM employees`);
    return results;
}

const changeRole = (id, roleId) => {
    promiseQuery("UPDATE employees SET role_id=? WHERE id=?", [roleId, id]);
}

const employeesByRole = () => {
    return promiseQuery(`SELECT employees.first_name, employees.last_name, roles.title FROM employees, roles WHERE employees.role_id = roles.id`);
}

const endConnection = () => {
    connection.end();
}

module.exports =
{
    getAllEmployees: getAllEmployees,
    getEmployee: getEmployee,
    createEmployee: createEmployee,
    endConnection: endConnection,
    changeRole: changeRole,
    employeesByRole: employeesByRole
}