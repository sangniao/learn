const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

(async() => {
    // read file without passing options
    try {
        const content = await readFile('./sample.txt');
        console.log(content);
    } catch (err) {
        // handle error
        console.error(err);
    }

    // read file without passing options
    try {
        const content = await readFile('./sample.txt', 'utf-8');
        console.log(content);
    } catch (err) {
        // handle error
        console.error(err);
    }
})();