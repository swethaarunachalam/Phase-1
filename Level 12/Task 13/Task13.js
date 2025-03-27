const fs = require('fs');
const path = require('path');
const os = require('os');


fs.mkdtemp(path.join(os.tmpdir(), 'tempDir-'), (err, tempDir) => {
    if (err) {
        return console.error('Error creating temporary directory:', err);
    }

    console.log(`Temporary directory created: ${tempDir}`);

  
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt'];

    fileNames.forEach((fileName, index) => {
        const filePath = path.join(tempDir, fileName);
        const fileContent = `This is temporary file ${index + 1}`;

      
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                return console.error(`Error creating file ${filePath}:`, err);
            }
            console.log(`Temporary file created: ${filePath}`);
        });
    });
});
