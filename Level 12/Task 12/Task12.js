const fs = require('fs');
const path = require('path');

function readDirectoryRecursive(dirPath) {
    try {
        const items = fs.readdirSync(dirPath); 
        items.forEach(item => {
            const fullPath = path.join(dirPath, item); 
            const stats = fs.statSync(fullPath); 

            if (stats.isDirectory()) {
                console.log(`📂 Directory: ${fullPath}`);
                readDirectoryRecursive(fullPath); 
            } else {
                console.log(`📄 File: ${fullPath}`);
            }
        });
    } catch (err) {
        console.error(`Error reading directory "${dirPath}":`, err);
    }
}


const directoryToRead = './test_directory'; 

if (fs.existsSync(directoryToRead)) {
    console.log(`Reading contents of "${directoryToRead}"...\n`);
    readDirectoryRecursive(directoryToRead);
} else {
    console.log(`Directory "${directoryToRead}" does not exist.`);
}
