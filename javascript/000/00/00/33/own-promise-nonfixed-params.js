const getMaxCustom = (callback, ...args) => {
    let max = -Infinity;
    
    for (let i of args) {
        if (i > max) {
            max = i;
        }
    }

    callback(max);
}

// getMaxCustom((max) => { console.log('Max is ' + max) }, 10, 2, 23, 1, 111, 20);

const getMaxPromise = (...args) => {
    return new Promise((resolve) => {
        getMaxCustom((max) => {
            resolve(max);
        }, ...args);
    });
}

getMaxPromise(10, 2, 23, 1, 111, 20)
    .then(max => console.log(max));