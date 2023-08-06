const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

// read file without passing options
readFile('./sample.txt')
    .then(data => {
        // data is a Buffer
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

// read file with options
readFile('./sample.txt', 'utf-8')
    .then(data => {
        // data is a string variable
        console.log(data);
    })
    .catch(err => {
        // handle error
        console.error(err);
    });