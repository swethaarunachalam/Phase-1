const fs = require('fs'); 

const content = '\nMore content here.';

fs.appendFile('sample.txt', content, 'utf8', (err) => {
    if (err) {
        console.error('Error appending to file:', err); 
        return;
    }
    console.log('Content appended successfully!');
});
