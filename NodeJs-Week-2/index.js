'use strict';

const fs = require('fs');

const DEFAULT_ENCODING = 'utf8';
const STORE_FILE_NAME  = 'store.txt';

function readFile() {
    return new Promise(
      resolve => fs.readFile(
        STORE_FILE_NAME,
        DEFAULT_ENCODING,
        (err, data) => resolve(err ? '' : data)
      )
    );
  }

function listFile() {
    return new Promise(
      resolve => fs.readFile(
        STORE_FILE_NAME,
        DEFAULT_ENCODING,
        (err, data) => {
            resolve(err ? '' : data),
            console.log(STORE_FILE_NAME)
        })
    );
  }

function removeFile() {
  return new Promise(
    resolve => fs.unlink(
      STORE_FILE_NAME,
      function (err) {
        if (err) throw err;
        console.log('File deleted!');
    })
  );
}

function resetFile() {
    return new Promise(
      resolve => fs.unlink(
        STORE_FILE_NAME,
        function (err) {
          if (err) throw err;
          console.log('Reset was made by someone!');
      })
    );
  }
function appendFile(...text) {
  return new Promise(
    (resolve, reject) => fs.appendFile(
      STORE_FILE_NAME,
      `${text.join(' ')}\n`,
      (err, data) => err
        ? reject(err)
        : resolve(data)
    )
  );
}

function printHelp() {
  console.log(`Usage: node index.js [options]
Node.js Week 2 - Lecture To-Do App(HELP SECTION)
Options:
  node index.js add "something"  adds a to do item in your file
  node index.js list          shows current to dos 
  node index.js help          shows help section
  node index.js remove        removes a to-do item
  node index.js reset         removes all to-do from the list
  `);
}

/* Or we could destructure the array instead
 * const [,, cmd, ...args] = process.argv;
 */
const cmd  = process.argv[2];
const args = process.argv.slice(3);

switch (cmd) {
  case 'remove':
    removeFile()
      .then(data => console.log(`To-Dos:\n${data}`));
    break;
  case 'list':
        listFile()
          .then(data => console.log(`To-Dos:\n${data}`));
        break;
 case 'reset':
        resetFile()
          .then(data => console.log(`To-Dos:\n${data}`));
        break;

  case 'add':
    appendFile(...args)
      .then(() => console.log('add to-do to file'))
      .then(() => readFile())
      .then(data => console.log(`\nTo-Dos:\n${data}`))
      .catch(console.error);
    break;

  case 'help':
  default:
    printHelp();
    break;
}