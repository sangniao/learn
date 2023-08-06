const fs = require('fs');

const readFile = (fileName, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, encoding, (err, data) => {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    });
}

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