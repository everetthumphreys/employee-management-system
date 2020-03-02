const mysql = require("mysql");
const ctable = require("console.table");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BFD#1yeah5",
    database: "employeeDB"
});

const promiseQuery = util.promisify(connection.query).bind(connection);

connection.connect();

const createRole = (title, salary, depId) => {
    promiseQuery(`INSERT INTO roles (title,salary,department_id) VALUES("${title}",${salary},${depId});`).then(results => {
        console.log("role created");
    })
}

const getRole = roleId => {
    let role = promiseQuery(`SELECT * FROM roles WHERE id = ${roleId}`);
    return role;
}

const getAllRoles = () => {
    let results = promiseQuery(`SELECT * FROM roles`);
    return results;
}

const rolesByDepartment = () => {
    return promiseQuery(`SELECT roles.title, departments.name FROM roles, departments WHERE roles.department_id = departments.id`);
}

const endConnection = () => {
    connection.end();
}

module.exports =
{
    getAllRoles: getAllRoles,
    getRole: getRole,
    createRole: createRole,
    endConnection: endConnection,
    rolesByDepartment: rolesByDepartment
}