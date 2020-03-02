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

const createDepartment = name => {
    promiseQuery(`INSERT INTO departments (name) VALUES("${name}");`).then(results => {
        console.log("department created");
    })
}
const getDepartment = depId => {
    let results = promiseQuery(`SELECT * FROM departments WHERE id = ${depId}`);
    return results;
}

const getAllDepartments = () => {
    let results = promiseQuery(`SELECT * FROM departments`);
    return results;
}

const endConnection = () => {
    connection.end();
}

module.exports =
{
    getAllDepartments: getAllDepartments,
    getDepartment: getDepartment,
    createDepartment: createDepartment,
    endConnection: endConnection,
}