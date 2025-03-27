const fs = require('fs');

const dirPath = './'; 

fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    console.log('Contents of the directory:');
    files.forEach(file => {
        const isDirectory = fs.statSync(file).isDirectory();
        console.log(isDirectory ? `[DIR] ${file}` : `[FILE] ${file}`);
    });
});
