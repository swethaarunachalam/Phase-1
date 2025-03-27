const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'largeFile.txt');
const destinationFile = path.join(__dirname, 'largeFile_copy.txt'); 


fs.stat(sourceFile, (err, stats) => {
    if (err) {
        return console.error('Error getting file stats:', err);
    }

    const totalSize = stats.size;
    let copiedSize = 0;

    const readStream = fs.createReadStream(sourceFile);
    const writeStream = fs.createWriteStream(destinationFile);

    readStream.on('data', (chunk) => {
        copiedSize += chunk.length;
        console.log(`Progress: ${((copiedSize / totalSize) * 100).toFixed(2)}%`);
    });

    readStream.on('error', (err) => console.error('Read error:', err));
    writeStream.on('error', (err) => console.error('Write error:', err));

    readStream.on('end', () => console.log('File copy completed successfully.'));

    readStream.pipe(writeStream);
});
