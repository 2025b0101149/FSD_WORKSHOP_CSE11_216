setTimeout(() => {
    console.log('This will run after 2 seconds');
}, 2000);

setImmediate(() => {
    console.log('This will run after the current event loop phase');
}, 2000);

process.nextTick(() => {
    console.log('This will run before the next event loop phase');
});

new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve('Promise resolved successfully');
    } else {
        reject('Promise rejected');
    }
}).then((message) => {
    console.log(message);
}).catch((error) => {
    console.error(error);
});

console.log("This is the end of my code")