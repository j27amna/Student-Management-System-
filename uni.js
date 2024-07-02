#! usr/bin/env node
import inquirer from "inquirer";
class Student {
    id;
    name;
    course;
    feesAmount;
    constructor(id, name, course, feesAmount) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.feesAmount = feesAmount;
    }
}
let orgId = 10000;
let studentId = '';
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: 'list',
        name: 'ans',
        message: 'select an option below',
        choices: ['Enroll', 'Student Portal']
    });
    if (action.ans === 'Enroll') {
        let studentName = await inquirer.prompt({
            type: 'input',
            name: 'ans',
            message: 'Full Name: '
        });
        let trimName = (studentName.ans).trim().toLowerCase();
        let stuNameCheck = students.map(obj => obj.name);
        if (trimName.includes(trimName) === true) {
            if (trimName !== '') {
                orgId++;
                studentId = "STId" + orgId;
                console.log('Account Created');
                console.log(`Welcome, ${trimName}!`);
                let course = await inquirer.prompt({
                    type: 'list',
                    name: 'ans',
                    message: 'select a course',
                    choices: [
                        ' BS in Electrical Engineering',
                        'BS in Computer Engineering',
                        'BS in Computer Science',
                        'Integrated Sciences and Mathematics (iSciM)'
                    ]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case 'BS in Electrical Engineering':
                        courseFees = 132480.00;
                        break;
                    case 'BS in Computer Engineering':
                        courseFees = 132480.00;
                        break;
                    case 'BS in Computer Science':
                        courseFees = 142480.00;
                        break;
                    case 'Integrated Sciences and Mathematics (iSciM)':
                        courseFees = 22080.00;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: 'confirm',
                    name: 'ans',
                    message: `You want to enroll in ${course.ans}`
                });
                if (courseConfirm.ans === true) {
                    let student = new Student(studentId, trimName, course.ans, courseFees);
                    students.push(student);
                    console.log(`${studentName.ans} have enrolled in ${course.ans}`);
                }
            }
            else {
                console.log("Invalid Name");
            }
        }
        else {
            console.log('Name is taken');
        }
    }
    else if (action.ans === 'Student Portal') {
        if (Student.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStu = await inquirer.prompt({
                type: 'list',
                name: 'ans',
                message: "Select name",
                choices: studentNameCheck
            });
            let foundStu = students.find(student => student.name === selectedStu.ans);
            console.log("Student information");
            console.log(foundStu);
            console.log('\n\n');
        }
        else {
            console.log('Not found');
        }
    }
    let userConfirm = await inquirer.prompt({
        type: 'confirm',
        name: 'ans',
        message: 'Continue'
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
