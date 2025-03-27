const fs = require('fs');

const fileToWatch = 'watch.txt'; 
if (!fs.existsSync(fileToWatch)) {
    console.log(`File "${fileToWatch}" does not exist. Please create it first.`);
    process.exit(1); 
}

fs.watch(fileToWatch, (eventType, filename) => {
    if (filename) {
        console.log(`File "${filename}" has been ${eventType}`);
    } else {
        console.log(`A change occurred, but filename is not available.`);
    }
});

console.log(`Watching for changes in "${fileToWatch}"...`);
