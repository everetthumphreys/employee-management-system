const dept = require("./db/department");
const rol = require("./db/role");
const emp = require("./db/employee");
const inquirer = require("inquirer");
const ctab = require("console.table");

async function main() {
    let option = await displayOptions();

    switch (option.choice) {
        case "View All Employees":
            viewAll(await emp.getAllEmployees());
            break;
        case "View All Roles":
            viewAll(await rol.getAllRoles());
            break;
        case "View All Departments":
            viewAll(await dept.getAllDepartments());
            break;
        case "Add Employee":
            addEmployee(await rol.getAllRoles(), await emp.getAllEmployees());
            break;
        case "Add Role":
            addRole(await dept.getAllDepartments());
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Update Employee Role":
            changeRole(await rol.getAllRoles(), await emp.getAllEmployees());
            break;
        case "View Roles By Department":
            viewAll(await rol.rolesByDepartment());
            break;
        case "View All Employees By Role":
            viewAll(await emp.employeesByRole());
            break;
        case "Quit":
            endApp();
            break;
        default:
            endApp();
            break;
    }
}

function displayOptions() {
    return inquirer.prompt({
        name: "choice",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Role",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "View Roles By Department",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    })
}

function viewAll(results) {
    console.table(results);
    main();
}

function getId(str) {
    return str.slice(0, str.indexOf('.'));
}

function createEmployeeList(results) {
    return results.map(element => { return `${element.id}. ${element.first_name} ${element.last_name}` });
}

function createDepartmentList(results) {
    return results.map(element => { return `${element.id}. ${element.name}` });
}

function createRoleList(results) {
    return results.map(element => { return `${element.id}. ${element.title}` });
}

function addEmployee(roles, employees) {
    let roleList = createRoleList(roles);
    let empList = createEmployeeList(employees);
    empList.push("none");
    inquirer.prompt([
        {
            message: "Enter First name",
            type: "input",
            name: "first"
        },
        {
            message: "Enter Last Name",
            type: "input",
            name: "last"
        },
        {
            message: "Select Role",
            type: "list",
            choices: roleList,
            name: "role"
        },
        {
            message: "Select Manager",
            type: "list",
            choices: empList,
            name: "manager"
        }
    ]).then(choices => {
        if (choices.manager == "none") {
            emp.createEmployee(choices.first, choices.last, getId(choices.role));
        }
        else {
            emp.createEmployee(choices.first, choices.last, getId(choices.role), getId(choices.manager));
        }
        main();
    })
}

function addRole(departments) {
    let departmentList = createDepartmentList(departments);
    inquirer.prompt([
        {
            message: "Enter Role Title",
            type: "input",
            name: "title"
        },
        {
            message: "Enter Salary",
            type: "input",
            name: "salary",
            validate: function (input) {
                if (isNaN(input)) {
                    return "must be a number";
                }
                else {
                    return true;
                }
            }
        },
        {
            message: "Select Department",
            type: "rawlist",
            name: "department",
            choices: departmentList
        }
    ]).then(choices => {
        rol.createRole(choices.title, choices.salary, getId(choices.department));
        main();
    });
}

function addDepartment() {
    inquirer.prompt({
        message: "Enter Department Name",
        type: "input",
        name: "department"
    }).then(choice => {
        dept.createDepartment(choice.department);
        main();
    })
}

function changeRole(roles, employees) {
    let empList = createEmployeeList(employees);
    let roleList = createRoleList(roles);

    inquirer.prompt([{
        message: "Select which employee you would like to change",
        name: "employee",
        type: "rawlist",
        choices: empList
    },
    {
        message: "Select their new role",
        name: "role",
        type: "rawlist",
        choices: roleList
    }]).then(choices => {
        emp.changeRole(getId(choices.employee), getId(choices.role));
        main();
    });
}

main();

function endApp() {
    console.log("Bye!");
    emp.endConnection();
    rol.endConnection();
    dept.endConnection();
}