const fs = require('fs');
const readline = require('readline');
const FILE = 'employees.json';
let employees = [];
if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE);
    employees = JSON.parse(data);
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function saveData() {
    fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}
function showMenu() {
    console.log("\n=== Employee Management System ===");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");

    rl.question("Enter your choice: ", handleMenu);
}
function handleMenu(choice) {
    switch (choice) {
        case '1':
            addEmployee();
            break;
        case '2':
            viewEmployees();
            break;
        case '3':
            updateEmployee();
            break;
        case '4':
            deleteEmployee();
            break;
        case '5':
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice!");
            showMenu();
    }
}
function addEmployee() {
    rl.question("Enter Employee ID: ", (id) => {
        if (employees.find(emp => emp.id === id)) {
            console.log("Employee ID already exists!");
            return showMenu();
        }

        rl.question("Enter Name: ", (name) => {
            if (!name.trim()) {
                console.log("Name cannot be empty!");
                return showMenu();
            }

            rl.question("Enter Salary: ", (salary) => {
                salary = parseFloat(salary);
                if (isNaN(salary) || salary <= 0) {
                    console.log("Invalid salary!");
                    return showMenu();
                }

                employees.push({ id, name, salary });
                saveData();
                console.log("Employee Added Successfully!");
                showMenu();
            });
        });
    });
}
function viewEmployees() {
    if (employees.length === 0) {
        console.log("No employees found.");
    } else {
        console.log("\nEmployee List:");
        employees.forEach(emp => {
            console.log(`ID: ${emp.id}, Name: ${emp.name}, Salary: ${emp.salary}`);
        });
    }
    showMenu();
}
function updateEmployee() {
    rl.question("Enter Employee ID to update: ", (id) => {
        const emp = employees.find(e => e.id === id);

        if (!emp) {
            console.log("Employee not found!");
            return showMenu();
        }
        rl.question("Enter New Name: ", (name) => {
            rl.question("Enter New Salary: ", (salary) => {
                salary = parseFloat(salary);
                if (isNaN(salary) || salary <= 0) {
                    console.log("Invalid salary!");
                    return showMenu();
                }

                emp.name = name;
                emp.salary = salary;
                saveData();
                console.log("Employee Updated Successfully!");
                showMenu();
            });
        });
    });
}
function deleteEmployee() {
    rl.question("Enter Employee ID to delete: ", (id) => {
        const index = employees.findIndex(emp => emp.id === id);

        if (index === -1) {
            console.log("Employee not found!");
        } else {
            employees.splice(index, 1);
            saveData();
            console.log("Employee Deleted Successfully!");
        }
        showMenu();
    });
}
showMenu();
