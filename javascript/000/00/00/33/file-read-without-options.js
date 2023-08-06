const fs = require('fs');

fs.readFile('./sample.txt', (err, data) => {
    if (err) {
        // handle error
        console.error(err);
    }

    // data is a buffer. Do something with it
    console.log(data);
});