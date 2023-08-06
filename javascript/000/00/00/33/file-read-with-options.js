const fs = require('fs');

fs.readFile('./sample.txt', 'utf-8', (err, data) => {
    if (err) {
        // handle error
        console.error(err);
    }

    // data is string do something with it
    console.log(data);
});

for (let i = 0; i < 10; i++) {
    console.log(i);
}