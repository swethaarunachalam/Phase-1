const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.csv');
const outputFilePath = path.join(__dirname, 'results.txt');

const calculateAverage = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        return console.error('Error reading the CSV file:', err);
    }

    try {
        const lines = data.trim().split('\n');  
        const headers = lines[0].split(',');  
        const subjects = headers.slice(1); 
        
        let scores = subjects.map(() => []);  
       
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(value => value.trim());
            for (let j = 1; j < cols.length; j++) {
                scores[j - 1].push(Number(cols[j])); 
            }
        }

        let results = `Subject Averages:\n`;
        subjects.forEach((subject, index) => {
            const avg = calculateAverage(scores[index]).toFixed(2);
            results += `${subject}: ${avg}\n`;
        });

       
        fs.writeFile(outputFilePath, results, 'utf8', (err) => {
            if (err) {
                return console.error('Error writing results:', err);
            }
            console.log('Processing complete. Results saved in results.txt');
        });

    } catch (parseError) {
        console.error('Error processing CSV data:', parseError);
    }
});
