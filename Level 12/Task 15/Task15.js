const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        return console.error('Error reading the file:', err);
    }

    try {
       
        let jsonData = JSON.parse(data);

        jsonData.push({ id: 3, name: "lokesh", age: 19 });

       
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return console.error('Error writing the file:', err);
            }
            console.log('JSON file successfully updated.');
        });

    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});
