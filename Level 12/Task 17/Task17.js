const fs = require('fs'); 
const crypto = require('crypto'); 

const algorithm = 'aes-256-cbc'; 
const key = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16); 
function encryptFile(inputFile, outputFile) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
        console.log(`File "${inputFile}" encrypted successfully as "${outputFile}"`);
    });

    output.on('error', (err) => {
        console.error('Error encrypting file:', err);
    });
}


function decryptFile(inputFile, outputFile) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);

    input.pipe(decipher).pipe(output);

    output.on('finish', () => {
        console.log(`File "${inputFile}" decrypted successfully as "${outputFile}"`);
    });

    output.on('error', (err) => {
        console.error('Error decrypting file:', err);
    });
}


const originalFile = 'test.txt'; 
const encryptedFile = 'encrypted.txt'; 
const decryptedFile = 'decrypted.txt'; 

encryptFile(originalFile, encryptedFile);


setTimeout(() => {
    decryptFile(encryptedFile, decryptedFile);
}, 2000);
