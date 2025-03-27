const fs = require('fs');
const path = require('path');

function syncDirectories(sourceDir, targetDir) {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`Created target directory: ${targetDir}`);
    }

    const sourceFiles = new Set(fs.readdirSync(sourceDir));
    const targetFiles = new Set(fs.readdirSync(targetDir));

  
    sourceFiles.forEach(file => {
        const sourceFilePath = path.join(sourceDir, file);
        const targetFilePath = path.join(targetDir, file);

        const sourceStat = fs.statSync(sourceFilePath);

        if (!targetFiles.has(file) || fs.statSync(targetFilePath).mtime < sourceStat.mtime) {
            fs.copyFileSync(sourceFilePath, targetFilePath);
            console.log(`Copied/Updated: ${file}`);
        }
    });

    targetFiles.forEach(file => {
        if (!sourceFiles.has(file)) {
            fs.unlinkSync(path.join(targetDir, file));
            console.log(`Deleted: ${file}`);
        }
    });

    console.log("✅ Synchronization Complete!");
}


const sourceDir = 'sourceDir';
const targetDir = 'targetDir';

syncDirectories(sourceDir, targetDir);
