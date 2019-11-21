'use strict';
//-create todo item
//-list todo item
//-check todo item off list
//-delete todo item


const fs = require('fs');

//constants
var TASK_JSON_PATH = "./database.json"


function init(){
  //create fuke if it's not present
  if(!fs.existsSync(TASK_JSON_PATH)){
    console.log("Initialising storage.\n Creating 'database.json' file")
    setData([])
  }
}

function getData(){
  //read file contents
  var contents = fs.readFileSync(TASK_JSON_PATH);

  //parse contents
  var data = JSON.parse(contents);

  return data;
}

function setData(data){
  //stringify JSON
  var dataString = JSON.stringify(data);

  //write to file

  fs.writeFileSync(TASK_JSON_PATH,dataString);
}

//display usage

function usage(){
  console.log("Usage:done [add|check|delete|help] [task]")
  console.log("'task' is only a string when using 'add' and a number\nfor all other commands.")
  
}
//add task 
 
function add(task){
  //get data
  var data = getData();

  //add item

  data.push({task : task, completed : false});

  //set data

  setData(data)

  //list

  list();
}

//check task 
function check(task){
  //get data
  var data = getData();

  //modify the data (toggle)
  data[task].completed = !data[task].completed;

  //set data
  setData(data);

  //list

  list();
}

//delete task
function del(task){
  var data = getData();
  data.splice(task,task+1);
  setData(data);
  list();
}

//list all tasks
function list(){
  var data = getData();
  if(data.length>0){
    //print the list. using ANSI colors and formating 
    console.log("\x1b[93m\x1b[4mTask list:\x1b[24m");
    data.forEach(function(task,index){
      console.log(
        index + 1 + ".",
        " [" + (task.completed ? "\x1b[92m\x1b[93m" : " ") + "]",
        task.task
      )
    })
   
  }else {
    console.log("\x1b[91mNo tasks added!!");
  }
}

var command = process.argv[2];
var argument = process.argv[3];

init();

switch (command){
  case "add":
    add(argument);
    break;
  case "check":
    check(argument - 1);
    break;
  case "delete":
    del(argument - 1);
    break;  
  case "help":
    usage();
    break;
  case undefined:
    list();
    break;
  default:
    console.log("Dude Command not found");
    usage();
    break;
}






// function readFile() {
//     return new Promise(
//       resolve => fs.readFile(
//         STORE_FILE_NAME,
//         DEFAULT_ENCODING,
//         (err, data) => resolve(err ? '' : data)
//       )
//     );
//   }

// function listFile() {
//     return new Promise(
//       resolve => fs.readFile(
//         STORE_FILE_NAME,
//         DEFAULT_ENCODING,
//         (err, data) => {
//             resolve(err ? '' : data),
//             console.log(STORE_FILE_NAME)
//         })
//     );
//   }

// function removeFile() {
//   return new Promise(
//     resolve => fs.unlink(
//       STORE_FILE_NAME,
//       function (err) {
//         if (err) throw err;
//         console.log('File deleted!');
//     })
//   );
// }

// function resetFile() {
//     return new Promise(
//       resolve => fs.unlink(
//         STORE_FILE_NAME,
//         function (err) {
//           if (err) throw err;
//           console.log('Reset was made by someone!');
//       })
//     );
//   }
// function appendFile(...text) {
//   return new Promise(
//     (resolve, reject) => fs.appendFile(
//       STORE_FILE_NAME,
//       `${text.join(' ')}\n`,
//       (err, data) => err
//         ? reject(err)
//         : resolve(data)
//     )
//   );
// }

// function printHelp() {
//   console.log(`Usage: node index.js [options]
// Node.js Week 2 - Lecture To-Do App(HELP SECTION)
// Options:
//   node index.js add "something"  adds a to do item in your file
//   node index.js list          shows current to dos 
//   node index.js help          shows help section
//   node index.js remove        removes a to-do item
//   node index.js reset         removes all to-do from the list
//   `);
// }

// /* Or we could destructure the array instead
//  * const [,, cmd, ...args] = process.argv;
//  */
// const cmd  = process.argv[2];
// const args = process.argv.slice(3);

// switch (cmd) {
//   case 'remove':
//     removeFile()
//       .then(data => console.log(`To-Dos:\n${data}`));
//     break;
//   case 'list':
//         listFile()
//           .then(data => console.log(`To-Dos:\n${data}`));
//         break;
//  case 'reset':
//         resetFile()
//           .then(data => console.log(`To-Dos:\n${data}`));
//         break;

//   case 'add':
//     appendFile(...args)
//       .then(() => console.log('add to-do to file'))
//       .then(() => readFile())
//       .then(data => console.log(`\nTo-Dos:\n${data}`))
//       .catch(console.error);
//     break;

//   case 'help':
//   default:
//     printHelp();
//     break;
// }