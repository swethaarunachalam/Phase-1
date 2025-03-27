const fs = require ('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err); 
    }
    console.log('file contents:\n',data);
});