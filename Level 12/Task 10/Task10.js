const fs = require('fs');

const fileToDelete = 'delete.txt';

if (fs.existsSync(fileToDelete)) {
    fs.unlink(fileToDelete, (err) => {
        if (err) {
            console.log('Error deleting file:', err);
        } else {
            console.log(`File "${fileToDelete}" deleted successfully`);
        }
    });
} else {
    console.log(`File "${fileToDelete}" does not exist. Nothing to delete.`);
}

