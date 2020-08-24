const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];

function getTeamMembers() {
  console.log("Team", team);

  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employees name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your id number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
      {
        type: "list",
        name: "role",
        message: "What role is this emplyee?",
        choices: ["Intern", "Engineer"],
      },
      {
        type: "confirm",
        name: "isMore",
        message: "Is there another employee you want to add?",
      },
    ])
    .then((answer) => {
      switch (answer.role) {
        case "Intern":
          console.log("Made intern obj");
          answer.isMore
            ? getTeamMembers()
            : console.log("Okay making html for you now");
          break;

        case "Engineer":
          console.log("Made Engineer obj");
          answer.isMore
            ? getTeamMembers()
            : console.log("Okay making html for you now");
          break;

        default:
          console.log("Invalid info please try again");
      }
    });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Questions for the team manager
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Hello Team Manager, What is your name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your id number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
    },
    {
      type: "input",
      name: "office",
      message: "What is your office number?",
    },
  ])
  .then((answer) => {
    // Catch a few errors that may occur and end the process before it gets to crazy
    if (
      !Number.isInteger(parseInt(answer.id)) ||
      !Number.isInteger(parseInt(answer.office))
    ) {
      console.log(
        "Sorry please have either id or office number to be a actually numeral!"
      );
      process.exit();
    } else if (parseInt(answer.count) <= 0 || parseInt(answer.office) <= 0) {
      console.log("Sorry please have the number be higher than 0!");
      process.exit();
    } else {
      let manager = new Manager(
        answer.name,
        answer.id,
        answer.email,
        answer.office
      );
      team.push(manager);
      getTeamMembers();
    }
  });

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
