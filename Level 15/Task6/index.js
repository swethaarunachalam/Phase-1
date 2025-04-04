const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const algorithm = 'aes-256-cbc';
const ivLength = 16; 

function getKeyFromPassword(password) {
    return crypto.createHash('sha256').update(password).digest();
}


function encryptFile(inputPath, outputPath, password) {
    if (!fs.existsSync(inputPath)) {
        console.error(`Error: File '${inputPath}' not found.`);
        return;
    }
    try {
        const key = getKeyFromPassword(password);
        const iv = crypto.randomBytes(ivLength);
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        const input = fs.createReadStream(inputPath);
        const output = fs.createWriteStream(outputPath);

        output.write(iv); 
        input.pipe(cipher).pipe(output);

        output.on('finish', () => console.log(' File encrypted successfully!'));
    } catch (error) {
        console.error(' Encryption error:', error.message);
    }
}


function decryptFile(inputPath, outputPath, password) {
    if (!fs.existsSync(inputPath)) {
        console.error(`Error: File '${inputPath}' not found.`);
        return;
    }
    try {
        const key = getKeyFromPassword(password);
        const input = fs.createReadStream(inputPath);
        const output = fs.createWriteStream(outputPath);

        let iv = Buffer.alloc(ivLength);
        input.read(ivLength);

        input.once('readable', function () {
            const ivBuffer = input.read(ivLength);
            if (!ivBuffer || ivBuffer.length !== ivLength) {
                console.error(" Error: IV missing or incorrect length.");
                return;
            }

            const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
            input.pipe(decipher).pipe(output);

            decipher.on('error', (err) => {
                console.error(" Decryption error:", err.message);
            });

            output.on('finish', () => console.log('File decrypted successfully!'));
        });
    } catch (error) {
        console.error(' Decryption error:', error.message);
    }
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter mode (encrypt/decrypt): ', (mode) => {
    rl.question('Enter input path (file): ', (inputPath) => {
        rl.question('Enter output path: ', (outputPath) => {
            rl.question('Enter password: ', (password) => {
                if (mode === 'encrypt') {
                    encryptFile(inputPath, outputPath, password);
                } else if (mode === 'decrypt') {
                    decryptFile(inputPath, outputPath, password);
                } else {
                    console.log(' Invalid mode! Use encrypt or decrypt.');
                }
                rl.close();
            });
        });
    });
});
