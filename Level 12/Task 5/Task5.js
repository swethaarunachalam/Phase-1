const fs = require('fs');

const filePath = 'text.txt'; 

fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error('Error getting file stats:', err.message);
        return;
    }

    console.log(`File: ${filePath}`);
    console.log(`Size: ${stats.size} bytes`);
    console.log(`Created: ${new Date(stats.birthtime).toLocaleString()}`);
    console.log(`Last Modified: ${new Date(stats.mtime).toLocaleString()}`);
});
